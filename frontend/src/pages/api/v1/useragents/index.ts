import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/useragents
  await runMiddleware(req, res) // corsチェック

  try {
    const userAgents = await prisma.userAgent.findMany({
      orderBy: { createdAt: 'asc' },
    })
    console.log(userAgents)
    res.status(200).json({ data: userAgents })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
