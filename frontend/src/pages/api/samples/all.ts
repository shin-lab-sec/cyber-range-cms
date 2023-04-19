import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const course = await prisma.courseCurriculumRelation.findMany({})
    res.status(200).json({ data: course })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}
