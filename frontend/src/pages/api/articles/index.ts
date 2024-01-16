import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, articleRequestSchema } from '@/libs/validates'

// api/articlesのAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    // 記事の一覧取得
    case 'GET':
      try {
        const articles = await prisma.article.findMany({
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: articles })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // 記事の作成
    case 'POST':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, articleRequestSchema, async () => {
        const createdArticle = await prisma.article.create({
          data: {
            body: body.body,
            sectionId: body.sectionId,
          },
        })
        res.status(200).json({ data: createdArticle })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
