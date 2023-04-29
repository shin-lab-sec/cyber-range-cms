import { useCallback } from 'react'
import { postApi, putApi, deleteApi } from '../../utils/api'
import { Curriculum } from '@prisma/client'

// TODO: curriculumIdsは受け取らないでSWRでfetchする
export const useAddCurriculumToCourse = () => {
  const addCurriculumToCourse = useCallback(
    async (courseId: string, curriculumId: string, curriculumIds: string[]) => {
      if (curriculumIds.includes(curriculumId)) {
        console.log('既にそのカリキュラムはコースに含まれています')
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
    [],
  )

  return { addCurriculumToCourse }
}

export const useRemoveCurriculumFromCourse = () => {
  const removeCurriculumFromCourse = useCallback(
    async (courseId: string, curriculumId: string, curriculumIds: string[]) => {
      if (!curriculumId) {
        console.log('カリキュラムidが空です', curriculumId)
        return
      }

      // spliceでやる。もう少し増やす
      const newOrder = curriculumIds.filter(id => id !== curriculumId).join(',')
      console.log('splice', newOrder, curriculumId)

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
    [],
  )
  return { removeCurriculumFromCourse }
}

export const useUpdateCourseCurriculumOrder = () => {
  const updateCourseCurriculumOrder = useCallback(
    async (id: string, curriculums: Curriculum[]) => {
      const newOrder = curriculums.map(v => v.id).join(',')

      try {
        const res = await putApi(`/courses/${id}`, { curriculumIds: newOrder })
        console.log('更新に成功', res)
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  return { updateCourseCurriculumOrder }
}
