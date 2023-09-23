import { ThemeIcon } from '@mantine/core'
import { IconSelect, IconArticle, IconListCheck } from '@tabler/icons-react'
import { FC, useState } from 'react'

import { QuizCheckboxForm } from './QuizCheckboxForm'
import { QuizRadioForm } from './QuizRadioForm'
import { QuizTextForm } from './QuizTextForm'
import { QuizFormRequest } from '../../types'

type Props = {
  onSubmit: (params: QuizFormRequest) => void
  submitButtonName?: string
  initValue?: QuizFormRequest
  onDirty: () => void
}

export const QuizForm: FC<Props> = ({
  onSubmit,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const [quizType, setQuizType] = useState(initValue?.type)

  if (!quizType) {
    return (
      <>
        <p className='text-center'>問題のタイプを選択して下さい</p>
        <div className='mt-4 grid gap-3 grid-cols-3'>
          <div
            className='border rounded-md cursor-pointer flex flex-col bg-[#FEF5F4] shadow-md text-sm p-2 gap-1 duration-300 items-center'
            onClick={() => setQuizType('text')}
          >
            <ThemeIcon color='red' size='lg' variant='light' radius='md'>
              <IconArticle size='2rem' />
            </ThemeIcon>
            記述式
          </div>
          <div
            className='border rounded-md cursor-pointer flex flex-col bg-[#E7F4FE] shadow-md text-sm p-2 gap-1 duration-300 items-center'
            onClick={() => setQuizType('radio')}
          >
            <ThemeIcon color='blue' size='lg' variant='light' radius='md'>
              <IconSelect size='2rem' />
            </ThemeIcon>
            単一選択
          </div>
          <div
            className='border rounded-md cursor-pointer flex flex-col bg-[#F2F0FE] shadow-md text-sm p-2 gap-1 duration-300 items-center'
            onClick={() => setQuizType('checkbox')}
          >
            <ThemeIcon color='violet' size='lg' variant='light' radius='md'>
              <IconListCheck size='2rem' />
            </ThemeIcon>
            複数選択
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {quizType === 'text' && (
        <QuizTextForm
          onSubmit={onSubmit}
          submitButtonName={submitButtonName}
          initValue={initValue}
          onDirty={onDirty}
        />
      )}
      {quizType === 'radio' && (
        <QuizRadioForm
          onSubmit={onSubmit}
          submitButtonName={submitButtonName}
          initValue={initValue}
          onDirty={onDirty}
        />
      )}
      {quizType === 'checkbox' && (
        <QuizCheckboxForm
          onSubmit={onSubmit}
          submitButtonName={submitButtonName}
          initValue={initValue}
          onDirty={onDirty}
        />
      )}
    </>
  )
}
