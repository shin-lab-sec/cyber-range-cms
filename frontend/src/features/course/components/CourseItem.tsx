import { Flex } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { X } from 'tabler-icons-react'

import { CourseFormRequest } from './CourseForm'
import { UpdateCourseButton } from './UpdateCourseButton'
import { CourseWithCurriculums } from '../types'

type Props = {
  course: CourseWithCurriculums
  onUpdate: (id: string, v: CourseFormRequest) => void
  onDelete: (id: string) => void
}

export const CourseItem: FC<Props> = ({ course, onUpdate, onDelete }) => {
  const courseFormRequest: CourseFormRequest = {
    name: course.name,
    level: course.level as 1 | 2 | 3,
    description: course.description ?? '',
  }
  console.log(JSON.stringify(course, null, 2))
  return (
    <tr key={course.id} className='break-words'>
      <td className='min-w-300px max-w-400px'>
        <Link href={`/courses/${course.id}`}>{course.name}</Link>
      </td>
      <td className='min-w-300px max-w-600px'>{course.description}</td>
      <td className='text-center'>{course.curriculums.length}</td>
      <td className='text-center'>{course.level}</td>
      <td className='text-center min-w-100px'>
        {String(course.createdAt).slice(0, 10)}
      </td>
      <td className='text-center min-w-100px'>
        {String(course.updatedAt).slice(0, 10)}
      </td>

      <td>
        <Flex align='center'>
          <UpdateCourseButton
            onSubmit={v => onUpdate(course.id, v)}
            initValue={courseFormRequest}
          />
          <X
            size={44}
            className='cursor-pointer mt-0.5 p-2.5'
            onClick={() => onDelete(course.id)}
          />
        </Flex>
      </td>
    </tr>
  )
}
