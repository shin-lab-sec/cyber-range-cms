import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Course, Curriculum } from '@prisma/client'
import { deleteApi, getApi, postApi, putApi } from '../../utils/api'
import { useGetApi } from '../../hooks/useApi'
import { Button, Code, Flex, List, Select, Text } from '@mantine/core'
import { DraggableCurriculums } from '../../features/curriculum'
import {
  CourseWithCurriculums,
  useAddCurriculumToCourse,
  useRemoveCurriculumFromCourse,
  useUpdateCourseCurriculumOrder,
} from '../../features/course'

type CourseWithCurriculums = Course & { curriculums: Curriculum[] }

const Courses: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data: course } = useGetApi<CourseWithCurriculums>(`/courses/${id}`)
  // セレクトボックス
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('')

  let curriculumIds = useMemo(
    () => course?.curriculumIds?.split(',') || [],
    [course?.curriculumIds],
  )

  // 順番に並び替えたカリキュラム
  const orderedCurriculums = structuredClone(course?.curriculums)
  orderedCurriculums?.sort((a, b) => {
    const indexA = curriculumIds.findIndex(id => id === a.id)
    const indexB = curriculumIds.findIndex(id => id === b.id)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
  // curriculumIdsとカリキュラムを合わせる
  curriculumIds = orderedCurriculums ? orderedCurriculums.map(v => v.id) : []

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

        {orderedCurriculums?.length ? (
          <DraggableCurriculums
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
