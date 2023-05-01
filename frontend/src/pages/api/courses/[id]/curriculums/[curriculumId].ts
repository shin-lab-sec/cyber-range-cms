import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const id = String(req.query.id)
  const curriculumId = String(req.query.curriculumId)

  // courses/[id]/curriculums/[curriculumId]
  switch (method) {
    case 'POST':
      try {
        const createdCourse = await prisma.courseCurriculumRelation.create({
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
          },
        })
        res.status(200).json({ data: createdCourse })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // courses/1
    case 'DELETE':
      try {
        const deletedCourse = await prisma.courseCurriculumRelation.delete({
          where: {
            courseId_curriculumId: {
              courseId: id,
              curriculumId: curriculumId,
            },
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
