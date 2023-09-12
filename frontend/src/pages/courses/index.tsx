import { Flex } from '@mantine/core'
import { Course } from '@prisma/client'
import { NextPage } from 'next'

import { Layout } from '@/components/Layout'
import {
  CreateCourseButton,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  CourseTable,
} from '@/features/course'
import { useGetApi } from '@/hooks/useApi'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<Course[]>(`/courses`)

  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>コース一覧</h1>
        <CreateCourseButton onSubmit={createCourse} />
      </Flex>

      {courses?.length ? (
        <div className='mt-8'>
          <CourseTable
            courses={courses}
            updateCourse={updateCourse}
            deleteCourse={deleteCourse}
          />
        </div>
      ) : (
        <p className='mx-auto mt-200px max-w-400px'>
          まだコースが作成されていません。
          <br />
          右上の「新規コース作成」ボタンから作成して下さい。
        </p>
      )}
    </Layout>
  )
}

export default Courses
