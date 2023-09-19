import { Button, Flex, ThemeIcon } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import { IconDeviceDesktop, IconTerminal2 } from '@tabler/icons-react'
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table'
import { FC, useMemo } from 'react'

import { ConfirmButton } from '@/components/ConfirmButton'
import { ExportJsonButton } from '@/components/ExportJsonButton'
import { convertToJapanTime } from '@/utils/convertToJapanTime'

import { UpdateUserAgentButton } from './UpdateUserAgentButton'
import { UserAgentFormRequest } from '../types'

type Props = {
  userAgents: UserAgent[]
  updateUserAgent: (id: string, params: UserAgentFormRequest) => void
  deleteUserAgent: (id: string) => void
}

export const UserAgentTable: FC<Props> = ({
  userAgents,
  updateUserAgent,
  deleteUserAgent,
}) => {
  const columns = useMemo<MRT_ColumnDef<UserAgent>[]>(
    () => [
      {
        accessorKey: 'type',
        header: 'タイプ',
        maxSize: 0,
        Cell: ({ row: { original: userAgent } }) => (
          <div className='min-w-160px max-w-180px break-words'>
            {userAgent.type === 'vdi' && (
              <Flex align='center' gap='sm'>
                <ThemeIcon color='red' size='lg' variant='light' radius='md'>
                  <IconDeviceDesktop size='1.5rem' />
                </ThemeIcon>
                仮想デスクトップ
              </Flex>
            )}
            {userAgent.type === 'terminal' && (
              <Flex align='center' gap='sm'>
                <ThemeIcon color='blue' size='lg' variant='light' radius='md'>
                  <IconTerminal2 size='1.5rem' />
                </ThemeIcon>
                仮想ターミナル
              </Flex>
            )}
          </div>
        ),
      },
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
        accessorKey: 'author',
        header: '製作者',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'organization',
        header: '所属',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
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
            <Flex align='center' gap='sm' className='min-w-250px'>
              <ExportJsonButton data={userAgent} fileName={userAgent.name} />
              <UpdateUserAgentButton
                onSubmit={v => updateUserAgent(userAgent.id, v)}
                initValue={userAgentFormRequest}
              />
              <ConfirmButton
                confirmMessage={`${userAgent.name}を削除しますか？\n※このユーザーエージェントを使用しているセクションも削除されます。`}
                onConfirm={() => deleteUserAgent(userAgent.id)}
              >
                <Button component='span' color='red'>
                  削除
                </Button>
              </ConfirmButton>
            </Flex>
          )
        },
      },
    ],
    [deleteUserAgent, updateUserAgent],
  )

  return (
    <MantineReactTable
      columns={columns}
      data={userAgents}
      enableColumnOrdering
    />
  )
}
