import { Flex } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
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
        {section.name} type: {section.type}
        <div className='flex gap-3 items-center'>
          <UpdateSectionButton
            onSubmit={v => onUpdate(section.id, v)}
            initValue={sectionFormRequest}
          />
          <IconX
            size='1.5rem'
            // className='cursor-pointer mt-0.5 p-2.5'
            onClick={() => onDelete(section.id)}
          />
        </div>
      </div>
    </Flex>
  )
}
