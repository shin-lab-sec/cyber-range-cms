import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

const cors = Cors({
  methods: ['GET'],
  origin: 'https://cypas.sec',
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors)
  // api/v1/useragents
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
