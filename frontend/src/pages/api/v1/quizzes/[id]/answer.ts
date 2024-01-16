import { Quiz } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import { openai } from '@/libs/openai'
import prisma from '@/libs/prisma'
import { apiValidation, quizAnswersSchema } from '@/libs/validates'
import { checkEqualArray } from '@/utils/checkEqualArrays'

/** このAPIのレスポンス型 */
type AnswerResuponse =
  | {
      data: {
        isCorrect: boolean
        quiz: Quiz
      }
    }
  | { data: string }

/** GPTへのリクエスト */
type GPTRequest = {
  question: string
  correctAnswer: string
  answer: string
}

/** JSONに整形したGPTレスポンス */
type GPTResponse = {
  isCorrect: boolean
}

/** GPTにリクエストするプロンプトを生成 */
const generatePrompt = ({ question, correctAnswer, answer }: GPTRequest) => {
  const req = `
  You are an excellent grader.
  
  question:「${question}」
  Model Answer:「${correctAnswer}」
  Please grade the following
  response:「${answer}」
  The output should be a markdown code snippet formatted in the following schema in Japanese:
  \`\`\`json
  {
    isCorrect: boolean, // If [response] is correct as an answer to [question] even if [response] does not contain [model answer], [isCorrect] is set to true.
  }
  \`\`\`
  NOTES:
  * If it is a misplaced answer, be sure to set isCorrect to false.
  * Please do not include anything other than JSON in your answer.
  `
  return req
}

/** GPTにリクエストする関数 */
const createChatCompletion = async ({
  question,
  correctAnswer,
  answer,
}: GPTRequest) => {
  return await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      // GPTの性格を変える
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: generatePrompt({
          question: question,
          correctAnswer,
          answer,
        }),
      },
    ],
    max_tokens: 300,
  })
}

/** GPTのレスポンスをJSONに整形 */
const parseGPTResponse = (gptResponse: string): GPTResponse => {
  const regex = /```json([\s\S]*?)```/gm
  const match = regex.exec(gptResponse)

  // JSONがレスポンスに含まれていない
  if (match === null || match?.[1] === null) {
    return {
      isCorrect: false,
    }
  }
  const jsonData: object = JSON.parse(match[1])

  return jsonData as GPTResponse
}

// api/v1/quizzes/[id]/answerのAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnswerResuponse>,
) {
  // api/v1/quizzes/[id]
  const id = String(req.query.id)
  const { method, body } = req

  await runMiddleware(req, res) // corsチェック

  switch (method) {
    // クイズの正誤判定をする
    case 'POST':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, quizAnswersSchema, async () => {
        const quiz = await prisma.quiz.findUnique({
          where: {
            id: id,
          },
        })

        if (!quiz) {
          res.status(404).json({ data: 'このデータは存在しません' })
          return
        }

        // 自由記述の時は、AIで正誤判定をする
        if (quiz.type === 'text') {
          const completion = await createChatCompletion({
            question: quiz.question,
            correctAnswer: quiz.answers[0],
            answer: body.answers[0],
          })
          const gptResponse = parseGPTResponse(
            completion.data.choices[0].message?.content || '',
          )
          const answerResponse = {
            ...gptResponse,
            quiz,
          }

          res.status(200).json({
            data: answerResponse,
          })
          return
        }

        // 単一選択、複数選択の問題の正誤判定
        const isCorrect = checkEqualArray(quiz.answers, body.answers)

        res.status(200).json({ data: { isCorrect, quiz } })
        return
      })
  }
}
