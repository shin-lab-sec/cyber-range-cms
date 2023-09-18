import { Article, Course, Quiz, Section, UserAgent } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import {
  apiValidation,
  sectionWithCourseIdAndRelationSchema,
} from '@/libs/validates'

type SectionWithRelationRequest = Partial<Section> & {
  quizzes: { create: Partial<Quiz>[] }
  articles: { create: Partial<Article>[] }
  course: { connect: { id: Course['id'] } }
  userAgent?: {
    connectOrCreate: {
      where: {
        name_author_organization: Pick<
          UserAgent,
          'name' | 'author' | 'organization'
        >
      }
      create: Partial<UserAgent>
    }
  }
}

// 既にUserAgentが存在すればconnect、無ければcreateする
const generateUseragentRequest = (userAgent: UserAgent) => {
  return {
    userAgent: {
      connectOrCreate: {
        where: {
          name_author_organization: {
            name: userAgent.name,
            author: userAgent.author,
            organization: userAgent.organization,
          },
        },
        create: {
          name: userAgent.name,
          gitHubUrl: userAgent.gitHubUrl,
          type: userAgent.type,
          author: userAgent.author,
          organization: userAgent.organization,
        },
      },
    },
  }
}

const generateQuizzesRequest = (quizzes: Quiz[]) => {
  return {
    quizzes: {
      create: quizzes.map(quiz => ({
        question: quiz.question,
        type: quiz.type,
        choices: quiz.choices,
        answers: quiz.answers,
        explanation: quiz.explanation,
      })),
    },
  }
}

const generateArticlesRequest = (articles: Article[]) => {
  return {
    articles: {
      create: articles.map(article => ({
        body: article.body,
      })),
    },
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req

  // api/courses/bulk
  apiValidation(req, res, sectionWithCourseIdAndRelationSchema, async () => {
    const quizzesRequest = generateQuizzesRequest(body.quizzes)
    const articlesRequest = generateArticlesRequest(body.articles)
    let userAgentRequest = {} // {}ならリクエストに含まれない

    // userAgentがある時 既に存在すればconnect、無ければcreateする
    if (body.userAgent) {
      userAgentRequest = generateUseragentRequest(body.userAgent)
    }

    const sectionWithRelationRequest: SectionWithRelationRequest = {
      name: body.name,
      type: body.type,
      scenarioGitHubUrl: body.scenarioGitHubUrl,
      course: { connect: { id: body.courseId } },
      ...quizzesRequest,
      ...articlesRequest,
      ...userAgentRequest,
    }

    const createdSection = await prisma.section.create({
      data: sectionWithRelationRequest as any, // sectionWithRelationRequestに型を付けたかった
      include: {
        userAgent: true,
        articles: { orderBy: { createdAt: 'asc' } },
        quizzes: { orderBy: { createdAt: 'asc' } },
      },
    })
    res.status(200).json({ data: createdSection })
  })
}
