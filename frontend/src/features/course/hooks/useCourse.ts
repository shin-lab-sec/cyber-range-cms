import { useCallback } from 'react'
import { postApi, putApi, deleteApi } from '@/utils/api'
import { CourseFormRequest } from '../'
import { useGetApi } from '@/hooks/useApi'
import { Course } from '@prisma/client'

export const useCreateCourse = () => {
  const { data: courses, mutate: mutateCourses } =
    useGetApi<Course[]>('/courses')

  const createCourse = useCallback(
    async (params: CourseFormRequest) => {
      try {
        const newCourse = await postApi<Course>('/courses', params)
        console.log('追加に成功', newCourse)

        if (!courses) return
        // 再度データを取得しキャッシュを更新する
        mutateCourses([...courses, newCourse])
      } catch (e) {
        console.error(e)
      }
    },
    [courses, mutateCourses],
  )

  return { createCourse }
}

export const useUpdateCourse = () => {
  const { data: courses, mutate: mutateCourses } =
    useGetApi<Course[]>('/courses')

  const updateCourse = useCallback(
    async (id: string, params: CourseFormRequest) => {
      try {
        const updatedCourse = await putApi<Course>(`/courses/${id}`, params)
        console.log('更新に成功', updatedCourse)

        if (!courses) return
        // 対象のidだけ更新されたコースに置き換える
        const updatedCourses = courses.map(v =>
          v.id === id ? updatedCourse : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateCourses(updatedCourses)
      } catch (e) {
        console.error(e)
      }
    },
    [courses, mutateCourses],
  )
  return { updateCourse }
}

export const useDeleteCourse = () => {
  const { data: courses, mutate: mutateCourses } =
    useGetApi<Course[]>('/courses')

  const deleteCourse = useCallback(
    async (id: string) => {
      try {
        await deleteApi(`/courses/${id}`)
        console.log('削除に成功')

        if (!courses) return
        // コース一覧から対象のidのコースを除く
        const filteredCourses = courses.filter(v => v.id !== id)
        // 再度データを取得しキャッシュを更新する
        mutateCourses(filteredCourses)
      } catch (e) {
        console.error(e)
      }
    },
    [courses, mutateCourses],
  )

  return { deleteCourse }
}
