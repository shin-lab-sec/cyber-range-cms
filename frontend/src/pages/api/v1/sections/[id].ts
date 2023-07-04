import type { NextApiRequest, NextApiResponse } from 'next'

import { runMiddleware } from '@/libs/cors'
import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/sections/[id]
  const id = String(req.query.id)

  await runMiddleware(req, res) // corsチェック

  try {
    const section = await prisma.section.findUnique({
      where: {
        id: id,
      },
      include: {
        userAgent: true,
      },
    })
    res.status(200).json({ data: section })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
