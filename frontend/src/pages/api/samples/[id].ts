import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = Number(req.query.id) // sample/1 (1の部分)

  switch (method) {
    // sample/1 の時も対応させる
    case 'GET':
      try {
        const samples = await prisma.sample.findUnique({
          where: {
            id: id,
          },
        }) // findUnique, findMany (where(OR, AND), orderBy, select, include, )
        res.status(200).json({ data: samples, method: method })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // sample/1
    case 'PUT':
      try {
        const createAnpan = await prisma.sample.update({
          where: {
            id: id,
          },
          data: {
            email: body.email,
          },
        })
        res.status(200).json({ data: createAnpan })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // sample/1
    case 'DELETE':
      try {
        const createAnpan = await prisma.sample.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: createAnpan })
      } catch (err) {
        res.status(400).json({ data: err })
      }
    default:
      res.status(405).end()
      break
  }
}
