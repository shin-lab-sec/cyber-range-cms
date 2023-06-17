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
        sections: {
          include: { userAgent: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    res.status(200).json({ data: course })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
