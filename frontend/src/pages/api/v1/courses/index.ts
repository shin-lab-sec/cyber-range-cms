import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/courses
  try {
    const courses = await prisma.course.findMany({
      include: {
        sections: {
          include: { userAgent: true },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    res.status(200).json({ data: courses })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
