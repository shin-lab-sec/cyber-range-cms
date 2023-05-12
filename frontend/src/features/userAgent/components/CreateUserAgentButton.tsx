import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useBoolean } from '@/hooks/useBoolean'

import { UserAgentFormRequest, UserAgentForm } from './UserAgentForm'

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
}

export const CreateUserAgentButton: FC<Props> = ({ onSubmit }) => {
  const isOpen = useBoolean()

  return (
    <>
      <Button onClick={isOpen.setTrue}>新規ユーザーエージェント作成</Button>
      <Modal
        opened={isOpen.v}
        onClose={isOpen.setFalse}
        title='新規ユーザーエージェント作成'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <UserAgentForm
          onSubmit={async v => {
            await onSubmit(v)
            isOpen.setFalse()
          }}
          submitButtonName='作成する'
        />
      </Modal>
    </>
  )
}
