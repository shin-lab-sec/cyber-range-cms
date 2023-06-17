import { Flex } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import { IconX } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'
import type { MRT_ColumnDef } from 'mantine-react-table'
import { NextPage } from 'next'
import { useMemo } from 'react'

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
import { convertToJapanTime } from '@/utils/convertToJapanTime'

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
        Cell: ({ row: { original: userAgent } }) => {
          const userAgentFormRequest: UserAgentFormRequest = {
            name: userAgent.name,
            type: userAgent.type as 'vdi' | 'terminal',
            author: userAgent.author,
            organization: userAgent.organization,
            gitHubUrl: userAgent.gitHubUrl,
          }
          return (
            <Flex align='center'>
              <UpdateUserAgentButton
                onSubmit={v => updateUserAgent(userAgent.id, v)}
                initValue={userAgentFormRequest}
              />
              <IconX
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
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>ユーザーエージェント一覧</h1>
        <CreateUserAgentButton onSubmit={createUserAgent} />
      </Flex>

      {userAgents?.length ? (
        <div className='mt-8'>
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
