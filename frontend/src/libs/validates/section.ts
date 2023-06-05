import { z } from 'zod'

// "" | GitHubURL
const gitHubUrlRegex = new RegExp('^(https://github.com/.+)|$')

const quizSchema = z.object({
  name: z
    .string()
    .nonempty('セクション名は必須です')
    .max(255, '255文字以内で入力して下さい'),
  type: z.literal('quiz'),
})
const articleSchema = z.object({
  name: z
    .string()
    .nonempty('セクション名は必須です')
    .max(255, '255文字以内で入力して下さい'),
  type: z.literal('article'),
})
const sandboxSchema = z.object({
  name: z
    .string()
    .nonempty('セクション名は必須です')
    .max(255, '255文字以内で入力して下さい'),
  type: z.literal('sandbox'),
  scenarioGitHubUrl: z
    .string()
    .regex(gitHubUrlRegex, 'GitHubのURLを入力してください'),
  userAgentId: z.string().nonempty('ユーザーエージェントは必須です'),
})
export const sectionSchema = z.union([quizSchema, articleSchema, sandboxSchema])

// それぞれのスキーマをextendsして、ユニオンでsectionUpdateSchemaにする
const quizUpdateSchema = quizSchema
  .extend({
    quizIds: z.array(z.string().nonempty('空のquizIdがあります')),
  })
  .partial()
const articleUpdateSchema = articleSchema
  .extend({
    articleIds: z.array(z.string().nonempty('空のarticleIdがあります')),
  })
  .partial()
const sandboxUpdateSchema = sandboxSchema.extend({}).partial()

export const sectionUpdateSchema = z.union([
  quizUpdateSchema,
  articleUpdateSchema,
  sandboxUpdateSchema,
])
