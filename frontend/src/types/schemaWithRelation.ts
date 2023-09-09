import { Article, Course, Quiz, Section, UserAgent } from '@prisma/client'

// courses/[id]のレスポンス
export type CourseWithSections = Course & {
  sections: Section[]
}

// sections/[id]のレスポンス
export type SectionWithRelation = Section & {
  userAgent: UserAgent | null
  articles: Article[]
  quizzes: Quiz[]
}
