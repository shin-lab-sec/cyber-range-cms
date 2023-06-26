import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { QuizForm, QuizFormRequest } from './'

type Props = {
  onSubmit: (params: QuizFormRequest) => void
  initValue?: QuizFormRequest
  buttonName: string
  submitButtonName: string
  modalTitle: string
}

export const QuizFormModalButton: FC<Props> = ({
  onSubmit: onSubmitProps,
  initValue,
  buttonName,
  submitButtonName,
  modalTitle,
}) => {
  const { isOpen, isDirtyForm, onClose, onSubmit } = useModalForm(onSubmitProps)

  return (
    <>
      <Button onClick={isOpen.setTrue}>{buttonName}</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title={modalTitle}
        centered
        classNames={{ title: 'text-xl' }}
      >
        <QuizForm
          key={String(isOpen.v)}
          onSubmit={onSubmit}
          onDirty={isDirtyForm.setTrue}
          submitButtonName={submitButtonName}
          initValue={initValue}
        />
      </Modal>
    </>
  )
}
