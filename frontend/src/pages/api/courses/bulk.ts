import { Article, Course, Quiz, Section, UserAgent } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'
import { apiValidation, courseWithRelationSchema } from '@/libs/validates'
import { SectionWithRelation } from '@/types'

type CourseWithRelationRequest = Partial<Course> & {
  sections?: { create: Partial<Section>[] }
}

type SectionWithRelationRequest = Partial<Section> & {
  quizzes: { create: Partial<Quiz>[] }
  articles: { create: Partial<Article>[] }
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

const generateSectionWithRelationRequest = (
  sections: SectionWithRelation[],
) => {
  return sections.map(section => {
    const quizzesRequest = generateQuizzesRequest(section.quizzes)
    const articlesRequest = generateArticlesRequest(section.articles)
    let userAgentRequest = {} // {}ならリクエストに含まれない

    // userAgentがある時 既に存在すればconnect、無ければcreateする
    if (section.userAgent) {
      userAgentRequest = generateUseragentRequest(section.userAgent)
    }

    return {
      name: section.name,
      type: section.type,
      scenarioGitHubUrl: section.scenarioGitHubUrl,
      ...quizzesRequest,
      ...articlesRequest,
      ...userAgentRequest,
    }
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req

  // api/courses/bulk
  apiValidation(req, res, courseWithRelationSchema, async () => {
    let sectionsRequest = {}

    // sectionがある時、sectionも同時に作成する
    if (body.sections.length > 0) {
      const sections = body.sections as SectionWithRelation[] // zodでparseしているのでSection[]でなければthrowする
      const sectionsWithRelationRequest: SectionWithRelationRequest[] =
        generateSectionWithRelationRequest(sections)

      sectionsRequest = { sections: { create: sectionsWithRelationRequest } }
    }

    const courseWithRelationRequest: CourseWithRelationRequest = {
      name: body.name,
      description: body.description,
      level: body.level,
      imageUrl: body.imageUrl,
      author: body.author,
      organization: body.organization,
      sectionIds: body.sectionIds,
      ...sectionsRequest, // {}ならリクエストに含まれない
    }

    const createdCourse = await prisma.course.create({
      data: courseWithRelationRequest as any, // courseWithRelationRequestに型を付けたかった
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
}
