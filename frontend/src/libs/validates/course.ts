import { z } from 'zod'

export const courseSchema = z.object({
  name: z.string().nonempty('コース名は必須です'),
  description: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
})

// curriculumIdsを追加して全プロパティをオプショナルに
export const courseUpdateSchema = courseSchema
  .extend({
    curriculumIds: z.string(),
  })
  .partial()
