import { Article, Course, Quiz, Section, UserAgent } from '@prisma/client'

// sections/[id]のレスポンス
export type SectionWithRelation = Section & {
  userAgent: UserAgent | null
  articles: Article[]
  quizzes: Quiz[]
}

// courses/[id]のレスポンス
export type CourseWithSections = Course & {
  sections: SectionWithRelation[]
}
