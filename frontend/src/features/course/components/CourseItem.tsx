import { Course } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import { X } from 'tabler-icons-react'

import { CourseFormRequest } from './CourseForm'
import { UpdateCourseButton } from './UpdateCourseButton'

type Props = {
  course: Course
  onUpdate: (id: string, v: CourseFormRequest) => void
  onDelete: (id: string) => void
}

export const CourseItem: FC<Props> = ({ course, onUpdate, onDelete }) => {
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
      <td className='min-w-300px max-w-600px'>{course.description}</td>
      <td className='text-center min-w-120px'>
        {course.curriculumIds ? course.curriculumIds.split(',').length : 0}
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
          onSubmit={v => onUpdate(course.id, v)}
          initValue={courseFormRequest}
        />
      </td>
      <td>
        <X
          size={44}
          className='cursor-pointer mt-0.5 p-2.5'
          onClick={() => onDelete(course.id)}
        />
      </td>
    </tr>
  )
}
