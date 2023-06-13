import { z } from 'zod'

import { gitHubUrlRegex } from './section'

export const userAgentSchema = z.object({
  name: z.string().nonempty('ユーザーエージェント名は必須です'),
  gitHubUrl: z
    .string()
    .nonempty('GitHubUrlは必須です')
    .regex(gitHubUrlRegex, 'GitHubのURLを入力してください'),
  type: z.union([z.literal('vdi'), z.literal('terminal')]).default('vdi'),
  author: z
    .string()
    .nonempty('制作者は必須です')
    .max(255, '255文字以内で入力して下さい'),
  organization: z
    .string()
    .nonempty('所属は必須です')
    .max(255, '255文字以内で入力して下さい'),
})
