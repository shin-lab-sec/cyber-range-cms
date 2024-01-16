import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, articleUpdateRequestSchema } from '@/libs/validates'

// api/articles/[id]のAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  switch (method) {
    // 記事の取得
    case 'GET':
      try {
        const article = await prisma.article.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: article })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // 記事の更新
    case 'PUT':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, articleUpdateRequestSchema, async () => {
        const updatedArticle = await prisma.article.update({
          where: {
            id: id,
          },
          data: {
            body: body.body,
          },
        })
        res.status(200).json({ data: updatedArticle })
      })
      break

    // 記事の削除
    case 'DELETE':
      try {
        const deletedArticle = await prisma.article.delete({
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
