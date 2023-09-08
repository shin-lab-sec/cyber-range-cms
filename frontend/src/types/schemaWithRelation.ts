import { Article, Course, Quiz, Section, UserAgent } from '@prisma/client'

export type CourseWithSections = Course & {
  sections: (Section & {
    userAgent: UserAgent | null
    articles: Article[]
    quizzes: Quiz[]
  })[]
}

export type SectionWithRelation = Section & {
  userAgent: UserAgent | null
  articles: Article[]
  quizzes: Quiz[]
}
