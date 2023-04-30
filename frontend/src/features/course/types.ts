import { Course, Curriculum } from '@prisma/client'

export type CourseWithCurriculums = Course & { curriculums: Curriculum[] }
