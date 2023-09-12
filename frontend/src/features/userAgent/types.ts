import { z } from 'zod'

import { userAgentRequestSchema } from '@/libs/validates'

export type UserAgentFormRequest = z.infer<typeof userAgentRequestSchema>
