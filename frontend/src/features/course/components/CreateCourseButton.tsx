import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useBoolean } from '@/hooks/useBoolean'

import { CourseForm, CourseFormRequest } from './CourseForm'

type Props = {
  onSubmit: (params: CourseFormRequest) => void
}

export const CreateCourseButton: FC<Props> = ({ onSubmit }) => {
  const isOpen = useBoolean()

  return (
    <>
      <Button onClick={isOpen.setTrue}>新規コース作成</Button>
      <Modal
        opened={isOpen.v}
        onClose={isOpen.setFalse}
        title='新規コース作成'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CourseForm
          onSubmit={async v => {
            await onSubmit(v)
            isOpen.setFalse()
          }}
          submitButtonName='作成する'
        />
      </Modal>
    </>
  )
}
