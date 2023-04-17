import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  switch (method) {
    // courses/1
    case 'GET':
      try {
        const course = await prisma.course.findUnique({
          where: {
            id: id,
          },
          include: {
            curriculums: {
              include: {
                curriculum: true,
              },
            },
          },
        })

        const result = {
          ...course,
          curriculums: course?.curriculums.map(ccr => ccr.curriculum),
        }
        // res.status(200).json({ data: course, method: method })
        res.status(200).json({ data: result })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
