import { Course, Curriculum, UserAgent } from '@prisma/client'

export type CourseWithCurriculums = Course & {
  curriculums: (Curriculum & { userAgent: UserAgent })[]
}
