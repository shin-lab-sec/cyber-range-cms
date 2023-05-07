import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id)

  // api/v1/courses/[id]
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
      include: {
        curriculums: {
          include: {
            curriculum: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    // courseがnullならnullを返す
    const courseWithCurriculums = course && {
      ...course,
      curriculums: course?.curriculums.map(ccr => ccr.curriculum),
    }
    res.status(200).json({ data: courseWithCurriculums })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
