import { Course, Section, UserAgent } from '@prisma/client'

export type CourseWithSections = Course & {
  sections: (Section & { userAgent: UserAgent | null })[]
}
