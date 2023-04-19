import { FC, useCallback, useEffect, useState } from 'react'
import { useGetApi } from '../hooks/useApi'
import { List } from '@mantine/core'

type CourseCurriculumRelation = {
  courseId: string
  curriculumId: string
  courseName: string
  curriculumName: string
}

export const Relation: FC = () => {
  const { data: relations } =
    useGetApi<CourseCurriculumRelation[]>(`/samples/all`)

  return (
    <div>
      <h2 className='text-xl'>Relation</h2>
      <List withPadding mt='sm'>
        {relations?.map(c => (
          <List.Item key={`${c.courseId} ${c.curriculumId}`}>
            ○ {c.courseName}, {c.curriculumName}
          </List.Item>
        ))}
      </List>
    </div>
  )
}
