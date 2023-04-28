import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { useCallback, useState } from 'react'
import { Curriculum } from '@prisma/client'
import { deleteApi, postApi, putApi } from '../utils/api'
import { useGetApi } from '../hooks/useApi'
import { Flex } from '@mantine/core'
import { X } from 'tabler-icons-react'
import {
  CreateCurriculumButton,
  CurriculumFormRequest,
  UpdateCurriculumButton,
} from '../features/curriculum'

const Curriculums: NextPage = () => {
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)

  const [name, setName] = useState('')
  const [selectedCurriculumId, setselectedCurriculumId] = useState('')

  const createCurriculum = useCallback(
    async (params: CurriculumFormRequest) => {
      try {
        const res = await postApi('/curriculums', params)
        console.log('追加に成功', res)
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  const updateCurriculum1 = useCallback(async () => {
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

  const updateCurriculum = useCallback(
    async (id: string, params: CurriculumFormRequest) => {
      try {
        const res = await putApi(`/curriculums/${id}`, params)
        console.log('更新に成功', res)
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  const deleteCurriculum = useCallback(async (id: string) => {
    try {
      const res = await deleteApi(`/curriculums/${id}`)
      console.log('削除に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Layout>
      <h1>カリキュラム一覧ページ</h1>

      <Flex gap='sm' justify='end'>
        <CreateCurriculumButton onSubmit={createCurriculum} />
      </Flex>

      <ul className='mt-3'>
        {curriculums?.map(curriculum => {
          const curriculumFormRequest: CurriculumFormRequest = {
            name: curriculum.name,
            gitHubUrl: curriculum.gitHubUrl ?? '',
            imageUrl: curriculum.imageUrl ?? '',
            articleUrl: curriculum.articleUrl ?? '',
            description: curriculum.description ?? '',
          }
          return (
            <li
              key={curriculum.id}
              className='rounded-md flex border-2 shadow-md mb-3 py-4 px-4 items-center justify-between'
            >
              {curriculum.name}
              <Flex align='center'>
                <UpdateCurriculumButton
                  onSubmit={v => updateCurriculum(curriculum.id, v)}
                  initValue={curriculumFormRequest}
                />
                <X
                  size={44}
                  className='cursor-pointer mt-0.5 p-2.5'
                  onClick={() => deleteCurriculum(curriculum.id)}
                />
              </Flex>
            </li>
          )
        })}
      </ul>
      {selectedCurriculumId}
    </Layout>
  )
}

export default Curriculums
