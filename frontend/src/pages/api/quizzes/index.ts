import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, quizRequestSchema } from '@/libs/validates'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // quizzes
  switch (method) {
    case 'GET':
      try {
        const quizzes = await prisma.quiz.findMany({
          orderBy: { createdAt: 'asc' },
        })
        res.status(200).json({ data: quizzes })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    case 'POST':
      apiValidation(req, res, quizRequestSchema, async () => {
        const createdArticle = await prisma.quiz.create({
          data: {
            question: body.question,
            type: body.type,
            choices: body.choices,
            answers: body.answers,
            explanation: body.explanation,
            section: { connect: { id: body.sectionId } },
          },
        })
        res.status(200).json({ data: createdArticle })
      })
      break

    default:
      res.status(405).end()
      break
  }
}
