import { UserAgent, Section } from '@prisma/client'

export type SectionWithUserAgent = Section & { userAgent: UserAgent | null }
