import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, sectionUpdateRequestSchema } from '@/libs/validates'

// api/sections/[id]のAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  switch (method) {
    // セクションの取得
    case 'GET':
      try {
        const section = await prisma.section.findUnique({
          where: {
            id: id,
          },
          include: {
            userAgent: true,
            articles: { orderBy: { createdAt: 'asc' } },
            quizzes: { orderBy: { createdAt: 'asc' } },
          },
        })
        res.status(200).json({ data: section })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // セクションの更新
    case 'PUT':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, sectionUpdateRequestSchema, async () => {
        const sectionRequest: {
          name: string
          type: string
          scenarioGitHubUrl: string
          course: { connect: { id: string } }
          userAgent?: { connect: { id: string } }
          quizIds: string[]
          articleIds: string[]
        } = {
          name: body.name,
          type: body.type,
          scenarioGitHubUrl: body.scenarioGitHubUrl,
          course: { connect: { id: body.courseId } },
          quizIds: body.quizIds,
          articleIds: body.articleIds,
        }

        // userAgentIdはオプショナルだけどconnectするから個別で追加
        if (body.userAgentId) {
          sectionRequest.userAgent = { connect: { id: body.userAgentId } }
        }

        const updatedSection = await prisma.section.update({
          where: {
            id: id,
          },
          data: sectionRequest,
          include: {
            userAgent: true,
            articles: { orderBy: { createdAt: 'asc' } },
            quizzes: { orderBy: { createdAt: 'asc' } },
          },
        })
        res.status(200).json({ data: updatedSection })
      })
      break

    // セクションの削除
    case 'DELETE':
      try {
        const deletedSection = await prisma.section.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: deletedSection })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
