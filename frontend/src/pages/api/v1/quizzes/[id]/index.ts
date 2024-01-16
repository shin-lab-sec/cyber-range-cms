import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

// api/v1/quizzes/[id]のAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id)

  await runMiddleware(req, res) // corsチェック

  try {
    // クイズの取得
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json({ data: quiz })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
