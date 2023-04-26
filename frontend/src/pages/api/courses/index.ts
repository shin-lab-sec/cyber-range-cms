import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

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
            curriculums: {
              include: { curriculum: true },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'asc' },
        })

        const resulut = courses.map(course => ({
          ...course,
          curriculums: course.curriculums.map(c => c.curriculum),
        }))
        res.status(200).json({ data: resulut, method: method })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'POST':
      try {
        const createCourse = await prisma.course.create({
          data: {
            name: body.name,
            url: body.url,
            article: body.article,
            imageUrl: body.imageUrl,
            description: body.description,
          },
        })
        res.status(200).json({ data: createCourse })
      } catch (err) {
        res.status(400).json({ data: err, req: body })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
