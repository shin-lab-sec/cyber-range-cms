import { FC, useCallback, useEffect, useState } from 'react'
import { useGetApi } from '../hooks/useApi'

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
      <h2>Relation</h2>
      <ul>
        {relations?.map(c => (
          <li key={`${c.courseId} ${c.curriculumId}`}>
            {c.courseName}, {c.curriculumName}
          </li>
        ))}
      </ul>
    </div>
  )
}
