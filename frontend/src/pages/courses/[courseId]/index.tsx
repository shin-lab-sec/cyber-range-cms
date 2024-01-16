import { Flex } from '@mantine/core'
import { IconMenuOrder } from '@tabler/icons-react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { ImportFileInput } from '@/components/ImportFileInput'
import { Layout } from '@/components/Layout'
import {
  CreateSectionButton,
  DraggableSections,
  useCreateSection,
  useDeleteSection,
  useUpdateCourseSectionOrder,
  useUpdateSection,
  SectionItem,
  useCreateSectionWithRelation,
} from '@/features/section'
import { useGetApi } from '@/hooks/useApi'
import { useBoolean } from '@/hooks/useBoolean'
import { sectionWithRelationSchema } from '@/libs/validates'
import { CourseWithSections } from '@/types'

// courses/[courseId]のページ
const Courses: NextPage = () => {
  const draggableMode = useBoolean(false)

  const searchParams = useSearchParams()
  const id = searchParams.get('courseId') || '' // 一回目のレンダリングで正常なidが取得できる

  // コースのデータを取得
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

  // セクションの作成、更新、削除、順番変更関数
  const { createSection } = useCreateSection(id)
  const { updateSection } = useUpdateSection(id)
  const { deleteSection } = useDeleteSection(id, orderedSectionIds)
  const { updateCourseSectionOrder } = useUpdateCourseSectionOrder(id)
  const { createSectionWithRelation } = useCreateSectionWithRelation(id)

  // コース、idが存在しない時
  if (!course || !id) {
    return (
      <Layout>
        <p className='mt-200px text-center '>このコースは存在しません</p>
      </Layout>
    )
  }

  return (
    <Layout
      breadcrumbItems={[
        { title: 'コース一覧', href: '/courses' },
        { title: `${course.name}のセクション一覧`, href: '' },
      ]}
    >
      <h1>{course.name}のセクション一覧</h1>
      <div>
        {/* 順番変更モードがfalse */}
        {!draggableMode.v && (
          <Flex gap='sm' mt='sm' justify='end' align='center'>
            {orderedSections?.length !== 0 && (
              <Flex
                align='center'
                className='cursor-pointer'
                onClick={draggableMode.setTrue}
              >
                <IconMenuOrder size='1.5rem' />
                順番変更
              </Flex>
            )}
            <ImportFileInput
              createData={createSectionWithRelation}
              validateSchema={sectionWithRelationSchema}
            />
            <CreateSectionButton onSubmit={createSection} />
          </Flex>
        )}

        {/* セクションが存在する */}
        {orderedSections?.length ? (
          <div className='mt-3'>
            {/* 順番変更モードに応じてセクション一覧を表示 */}
            {draggableMode.v ? (
              <DraggableSections
                sections={orderedSections}
                onUpdateOrder={updateCourseSectionOrder}
                onClose={draggableMode.setFalse}
              />
            ) : (
              <Flex gap='sm' direction='column'>
                {orderedSections.map((section, index) => (
                  <SectionItem
                    key={index}
                    courseId={id}
                    section={section}
                    onUpdate={updateSection}
                    onDelete={deleteSection}
                  />
                ))}
              </Flex>
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

export default Courses
