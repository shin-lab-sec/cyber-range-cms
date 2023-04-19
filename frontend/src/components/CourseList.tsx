import { FC, useCallback, useEffect, useState } from 'react'
import { Course } from '@prisma/client'
import { deleteApi, getApi, postApi, putApi } from '../utilis/api'
import { useGetApi } from '../hooks/useApi'

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
      <h2>Course</h2>

      <ul>
        {courses?.map(course => (
          <li key={course.id} value={course.id}>
            {course.name}
          </li>
        ))}
      </ul>

      <p>
        <input
          type='text'
          value={name}
          onChange={v => setName(v.target.value)}
        />
        <button onClick={createCourse}>作成</button>
      </p>

      {courses && (
        <>
          <select onChange={e => setselectedCourseId(e.target.value)}>
            {courses.map(curriculum => (
              <option key={curriculum.id} value={curriculum.id}>
                {curriculum.name}
              </option>
            ))}
          </select>
          <button onClick={updateCourse}>更新</button>
          <button onClick={deleteCourse}>削除</button>
        </>
      )}
      {selectedCourseId}
    </div>
  )
}
