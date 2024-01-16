import { z } from 'zod'

import { courseRequestSchema } from '@/libs/validates'

// コースAPIへのリクエスト型
export type CourseRequest = z.infer<typeof courseRequestSchema>
