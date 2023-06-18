import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation } from '@/libs/validates'
import { articleUpdateSchema } from '@/libs/validates/article'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  // articles/[id]
  switch (method) {
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

    case 'PUT':
      apiValidation(req, res, articleUpdateSchema, async () => {
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
