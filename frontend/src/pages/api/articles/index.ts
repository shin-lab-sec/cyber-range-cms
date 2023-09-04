import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, articleRequestSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // articles
  switch (method) {
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

    case 'POST':
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
