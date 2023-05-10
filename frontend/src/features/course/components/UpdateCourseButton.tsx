import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { CourseForm, CourseFormRequest } from './CourseForm'

type Props = {
  onSubmit: (params: CourseFormRequest) => void
  initValue: CourseFormRequest
}

export const UpdateCourseButton: FC<Props> = ({
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
        title='コース編集'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CourseForm
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
