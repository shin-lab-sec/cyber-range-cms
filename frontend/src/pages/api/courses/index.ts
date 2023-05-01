import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { apiValidation } from '../../../lib/validates/apiValidation'
import { courseSchema } from '../../../lib/validates/course'

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

        // {id, name, description, level, curriculumIds, curriculums: [{}]}
        const coursesWithCurriculums = courses.map(course => ({
          ...course,
          curriculums: course.curriculums.map(c => c.curriculum),
        }))
        res.status(200).json({ data: coursesWithCurriculums })
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
