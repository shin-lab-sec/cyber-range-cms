import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/courses
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
}
