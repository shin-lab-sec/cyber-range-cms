import { Section } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { deleteApi, postApi, putApi } from '@/utils/api'

import { SectionFormRequest } from './components/SectionForm'
import { SectionWithRelation } from './types'
import { CourseWithSections } from '../course'

// 作成
// Section作成、CourseにsectionId追加（更新）
// mutateはcourse/[corseId]だけする
export const useCreateSection = (courseId: string) => {
  const { data: course, mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

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

// 更新
// Section更新、Course順番更新
// mutateは courses/:id
export const useUpdateSection = (courseId: string) => {
  const { data: course, mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

  const updateSection = useCallback(
    async (sectionId: string, params: SectionFormRequest) => {
      console.log('リクエスト', sectionId, params)
      try {
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

// 削除
// Section削除、Course sectionIdを削除(更新)
export const useDeleteSection = (courseId: string, sectionIds: string[]) => {
  const { mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

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

export const useUpdateCourseSectionOrder = (courseId: string) => {
  const { mutate: mutateCourse } = useGetApi<CourseWithSections>(
    `/courses/${courseId}`,
  )

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
