import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const curriculums = await prisma.curriculum.findMany({
      include: { userAgent: true },
      orderBy: { createdAt: 'asc' },
    })
    res.status(200).json({ data: curriculums })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
