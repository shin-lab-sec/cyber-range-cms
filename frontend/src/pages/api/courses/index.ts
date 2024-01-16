import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, courseRequestSchema } from '@/libs/validates'

// api/coursesのAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    // コースの一覧取得
    case 'GET':
      try {
        const courses = await prisma.course.findMany({
          include: {
            sections: {
              include: {
                userAgent: true,
                articles: { orderBy: { createdAt: 'asc' } },
                quizzes: { orderBy: { createdAt: 'asc' } },
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        })

        res.status(200).json({ data: courses })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // コースの作成
    case 'POST':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, courseRequestSchema, async () => {
        const createdCourse = await prisma.course.create({
          data: {
            name: body.name,
            description: body.description,
            level: body.level,
            imageUrl: body.imageUrl,
            author: body.author,
            organization: body.organization,
          },
        })
        res.status(200).json({ data: createdCourse })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
