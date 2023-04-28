import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { Course } from '@prisma/client'
import { useGetApi } from '../../hooks/useApi'
import { Flex } from '@mantine/core'
import Link from 'next/link'
import { X } from 'tabler-icons-react'
import {
  CreateCourseButton,
  UpdateCourseButton,
  CourseFormRequest,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from '../../features/course'

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

      <ul className='mt-3'>
        {courses?.map(course => {
          const courseFormRequest: CourseFormRequest = {
            name: course.name,
            level: course.level as 1 | 2 | 3,
            description: course.description ?? '',
          }
          return (
            <li
              key={course.id}
              className='rounded-md flex border-2 shadow-md mb-3 py-4 px-4 items-center justify-between'
            >
              <Link href={`/courses/${course.id}`}>{course.name}</Link>
              <Flex align='center'>
                <UpdateCourseButton
                  onSubmit={v => updateCourse(course.id, v)}
                  initValue={courseFormRequest}
                />
                <X
                  size={44}
                  className='cursor-pointer mt-0.5 p-2.5'
                  onClick={() => deleteCourse(course.id)}
                />
              </Flex>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Courses
