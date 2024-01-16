import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, quizRequestSchema } from '@/libs/validates'

// api/quizzes/[id]のAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  switch (method) {
    // クイズの取得
    case 'GET':
      try {
        const article = await prisma.quiz.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: article })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // クイズの更新
    case 'PUT':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, quizRequestSchema, async () => {
        const updatedArticle = await prisma.quiz.update({
          where: {
            id: id,
          },
          data: {
            question: body.question,
            choices: body.choices,
            answers: body.answers,
            explanation: body.explanation,
          },
        })
        res.status(200).json({ data: updatedArticle })
      })
      break

    // クイズの削除
    case 'DELETE':
      try {
        const deletedArticle = await prisma.quiz.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: deletedArticle })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
