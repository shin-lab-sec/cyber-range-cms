import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { SectionForm, SectionFormRequest } from './SectionForm'

type Props = {
  onSubmit: (params: SectionFormRequest) => void
}

export const CreateSectionButton: FC<Props> = ({ onSubmit: onSubmitProps }) => {
  const { isOpen, isDirtyForm, onClose, onSubmit } = useModalForm(onSubmitProps)

  return (
    <>
      <Button onClick={isOpen.setTrue}>セクション追加</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title='セクション追加'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <SectionForm
          key={String(isOpen.v)}
          onSubmit={onSubmit}
          onDirty={isDirtyForm.setTrue}
          submitButtonName='追加する'
        />
      </Modal>
    </>
  )
}
