import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, userAgentRequestSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  // useragents/[id]
  switch (method) {
    case 'GET':
      try {
        const userAgent = await prisma.userAgent.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: userAgent })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'PUT':
      apiValidation(req, res, userAgentRequestSchema, async () => {
        const updatedUserAgent = await prisma.userAgent.update({
          where: {
            id: id,
          },
          data: {
            name: body.name,
            gitHubUrl: body.gitHubUrl,
            type: body.type,
            author: body.author,
            organization: body.organization,
          },
        })
        res.status(200).json({ data: updatedUserAgent })
      })
      break

    case 'DELETE':
      try {
        const deletedUserAgent = await prisma.userAgent.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: deletedUserAgent })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
