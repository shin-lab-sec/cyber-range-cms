import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const courses = await prisma.curriculum.findMany({
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: courses, method: method })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'POST':
      try {
        const createCourse = await prisma.curriculum.create({
          data: {
            name: body.name,
            description: body.description,
            gitHubUrl: body.gitHubUrl,
            imageUrl: body.imageUrl,
            articleUrl: body.articleUrl,
          },
        })
        res.status(200).json({ data: createCourse })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
