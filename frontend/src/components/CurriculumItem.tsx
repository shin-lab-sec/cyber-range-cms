import { FC, useCallback, useEffect, useState } from 'react'
import { Curriculum } from '@prisma/client'

export const CurriculumItem: FC = () => {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])

  const getCurriculums = useCallback(async () => {
    const res = await fetch('api/curriculums', {
      method: 'GET',
    }).then(res => res.json())
    setCurriculums(res.data)
  }, [])

  const createCurriculum = useCallback(async () => {
    try {
      const res = await fetch('/api/curriculums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'aa',
          level: 1,
          // description: 'description update',
        }),
      }).then(res => res.json())
      console.log('追加に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    getCurriculums()
  }, [])

  const updateCurriculum = useCallback(async () => {
    try {
      const res = await fetch('/api/curriculums/clgjgryxl0004oz0j9yyv35bd', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // name: 'name update',
          // url: 'url update',
          // article: 'article update',
          name: 'bb',
          level: 2,
          description: 'description update',
        }),
      }).then(res => res.json())
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const deleteCurriculum = useCallback(async () => {
    try {
      const res = await fetch('/api/curriculums/2', {
        method: 'DELETE',
      }).then(res => res.json())
      console.log('削除に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div>
      <h2>Curriculum</h2>
      {JSON.stringify(curriculums)}
      <p>
        <button onClick={createCurriculum}>作成</button>
        <button onClick={updateCurriculum}>更新</button>
        <button onClick={deleteCurriculum}>削除</button>
      </p>
      {/* {curriculums?.map(sample => (
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
