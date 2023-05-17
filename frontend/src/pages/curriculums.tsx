import { Flex } from '@mantine/core'
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table'
import { NextPage } from 'next'
import { useMemo } from 'react'
import { X } from 'tabler-icons-react'

import { Layout } from '@/components/Layout'
import {
  CreateCurriculumButton,
  CurriculumsWithUserAgent,
  useCreateCurriculum,
  useDeleteCurriculum,
  useUpdateCurriculum,
  CurriculumFormRequest,
  UpdateCurriculumButton,
} from '@/features/curriculum'
import { useGetApi } from '@/hooks/useApi'
import { convertToJapanTime } from '@/utils/convertToJapanTime'

const Curriculums: NextPage = () => {
  const { data: curriculums } =
    useGetApi<CurriculumsWithUserAgent[]>(`/curriculums`)

  const { createCurriculum } = useCreateCurriculum()
  const { updateCurriculum } = useUpdateCurriculum()
  const { deleteCurriculum } = useDeleteCurriculum()

  const columns = useMemo<MRT_ColumnDef<CurriculumsWithUserAgent>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '名前',
        Cell: ({ row: { original: curriculum } }) => (
          <div className='min-w-200px max-w-400px break-words'>
            {curriculum.name}
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: '詳細',
        Cell: ({ cell }) => (
          <div className='min-w-300px max-w-400px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'gitHubUrl',
        header: 'GitHubリポジトリ',
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <div className='max-w-200px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'imageUrl',
        header: '画像URL',
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <div className='max-w-200px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'articleUrl',
        header: '解説記事URL',
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <div className='max-w-200px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        header: 'ユーザーエージェント名',
        Cell: ({ row: { original: curriculum } }) => (
          <div className='max-w-200px break-words'>
            {curriculum.userAgent.name}
          </div>
        ),
      },
      {
        header: 'ユーザーエージェントGitHubリポジトリ',
        Cell: ({ row: { original: curriculum } }) => (
          <div className='max-w-200px break-words'>
            {curriculum.userAgent.gitHubUrl}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: '作成日',
        maxSize: 0,
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
      },
      {
        accessorKey: 'updatedAt',
        header: '最終更新日',
        maxSize: 0,
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
      },
      // 編集・削除ボタンをCellに置く
      {
        header: ' ',
        // 操作出来なくする
        enableColumnActions: false,
        enableColumnDragging: false,
        enableSorting: false,
        maxSize: 0,
        Cell: ({ row: { original: curriculum } }) => {
          const curriculumFormRequest: CurriculumFormRequest = {
            name: curriculum.name,
            gitHubUrl: curriculum.gitHubUrl ?? '',
            imageUrl: curriculum.imageUrl ?? '',
            articleUrl: curriculum.articleUrl ?? '',
            description: curriculum.description ?? '',
            userAgentId: curriculum.userAgentId,
          }

          return (
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
          )
        },
      },
    ],
    [deleteCurriculum, updateCurriculum],
  )

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>カリキュラム一覧</h1>
        <CreateCurriculumButton onSubmit={createCurriculum} />
      </Flex>

      {curriculums?.length ? (
        <div className='mt-8'>
          <MantineReactTable
            columns={columns}
            data={curriculums}
            enableColumnOrdering
          />
        </div>
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
