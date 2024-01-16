import { z } from 'zod'

import { sectionWithRelationSchema } from './section'

// "" | cms-storageのimagesバケット内のオブジェクトURL
const imageUrlRegex = new RegExp('^(https://cms-storage.cypas.sec/images/.+|)$')

// コース作成APIのリクエストのzodスキーマ
export const courseRequestSchema = z.object({
  name: z
    .string()
    .nonempty('コース名は必須です')
    .max(255, '255文字以内で入力して下さい'),
  description: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
  imageUrl: z
    .string()
    .regex(imageUrlRegex, { message: '画像URLの形式が正しくないです' }),
  author: z
    .string()
    .nonempty('制作者は必須です')
    .max(255, '255文字以内で入力して下さい'),
  organization: z
    .string()
    .nonempty('所属は必須です')
    .max(255, '255文字以内で入力して下さい'),
})

// コース更新APIのリクエストのzodスキーマ
// sectionIdsを追加して全プロパティをオプショナルに
export const courseUpdateRequestSchema = courseRequestSchema
  .extend({
    sectionIds: z.array(z.string().nonempty('空のsectionIdがあります')),
  })
  .partial()

// リレーションもまとめて作成する時のzodスキーマ
export const courseWithRelationSchema = courseRequestSchema.extend({
  sections: z.array(sectionWithRelationSchema),
})
