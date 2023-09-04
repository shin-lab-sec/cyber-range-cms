import { z } from 'zod'

export const articleRequestSchema = z.object({
  body: z
    .string({ required_error: '本文は必須です' })
    .nonempty('本文は必須です'),
  sectionId: z
    .string({ required_error: 'セクションが選択されていません' })
    .nonempty('セクションが選択されていません'),
})

export const articleUpdateRequestSchema = articleRequestSchema.pick({
  body: true,
})
