import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, courseUpdateRequestSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  // api/courses/[id]
  switch (method) {
    case 'GET':
      try {
        const course = await prisma.course.findUnique({
          where: {
            id: id,
          },
          // コース詳細ページでセクション一覧を表示するので必要
          include: {
            sections: {
              include: {
                userAgent: true,
                articles: { orderBy: { createdAt: 'asc' } },
                quizzes: { orderBy: { createdAt: 'asc' } },
              },
            },
          },
        })

        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'PUT':
      apiValidation(req, res, courseUpdateRequestSchema, async () => {
        const updatedCourse = await prisma.course.update({
          where: {
            id: id,
          },
          data: {
            name: body.name,
            description: body.description,
            level: body.level,
            imageUrl: body.imageUrl,
            author: body.author,
            organization: body.organization,
            sectionIds: body.sectionIds,
          },
          // 今はPUTで、courses/[id]をmutateしないので、includeしない
          include: {
            sections: {
              include: {
                userAgent: true,
                articles: { orderBy: { createdAt: 'asc' } },
                quizzes: { orderBy: { createdAt: 'asc' } },
              },
            },
          },
        })

        res.status(200).json({ data: updatedCourse })
      })
      break

    case 'DELETE':
      try {
        const deletedCourse = await prisma.course.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: deletedCourse })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
