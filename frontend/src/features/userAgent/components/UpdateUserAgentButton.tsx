import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useBoolean } from '@/hooks/useBoolean'

import { UserAgentForm, UserAgentFormRequest } from './UserAgentForm'

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
  initValue: UserAgentFormRequest
}

export const UpdateUserAgentButton: FC<Props> = ({ onSubmit, initValue }) => {
  const isOpen = useBoolean()

  return (
    <>
      <Button onClick={isOpen.setTrue}>編集</Button>
      <Modal
        opened={isOpen.v}
        onClose={isOpen.setFalse}
        title='ユーザーエージェント編集'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <UserAgentForm
          onSubmit={async v => {
            await onSubmit(v)
            isOpen.setFalse()
          }}
          submitButtonName='更新する'
          initValue={initValue}
        />
      </Modal>
    </>
  )
}
