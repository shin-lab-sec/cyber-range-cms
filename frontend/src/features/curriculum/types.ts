import { UserAgent, Curriculum } from '@prisma/client'

export type CurriculumsWithUserAgent = Curriculum & { UserAgent: UserAgent }
