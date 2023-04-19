import { FC, useCallback, useEffect, useState } from 'react'
import { Course } from '@prisma/client'
import { deleteApi, getApi, postApi, putApi } from '../utilis/api'
import { useGetApi } from '../hooks/useApi'
import { Button, Flex, List, Select, TextInput } from '@mantine/core'

export const CourseList: FC = () => {
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
    <div>
      <h2 className='text-2xl'>コース一覧</h2>

      <List withPadding mt='sm'>
        {courses?.map(course => (
          <List.Item key={course.id}>○ {course.name}</List.Item>
        ))}
      </List>

      <form className='mt-3'>
        <Flex gap='sm'>
          <TextInput
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            placeholder='コース名を入力して下さい'
            className='max-w-300px w-300px'
          />
          <Button onClick={createCourse}>作成</Button>
        </Flex>
      </form>

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
    </div>
  )
}
