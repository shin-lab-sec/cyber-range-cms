import { Anpan } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const { method, body } = req
  const id = Number(req.query.id) // anpan/1 (1の部分)

  switch (method) {
    // anpan/1 の時も対応させる
    case 'GET':
      try {
        const anpans = await prisma.anpan.findUnique(
          {
            where: {
              id: id
            }
          }) // findUnique, findMany (where(OR, AND), orderBy, select, include, )
        res.status(200).json({ data: anpans, method:method })
    } catch (e) {
        const err = e
        res.status(400).json({ data: err })
      }

    // anpan/1 
    case 'PUT':
      try {
        const createAnpan = await prisma.anpan.update({
          where: {
            id: id
          },
          data: {
            email: body.email, name: body.name // emailだけ、nameだけでも行ける
          },
        })
        res.status(200).json({data: createAnpan})
      } catch (e) {
        const err = e
        res.status(400).json({ data: err })
      }

    // anpan/1 
    case 'DELETE':
      try {
        const createAnpan = await prisma.anpan.delete({
          where: {
            id: id
          },
        })
        res.status(200).json({data: createAnpan})
      } catch (e) {
        const err = e
        res.status(400).json({ data: err })
      }
    default:
      res.status(405).end()
      break
  }
}
