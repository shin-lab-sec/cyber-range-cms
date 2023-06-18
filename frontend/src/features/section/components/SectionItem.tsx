import { Flex } from '@mantine/core'
import {
  IconArticle,
  IconBox,
  IconX,
  IconCurrencyQuetzal,
} from '@tabler/icons-react'
import { FC } from 'react'

import { SectionFormRequest } from './SectionForm'
import { UpdateSectionButton } from './UpdateSectionButton'
import { SectionWithUserAgent } from '../types'

type Props = {
  section: SectionWithUserAgent
  onUpdate: (id: string, v: SectionFormRequest) => void
  onDelete: (id: string) => void
}

export const SectionItem: FC<Props> = ({ section, onUpdate, onDelete }) => {
  const sectionFormRequest: SectionFormRequest = {
    name: section.name,
    type: section.type as 'quiz' | 'article' | 'sandbox',
    scenarioGitHubUrl: section.scenarioGitHubUrl ?? '',
    userAgentId: section.userAgentId ?? '',
  }

  return (
    <Flex align='center' gap='sm'>
      <div className='rounded-md flex border-2 shadow-md mb-3 w-full py-4 px-4 items-center justify-between'>
        <Flex align='center' gap='sm'>
          {section.type === 'quiz' && <IconCurrencyQuetzal size='1.5rem' />}
          {section.type === 'article' && <IconArticle size='1.5rem' />}
          {section.type === 'sandbox' && <IconBox size='1.5rem' />}

          {section.name}
        </Flex>
        <Flex align='center' gap='sm'>
          <UpdateSectionButton
            onSubmit={v => onUpdate(section.id, v)}
            initValue={sectionFormRequest}
          />
          <IconX size='1.5rem' onClick={() => onDelete(section.id)} />
        </Flex>
      </div>
    </Flex>
  )
}
