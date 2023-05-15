import { Center, Flex, ScrollArea, Table } from '@mantine/core'
import { Course } from '@prisma/client'
import { NextPage } from 'next'

import { Layout } from '@/components/Layout'
import {
  CreateCourseButton,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  CourseItem,
} from '@/features/course'
import { useGetApi } from '@/hooks/useApi'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<Course[]>(`/courses`)

  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()

  return (
    <Layout>
      <h1>コース一覧ページ</h1>

      <Flex gap='sm' justify='end'>
        <CreateCourseButton onSubmit={createCourse} />
      </Flex>

      {courses?.length ? (
        <ScrollArea mt='xl'>
          <Table striped highlightOnHover withColumnBorders>
            <thead>
              <tr>
                <th>名前</th>
                <th>詳細</th>
                <th>
                  <Center>カリキュラム数</Center>
                </th>
                <th>
                  <Center>難易度</Center>
                </th>
                <th>
                  <Center>作成日</Center>
                </th>
                <th>
                  <Center>最終更新日</Center>
                </th>
              </tr>
            </thead>
            <tbody>
              {courses?.map(course => (
                <CourseItem
                  key={course.id}
                  course={course}
                  onUpdate={updateCourse}
                  onDelete={deleteCourse}
                />
              ))}
            </tbody>
          </Table>
        </ScrollArea>
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
