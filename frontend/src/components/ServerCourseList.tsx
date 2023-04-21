import { FC, useCallback, useEffect, useState } from 'react'
import { Course } from '@prisma/client'
import { getApi } from '../utilis/api'
import { getUsers } from '../utilis/sample'
import { useGetApi } from '../hooks/useApi'
// import { deleteApi, getApi, postApi, putApi } from '../utilis/api'
// import { useGetApi } from '../hooks/useApi'
// import { Button, Flex, List, Select, TextInput } from '@mantine/core'

export const ServerCourseList = async () => {
  // const courses = await getApi<Course[]>(`/courses`)
  // const courses: { id: string; name: string }[] = await getUsers()
  // const { data: courses } = useGetApi<Course[]>(`/courses`)

  // await new Promise(resolve => setTimeout(resolve, 5000))
  // const res = await fetch('http://localhost:3000/api/courses')

  const getUsers = async () => {
    const res = await fetch('/api/courses')
    if (!res.ok) throw new Error('Something went wrong')
    const users = await res.json()
    return users.data
  }
  // const courses: Course[] = await getUsers()
  const courses: Course[] = await getApi('/courses')
  console.log('courses!: ', courses)

  return (
    <div>
      {JSON.stringify(courses)}
      <h2 className='text-2xl'>コース一覧</h2>
      <ul>
        {courses?.map(course => (
          <li key={course.id}>○ {course.name}</li>
        ))}
      </ul>
    </div>
  )
}
