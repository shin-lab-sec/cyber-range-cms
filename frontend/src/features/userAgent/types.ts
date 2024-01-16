import { z } from 'zod'

import { userAgentRequestSchema } from '@/libs/validates'

// ユーザーエージェントAPIへのリクエスト型
export type UserAgentFormRequest = z.infer<typeof userAgentRequestSchema>
