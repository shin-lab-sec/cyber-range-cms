import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/quizzes
  await runMiddleware(req, res) // corsチェック

  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: 'asc' },
    })
    res.status(200).json({ data: quizzes })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
