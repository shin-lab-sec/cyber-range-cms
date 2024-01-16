import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { CourseWithSections } from '@/types'
import { postApi, putApi, deleteApi } from '@/utils/api'

import { CourseRequest } from './types'

// コース作成のフック
export const useCreateCourse = () => {
  // コース一覧、キャッシュ更新関数
  const { data: courses, mutate: mutateCourses } =
    useGetApi<CourseWithSections[]>('/courses')

  // コース作成関数
  const createCourse = useCallback(
    async (params: CourseRequest) => {
      try {
        // コース作成
        const newCourse = await postApi<CourseWithSections>('/courses', params)
        console.log('追加に成功', newCourse)

        if (!courses) return
        // 再度データを取得しキャッシュを更新する
        mutateCourses([...courses, newCourse])
      } catch (e) {
        // エラー処理
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [courses, mutateCourses],
  )

  return { createCourse }
}

// コース更新のフック
// TODO: courses/[id]のmutateやる？
export const useUpdateCourse = () => {
  // コース一覧、キャッシュ更新関数
  const { data: courses, mutate: mutateCourses } =
    useGetApi<CourseWithSections[]>('/courses')

  // コース更新関数
  const updateCourse = useCallback(
    async (id: string, params: CourseRequest) => {
      try {
        // コース更新
        const updatedCourse = await putApi<CourseWithSections>(
          `/courses/${id}`,
          params,
        )
        console.log('更新に成功', updatedCourse)

        if (!courses) return
        // 対象のidだけ更新されたコースに置き換える
        const updatedCourses = courses.map(v =>
          v.id === id ? updatedCourse : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateCourses(updatedCourses)
      } catch (e) {
        // エラー処理
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [courses, mutateCourses],
  )
  return { updateCourse }
}

// コース削除のフック
export const useDeleteCourse = () => {
  const { data: courses, mutate: mutateCourses } =
    useGetApi<CourseWithSections[]>('/courses')

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

// コースとコースに紐づくデータを同時に作成するフック
export const useCreateCourseWithRelation = () => {
  // コース一覧、キャッシュ更新関数
  const { data: courses, mutate: mutateCourses } =
    useGetApi<CourseWithSections[]>('/courses')

  // コース作成関数
  const createWithRelationCourse = useCallback(
    async (params: CourseWithSections) => {
      try {
        // コース、関連データをまとめて作成
        const newCourse = await postApi<CourseWithSections>(
          '/courses/bulk',
          params,
        )
        console.log('追加に成功', newCourse)

        if (!courses) return
        // 再度データを取得しキャッシュを更新する
        mutateCourses([...courses, newCourse])
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          throw `コースの作成に失敗しました。\n以下のような原因が考えられます。内容を確認し再度お試しください。\n
- コースの名前(name)・制作者(author)・所属(organization)の組み合わせが既に存在する。
\n 以下はエラー内容です${e.message}`
        }
        throw JSON.stringify(e)
      }
    },
    [courses, mutateCourses],
  )

  return { createWithRelationCourse }
}
