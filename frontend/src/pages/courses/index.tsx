import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { useCallback, useState } from 'react'
import { Course } from '@prisma/client'
import { deleteApi, postApi, putApi } from '../../utils/api'
import { useGetApi } from '../../hooks/useApi'
import { Button, Flex, List, Select, TextInput } from '@mantine/core'
import Link from 'next/link'
import { X } from 'tabler-icons-react'
import {
  CourseForm,
  CreateCourseButton,
} from '../../components/course/CreateCourseButton'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<Course[]>(`/courses`)
  const [name, setName] = useState('')
  const [selectedCourseId, setselectedCourseId] = useState('')

  const createCourse = useCallback(async (params: CourseForm) => {
    try {
      const res = await postApi('/courses', params)
      console.log('追加に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])
  const createCourse2 = useCallback(async () => {
    try {
      const res = await postApi('/courses', {
        name: 'a',
        level: 3,
        description: 'ffffa',
      })
      console.log('追加に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const updateCourse = useCallback(async () => {
    try {
      if (!name) return
      const res = await putApi(`/courses/${selectedCourseId}`, {
        name,
      })
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [name, selectedCourseId])

  const deleteCourse = useCallback(async (id: string) => {
    try {
      const res = await deleteApi(`/courses/${id}`)
      console.log('削除に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Layout>
      <h1>コース一覧ページ</h1>

      <form className='mt-3'>
        <Flex gap='sm' justify='end'>
          <CreateCourseButton
            onSubmit={a => {
              console.log('送信じゃ', a)
              createCourse(a)
            }}
          />
        </Flex>
      </form>

      <ul className='mt-3'>
        {courses?.map(course => (
          <li
            key={course.id}
            className='rounded-md flex border-2 shadow-md mb-3 py-4 px-4 items-center justify-between'
          >
            <Link href={`/courses/${course.id}`}>{course.name}</Link>
            <X
              size={44}
              className='cursor-pointer mt-0.5 p-2.5'
              onClick={() => deleteCourse(course.id)}
            />
          </li>
        ))}
      </ul>

      {courses && (
        <Flex gap='sm' mt='sm'>
          <Select
            placeholder='コースを選択してください'
            onChange={(e: string) => setselectedCourseId(e)}
            data={courses.map(v => ({ value: v.id, label: v.name }))}
            className='max-w-300px w-300px'
          />

          <Button onClick={createCourse2}>作成</Button>
          <Button onClick={updateCourse}>更新</Button>
          {/* <Button color='red' onClick={deleteCourse}>
            削除
          </Button> */}
        </Flex>
      )}
    </Layout>
  )
}

export default Courses
