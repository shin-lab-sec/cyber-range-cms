import { Flex } from '@mantine/core'
import { MantineReactTable } from 'mantine-react-table'
import type { MRT_ColumnDef } from 'mantine-react-table'
import { NextPage } from 'next'
import Link from 'next/link'
import { useMemo } from 'react'
import { X } from 'tabler-icons-react'

import { Layout } from '@/components/Layout'
import {
  CreateCourseButton,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  CourseWithCurriculums,
  CourseFormRequest,
  UpdateCourseButton,
} from '@/features/course'
import { useGetApi } from '@/hooks/useApi'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<CourseWithCurriculums[]>(`/courses`)

  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()

  const columns = useMemo<MRT_ColumnDef<CourseWithCurriculums>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '名前',
        Cell: ({ row: { original: course } }) => (
          <div className='min-w-200px max-w-400px break-words'>
            <Link href={`/courses/${course.id}`}>{course.name}</Link>
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: '詳細',
        Cell: ({ cell }) => (
          <div className='min-w-300px max-w-600px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'id', // 適当
        header: 'カリキュラム数',
        maxSize: 0,
        Cell: ({
          row: {
            original: { curriculums },
          },
        }) => (
          <div className='max-w-300px break-words'>{curriculums.length}</div>
        ),
      },
      {
        accessorKey: 'level',
        header: '難易度',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: '作成日',
        maxSize: 0,
        Cell: ({ cell }) => String(cell.getValue()).slice(0, 10),
      },
      {
        accessorKey: 'updatedAt',
        header: '最終更新日',
        maxSize: 0,
        Cell: ({ cell }) => String(cell.getValue()).slice(0, 10),
      },
      // 編集・削除ボタンをCellに置く
      {
        header: ' ',
        // 操作出来なくする
        enableColumnActions: false,
        enableColumnDragging: false,
        enableSorting: false,
        maxSize: 0,
        Cell: ({ row: { original: course } }) => {
          const courseFormRequest: CourseFormRequest = {
            name: course.name,
            level: course.level as 1 | 2 | 3,
            description: course.description ?? '',
          }

          return (
            <Flex align='center'>
              <UpdateCourseButton
                onSubmit={v => updateCourse(course.id, v)}
                initValue={courseFormRequest}
              />
              <X
                size={44}
                className='cursor-pointer mt-0.5 p-2.5'
                onClick={() => deleteCourse(course.id)}
              />
            </Flex>
          )
        },
      },
    ],
    [deleteCourse, updateCourse],
  )

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>コース一覧</h1>
        <CreateCourseButton onSubmit={createCourse} />
      </Flex>

      {courses?.length ? (
        <div className='mt-8'>
          <MantineReactTable
            columns={columns}
            data={courses}
            enableColumnOrdering
          />
        </div>
      ) : (
        <p className='mx-auto mt-200px max-w-400px'>
          まだコースが作成されていません。
          <br />
          右上の「新規コース作成」ボタンから作成して下さい。
        </p>
      )}
    </Layout>
  )
}

export default Courses
