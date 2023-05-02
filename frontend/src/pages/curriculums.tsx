import { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { Curriculum } from '@prisma/client'
import { useGetApi } from '@/hooks/useApi'
import { Flex } from '@mantine/core'
import { X } from 'tabler-icons-react'
import {
  CreateCurriculumButton,
  CurriculumFormRequest,
  UpdateCurriculumButton,
  useCreateCurriculum,
  useDeleteCurriculum,
  useUpdateCurriculum,
} from '../features/curriculum'

const Curriculums: NextPage = () => {
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)

  const { createCurriculum } = useCreateCurriculum()
  const { updateCurriculum } = useUpdateCurriculum()
  const { deleteCurriculum } = useDeleteCurriculum()

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
    </Layout>
  )
}

export default Curriculums
