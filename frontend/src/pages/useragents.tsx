import { Flex } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import { NextPage } from 'next'

import { Layout } from '@/components/Layout'
import {
  CreateUserAgentButton,
  UserAgentTable,
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
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>ユーザーエージェント一覧</h1>
        <CreateUserAgentButton onSubmit={createUserAgent} />
      </Flex>

      {userAgents?.length ? (
        <div className='mt-8'>
          <UserAgentTable
            userAgents={userAgents}
            updateUserAgent={updateUserAgent}
            deleteUserAgent={deleteUserAgent}
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
