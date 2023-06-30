import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/articles
  await runMiddleware(req, res) // corsチェック

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'asc' },
    })
    res.status(200).json({ data: articles })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
