'use client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Stack, Select } from '@mantine/core'
import { Course } from '@prisma/client'
import { CourseItem } from '../src/components/CourseItem'
import { CourseList } from '../src/components/CourseList'
import { CurriculumItem } from '../src/components/CurriculumItem'
import { Layout } from '../src/components/Layout'
import { Relation } from '../src/components/Relation'
import { useGetApi } from '../src/hooks/useApi'

const Home = () => {
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
