import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

// api/v1/coursesのAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res) // corsチェック

  try {
    // コースの一覧取得
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'asc' },
    })
    res.status(200).json({ data: courses })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
