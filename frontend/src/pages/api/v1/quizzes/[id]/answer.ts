import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'
import { apiValidation, quizAnswersSchema } from '@/libs/validates'
import { checkEqualArray } from '@/utils/checkEqualArrays'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/quizzes/[id]
  const id = String(req.query.id)
  const { method, body } = req

  await runMiddleware(req, res) // corsチェック

  switch (method) {
    case 'POST':
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

        // TODO: quiz.type="text"の時は、外部APIで判定する
        const isCorrect = checkEqualArray(quiz.answers, body.answers)
        res
          .status(200)
          .json({ data: { isCorrect, explanation: quiz.explanation } })
        return
      })
  }
}
