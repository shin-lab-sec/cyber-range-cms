import { z } from 'zod'

import { quizFormRequestSchema } from '@/libs/validates'

export type QuizFormRequest = z.infer<typeof quizFormRequestSchema>
