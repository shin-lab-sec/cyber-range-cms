import { Button, Modal } from '@mantine/core'
import { FC } from 'react'

import { useBoolean } from '@/hooks/useBoolean'

import { CurriculumForm, CurriculumFormRequest } from './CurriculumForm'

type Props = {
  onSubmit: (params: CurriculumFormRequest) => void
}

export const CreateCurriculumButton: FC<Props> = ({ onSubmit }) => {
  const isOpen = useBoolean()

  return (
    <>
      <Button onClick={isOpen.setTrue}>新規カリキュラム作成</Button>
      <Modal
        opened={isOpen.v}
        onClose={isOpen.setFalse}
        title='新規カリキュラム作成'
        centered
        classNames={{ title: 'text-xl' }}
      >
        <CurriculumForm
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
