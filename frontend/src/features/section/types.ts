import { UserAgent, Section, Article, Quiz } from '@prisma/client'
import { z } from 'zod'

import { sectionFormRequestSchema } from '@/libs/validates'

export type SectionWithRelation = Section & {
  userAgent: UserAgent | null
  articles: Article[]
  quizzes: Quiz[]
}

export type SectionFormRequest = z.infer<typeof sectionFormRequestSchema>
