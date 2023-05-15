import { Center, Flex, ScrollArea, Table } from '@mantine/core'
import { Course } from '@prisma/client'
import { NextPage } from 'next'
import Link from 'next/link'
import { X } from 'tabler-icons-react'

import { Layout } from '@/components/Layout'
import {
  CreateCourseButton,
  UpdateCourseButton,
  CourseFormRequest,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
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
              {/* {[...courses!, ...courses!, ...courses!, ...courses!]?.map(  */}
              {courses?.map(course => {
                const courseFormRequest: CourseFormRequest = {
                  name: course.name,
                  level: course.level as 1 | 2 | 3,
                  description: course.description ?? '',
                }
                return (
                  <tr key={course.id} className='break-words'>
                    <td className='min-w-300px max-w-400px'>
                      <Link href={`/courses/${course.id}`}>{course.name}</Link>
                    </td>
                    <td className='min-w-300px max-w-600px'>
                      {course.description}
                    </td>
                    <td className='text-center min-w-120px'>
                      {course.curriculumIds
                        ? course.curriculumIds.split(',').length
                        : 0}
                    </td>
                    <td className='text-center min-w-100px'>{course.level}</td>
                    <td className='text-center min-w-100px'>
                      {String(course.createdAt).slice(0, 10)}
                    </td>
                    <td className='text-center min-w-100px'>
                      {String(course.updatedAt).slice(0, 10)}
                    </td>

                    <td>
                      <UpdateCourseButton
                        onSubmit={v => updateCourse(course.id, v)}
                        initValue={courseFormRequest}
                      />
                    </td>
                    <td>
                      <X
                        size={44}
                        className='cursor-pointer mt-0.5 p-2.5'
                        onClick={() => deleteCourse(course.id)}
                      />
                    </td>
                  </tr>
                )
              })}
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
