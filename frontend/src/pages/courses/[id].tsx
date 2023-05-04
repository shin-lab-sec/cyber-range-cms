import { Button, Flex, Select } from '@mantine/core'
import { Curriculum } from '@prisma/client'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { Layout } from '@/components/Layout'
import {
  CourseWithCurriculums,
  useAddCurriculumToCourse,
  useRemoveCurriculumFromCourse,
  useUpdateCourseCurriculumOrder,
} from '@/features/course'
// import { CourseWithCurriculums } from '@/features/course/components/CourseForm'
import { DraggableCurriculums } from '@/features/curriculum'
import { useGetApi } from '@/hooks/useApi'

const Courses: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || '' // 一回目のレンダリングで正常なidが取得できる
  const { data: course } = useGetApi<CourseWithCurriculums>(`/courses/${id}`)

  // セレクトボックス
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('')

  const curriculumIds = useMemo(
    () => course?.curriculumIds?.split(',') || [],
    [course?.curriculumIds],
  )

  // 順番に並び替えたカリキュラム
  // curriculumIdsで順番に見つかったid順にソート。見つからなかったら後ろに回す
  const orderedCurriculums = useMemo(() => {
    return structuredClone(course?.curriculums)?.sort((a, b) => {
      const indexA = curriculumIds.findIndex(id => id === a.id)
      const indexB = curriculumIds.findIndex(id => id === b.id)
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
  }, [course?.curriculums, curriculumIds])

  // orderedCurriculumsを元にcurriculumIdsを生成
  // curriculumIdsが破損している可能性があるため
  const orderedCurriculumIds = orderedCurriculums
    ? orderedCurriculums.map(v => v.id)
    : []

  const { addCurriculumToCourse } = useAddCurriculumToCourse(
    id,
    orderedCurriculumIds,
  )
  const { removeCurriculumFromCourse } = useRemoveCurriculumFromCourse(
    id,
    orderedCurriculumIds,
  )
  const { updateCourseCurriculumOrder } = useUpdateCourseCurriculumOrder(id)

  if (!course || !id) {
    return (
      <Layout>
        <div>このコースは存在しません</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>{course.name}</h1>
      <div>
        {curriculums && (
          <Flex gap='sm' mt='sm' justify='end'>
            <Select
              placeholder='カリキュラムを選択してください'
              onChange={(e: string) => setSelectedCurriculumId(e)}
              data={curriculums.map(v => ({ value: v.id, label: v.name }))}
              className='max-w-300px w-300px'
            />
            <Button onClick={() => addCurriculumToCourse(selectedCurriculumId)}>
              追加
            </Button>
          </Flex>
        )}

        {/* <Code block>{JSON.stringify(course.curriculumIds)}</Code> */}

        {orderedCurriculums?.length ? (
          <DraggableCurriculums
            key={orderedCurriculumIds.join('')}
            curriculums={orderedCurriculums}
            onUpdateOrder={(curriculums: Curriculum[]) =>
              updateCourseCurriculumOrder(curriculums)
            }
            onRemove={(curriculumId: string) =>
              removeCurriculumFromCourse(curriculumId)
            }
            className='mx-auto mt-6'
          />
        ) : null}
      </div>
    </Layout>
  )
}

export default Courses
