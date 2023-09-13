import { z } from 'zod'

import { quizFormRequestSchema } from './quiz'

import { articleRequestSchema, userAgentRequestSchema } from '.'

// "" | GitHubURL
export const gitHubUrlRegex = new RegExp('^(https://github.com/.+|)$')

// courseIdはcreateに必要だけど、formには要らない
// formのdefaultでcourseIdだけ設定すればOK
const sectionQuizSchema = z.object({
  name: z
    .string()
    .nonempty('セクション名は必須です')
    .max(255, '255文字以内で入力して下さい'),
  type: z.literal('quiz'),
})
const sectionArticleSchema = z.object({
  name: z
    .string()
    .nonempty('セクション名は必須です')
    .max(255, '255文字以内で入力して下さい'),
  type: z.literal('article'),
})
const sectionSandboxSchema = z.object({
  name: z
    .string()
    .nonempty('セクション名は必須です')
    .max(255, '255文字以内で入力して下さい'),
  type: z.literal('sandbox'),
  // 空文字ならnullにしたい
  scenarioGitHubUrl: z
    .string()
    .regex(gitHubUrlRegex, 'GitHubのURLを入力してください'),
  userAgentId: z
    .string({ required_error: 'ユーザーエージェントは必須です' })
    .nonempty('ユーザーエージェントは必須です'),
})

const courseIdSchema = z.string().nonempty('コースが選択されていません')

// APiへのリクエストはsectionRequestSchema
// フォームのリクエストはsectionFormRequestSchema
// カスタムフックでsectionFormRequestSchemaに、courseIdを追加してAPIへリクエストする
export const sectionRequestSchema = z.union([
  sectionQuizSchema.extend({ courseId: courseIdSchema }),
  sectionArticleSchema.extend({ courseId: courseIdSchema }),
  sectionSandboxSchema.extend({ courseId: courseIdSchema }),
])
export const sectionFormRequestSchema = z.union([
  sectionQuizSchema,
  sectionArticleSchema,
  sectionSandboxSchema,
])

// 全てオプショナルにするとこのtypeが機能しなくなる。
// quizIds・articleIdsだけオプショナルにして、quizIdsだけ更新するつもりでもsection全てを渡すようにする
const sectionQuizUpdateSchema = sectionQuizSchema.extend({
  quizIds: z.array(z.string().nonempty('空のquizIdがあります')).optional(),
})
const sectionArticleUpdateSchema = sectionArticleSchema.extend({
  articleIds: z
    .array(z.string().nonempty('空のarticleIdがあります'))
    .optional(),
})
const sectionSandboxUpdateSchema = sectionSandboxSchema.extend({
  articleIds: z
    .array(z.string().nonempty('空のarticleIdがあります'))
    .optional(),
})

export const sectionUpdateRequestSchema = z.union([
  sectionQuizUpdateSchema,
  sectionArticleUpdateSchema,
  sectionSandboxUpdateSchema,
])

// リレーションもまとめて作成する
export const sectionWithRelationSchema = z.union([
  sectionQuizSchema.extend({ quizzes: z.array(quizFormRequestSchema) }),
  sectionArticleSchema.extend({ articles: z.array(articleRequestSchema) }),
  sectionSandboxSchema.extend({
    articles: z.array(articleRequestSchema),
    userAgent: userAgentRequestSchema,
  }),
])
