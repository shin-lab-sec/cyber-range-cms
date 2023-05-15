import { Center, Flex, ScrollArea, Table } from '@mantine/core'
import { NextPage } from 'next'
import { X } from 'tabler-icons-react'

import { Layout } from '@/components/Layout'
import {
  CreateCurriculumButton,
  CurriculumFormRequest,
  CurriculumsWithUserAgent,
  UpdateCurriculumButton,
  useCreateCurriculum,
  useDeleteCurriculum,
  useUpdateCurriculum,
} from '@/features/curriculum'
import { useGetApi } from '@/hooks/useApi'

const Curriculums: NextPage = () => {
  const { data: curriculums } =
    useGetApi<CurriculumsWithUserAgent[]>(`/curriculums`)

  const { createCurriculum } = useCreateCurriculum()
  const { updateCurriculum } = useUpdateCurriculum()
  const { deleteCurriculum } = useDeleteCurriculum()

  return (
    <Layout>
      <h1>カリキュラム一覧ページ</h1>

      <Flex gap='sm' justify='end'>
        <CreateCurriculumButton onSubmit={createCurriculum} />
      </Flex>

      {curriculums?.length ? (
        <ScrollArea mt='xl'>
          <Table striped highlightOnHover withColumnBorders>
            <thead>
              <tr>
                <th>名前</th>
                <th>詳細</th>
                <th>GitHubリポジトリ</th>
                <th>画像</th>
                <th>解説記事</th>
                <th>
                  <Center>作成日</Center>
                </th>
                <th>
                  <Center>最終更新日</Center>
                </th>
              </tr>
            </thead>
            <tbody>
              {curriculums?.map(curriculum => {
                const curriculumFormRequest: CurriculumFormRequest = {
                  name: curriculum.name,
                  gitHubUrl: curriculum.gitHubUrl ?? '',
                  imageUrl: curriculum.imageUrl ?? '',
                  articleUrl: curriculum.articleUrl ?? '',
                  description: curriculum.description ?? '',
                  userAgentId: curriculum.userAgentId,
                }
                return (
                  <tr key={curriculum.id} className='break-words'>
                    <td className='min-w-300px max-w-400px'>
                      {curriculum.name}
                    </td>
                    <td className='min-w-300px max-w-400px'>
                      {curriculum.description}
                    </td>
                    <td className='max-w-200px'>{curriculum.gitHubUrl}</td>
                    <td className='max-w-200px'>{curriculum.imageUrl}</td>
                    <td className='max-w-200px'>{curriculum.articleUrl}</td>
                    <td className='text-center min-w-100px'>
                      {String(curriculum.createdAt).slice(0, 10)}
                    </td>
                    <td className='text-center min-w-100px'>
                      {String(curriculum.updatedAt).slice(0, 10)}
                    </td>

                    <td>
                      <UpdateCurriculumButton
                        onSubmit={v => updateCurriculum(curriculum.id, v)}
                        initValue={curriculumFormRequest}
                      />
                    </td>
                    <td>
                      <X
                        size={44}
                        className='cursor-pointer mt-0.5 p-2.5'
                        onClick={() => deleteCurriculum(curriculum.id)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </ScrollArea>
      ) : (
        <p className='mx-auto mt-200px max-w-400px'>
          まだカリキュラムが作成されていません。
          <br />
          右上の「新規カリキュラム作成」ボタンから作成して下さい。
        </p>
      )}
    </Layout>
  )
}

export default Curriculums
