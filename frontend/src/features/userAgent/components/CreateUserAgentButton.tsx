import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { UserAgentForm } from './UserAgentForm'
import { UserAgentFormRequest } from '../types'

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
}

// ユーザーエージェント作成モーダルを表示するボタン
export const CreateUserAgentButton: FC<Props> = ({
  onSubmit: onSubmitProps,
}) => {
  // 送信関数をラップして、エラーハンドリングをする
  const { isOpen, isDirtyForm, onClose, onSubmit } = useModalForm(onSubmitProps)

  return (
    <>
      <Button onClick={isOpen.setTrue}>ユーザーエージェント登録</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title='ユーザーエージェント登録'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <UserAgentForm
          key={String(isOpen.v)}
          onSubmit={onSubmit}
          onDirty={isDirtyForm.setTrue}
          submitButtonName='登録する'
        />
      </Modal>
    </>
  )
}
