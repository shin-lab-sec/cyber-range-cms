import { Center, Flex, ScrollArea, Table } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import { NextPage } from 'next'

import { Layout } from '@/components/Layout'
import {
  CreateUserAgentButton,
  UserAgentItem,
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

  return (
    <Layout>
      <h1>ユーザーエージェント一覧ページ</h1>

      <Flex gap='sm' justify='end'>
        <CreateUserAgentButton onSubmit={createUserAgent} />
      </Flex>

      {userAgents?.length ? (
        <ScrollArea mt='xl'>
          <Table striped highlightOnHover withColumnBorders>
            <thead>
              <tr>
                <th className='whitespace-nowrap'>名前</th>
                <th className='whitespace-nowrap'>GitHub</th>
                <th className='whitespace-nowrap'>
                  <Center>作成日</Center>
                </th>
                <th className='whitespace-nowrap'>
                  <Center>最終更新日</Center>
                </th>
              </tr>
            </thead>
            <tbody>
              {userAgents?.map(userAgent => (
                <UserAgentItem
                  key={userAgent.id}
                  userAgent={userAgent}
                  onUpdate={updateUserAgent}
                  onDelete={deleteUserAgent}
                />
              ))}
            </tbody>
          </Table>
        </ScrollArea>
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
