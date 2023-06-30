import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, courseSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // api/courses
  switch (method) {
    case 'GET':
      try {
        const courses = await prisma.course.findMany({
          include: {
            sections: {
              include: {
                userAgent: true,
                articles: { orderBy: { createdAt: 'asc' } },
                quizzes: { orderBy: { createdAt: 'asc' } },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'asc' },
        })

        res.status(200).json({ data: courses })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'POST':
      apiValidation(req, res, courseSchema, async () => {
        const createdCourse = await prisma.course.create({
          data: {
            name: body.name,
            description: body.description,
            level: body.level,
            imageUrl: body.imageUrl,
            author: body.author,
            organization: body.organization,
          },
          include: {
            sections: {
              include: { userAgent: true, articles: true, quizzes: true },
            },
          },
        })
        res.status(200).json({ data: createdCourse })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
