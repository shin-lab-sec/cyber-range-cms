import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Course, Curriculum } from '@prisma/client'
import { deleteApi, getApi, postApi, putApi } from '../../utils/api'
import { useGetApi } from '../../hooks/useApi'
import { Button, Code, Flex, List, Select, Text } from '@mantine/core'
import { DraggableCurriculums } from '../../components/DraggableCurriculums'

type CourseWithCurriculums = Course & { curriculums: Curriculum[] }

const Courses: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data: course } = useGetApi<CourseWithCurriculums>(`/courses/${id}`)
  // セレクトボックス
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)
  const [selectedCurriculumId, setselectedCurriculumId] = useState('')

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

  // 順番を入れ替えるのは、ライブラリ
  const updateCourse = useCallback(
    async (curriculums: Curriculum[]) => {
      const newOrder = curriculums.map(v => v.id).join(',')

      try {
        const res = await putApi(`/courses/${id}`, { curriculumIds: newOrder })
        console.log('更新に成功', res)
      } catch (e) {
        console.error(e)
      }
    },
    [id],
  )

  const addCurriculum = useCallback(async () => {
    if (!selectedCurriculumId) {
      console.log('カリキュラムidが空です', selectedCurriculumId)
      return
    }
    if (curriculumIds.includes(selectedCurriculumId)) {
      console.log('既にそのカリキュラムはコースに含まれています')
      return
    }

    const newOrder = [curriculumIds, selectedCurriculumId].join(',')
    console.log(newOrder)

    try {
      // 中間テーブルに追加
      const res = await postApi(
        `/courses/${id}/curriculums/${selectedCurriculumId}`,
      )
      console.log('中間テーブルに追加', res)

      // curriculumIds更新
      const res1 = await putApi(`/courses/${id}`, { curriculumIds: newOrder })
      console.log('更新に成功', res1)
    } catch (e) {
      console.error(e)
    }
  }, [curriculumIds, id, selectedCurriculumId])

  const removeCurriculum = useCallback(
    async (curriculumId: string) => {
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
          `/courses/${id}/curriculums/${curriculumId}`,
        )
        console.log('中間テーブル削除', res)

        // curriculumIds更新
        const res1 = await putApi(`/courses/${id}`, {
          curriculumIds: newOrder,
        })
        console.log('更新に成功', res1)
      } catch (e) {
        console.error(e)
      }
    },
    [curriculumIds, id],
  )

  if (!course) {
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
            {curriculums && (
              <Select
                placeholder='カリキュラムを選択してください'
                onChange={(e: string) => setselectedCurriculumId(e)}
                data={curriculums.map(v => ({ value: v.id, label: v.name }))}
                className='max-w-300px w-300px'
              />
            )}
            <Button onClick={addCurriculum}>追加</Button>
          </Flex>
        )}

        {orderedCurriculums?.length ? (
          <DraggableCurriculums
            curriculums={orderedCurriculums}
            onUpdateOrder={(curriculums: Curriculum[]) =>
              updateCourse(curriculums)
            }
            onRemove={(id: string) => removeCurriculum(id)}
            className='mx-auto mt-6'
          />
        ) : null}
      </div>
    </Layout>
  )
}

export default Courses
