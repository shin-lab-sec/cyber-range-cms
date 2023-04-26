import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { useCallback, useState } from 'react'
import { Course } from '@prisma/client'
import { deleteApi, postApi, putApi } from '../../utils/api'
import { useGetApi } from '../../hooks/useApi'
import { Button, Flex, List, Select, TextInput } from '@mantine/core'
import Link from 'next/link'
import { X } from 'tabler-icons-react'
import { CreateCourseButton } from '../../components/course/CreateCourseButton'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<Course[]>(`/courses`)
  const [name, setName] = useState('')
  const [selectedCourseId, setselectedCourseId] = useState('')

  const createCourse = useCallback(async () => {
    if (!name) return
    try {
      const res = await postApi('/courses', { name })
      console.log('追加に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [name])

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

  const deleteCourse = useCallback(async () => {
    try {
      const res = await deleteApi(`/courses/${selectedCourseId}`)
      console.log('削除に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [selectedCourseId])

  return (
    <Layout>
      <h1>コース一覧ページ</h1>

      <form className='mt-3'>
        <Flex gap='sm' justify='end'>
          {/* <TextInput
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            placeholder='コース名を入力して下さい'
            className='max-w-300px w-300px'
          />
          <Button onClick={createCourse}>作成</Button> */}
          <CreateCourseButton />
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
              // onClick={() => onRemove(curriculum.id)}
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

          <Button onClick={updateCourse}>更新</Button>
          <Button color='red' onClick={deleteCourse}>
            削除
          </Button>
        </Flex>
      )}
    </Layout>
  )
}

export default Courses
