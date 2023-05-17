import { Flex } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import { MantineReactTable } from 'mantine-react-table'
import type { MRT_ColumnDef } from 'mantine-react-table'
import { NextPage } from 'next'
import { useMemo } from 'react'
import { X } from 'tabler-icons-react'

import { Layout } from '@/components/Layout'
import {
  CreateUserAgentButton,
  UpdateUserAgentButton,
  UserAgentFormRequest,
  useCreateUserAgent,
  useDeleteUserAgent,
  useUpdateUserAgent,
} from '@/features/userAgent'
import { useGetApi } from '@/hooks/useApi'

const UserAgents: NextPage = () => {
  const { data: userAgents } = useGetApi<UserAgent[]>(`/useragents`)

  const { createUserAgent } = useCreateUserAgent()
  const { updateUserAgent } = useUpdateUserAgent()
  const { deleteUserAgent } = useDeleteUserAgent()

  const columns = useMemo<MRT_ColumnDef<UserAgent>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '名前',
        Cell: ({ cell }) => (
          <div className='min-w-200px max-w-600px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'gitHubUrl',
        header: 'GitHubリポジトリ',
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <div className='max-w-400px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: '作成日',
        maxSize: 0,
        Cell: ({ cell }) => String(cell.getValue()).slice(0, 10),
      },
      {
        accessorKey: 'updatedAt',
        header: '最終更新日',
        maxSize: 0,
        Cell: ({ cell }) => String(cell.getValue()).slice(0, 10),
      },
      // 編集・削除ボタンをCellに置く
      {
        header: ' ',
        // 操作出来なくする
        enableColumnActions: false,
        enableColumnDragging: false,
        enableSorting: false,
        maxSize: 0,
        Cell: ({ row: { original: userAgent } }) => {
          const userAgentFormRequest: UserAgentFormRequest = {
            name: userAgent.name,
            gitHubUrl: userAgent.gitHubUrl,
          }
          return (
            <Flex align='center'>
              <UpdateUserAgentButton
                onSubmit={v => updateUserAgent(userAgent.id, v)}
                initValue={userAgentFormRequest}
              />
              <X
                size={44}
                className='cursor-pointer mt-0.5 p-2.5'
                onClick={() => deleteUserAgent(userAgent.id)}
              />
            </Flex>
          )
        },
      },
    ],
    [deleteUserAgent, updateUserAgent],
  )

  return (
    <Layout>
      <h1>ユーザーエージェント一覧ページ</h1>

      <Flex gap='sm' justify='end'>
        <CreateUserAgentButton onSubmit={createUserAgent} />
      </Flex>

      {userAgents?.length ? (
        <div className='mt-3'>
          <MantineReactTable
            columns={columns}
            data={userAgents}
            enableColumnOrdering
          />
        </div>
      ) : (
        <p className='mx-auto mt-200px max-w-400px'>
          まだユーザーエージェントが作成されていません。
          <br />
          右上の「新規ユーザーエージェント作成」ボタンから作成して下さい。
        </p>
      )}
    </Layout>
  )
}

export default UserAgents
