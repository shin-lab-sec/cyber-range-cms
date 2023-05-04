import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation } from '@/libs/validates/apiValidation'
import { curriculumSchema } from '@/libs/validates/curriculum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const curriculums = await prisma.curriculum.findMany({
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: curriculums })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'POST':
      apiValidation(req, res, curriculumSchema, async () => {
        const createdCurriculum = await prisma.curriculum.create({
          data: {
            name: body.name,
            description: body.description,
            gitHubUrl: body.gitHubUrl,
            imageUrl: body.imageUrl,
            articleUrl: body.articleUrl,
          },
        })
        res.status(200).json({ data: createdCurriculum })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
