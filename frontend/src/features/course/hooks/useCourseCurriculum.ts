import { useCallback, useMemo } from 'react'
import { postApi, putApi, deleteApi } from '../../../utils/api'
import { Course, Curriculum } from '@prisma/client'
import { useGetApi } from '../../../hooks/useApi'
import { CourseWithCurriculums } from '../'

export const useAddCurriculumToCourse = (
  courseId: string,
  curriculumIds: string[],
) => {
  // mutate　curriculumIds, curriculums
  const { data: course } = useGetApi<CourseWithCurriculums>(
    `/courses/${courseId}`,
  )
  const addCurriculumToCourse = useCallback(
    // async (courseId: string, curriculumId: string, curriculumIds: string[]) => {
    async (curriculumId: string) => {
      if (curriculumIds.includes(curriculumId)) {
        console.log(
          `id ${curriculumId} のカリキュラムは既にコースに含まれています`,
        )
        return
      }

      const newOrder = [curriculumIds, curriculumId].join(',')
      console.log(newOrder)

      try {
        // 中間テーブルに追加
        const res = await postApi(
          `/courses/${courseId}/curriculums/${curriculumId}`,
        )
        console.log('中間テーブルに追加', res)

        // curriculumIds更新
        const res2 = await putApi(`/courses/${courseId}`, {
          curriculumIds: newOrder,
        })
        console.log('更新に成功', res2)
      } catch (e) {
        console.error(e)
      }
    },
    [courseId, curriculumIds],
  )

  return { addCurriculumToCourse }
}

export const useRemoveCurriculumFromCourse = (
  courseId: string,
  curriculumIds: string[],
) => {
  const removeCurriculumFromCourse = useCallback(
    async (curriculumId: string) => {
      if (!curriculumIds.includes(curriculumId)) {
        console.log(`id ${curriculumId} のカリキュラムはコースに存在しません`)
        return
      }

      const newOrder = curriculumIds.filter(id => id !== curriculumId).join(',')
      console.log('splice', newOrder, curriculumIds)

      try {
        // 中間テーブル削除
        const res = await deleteApi(
          `/courses/${courseId}/curriculums/${curriculumId}`,
        )
        console.log('中間テーブル削除', res)

        // curriculumIds更新
        const res1 = await putApi(`/courses/${courseId}`, {
          curriculumIds: newOrder,
        })
        console.log('更新に成功', res1)
      } catch (e) {
        console.error(e)
      }
    },
    [courseId, curriculumIds],
  )
  return { removeCurriculumFromCourse }
}

export const useUpdateCourseCurriculumOrder = (courseId: string) => {
  const updateCourseCurriculumOrder = useCallback(
    async (curriculums: Curriculum[]) => {
      const newOrder = curriculums.map(v => v.id).join(',')

      try {
        const res = await putApi(`/courses/${courseId}`, {
          curriculumIds: newOrder,
        })
        console.log('更新に成功', res)
      } catch (e) {
        console.error(e)
      }
    },
    [courseId],
  )

  return { updateCourseCurriculumOrder }
}
