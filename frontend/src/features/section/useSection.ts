import { Section } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { CourseWithSections, SectionWithRelation } from '@/types'
import { deleteApi, postApi, putApi } from '@/utils/api'

import { SectionFormRequest } from './types'

// セクション作成フック
export const useCreateSection = (courseId: string) => {
  // コース、キャッシュ更新関数
  const { data: course, mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

  // セクション作成関数
  const createSection = useCallback(
    async (params: SectionFormRequest) => {
      // const courseId = params.courseId
      try {
        // Sectionを作成
        const res = await postApi<Section>(`/sections`, {
          ...params,
          courseId,
        })
        console.log('セクションを作成', res)

        if (!course) return
        // 引数のsectionIdを追加したsectionIdsを生成
        const newSectionIds = [...course.sectionIds, res.id]

        // sectionIds更新
        const updatedCourse = await putApi<CourseWithSections>(
          `/courses/${courseId}`,
          {
            sectionIds: newSectionIds,
          },
        )
        console.log('sectionIdsの更新に成功', updatedCourse)

        // 再度データを取得しキャッシュを更新する
        mutateCourse(updatedCourse)
      } catch (e) {
        // エラー処理
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [course, courseId, mutateCourse],
  )

  return { createSection }
}

// セクション更新フック
export const useUpdateSection = (courseId: string) => {
  // コース、キャッシュ更新関数
  const { data: course, mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

  // セクション更新関数
  const updateSection = useCallback(
    async (sectionId: string, params: SectionFormRequest) => {
      try {
        // Sectionを更新
        const updatedSection = await putApi<SectionWithRelation>(
          `/sections/${sectionId}`,
          {
            ...params,
            courseId,
          },
        )
        console.log('更新に成功', updatedSection)

        if (!course) return
        // 対象のsectionIdだけ更新されたセクションに置き換える
        const updatedSections = course.sections.map(v =>
          v.id === sectionId ? updatedSection : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateCourse({ ...course, sections: updatedSections }, false)
      } catch (e) {
        // エラー処理
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [course, courseId, mutateCourse],
  )
  return { updateSection }
}

// セクション削除フック
export const useDeleteSection = (courseId: string, sectionIds: string[]) => {
  // キャッシュ更新関数
  const { mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

  // セクション削除関数
  const deleteSection = useCallback(
    async (sectionId: string) => {
      try {
        // 引数のsectionIdを除いたsectionIdsを生成
        const filteredSectionIds = sectionIds.filter(id => id !== sectionId)

        // Sectionを削除
        await deleteApi(`/sections/${sectionId}`)
        console.log('削除に成功')

        // sectionIds更新
        const updatedCourse = await putApi<CourseWithSections>(
          `/courses/${courseId}`,
          {
            sectionIds: filteredSectionIds,
          },
        )
        console.log('更新に成功', updatedCourse)

        // 再度データを取得しキャッシュを更新する
        mutateCourse(updatedCourse)
      } catch (e) {
        console.error(e)
      }
    },
    [sectionIds, courseId, mutateCourse],
  )
  return { deleteSection }
}

// セクション順序更新フック
export const useUpdateCourseSectionOrder = (courseId: string) => {
  // キャッシュ更新関数
  const { mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

  // セクション順序更新関数
  const updateCourseSectionOrder = useCallback(
    async (sections: Section[]) => {
      // 引数のsectionsからsectionIdsを取得
      const newSectionIds = sections.map(v => v.id)

      try {
        // sectionIds更新
        const updatedCourse = await putApi<CourseWithSections>(
          `/courses/${courseId}`,
          {
            sectionIds: newSectionIds,
          },
        )
        console.log('更新に成功', updatedCourse)

        // 再度データを取得しキャッシュを更新する
        mutateCourse(updatedCourse)
      } catch (e) {
        console.error(e)
      }
    },
    [courseId, mutateCourse],
  )

  return { updateCourseSectionOrder }
}

// セクションと、セクションに紐づくデータを同時に作成するフック
export const useCreateSectionWithRelation = (courseId: string) => {
  // コース、キャッシュ更新関数
  const { data: course, mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

  // セクション、紐づくデータの作成関数
  const createSectionWithRelation = useCallback(
    async (params: SectionWithRelation) => {
      try {
        // Sectionを作成
        const createdSection = await postApi<SectionWithRelation>(
          '/sections/bulk',
          { ...params, courseId },
        )
        console.log('sectionの作成に成功: ', createdSection)

        if (!course) return
        // 引数のsectionIdを追加したsectionIdsを生成
        const newSectionIds = [...course.sectionIds, createdSection.id]

        // sectionIds更新
        const updatedCourse = await putApi<CourseWithSections>(
          `/courses/${courseId}`,
          {
            sectionIds: newSectionIds,
          },
        )
        console.log('sectionIdsの更新に成功', updatedCourse)

        // 再度データを取得しキャッシュを更新する
        mutateCourse(updatedCourse)
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          throw `セクションの作成に失敗しました。\n以下のような原因が考えられます。内容を確認し再度お試しください。\n
- 既に同じ名前(name)のセクションが存在する。
\n 以下はエラー内容です${e.message}`
        }
        throw JSON.stringify(e)
      }
    },
    [course, courseId, mutateCourse],
  )

  return { createSectionWithRelation }
}
