import { ThemeIcon } from '@mantine/core'
import { IconCurrencyQuetzal, IconArticle, IconBox } from '@tabler/icons-react'
import { FC, useState } from 'react'

import { SectionArticleForm } from './SectionArticleForm'
import { SectionQuizForm } from './SectionQuizForm'
import { SectionSandboxForm } from './SectionSandboxForm'
import { SectionFormRequest } from '../../types'

type Props = {
  onSubmit: (params: SectionFormRequest) => void
  submitButtonName?: string
  initValue?: SectionFormRequest
  onDirty: () => void
}

export const SectionForm: FC<Props> = ({
  onSubmit,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const [sectionType, setSectionType] = useState(initValue?.type)

  if (!sectionType) {
    return (
      <>
        <p className='text-center'>セクションのタイプを選択して下さい</p>
        <div className='mt-4 text-sm grid gap-3 grid-cols-3'>
          <div
            className='border rounded-md cursor-pointer flex flex-col bg-[#FEF5F4] shadow-md p-2 gap-1 duration-300 items-center'
            onClick={() => setSectionType('quiz')}
          >
            <ThemeIcon color='red' size='lg' variant='light' radius='md'>
              <IconCurrencyQuetzal size='2rem' />
            </ThemeIcon>
            テスト
          </div>
          <div
            className='border rounded-md cursor-pointer flex flex-col bg-[#E7F4FE] shadow-md p-2 gap-1 duration-300 items-center'
            onClick={() => setSectionType('article')}
          >
            <ThemeIcon color='blue' size='lg' variant='light' radius='md'>
              <IconArticle size='2rem' />
            </ThemeIcon>
            解説記事
          </div>
          <div
            className='border rounded-md cursor-pointer flex flex-col bg-[#F2F0FE] shadow-md p-2 gap-1 duration-300 items-center'
            onClick={() => setSectionType('sandbox')}
          >
            <ThemeIcon color='violet' size='lg' variant='light' radius='md'>
              <IconBox size='2rem' />
            </ThemeIcon>
            サンドボックス
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {sectionType === 'quiz' && (
        <SectionQuizForm
          onSubmit={onSubmit}
          submitButtonName={submitButtonName}
          initValue={initValue}
          onDirty={onDirty}
        />
      )}
      {sectionType === 'article' && (
        <SectionArticleForm
          onSubmit={onSubmit}
          submitButtonName={submitButtonName}
          initValue={initValue}
          onDirty={onDirty}
        />
      )}
      {sectionType === 'sandbox' && (
        <SectionSandboxForm
          onSubmit={onSubmit}
          submitButtonName={submitButtonName}
          initValue={initValue}
          onDirty={onDirty}
        />
      )}
    </>
  )
}
