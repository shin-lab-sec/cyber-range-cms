import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

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

        // courseがnullならnullを返す
        const result = course && {
          ...course,
          curriculums: course?.curriculums.map(ccr => ccr.curriculum),
        }
        res.status(200).json({ data: result })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // courses/1
    case 'PUT':
      try {
        const course = await prisma.course.update({
          where: {
            id: id,
          },
          // 大丈夫？
          data: {
            name: body.name,
            url: body.url,
            article: body.article,
            imageUrl: body.imageUrl,
            description: body.description,
            curriculumIds: body.curriculumIds,
          },
        })
        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // courses/1
    case 'DELETE':
      try {
        const course = await prisma.course.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
