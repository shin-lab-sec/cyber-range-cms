import { Button, Modal } from '@mantine/core'
import { FC } from 'react'
import { useBoolean } from '../../hooks/useBoolean'
import { CourseForm, CourseFormRequest } from './CourseForm'

type Props = {
  onSubmit: (params: CourseFormRequest) => void
  initValue: CourseFormRequest
}

export const UpdateCourseButton: FC<Props> = ({ onSubmit, initValue }) => {
  const isOpen = useBoolean()

  return (
    <>
      <Button onClick={isOpen.setTrue}>編集</Button>
      <Modal
        opened={isOpen.v}
        onClose={isOpen.setFalse}
        title='コース編集'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CourseForm
          onSubmit={v => {
            onSubmit(v)
            isOpen.setFalse()
          }}
          submitButtonName='更新する'
          initValue={initValue}
        />
      </Modal>
    </>
  )
}
