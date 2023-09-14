import { Article, Course, Quiz, Section } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, courseWithRelationSchema } from '@/libs/validates'
import { SectionWithRelation } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // api/courses
  switch (method) {
    case 'POST':
      // OK bodyが返ってくる
      // res.status(200).json({ data: body })
      // return

      // OK zod.parse通る
      // apiValidation(req, res, courseRequestSchema, async () => {
      //   res.status(200).json({ data: body })
      // })
      // return

      // OK sections: []のJSONで試す
      // sectionのQuiz入れて試す

      apiValidation(req, res, courseWithRelationSchema, async () => {
        const courseWithRelationRequest: Partial<Course> & {
          sections?: { create: Partial<Section>[] }
        } = {
          name: body.name,
          description: body.description,
          level: body.level,
          imageUrl: body.imageUrl,
          author: body.author,
          organization: body.organization,
          sectionIds: body.sectionIds,
        }

        // sectionsがある
        if (body.sections.length > 0) {
          const sections = body.sections as SectionWithRelation[] // zodでparseしているのでSection[]でなければthrowする

          const sectionRequests: (Partial<Section> & {
            quizzes: { create: Partial<Quiz>[] }
            articles: { create: Partial<Article>[] }
          })[] = sections.map(section => ({
            name: section.name,
            type: section.type,
            scenarioGitHubUrl: section.scenarioGitHubUrl,
            // TODO: userAgent: それぞれfindしてあれば、connect、無ければcreate?
            // upsertはどうでしょうか？？
            quizzes: {
              create: section.quizzes.map(quiz => ({
                question: quiz.question,
                type: quiz.type,
                choices: quiz.choices,
                answers: quiz.answers,
                explanation: quiz.explanation,
              })),
            },
            articles: {
              create: section.articles.map(article => ({
                body: article.body,
              })),
            },
          }))

          courseWithRelationRequest.sections = { create: sectionRequests }
        }

        const createdCourse = await prisma.course.create({
          data: courseWithRelationRequest,
          include: {
            sections: {
              include: {
                userAgent: true,
                articles: { orderBy: { createdAt: 'asc' } },
                quizzes: { orderBy: { createdAt: 'asc' } },
              },
            },
          },
        })
        res.status(200).json({ data: createdCourse })
      })
      break

    default:
      break
  }
}

// try {
// const ress = await prisma.course.create({
//   data: {
//     name: '沢山作るコース',
//     description: '沢山作るコース',
//     level: 1,
//     imageUrl: 'http://沢山作るコース',
//     author: '沢山作るコース',
//     organization: '沢山作るコース',
//     sections: {
//       create: [
//         {
//           name: 'quizだよん',
//           type: 'quiz',
//           quizzes: {
//             create: [
//               {
//                 question: '問題1',
//                 type: 'radio',
//                 choices: ['選択肢1', '選択肢2', '選択肢3'],
//                 answers: ['選択肢2'],
//                 explanation: '解説',
//               },
//             ],
//           },
//         },
//         {
//           name: 'articleだよん',
//           type: 'article',
//           articles: {
//             create: [{ body: '## anpan' }],
//           },
//         },
//         {
//           name: 'sandboxだよん',
//           type: 'sandbox',
//           // TODO: userAgentの作成で、同じの沢山出来て失敗しそう
//           // 事前にname, organization, authorで検索してあれば、connectにする？
//           // それか、名前に乱数追加して被らないようにする
//           userAgent: {
//             create: {
//               name: 'ユーザーエージェントだよん',
//               author: 'わし',
//               organization: 'わし',
//               type: 'わし',
//               gitHubUrl:
//                 'https://github.com/shin-lab-sec/cypas-cms/pull/84/files',
//             },
//           },
//         },
//       ],
//     },
//   },
// })
// res.status(200).json({ data: ress })
// } catch (err) {
//   if (err instanceof Error) {
//     res.status(400).json({ message: err.message })
//     return
//   }

//   res
//     .status(400)
//     .json({ message: `Invalid request: ${JSON.stringify(err)}` })
// }
// res.status(405).end()
