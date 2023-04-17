import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    // 全データ取得
    case 'GET':
      try {
        const samples = await prisma.sample.findMany() // findUnique, findMany (where(OR, AND), orderBy, select, include, )
        res.status(200).json({ data: samples, method: method })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'POST':
      try {
        const createAnpan = await prisma.sample.create({
          data: {},
        })
        res.status(200).json({ data: createAnpan })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
