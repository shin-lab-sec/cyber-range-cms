import { Button, Modal } from '@mantine/core'
import { FC } from 'react'
import { useBoolean } from '../../../hooks/useBoolean'
import { CurriculumForm, CurriculumFormRequest } from './CurriculumForm'

type Props = {
  onSubmit: (params: CurriculumFormRequest) => void
  initValue: CurriculumFormRequest
}

export const UpdateCurriculumButton: FC<Props> = ({ onSubmit, initValue }) => {
  const isOpen = useBoolean()

  return (
    <>
      <Button onClick={isOpen.setTrue}>編集</Button>
      <Modal
        opened={isOpen.v}
        onClose={isOpen.setFalse}
        title='カリキュラム編集'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CurriculumForm
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
