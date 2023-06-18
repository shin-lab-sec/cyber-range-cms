import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/useragents
  try {
    const userAgents = await prisma.userAgent.findMany({
      orderBy: { createdAt: 'asc' },
    })
    res.status(200).json({ data: userAgents })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
