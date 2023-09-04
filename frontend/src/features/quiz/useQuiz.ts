import { Quiz } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { postApi, putApi, deleteApi } from '@/utils/api'

import { QuizFormRequest } from './types'
import { SectionWithRelation } from '../section'

// sectionのmutate
export const useCreateQuiz = (sectionId: string) => {
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // Quiz作成
  // section更新
  const createQuiz = useCallback(
    async (params: QuizFormRequest) => {
      try {
        console.log('リクエスト', params)
        const newQuiz = await postApi<Quiz>('/quizzes', {
          ...params,
          sectionId,
        })
        console.log('追加に成功', newQuiz)
        if (!section) return

        const newQuizIds = [...section.quizIds, newQuiz.id]

        // sectionIds更新
        const updatedSection = await putApi<SectionWithRelation>(
          `/sections/${sectionId}`,
          {
            ...section,
            quizIds: newQuizIds,
          },
        )
        console.log('QuizIdsの更新に成功', updatedSection)

        // 再度データを取得しキャッシュを更新する
        mutateSection(updatedSection)
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [sectionId, section, mutateSection],
  )

  return { createQuiz }
}

// sectionのmutate
export const useUpdateQuiz = (sectionId: string) => {
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // Quiz更新
  const updateQuiz = useCallback(
    async (quizId: string, params: QuizFormRequest) => {
      console.log({ quizId }, { params })
      try {
        const updatedQuiz = await putApi<Quiz>(`/quizzes/${quizId}`, {
          ...params,
          sectionId,
        })
        console.log('更新に成功', updatedQuiz)

        if (!section) return
        // 対象のidだけ更新されたQuizに置き換える
        const updatedQuizzes = section.quizzes.map(v =>
          v.id === quizId ? updatedQuiz : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateSection({ ...section, quizzes: updatedQuizzes })
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [sectionId, section, mutateSection],
  )
  return { updateQuiz }
}

// sectionのmutate
export const useDeleteQuiz = (sectionId: string) => {
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // Quiz削除
  // sectionを更新
  const deleteQuiz = useCallback(
    async (quizId: string) => {
      try {
        await deleteApi(`/quizzes/${quizId}`)
        console.log('Quiz削除に成功')
        if (!section) return

        const filteredQuizzes = section.quizIds.filter(v => v !== quizId)

        // sectionIds更新
        const updatedSection = await putApi<SectionWithRelation>(
          `/sections/${sectionId}`,
          {
            ...section,
            quizIds: filteredQuizzes,
          },
        )
        console.log('QuizIdsの更新に成功', updatedSection)

        // 再度データを取得しキャッシュを更新する
        mutateSection(updatedSection)
      } catch (e) {
        console.error(e)
      }
    },
    [section, sectionId, mutateSection],
  )

  return { deleteQuiz }
}
