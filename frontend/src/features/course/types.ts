import { z } from 'zod'

import { courseRequestSchema } from '@/libs/validates'

export type CourseRequest = z.infer<typeof courseRequestSchema>
