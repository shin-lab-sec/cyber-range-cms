import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { CurriculumForm, CurriculumFormRequest } from './CurriculumForm'

type Props = {
  onSubmit: (params: CurriculumFormRequest) => void
  initValue: CurriculumFormRequest
}

export const UpdateCurriculumButton: FC<Props> = ({
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
        title='カリキュラム編集'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CurriculumForm
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
