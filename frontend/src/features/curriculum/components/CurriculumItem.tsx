import { Curriculum } from '@prisma/client'
import { FC } from 'react'
import { X } from 'tabler-icons-react'

import { CurriculumFormRequest } from './CurriculumForm'
import { UpdateCurriculumButton } from './UpdateCurriculumButton'

type Props = {
  curriculum: Curriculum
  onUpdate: (id: string, v: CurriculumFormRequest) => void
  onDelete: (id: string) => void
}

export const CurriculumItem: FC<Props> = ({
  curriculum,
  onUpdate,
  onDelete,
}) => {
  const curriculumFormRequest: CurriculumFormRequest = {
    name: curriculum.name,
    gitHubUrl: curriculum.gitHubUrl ?? '',
    imageUrl: curriculum.imageUrl ?? '',
    articleUrl: curriculum.articleUrl ?? '',
    description: curriculum.description ?? '',
    userAgentId: curriculum.userAgentId,
  }
  return (
    <tr key={curriculum.id} className='break-words'>
      <td className='min-w-300px max-w-400px'>{curriculum.name}</td>
      <td className='min-w-300px max-w-400px'>{curriculum.description}</td>
      <td className='max-w-200px'>{curriculum.gitHubUrl}</td>
      <td className='max-w-200px'>{curriculum.imageUrl}</td>
      <td className='max-w-200px'>{curriculum.articleUrl}</td>
      <td className='text-center min-w-100px'>
        {String(curriculum.createdAt).slice(0, 10)}
      </td>
      <td className='text-center min-w-100px'>
        {String(curriculum.updatedAt).slice(0, 10)}
      </td>

      <td>
        <UpdateCurriculumButton
          onSubmit={v => onUpdate(curriculum.id, v)}
          initValue={curriculumFormRequest}
        />
      </td>
      <td>
        <X
          size={44}
          className='cursor-pointer mt-0.5 p-2.5'
          onClick={() => onDelete(curriculum.id)}
        />
      </td>
    </tr>
  )
}
