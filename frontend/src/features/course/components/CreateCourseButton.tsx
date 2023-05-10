import { Button, Modal } from '@mantine/core'
import { FC, useCallback } from 'react'

import { useBoolean } from '@/hooks/useBoolean'

import { CourseForm, CourseFormRequest } from './CourseForm'

type Props = {
  onSubmit: (params: CourseFormRequest) => void
}

export const CreateCourseButton: FC<Props> = ({ onSubmit }) => {
  const isOpen = useBoolean()
  const isDirtyForm = useBoolean()

  const onClose = useCallback(() => {
    if (!isDirtyForm.v) {
      isOpen.setFalse()
      isDirtyForm.setFalse()
      return
    }

    if (window.confirm('編集内容を破棄しますか？')) {
      isOpen.setFalse()
      isDirtyForm.setFalse()
    }
  }, [isDirtyForm, isOpen])

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
          onSubmit={async v => {
            await onSubmit(v)
            isOpen.setFalse()
          }}
          onDirty={isDirtyForm.setTrue}
          submitButtonName='作成する'
        />
      </Modal>
    </>
  )
}
