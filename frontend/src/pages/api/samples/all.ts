import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const relations = await prisma.courseCurriculumRelation.findMany({
      include: {
        course: true,
        curriculum: true,
      },
    })
    const resulut = relations.map(relation => ({
      courseId: relation.courseId,
      curriculumId: relation.curriculumId,
      courseName: relation.course.name,
      curriculumName: relation.curriculum.name,
    }))

    res.status(200).json({ data: resulut })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
