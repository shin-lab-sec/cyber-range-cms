import { Center, Flex, ScrollArea, Table } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import { NextPage } from 'next'
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
                <th>名前</th>
                <th>GitHub</th>
                <th>
                  <Center>作成日</Center>
                </th>
                <th>
                  <Center>最終更新日</Center>
                </th>
              </tr>
            </thead>
            <tbody>
              {userAgents?.map(userAgent => {
                const UserAgentFormRequest: UserAgentFormRequest = {
                  name: userAgent.name,
                  gitHubUrl: userAgent.gitHubUrl,
                }
                return (
                  <tr key={userAgent.id} className='break-words'>
                    <td className='min-w-300px max-w-400px'>
                      {userAgent.name}
                    </td>
                    <td className='min-w-300px max-w-600px'>
                      {userAgent.gitHubUrl}
                    </td>
                    <td className='text-center min-w-100px'>
                      {String(userAgent.createdAt).slice(0, 10)}
                    </td>
                    <td className='text-center min-w-100px'>
                      {String(userAgent.updatedAt).slice(0, 10)}
                    </td>

                    <td>
                      <UpdateUserAgentButton
                        onSubmit={v => updateUserAgent(userAgent.id, v)}
                        initValue={UserAgentFormRequest}
                      />
                    </td>
                    <td>
                      <X
                        size={44}
                        className='cursor-pointer mt-0.5 p-2.5'
                        onClick={() => deleteUserAgent(userAgent.id)}
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
          まだユーザーエージェントが作成されていません。
          <br />
          右上の「新規ユーザーエージェント作成」ボタンから作成して下さい。
        </p>
      )}
    </Layout>
  )
}

export default UserAgents
