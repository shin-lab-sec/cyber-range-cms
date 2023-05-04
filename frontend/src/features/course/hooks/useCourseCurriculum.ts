import { CourseCurriculumRelation, Curriculum } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { postApi, putApi, deleteApi } from '@/utils/api'

import { CourseWithCurriculums } from '../'

export const useAddCurriculumToCourse = (
  courseId: string,
  curriculumIds: string[],
) => {
  const { mutate: courseMutate } = useGetApi<CourseWithCurriculums>(
    `/courses/${courseId}`,
  )

  const addCurriculumToCourse = useCallback(
    async (curriculumId: string) => {
      if (curriculumIds.includes(curriculumId)) {
        console.log(
          `id ${curriculumId} のカリキュラムは既にコースに含まれています`,
        )
        return
      }

      try {
        // 中間テーブルに追加
        const res = await postApi<CourseCurriculumRelation>(
          `/courses/${courseId}/curriculums/${curriculumId}`,
        )
        console.log('中間テーブルに追加', res)

        // 引数のcurriculumIdを追加したcurriculumIdsを生成
        const newCurriculumIds = [curriculumIds, curriculumId].join(',')
        // curriculumIds更新
        const updatedCourse = await putApi<CourseWithCurriculums>(
          `/courses/${courseId}`,
          {
            curriculumIds: newCurriculumIds,
          },
        )
        console.log('更新に成功', updatedCourse)

        // 再度データを取得しキャッシュを更新する
        courseMutate(updatedCourse)
      } catch (e) {
        console.error(e)
      }
    },
    [courseId, courseMutate, curriculumIds],
  )

  return { addCurriculumToCourse }
}

export const useRemoveCurriculumFromCourse = (
  courseId: string,
  curriculumIds: string[],
) => {
  const { mutate: courseMutate } = useGetApi<CourseWithCurriculums>(
    `/courses/${courseId}`,
  )

  const removeCurriculumFromCourse = useCallback(
    async (curriculumId: string) => {
      if (!curriculumIds.includes(curriculumId)) {
        console.log(`id ${curriculumId} のカリキュラムはコースに存在しません`)
        return
      }

      try {
        // 中間テーブル削除
        await deleteApi(`/courses/${courseId}/curriculums/${curriculumId}`)
        console.log('中間テーブル削除')

        // 引数のcurriculumIdを除いたcurriculumIdsを生成
        const filteredCurriculumIds = curriculumIds
          .filter(id => id !== curriculumId)
          .join(',')
        // curriculumIds更新
        const updatedCourse = await putApi<CourseWithCurriculums>(
          `/courses/${courseId}`,
          {
            curriculumIds: filteredCurriculumIds,
          },
        )
        console.log('更新に成功', updatedCourse)

        // 再度データを取得しキャッシュを更新する
        courseMutate(updatedCourse)
      } catch (e) {
        console.error(e)
      }
    },
    [courseId, courseMutate, curriculumIds],
  )
  return { removeCurriculumFromCourse }
}

export const useUpdateCourseCurriculumOrder = (courseId: string) => {
  const { mutate: courseMutate } = useGetApi<CourseWithCurriculums>(
    `/courses/${courseId}`,
  )

  const updateCourseCurriculumOrder = useCallback(
    async (curriculums: Curriculum[]) => {
      // 引数のcurriculumsからcurriculumIdsを生成
      const newCurriculumIds = curriculums.map(v => v.id).join(',')

      try {
        // curriculumIds更新
        const updatedCourse = await putApi<CourseWithCurriculums>(
          `/courses/${courseId}`,
          {
            curriculumIds: newCurriculumIds,
          },
        )
        console.log('更新に成功', updatedCourse)

        // 再度データを取得しキャッシュを更新する
        courseMutate(updatedCourse)
      } catch (e) {
        console.error(e)
      }
    },
    [courseId, courseMutate],
  )

  return { updateCourseCurriculumOrder }
}
