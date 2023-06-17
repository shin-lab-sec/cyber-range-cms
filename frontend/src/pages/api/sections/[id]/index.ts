import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, sectionSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  // sections/[id]
  switch (method) {
    case 'GET':
      try {
        const section = await prisma.section.findUnique({
          where: {
            id: id,
          },
          include: { userAgent: true },
        })
        res.status(200).json({ data: section })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'PUT':
      // res.status(200).json({ data: body })
      // break

      // 全部オプショナルなら、違うtypeの値入ってもzod通しちゃう
      // apiValidation(req, res, sectionUpdateSchema, async () => {
      apiValidation(req, res, sectionSchema, async () => {
        const sectionRequest: {
          name: string
          type: string
          scenarioGitHubUrl: string
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

        const updatedSection = await prisma.section.update({
          where: {
            id: id,
          },
          data: sectionRequest,
          // data: { name: '変えたぜ' },
          include: {
            userAgent: true,
          },
        })
        res.status(200).json({ data: updatedSection })
      })
      break

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
