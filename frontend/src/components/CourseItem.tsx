import { FC, useCallback, useEffect, useState } from 'react'
import { Course, Curriculum } from '@prisma/client'
import { deleteApi, postApi, putApi } from '../utilis/api'
import { useGetApi } from '../hooks/useApi'

type CourseWithCurriculums = Course & { curriculums: Curriculum[] }

export const CourseItem: FC<{ id: string }> = ({ id }) => {
  const { data: course } = useGetApi<CourseWithCurriculums>(`/courses/${id}`)
  // セレクトボックス
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)
  const [selectedCurriculumId, setselectedCurriculumId] = useState('')

  let curriculumIds = course?.curriculumIds?.split(',') || []
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

  // 順番を入れ替えるのは、ライブラリ
  const updateCourse = useCallback(async () => {
    const newOrder = [curriculumIds.at(-1), curriculumIds.slice(0, -1)].join(
      ',',
    )

    try {
      const res = await putApi(`/courses/${id}`, { curriculumIds: newOrder })
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

    try {
      // 中間テーブルに追加
      const res = await postApi(
        `/courses/${id}/curriculums/${selectedCurriculumId}`,
      )
      console.log('中間テーブルに追加', res)

      // curriculumIds更新
      const res1 = await putApi(`/courses/${id}`, { curriculumIds: newOrder })
      console.log('更新に成功', res1)
    } catch (e) {
      console.error(e)
    }
  }, [curriculumIds, id, selectedCurriculumId])

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

    try {
      // 中間テーブル削除
      const res = await deleteApi(
        `/courses/${id}/curriculums/${selectedCurriculumId}`,
      )
      console.log('中間テーブル削除', res)

      // curriculumIds更新
      const res1 = await putApi(`/courses/${id}`, {
        curriculumIds: newOrder,
      })
      console.log('更新に成功', res1)
    } catch (e) {
      console.error(e)
    }
  }, [curriculumIds, id, selectedCurriculumId])

  return (
    <div style={{ margin: '0 20px' }}>
      <h2>
        {course?.name} id: {id}
      </h2>
      <p>curriculumIds</p>
      <p>{JSON.stringify(curriculumIds)}</p>

      {/* select */}
      {curriculums && (
        <>
          <h3>カリキュラムを追加</h3>
          <select onChange={e => setselectedCurriculumId(e.target.value)}>
            {curriculums?.map(curriculum => (
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

      <h3>「{course?.name}」のカリキュラム一覧</h3>
      <ul>
        {orderdCurriculums?.map(curriculum => (
          <li key={curriculum.id}>{curriculum.name}</li>
        ))}
      </ul>
    </div>
  )
}
