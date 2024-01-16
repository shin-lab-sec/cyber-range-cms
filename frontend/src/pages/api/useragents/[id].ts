import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, userAgentRequestSchema } from '@/libs/validates'

// api/useragents/[id]のAPI定義
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  switch (method) {
    // ユーザーエージェントの取得
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

    // ユーザーエージェントの更新
    case 'PUT':
      // zodバリデーションが通った時の処理
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

    // ユーザーエージェントの削除
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
