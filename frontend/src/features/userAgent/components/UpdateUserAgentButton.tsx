import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { UserAgentForm, UserAgentFormRequest } from './UserAgentForm'

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
  initValue: UserAgentFormRequest
}

export const UpdateUserAgentButton: FC<Props> = ({
  onSubmit: onSubmitProps,
  initValue,
}) => {
  const { isOpen, isDirtyForm, onClose, onSubmit } = useModalForm(onSubmitProps)

  return (
    <>
      <Button onClick={isOpen.setTrue}>編集</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title='ユーザーエージェント編集'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <UserAgentForm
          key={String(isOpen.v)}
          onSubmit={onSubmit}
          onDirty={isDirtyForm.setTrue}
          submitButtonName='更新する'
          initValue={initValue}
        />
      </Modal>
    </>
  )
}
