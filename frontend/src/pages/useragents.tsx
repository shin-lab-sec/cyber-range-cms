import { Flex } from '@mantine/core'
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

      <ul className='mt-3'>
        {userAgents?.map(userAgent => {
          const UserAgentFormRequest: UserAgentFormRequest = {
            name: userAgent.name,
            gitHubUrl: userAgent.gitHubUrl,
          }
          return (
            <li
              key={userAgent.id}
              className='rounded-md flex border-2 shadow-md mb-3 py-4 px-4 items-center justify-between'
            >
              {userAgent.name}
              <Flex align='center'>
                <UpdateUserAgentButton
                  onSubmit={v => updateUserAgent(userAgent.id, v)}
                  initValue={UserAgentFormRequest}
                />
                <X
                  size={44}
                  className='cursor-pointer mt-0.5 p-2.5'
                  onClick={() => deleteUserAgent(userAgent.id)}
                />
              </Flex>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default UserAgents
