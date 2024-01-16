import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, sectionRequestSchema } from '@/libs/validates'

// api/sectionsのAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // 必要？
  switch (method) {
    // セクションの一覧取得
    case 'GET':
      try {
        const sections = await prisma.section.findMany({
          include: {
            userAgent: true,
            articles: { orderBy: { createdAt: 'asc' } },
            quizzes: { orderBy: { createdAt: 'asc' } },
          },
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: sections })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // セクションの作成
    // typeで3つに分ける？
    case 'POST':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, sectionRequestSchema, async () => {
        const sectionRequest: {
          name: string
          type: string
          scenarioGitHubUrl?: string
          course: { connect: { id: string } }
          userAgent?: { connect: { id: string } }
        } = {
          name: body.name,
          type: body.type,
          scenarioGitHubUrl: body.scenarioGitHubUrl,
          course: { connect: { id: body.courseId } },
        }

        // userAgentIdはオプショナルだけどconnectするから個別で追加
        if (body.userAgentId) {
          sectionRequest.userAgent = { connect: { id: body.userAgentId } }
        }

        const createdSection = await prisma.section.create({
          data: sectionRequest,
          include: { userAgent: true, articles: true, quizzes: true },
        })
        res.status(200).json({ data: createdSection })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
