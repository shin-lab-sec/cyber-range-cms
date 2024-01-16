import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

// api/v1/courses/[id]のAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id)

  await runMiddleware(req, res) // corsチェック

  try {
    // コースの取得
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
      include: {
        sections: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })
    res.status(200).json({ data: course })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
