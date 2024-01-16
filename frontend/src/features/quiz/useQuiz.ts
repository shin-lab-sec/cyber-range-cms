import { Quiz } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { SectionWithRelation } from '@/types'
import { postApi, putApi, deleteApi } from '@/utils/api'

import { QuizFormRequest } from './types'

// クイズ作成フック
export const useCreateQuiz = (sectionId: string) => {
  // セクションと、キャッシュ更新関数
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // クイズ作成関数
  const createQuiz = useCallback(
    async (params: QuizFormRequest) => {
      try {
        // クイズ作成
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
        // エラー処理
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

// クイズ更新フック
export const useUpdateQuiz = (sectionId: string) => {
  // セクションと、キャッシュ更新関数
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // Quiz更新関数
  const updateQuiz = useCallback(
    async (quizId: string, params: QuizFormRequest) => {
      console.log({ quizId }, { params })
      try {
        // Quiz更新
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
        // エラー処理
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

// クイズ削除フック
export const useDeleteQuiz = (sectionId: string) => {
  // セクションと、キャッシュ更新関数
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // Quiz削除
  // sectionを更新
  const deleteQuiz = useCallback(
    async (quizId: string) => {
      try {
        // Quiz削除
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
