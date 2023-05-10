import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { CurriculumForm, CurriculumFormRequest } from './CurriculumForm'

type Props = {
  onSubmit: (params: CurriculumFormRequest) => void
}

export const CreateCurriculumButton: FC<Props> = ({
  onSubmit: onSubmitProps,
}) => {
  const { isOpen, isDirtyForm, onClose, onSubmit } = useModalForm(onSubmitProps)

  return (
    <>
      <Button onClick={isOpen.setTrue}>新規カリキュラム作成</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title='新規カリキュラム作成'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CurriculumForm
          key={String(isOpen.v)}
          onSubmit={onSubmit}
          onDirty={isDirtyForm.setTrue}
          submitButtonName='作成する'
        />
      </Modal>
    </>
  )
}
