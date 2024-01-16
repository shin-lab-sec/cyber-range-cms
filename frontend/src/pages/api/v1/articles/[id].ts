import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

// api/v1/articles/[id]のAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id)

  await runMiddleware(req, res) // corsチェック

  try {
    // 記事の取得
    const article = await prisma.article.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json({ data: article })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
