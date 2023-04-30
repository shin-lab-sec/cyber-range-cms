import { useCallback } from 'react'
import { postApi, putApi, deleteApi } from '../../../utils/api'
import { CourseFormRequest } from '../'
import { useGetApi } from '../../../hooks/useApi'
import { Course } from '@prisma/client'

export const useCreateCourse = () => {
  const { data: courses, mutate: mutateCourses } =
    useGetApi<Course[]>('/courses')

  const createCourse = useCallback(
    async (params: CourseFormRequest) => {
      try {
        const res = await postApi<Course>('/courses', params)
        console.log('追加に成功', res)

        if (!courses || !res) return
        mutateCourses([...courses, res], false)
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
        const res = await putApi<Course>(`/courses/${id}`, params)
        console.log('更新に成功', res)

        if (!courses || !res) return
        const newCourses = courses.map(v => (v.id === id ? res : v))
        mutateCourses(newCourses, false)
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
        const res = await deleteApi(`/courses/${id}`)
        console.log('削除に成功', res)

        if (!courses) return
        const newCourses = courses.filter(v => v.id !== id)
        mutateCourses(newCourses, false)
      } catch (e) {
        console.error(e)
      }
    },
    [courses, mutateCourses],
  )

  return { deleteCourse }
}
