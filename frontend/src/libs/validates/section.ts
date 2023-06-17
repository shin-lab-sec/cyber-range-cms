import { z } from 'zod'

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
  userAgentId: z.string({ required_error: 'ユーザーエージェントは必須です' }), //.nonempty('ユーザーエージェントは必須です'),
})

const courseIdSchema = z.string().nonempty('コースが選択されていません')

export const sectionSchema = z.union([
  sectionQuizSchema.extend({ courseId: courseIdSchema }),
  sectionArticleSchema.extend({ courseId: courseIdSchema }),
  sectionSandboxSchema.extend({ courseId: courseIdSchema }),
])
export const sectionFormRequestSchema = z.union([
  sectionQuizSchema,
  sectionArticleSchema,
  sectionSandboxSchema,
])

// オプショナルにするとこのtypeが機能しなくなる。 quizIds: [] でも通るなら行けそう
// sectionQれぞれのスキーマをextendsして、ユニオンでsectionUpdateSchemaにする
const sectionQuizUpdateSchema = sectionQuizSchema
  .extend({
    quizIds: z.array(z.string().nonempty('空のquizIdがあります')),
  })
  .partial()
const sectionArticleUpdateSchema = sectionArticleSchema
  .extend({
    articleIds: z.array(z.string().nonempty('空のarticleIdがあります')),
  })
  .partial()
const sectionSandboxUpdateSchema = sectionArticleUpdateSchema

export const sectionUpdateSchema = z.union([
  sectionQuizUpdateSchema,
  sectionArticleUpdateSchema,
  sectionSandboxUpdateSchema,
])
