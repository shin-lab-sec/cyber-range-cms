import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { SectionForm, SectionFormRequest } from './SectionForm'

type Props = {
  onSubmit: (params: SectionFormRequest) => void
  initValue: SectionFormRequest
}

export const UpdateSectionButton: FC<Props> = ({
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
        <SectionForm
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
