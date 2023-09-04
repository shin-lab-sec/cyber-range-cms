import { Article, Course, Quiz, Section, UserAgent } from '@prisma/client'
import { z } from 'zod'

import { courseRequestSchema } from '@/libs/validates'

// TODO: 直下のtypesに移動
export type CourseWithSections = Course & {
  sections: (Section & {
    userAgent: UserAgent | null
    articles: Article[]
    quizzes: Quiz[]
  })[]
}

export type CourseRequest = z.infer<typeof courseRequestSchema>
