import { FC, useCallback, useEffect, useState } from 'react'
import { Curriculum } from '@prisma/client'
import { deleteApi, getApi, postApi, putApi } from '../utilis/api'
import { useGetApi } from '../hooks/useApi'

export const CurriculumItem: FC = () => {
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)

  const [name, setName] = useState('')
  const [selectedCurriculumId, setselectedCurriculumId] = useState('')

  const createCurriculum = useCallback(async () => {
    if (!name) return
    try {
      const res = await postApi('/curriculums', { name, level: 1 })
      console.log('追加に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [name])

  const updateCurriculum = useCallback(async () => {
    try {
      const res = await putApi(`/curriculums/${selectedCurriculumId}`, {
        name,
        level: 2,
      })
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [name, selectedCurriculumId])

  const deleteCurriculum = useCallback(async () => {
    try {
      const res = await deleteApi(`/curriculums/${selectedCurriculumId}`)
      console.log('削除に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [selectedCurriculumId])

  return (
    <div>
      <h2>Curriculum</h2>
      <ul>
        {curriculums?.map(curriculum => (
          <li key={curriculum.id} value={curriculum.id}>
            {curriculum.name}
          </li>
        ))}
      </ul>

      <p>
        <label>
          name
          <input
            type='text'
            value={name}
            onChange={v => setName(v.target.value)}
          />
        </label>
        <button onClick={createCurriculum}>作成</button>
      </p>

      {curriculums && (
        <>
          <select onChange={e => setselectedCurriculumId(e.target.value)}>
            {curriculums.map(curriculum => (
              <option key={curriculum.id} value={curriculum.id}>
                {curriculum.name}
              </option>
            ))}
          </select>
          <button onClick={updateCurriculum}>更新</button>
          <button onClick={deleteCurriculum}>削除</button>
        </>
      )}
      {selectedCurriculumId}
    </div>
  )
}
