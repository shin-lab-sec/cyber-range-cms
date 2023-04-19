import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { CourseList } from '../components/CourseList'
import { CourseItem } from '../components/CourseItem'
import { CurriculumItem } from '../components/CurriculumItem'
import { Relation } from '../components/Relation'
import { Course } from '@prisma/client'
import Link from 'next/link'
import { useGetApi } from '../hooks/useApi'
import { Button, Select, Stack } from '@mantine/core'
import { Layout } from '../components/Layout'

const Home: NextPage = () => {
  const { data: courses } = useGetApi<Course[]>(`/courses`)
  const [selectedCourseId, setselectedCourseId] = useState(
    courses?.[0]?.id || '',
  )

  return (
    <Layout>
      <Stack spacing='xl'>
        <CourseList />

        <Stack>
          <h2 className='text-xl'>コース選択</h2>
          {courses && (
            <Select
              placeholder='コースを選択してください'
              onChange={(e: string) => setselectedCourseId(e)}
              data={courses.map(v => ({ value: v.id, label: v.name }))}
              className='max-w-300px w-300px'
            />
          )}
          {selectedCourseId && <CourseItem id={selectedCourseId} />}
        </Stack>
        <CurriculumItem />
        <Relation />
      </Stack>
    </Layout>
  )
}

export default Home
