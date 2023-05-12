import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, userAgentSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // useragents
  switch (method) {
    case 'GET':
      try {
        const userAgents = await prisma.userAgent.findMany({
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: userAgents })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'POST':
      apiValidation(req, res, userAgentSchema, async () => {
        const createdUserAgent = await prisma.userAgent.create({
          data: {
            name: body.name,
            gitHubUrl: body.gitHubUrl,
          },
        })
        res.status(200).json({ data: createdUserAgent })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
