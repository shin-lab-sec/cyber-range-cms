import { z } from 'zod'

import { sectionFormRequestSchema } from '@/libs/validates'

// セクションAPIへのリクエスト型
export type SectionFormRequest = z.infer<typeof sectionFormRequestSchema>
