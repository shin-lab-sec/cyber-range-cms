import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/quizzes/[id]
  const id = String(req.query.id)

  await runMiddleware(req, res) // corsチェック

  try {
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
