import { FC, useCallback, useEffect, useState } from 'react'
import { Course } from '@prisma/client'

export const CourseList: FC = () => {
  const [courses, setCourses] = useState<Course[]>([])

  const getSamples = useCallback(async () => {
    const res = await fetch('api/courses', {
      method: 'GET',
    }).then(res => res.json())
    setCourses(res.data)
  }, [])

  const createCourse = useCallback(async () => {
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'aa',
        }),
      }).then(res => res.json())
      console.log('追加に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    getSamples()
  }, [])

  const updateCourse = useCallback(async () => {
    try {
      const res = await fetch('/api/courses/clgj3v0cs0000oz0je9n5xhfm', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // name: 'name update',
          // url: 'url update',
          // article: 'article update',
          imageUrl: 'imageUrl update',
          description: 'description update',
        }),
      }).then(res => res.json())
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const deleteCourse = useCallback(async () => {
    try {
      const res = await fetch('/api/courses/2', {
        method: 'DELETE',
      }).then(res => res.json())
      console.log('削除に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div>
      <h2>Course</h2>
      <p>course 1</p>
      <p>{JSON.stringify(courses[0])}</p>
      <p>course 全部</p>
      <p>{JSON.stringify(courses)}</p>
      <p>course 1以外</p>
      <p>{JSON.stringify(courses.slice(1))}</p>

      {/* <p>{JSON.stringify(courses[0].curriculums)}</p> */}
      <p>
        <button onClick={createCourse}>作成</button>
        <button onClick={updateCourse}>更新</button>
        <button onClick={deleteCourse}>削除</button>
      </p>
      {/* {courses?.map(sample => (
        <li key={sample.id}>
          <p>id: {sample.id}</p>
          <p>username: {sample.username}</p>
          <p>email: {sample.email}</p>
          <p>price: {sample.price}</p>
        </li>
      ))} */}
    </div>
  )
}
