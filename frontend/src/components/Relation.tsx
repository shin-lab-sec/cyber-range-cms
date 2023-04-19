import { FC, useCallback, useEffect, useState } from 'react'
import { Course, CourseCurriculumRelation } from '@prisma/client'
import { useGetApi } from '../hooks/useApi'

export const Relation: FC = () => {
  const { data: courses } =
    useGetApi<CourseCurriculumRelation[]>(`/samples/all`)

  return (
    <div>
      <h2>Relation</h2>
      <ul>
        {courses?.map(c => (
          <li key={`${c.courseId} ${c.curriculumId}`}>
            {c.courseId}, {c.curriculumId}
          </li>
        ))}
      </ul>
    </div>
  )
}
