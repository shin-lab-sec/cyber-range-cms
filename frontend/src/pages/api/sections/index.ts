import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, sectionSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // courses/[courseId]/sections
  // いるか？
  switch (method) {
    case 'GET':
      try {
        const sections = await prisma.section.findMany({
          include: { userAgent: true },
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: sections })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // typeで3つに分ける？
    case 'POST':
      apiValidation(req, res, sectionSchema, async () => {
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
        if (body.scenarioGitHubUrl) {
          sectionRequest.scenarioGitHubUrl = body.scenarioGitHubUrl
        }
        // userAgentIdはオプショナルだけどconnectするから個別で追加
        if (body.userAgentId) {
          sectionRequest.userAgent = { connect: { id: body.userAgentId } }
        }

        const createdSection = await prisma.section.create({
          data: sectionRequest,
          include: { userAgent: true },
        })
        res.status(200).json({ data: createdSection })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
