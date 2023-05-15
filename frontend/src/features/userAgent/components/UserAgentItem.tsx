import { UserAgent } from '@prisma/client'
import { FC } from 'react'
import { X } from 'tabler-icons-react'

import { UpdateUserAgentButton } from './UpdateUserAgentButton'
import { UserAgentFormRequest } from './UserAgentForm'

type Props = {
  userAgent: UserAgent
  onUpdate: (id: string, v: UserAgentFormRequest) => void
  onDelete: (id: string) => void
}

export const UserAgentItem: FC<Props> = ({ userAgent, onUpdate, onDelete }) => {
  const UserAgentFormRequest: UserAgentFormRequest = {
    name: userAgent.name,
    gitHubUrl: userAgent.gitHubUrl,
  }
  return (
    <tr key={userAgent.id} className='break-words'>
      <td className='min-w-300px max-w-400px'>{userAgent.name}</td>
      <td className='max-w-200px'>{userAgent.gitHubUrl}</td>
      <td className='text-center min-w-100px'>
        {String(userAgent.createdAt).slice(0, 10)}
      </td>
      <td className='text-center min-w-100px'>
        {String(userAgent.updatedAt).slice(0, 10)}
      </td>

      <td>
        <UpdateUserAgentButton
          onSubmit={v => onUpdate(userAgent.id, v)}
          initValue={UserAgentFormRequest}
        />
      </td>
      <td>
        <X
          size={44}
          className='cursor-pointer mt-0.5 p-2.5'
          onClick={() => onDelete(userAgent.id)}
        />
      </td>
    </tr>
  )
}
