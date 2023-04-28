import { useCallback } from 'react'
import { postApi, putApi, deleteApi } from '../../utils/api'
import { CurriculumFormRequest } from '.'
import { useGetApi } from '../../hooks/useApi'
import { Curriculum } from '@prisma/client'

export const useCreateCurriculum = () => {
  const { data: curriculums, mutate: mutateCurriculums } =
    useGetApi<Curriculum[]>('/curriculums')

  const createCurriculum = useCallback(
    async (params: CurriculumFormRequest) => {
      try {
        const res = await postApi<Curriculum>('/curriculums', params)
        console.log('追加に成功', res)

        if (!curriculums || !res) return
        mutateCurriculums([...curriculums, res], false)
      } catch (e) {
        console.error(e)
      }
    },
    [curriculums, mutateCurriculums],
  )

  return { createCurriculum }
}

export const useUpdateCurriculum = () => {
  const { data: curriculums, mutate: mutateCurriculums } =
    useGetApi<Curriculum[]>('/curriculums')

  const updateCurriculum = useCallback(
    async (id: string, params: CurriculumFormRequest) => {
      try {
        const res = await putApi<Curriculum>(`/curriculums/${id}`, params)
        console.log('更新に成功', res)

        if (!curriculums || !res) return
        const newCurriculums = curriculums.map(v => (v.id === id ? res : v))
        mutateCurriculums(newCurriculums, false)
      } catch (e) {
        console.error(e)
      }
    },
    [curriculums, mutateCurriculums],
  )
  return { updateCurriculum }
}

export const useDeleteCurriculum = () => {
  const { data: curriculums, mutate: mutateCurriculums } =
    useGetApi<Curriculum[]>('/curriculums')

  const deleteCurriculum = useCallback(
    async (id: string) => {
      try {
        const res = await deleteApi(`/curriculums/${id}`)
        console.log('削除に成功', res)

        if (!curriculums) return
        const newCurriculums = curriculums.filter(v => v.id !== id)
        mutateCurriculums(newCurriculums, false)
      } catch (e) {
        console.error(e)
      }
    },
    [curriculums, mutateCurriculums],
  )

  return { deleteCurriculum }
}
