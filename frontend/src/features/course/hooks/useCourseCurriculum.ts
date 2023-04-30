import { useCallback } from 'react'
import { postApi, putApi, deleteApi } from '../../../utils/api'
import { CourseCurriculumRelation, Curriculum } from '@prisma/client'
import { useGetApi } from '../../../hooks/useApi'
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

      // 引数のcurriculumIdを追加したcurriculumIdsを生成
      const newCurriculumIds = [curriculumIds, curriculumId].join(',')

      try {
        // 中間テーブルに追加
        const res = await postApi<CourseCurriculumRelation>(
          `/courses/${courseId}/curriculums/${curriculumId}`,
        )
        if (!res) return // 上の処理が失敗したら、下を実行しない

        console.log('中間テーブルに追加', res)

        // curriculumIds更新
        const updateCourse = await putApi<CourseWithCurriculums>(
          `/courses/${courseId}`,
          {
            curriculumIds: newCurriculumIds,
          },
        )
        console.log('更新に成功', updateCourse)

        courseMutate(updateCourse) // mutate処理
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

      // 引数のcurriculumIdを除いたcurriculumIdsを生成
      const newCurriculumIds = curriculumIds
        .filter(id => id !== curriculumId)
        .join(',')

      try {
        // 中間テーブル削除
        const res = await deleteApi(
          `/courses/${courseId}/curriculums/${curriculumId}`,
        )
        if (!res) return // 上の処理が失敗したら、下を実行しない

        console.log('中間テーブル削除', res)

        // curriculumIds更新
        const updateCourse = await putApi<CourseWithCurriculums>(
          `/courses/${courseId}`,
          {
            curriculumIds: newCurriculumIds,
          },
        )
        console.log('更新に成功', updateCourse)

        courseMutate(updateCourse) // mutate処理
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
        const updateCourse = await putApi<CourseWithCurriculums>(
          `/courses/${courseId}`,
          {
            curriculumIds: newCurriculumIds,
          },
        )
        console.log('更新に成功', updateCourse)

        courseMutate(updateCourse) // mutate処理
      } catch (e) {
        console.error(e)
      }
    },
    [courseId, courseMutate],
  )

  return { updateCourseCurriculumOrder }
}
