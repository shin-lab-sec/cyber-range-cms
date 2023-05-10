import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { CourseForm, CourseFormRequest } from './CourseForm'

type Props = {
  onSubmit: (params: CourseFormRequest) => void
}

export const CreateCourseButton: FC<Props> = ({ onSubmit: onSubmitProps }) => {
  const { isOpen, isDirtyForm, onClose, onSubmit } = useModalForm(onSubmitProps)

  return (
    <>
      <Button onClick={isOpen.setTrue}>新規コース作成</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title='新規コース作成'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CourseForm
          key={String(isOpen.v)}
          onSubmit={onSubmit}
          onDirty={isDirtyForm.setTrue}
          submitButtonName='作成する'
        />
      </Modal>
    </>
  )
}
