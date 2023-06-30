import { UserAgent, Section, Article, Quiz } from '@prisma/client'

export type SectionWithRelation = Section & {
  userAgent: UserAgent | null
  articles: Article[]
  quizzes: Quiz[]
}
