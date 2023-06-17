import { Flex } from '@mantine/core'
import { Section } from '@prisma/client'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { Layout } from '@/components/Layout'
import { CourseWithSections } from '@/features/course'
import {
  CreateSectionButton,
  DraggableSections,
  SectionFormRequest,
  useCreateSection,
  useDeleteSection,
  useUpdateCourseSectionOrder,
  useUpdateSection,
} from '@/features/section'
import { useGetApi } from '@/hooks/useApi'

const Courses: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || '' // 一回目のレンダリングで正常なidが取得できる
  const { data: course } = useGetApi<CourseWithSections>(`/courses/${id}`)

  const sectionIds = useMemo(
    () => course?.sectionIds ?? [],
    [course?.sectionIds],
  )

  // 順番に並び替えたセクション
  // sectionIdsで順番に見つかったid順にソート。見つからなかったら後ろに回す
  const orderedSections = useMemo(() => {
    return structuredClone(course?.sections)?.sort((a, b) => {
      const indexA = sectionIds.findIndex(id => id === a.id)
      const indexB = sectionIds.findIndex(id => id === b.id)
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
  }, [course?.sections, sectionIds])

  // orderedSectionsを元にsectionIdsを生成
  // sectionIdsが破損している可能性があるため
  const orderedSectionIds = orderedSections
    ? orderedSections.map(v => v.id)
    : []

  const { createSection } = useCreateSection(id)
  const { updateSection } = useUpdateSection(id)
  const { deleteSection } = useDeleteSection(id, orderedSectionIds)

  const { updateCourseSectionOrder } = useUpdateCourseSectionOrder(id)

  if (!course || !id) {
    return (
      <Layout>
        <p className='mt-200px text-center '>このコースは存在しません</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>{course.name}</h1>
      <div>
        <Flex gap='sm' mt='sm' justify='end'>
          <CreateSectionButton onSubmit={createSection} />
        </Flex>

        {orderedSections?.length ? (
          <DraggableSections
            // key={orderedSectionIds.join('')}
            key={JSON.stringify(orderedSections)}
            sections={orderedSections}
            onUpdateOrder={(sections: Section[]) =>
              updateCourseSectionOrder(sections)
            }
            onUpdate={(id: string, v: SectionFormRequest) =>
              updateSection(id, v)
            }
            onRemove={(sectionId: string) => deleteSection(sectionId)}
            className='mx-auto mt-6'
          />
        ) : null}
      </div>
    </Layout>
  )
}

export default Courses
