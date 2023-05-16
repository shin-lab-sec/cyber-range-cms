import { Center, Flex, ScrollArea, Table } from '@mantine/core'
import { NextPage } from 'next'

import { Layout } from '@/components/Layout'
import {
  CreateCurriculumButton,
  CurriculumsWithUserAgent,
  useCreateCurriculum,
  useDeleteCurriculum,
  useUpdateCurriculum,
  CurriculumItem,
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
              <tr className='whitespace-nowrap'>
                <th>名前</th>
                <th>詳細</th>
                <th>GitHubリポジトリ</th>
                <th>画像</th>
                <th>解説記事</th>
                <th>ユーザーエージェント名</th>
                <th>
                  ユーザーエージェント
                  <br />
                  GitHubリポジトリ
                </th>
                <th>
                  <Center>作成日</Center>
                </th>
                <th>
                  <Center>最終更新日</Center>
                </th>
              </tr>
            </thead>
            <tbody>
              {curriculums?.map(curriculum => (
                <CurriculumItem
                  key={curriculum.id}
                  curriculum={curriculum}
                  onUpdate={updateCurriculum}
                  onDelete={deleteCurriculum}
                />
              ))}
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
