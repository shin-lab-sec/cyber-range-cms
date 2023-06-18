import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id)

  // api/v1/sections/[id]
  try {
    const section = await prisma.section.findUnique({
      where: {
        id: id,
      },
      include: {
        userAgent: true,
        articles: { orderBy: { createdAt: 'asc' } },
        quizzes: { orderBy: { createdAt: 'asc' } },
      },
    })
    res.status(200).json({ data: section })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
