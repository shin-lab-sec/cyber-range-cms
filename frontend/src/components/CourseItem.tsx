import { FC, useCallback, useEffect, useState } from 'react'
import { Course, Curriculum } from '@prisma/client'

type CourseWithCurriculums = Course & { curriculums: Curriculum[] }

export const CourseItem: FC<{ id: string }> = ({ id }) => {
  const [course, setCourse] = useState<CourseWithCurriculums | null>(null)
  // セレクトボックス
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [selectedCurriculumId, setselectedCurriculumId] = useState('')

  let curriculumIds = course?.curriculumIds.split(',') || []

  // 順番に並び替えたカリキュラム
  const orderdCurriculums = structuredClone(course?.curriculums)
  orderdCurriculums?.sort((a, b) => {
    const indexA = curriculumIds.findIndex(id => id === a.id)
    const indexB = curriculumIds.findIndex(id => id === b.id)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
  // curriculumIdsとカリキュラムを合わせる
  curriculumIds = orderdCurriculums ? orderdCurriculums.map(v => v.id) : []

  const getCourse = useCallback(async () => {
    const res: { data: CourseWithCurriculums } = await fetch(
      `api/courses/${id}`,
    ).then(res => res.json())
    setCourse(res.data)
  }, [])
  const getCurriculums = useCallback(async () => {
    const res = await fetch(`api/curriculums`).then(res => res.json())
    setCurriculums(res.data)
  }, [])

  useEffect(() => {
    getCourse()
    getCurriculums()
  }, [])

  // 順番を入れ替えるのは、ライブラリ
  const updateCourse = useCallback(async () => {
    // テストで順番を1つずつずらす
    const newOrder = [curriculumIds.at(-1), curriculumIds.slice(0, -1)].join(
      ',',
    )
    console.log(newOrder)

    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curriculumIds: newOrder,
        }),
      }).then(res => res.json())
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const addCurriculum = useCallback(async () => {
    if (!selectedCurriculumId) {
      console.log('カリキュラムidが空です', selectedCurriculumId)
      return
    }

    if (curriculumIds.includes(selectedCurriculumId)) {
      console.log('既にそのカリキュラムはコースに含まれています')
      return
    }

    const newOrder = [curriculumIds, selectedCurriculumId].join(',')
    console.log(newOrder)

    // 中間テーブルに追加
    try {
      const res = await fetch(
        `/api/courses/${id}/curriculums/${selectedCurriculumId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then(res => res.json())
      console.log('中間テーブルに追加', res)

      const res1 = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curriculumIds: newOrder,
        }),
      }).then(res => res.json())
      console.log('更新に成功', res1)
    } catch (e) {
      console.error(e)
    }

    // コースの curriculumIds を更新
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curriculumIds: newOrder,
        }),
      }).then(res => res.json())
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [selectedCurriculumId])

  const removeCurriculum = useCallback(async () => {
    if (!selectedCurriculumId) {
      console.log('カリキュラムidが空です', selectedCurriculumId)
      return
    }

    // spliceでやる。もう少し増やす
    const newOrder = curriculumIds
      .filter(id => id !== selectedCurriculumId)
      .join(',')
    console.log('splice', newOrder, selectedCurriculumId)

    // 中間テーブル削除
    try {
      const res = await fetch(
        `/api/courses/${id}/curriculums/${selectedCurriculumId}`,
        { method: 'DELETE' },
      ).then(res => res.json())
      console.log('中間テーブル削除', res)
    } catch (e) {
      console.error(e)
    }

    // コースの curriculumIds を更新
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curriculumIds: newOrder,
        }),
      }).then(res => res.json())
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [selectedCurriculumId])

  return (
    <div style={{ margin: '0 20px' }}>
      <h2>CourseItem id: {id}</h2>

      {JSON.stringify(course)}
      <p>curriculumIds</p>
      <p>{JSON.stringify(curriculumIds)}</p>

      {/* select */}
      {curriculums && (
        <>
          <h3>カリキュラムを追加</h3>
          <select onChange={e => setselectedCurriculumId(e.target.value)}>
            {curriculums.map(curriculum => (
              <option key={curriculum.id} value={curriculum.id}>
                {curriculum.name}
              </option>
            ))}
          </select>
          <button onClick={addCurriculum}>追加</button>
          <button onClick={removeCurriculum}>削除</button>
          <button onClick={updateCourse}>順番更新</button>
        </>
      )}
      {selectedCurriculumId}

      <h3>コースのカリキュラム一覧</h3>
      <ul>
        {orderdCurriculums?.map(curriculum => (
          <li key={curriculum.id}>
            <p> {curriculum.id}</p>
            <p>{curriculum.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
