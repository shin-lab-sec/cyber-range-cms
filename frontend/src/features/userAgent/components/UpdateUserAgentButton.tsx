import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { UserAgentForm } from './UserAgentForm'
import { UserAgentFormRequest } from '../types'

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
  initValue: UserAgentFormRequest
}

// ユーザーエージェント更新モーダルを表示するボタン
export const UpdateUserAgentButton: FC<Props> = ({
  onSubmit: onSubmitProps,
  initValue,
}) => {
  // 送信関数をラップして、エラーハンドリングをする
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
