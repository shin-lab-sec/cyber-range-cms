import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useModalForm } from '@/hooks/useModalForm'

import { CourseForm } from './CourseForm'
import { CourseRequest } from '../types'

type Props = {
  onSubmit: (params: CourseRequest) => void
  initValue: CourseRequest
}

// コース更新モーダルボタン
export const UpdateCourseButton: FC<Props> = ({
  onSubmit: onSubmitProps,
  initValue,
}) => {
  // モーダルフォームの状態を管理する
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
