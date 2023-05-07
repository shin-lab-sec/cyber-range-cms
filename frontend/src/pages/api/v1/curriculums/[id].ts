import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id)

  // curriculums/[id]
  try {
    const curriculum = await prisma.curriculum.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json({ data: curriculum })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
