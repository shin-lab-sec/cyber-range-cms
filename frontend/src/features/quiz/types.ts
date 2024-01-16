import { z } from 'zod'

import { quizFormRequestSchema } from '@/libs/validates'

// クイズAPIへのリクエスト型
export type QuizFormRequest = z.infer<typeof quizFormRequestSchema>
