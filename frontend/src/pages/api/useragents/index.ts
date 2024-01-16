import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, userAgentRequestSchema } from '@/libs/validates'

// api/useragentsのAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    // ユーザーエージェントの一覧取得
    case 'GET':
      try {
        const userAgents = await prisma.userAgent.findMany({
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: userAgents })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // ユーザーエージェントの作成
    case 'POST':
      // zodバリデーションが通った時の処理
      apiValidation(req, res, userAgentRequestSchema, async () => {
        const createdUserAgent = await prisma.userAgent.create({
          data: {
            name: body.name,
            gitHubUrl: body.gitHubUrl,
            type: body.type,
            author: body.author,
            organization: body.organization,
          },
        })
        res.status(200).json({ data: createdUserAgent })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
