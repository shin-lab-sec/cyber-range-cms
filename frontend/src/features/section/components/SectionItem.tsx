import { Button, Flex, ThemeIcon } from '@mantine/core'
import { IconArticle, IconBox, IconCurrencyQuetzal } from '@tabler/icons-react'
import Link from 'next/link'
import { FC } from 'react'

import { ConfirmButton } from '@/components/ConfirmButton'
import { ExportJsonButton } from '@/components/ExportJsonButton'
import { SectionWithRelation } from '@/types'

import { UpdateSectionButton } from './UpdateSectionButton'
import { SectionFormRequest } from '../types'

type Props = {
  courseId: string
  section: SectionWithRelation
  onUpdate: (id: string, v: SectionFormRequest) => void
  onDelete: (id: string) => void
}

export const SectionItem: FC<Props> = ({
  courseId,
  section,
  onUpdate,
  onDelete,
}) => {
  // Propsの値をSectionFormRequestに変換
  const sectionFormRequest: SectionFormRequest = {
    name: section.name,
    type: section.type as 'quiz' | 'article' | 'sandbox',
    scenarioGitHubUrl: section.scenarioGitHubUrl ?? '',
    userAgentId: section.userAgentId ?? '',
  }

  return (
    <Flex align='center' gap='sm'>
      <div className='rounded-md flex border-2 shadow-md w-full py-4 px-4 items-center justify-between'>
        {/* セクションタイプ毎のアイコン */}
        <Flex align='center' gap='sm'>
          {section.type === 'quiz' && (
            <ThemeIcon color='red' size='lg' variant='light' radius='md'>
              <IconCurrencyQuetzal size='1.5rem' />
            </ThemeIcon>
          )}
          {section.type === 'article' && (
            <ThemeIcon color='blue' size='lg' variant='light' radius='md'>
              <IconArticle size='1.5rem' />
            </ThemeIcon>
          )}
          {section.type === 'sandbox' && (
            <ThemeIcon color='violet' size='lg' variant='light' radius='md'>
              <IconBox size='1.5rem' />
            </ThemeIcon>
          )}
          <Link href={`/courses/${courseId}/${section.id}`}>
            {section.name}
          </Link>
        </Flex>

        <Flex align='center' gap='sm'>
          <ExportJsonButton data={section} fileName={section.name} />
          {/* 更新モーダル表示ボタン */}
          <UpdateSectionButton
            onSubmit={v => onUpdate(section.id, v)}
            initValue={sectionFormRequest}
          />

          {/* 削除ボタン */}
          <ConfirmButton
            confirmMessage={`セクション: "${section.name}" を削除しますか？`}
            onConfirm={() => onDelete(section.id)}
          >
            <Button component='span' color='red'>
              削除
            </Button>
          </ConfirmButton>
        </Flex>
      </div>
    </Flex>
  )
}
