import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { UserAgentFormRequest, UserAgentForm } from './UserAgentForm'

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
}

export const CreateUserAgentButton: FC<Props> = ({
  onSubmit: onSubmitProps,
}) => {
  const { isOpen, isDirtyForm, onClose, onSubmit } = useModalForm(onSubmitProps)

  return (
    <>
      <Button onClick={isOpen.setTrue}>新規ユーザーエージェント作成</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title='新規ユーザーエージェント作成'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <UserAgentForm
          key={String(isOpen.v)}
          onSubmit={onSubmit}
          onDirty={isDirtyForm.setTrue}
          submitButtonName='作成する'
        />
      </Modal>
    </>
  )
}
