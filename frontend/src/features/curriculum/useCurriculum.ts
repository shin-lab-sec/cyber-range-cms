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
        const newCurriculum = await postApi<Curriculum>('/curriculums', params)
        console.log('追加に成功', newCurriculum)

        if (!curriculums) return
        // 再度データを取得しキャッシュを更新する
        mutateCurriculums([...curriculums, newCurriculum])
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
        const updatedCurriculum = await putApi<Curriculum>(
          `/curriculums/${id}`,
          params,
        )
        console.log('更新に成功', updatedCurriculum)

        if (!curriculums) return
        // 対象のidだけ更新されたカリキュラムに置き換える
        const updatedCurriculums = curriculums.map(v =>
          v.id === id ? updatedCurriculum : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateCurriculums(updatedCurriculums)
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
        await deleteApi(`/curriculums/${id}`)
        console.log('削除に成功')

        if (!curriculums) return
        // カリキュラム一覧から対象のidのカリキュラムを除く
        const filteredCurriculums = curriculums.filter(v => v.id !== id)
        // 再度データを取得しキャッシュを更新する
        mutateCurriculums(filteredCurriculums)
      } catch (e) {
        console.error(e)
      }
    },
    [curriculums, mutateCurriculums],
  )

  return { deleteCurriculum }
}
