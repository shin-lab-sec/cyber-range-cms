import { UserAgent, Curriculum } from '@prisma/client'

export type CurriculumsWithUserAgent = Curriculum & { userAgent: UserAgent }
