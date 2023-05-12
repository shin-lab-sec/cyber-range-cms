import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, curriculumSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const curriculums = await prisma.curriculum.findMany({
          include: { userAgent: true },
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
            userAgent: { connect: { id: body.userAgentId } },
          },
          include: { userAgent: true },
        })
        res.status(200).json({ data: createdCurriculum })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
