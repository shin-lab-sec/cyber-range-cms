import { z } from 'zod'

// URLの形式
const regex = new RegExp('^https?://.+$')

export const userAgentSchema = z.object({
  name: z.string().nonempty('ユーザーエージェント名は必須です'),
  gitHubUrl: z
    .string()
    .nonempty('GitHubUrlは必須です')
    .regex(regex, { message: 'URLの形式で入力して下さい' }),
})
