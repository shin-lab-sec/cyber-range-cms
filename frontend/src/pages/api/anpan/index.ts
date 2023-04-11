import { Anpan } from '@prisma/client'
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
        const anpans = await prisma.anpan.findMany() // findUnique, findMany (where(OR, AND), orderBy, select, include, )
        res.status(200).json({ data: anpans, method: method })
      } catch (e) {
        const err = e
        res.status(400).json({ data: err })
      }

    case 'POST':
      try {
        const createAnpan = await prisma.anpan.create({
          data: { email: body.email, name: body.name },
        })
        res.status(200).json({ data: createAnpan })
      } catch (e) {
        const err = e
        res.status(400).json({ data: err })
      }

    default:
      res.status(405).end()
      break
  }
}
