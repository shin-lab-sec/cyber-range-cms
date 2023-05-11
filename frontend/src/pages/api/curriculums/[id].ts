import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, curriculumSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  // curriculums/[id]
  switch (method) {
    case 'GET':
      try {
        const curriculum = await prisma.curriculum.findUnique({
          where: {
            id: id,
          },
          include: { userAgent: true },
        })
        res.status(200).json({ data: curriculum })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'PUT':
      apiValidation(req, res, curriculumSchema, async () => {
        const updatedCurriculum = await prisma.curriculum.update({
          where: {
            id: id,
          },
          data: {
            name: body.name,
            description: body.description,
            gitHubUrl: body.gitHubUrl,
            imageUrl: body.imageUrl,
            articleUrl: body.articleUrl,
            userAgent: { connect: { id: body.userAgentId } },
          },
          include: {
            userAgent: true,
          },
        })
        res.status(200).json({ data: updatedCurriculum })
      })
      break

    case 'DELETE':
      try {
        const deletedCurriculum = await prisma.curriculum.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: deletedCurriculum })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
