import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { CourseForm } from './CourseForm'
import { CourseRequest } from '../types'

type Props = {
  onSubmit: (params: CourseRequest) => void
}

// コース作成モーダルボタン
export const CreateCourseButton: FC<Props> = ({ onSubmit: onSubmitProps }) => {
  // モーダルフォームの状態を管理する
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
