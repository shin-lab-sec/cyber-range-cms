import { z } from 'zod'

// "" | URLの形式
const regex = new RegExp('^(https?://.+|)$')

export const curriculumSchema = z.object({
  name: z.string().nonempty('コース名は必須です'),
  gitHubUrl: z.string().regex(regex, { message: 'URLの形式で入力して下さい' }), // regixする
  imageUrl: z.string().regex(regex, { message: 'URLの形式で入力して下さい' }),
  articleUrl: z.string().regex(regex, { message: 'URLの形式で入力して下さい' }),
  description: z.string(),
  userAgentId: z
    .string({ required_error: 'ユーザーエージェントは必須です' }) // {...register("userAgent")}をしないので空の時は、string以外になる
    .nonempty('ユーザーエージェントは必須です'),
})
