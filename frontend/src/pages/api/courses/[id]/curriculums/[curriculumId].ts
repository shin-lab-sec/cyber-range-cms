import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)
  const curriculumId = String(req.query.curriculumId)

  switch (method) {
    // courses/[id]/curriculums/[curriculumId]
    // courses/1
    case 'POST':
      try {
        const course = await prisma.courseCurriculumRelation.create({
          data: {
            course: {
              connect: {
                id,
              },
            },
            curriculum: {
              connect: {
                id: curriculumId,
              },
            },
            order: 0,
          },
        })
        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // courses/1
    case 'DELETE':
      try {
        const course = await prisma.courseCurriculumRelation.delete({
          where: {
            courseId_curriculumId: {
              courseId: id,
              curriculumId: curriculumId,
            },
          },
        })
        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
