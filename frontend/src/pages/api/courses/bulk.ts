import type { NextApiRequest, NextApiResponse } from 'next'

import { apiValidation, courseWithRelationSchema } from '@/libs/validates'

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
        res.status(200).json({ data: body })
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
