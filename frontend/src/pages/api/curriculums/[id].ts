import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  // curriculums/[id]
  switch (method) {
    case 'GET':
      try {
        const courses = await prisma.curriculum.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: courses, method: method })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'PUT':
      try {
        const curriculum = await prisma.curriculum.update({
          where: {
            id: id,
          },
          data: {
            name: body.name,
            description: body.description,
            gitHubUrl: body.gitHubUrl,
            imageUrl: body.imageUrl,
            articleUrl: body.articleUrl,
          },
        })
        res.status(200).json({ data: curriculum })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'DELETE':
      try {
        const curriculum = await prisma.curriculum.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: curriculum })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
