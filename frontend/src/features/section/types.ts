import { z } from 'zod'

import { sectionFormRequestSchema } from '@/libs/validates'

export type SectionFormRequest = z.infer<typeof sectionFormRequestSchema>
