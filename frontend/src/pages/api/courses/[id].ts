import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, courseUpdateSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  // api/courses/[id]
  switch (method) {
    case 'GET':
      try {
        const course = await prisma.course.findUnique({
          where: {
            id: id,
          },
          include: {
            sections: {
              include: { userAgent: true, articles: true, quizzes: true },
              orderBy: { createdAt: 'asc' },
            },
          },
        })

        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'PUT':
      apiValidation(req, res, courseUpdateSchema, async () => {
        const updatedCourse = await prisma.course.update({
          where: {
            id: id,
          },
          data: {
            name: body.name,
            description: body.description,
            level: body.level,
            imageUrl: body.imageUrl,
            author: body.author,
            organization: body.organization,
            sectionIds: body.sectionIds,
          },
          include: {
            sections: {
              include: { userAgent: true, articles: true, quizzes: true },
              orderBy: { createdAt: 'asc' },
            },
          },
        })

        res.status(200).json({ data: updatedCourse })
      })
      break

    case 'DELETE':
      try {
        const deletedCourse = await prisma.course.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: deletedCourse })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
