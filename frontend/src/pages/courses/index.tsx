import { Flex } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { MantineReactTable } from 'mantine-react-table'
import type { MRT_ColumnDef } from 'mantine-react-table'
import { NextPage } from 'next'
import Link from 'next/link'
import { useMemo } from 'react'

import { ExportJsonButton } from '@/components/ExportJsonButton'
import { Layout } from '@/components/Layout'
import {
  CreateCourseButton,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  CourseWithSections,
  CourseFormRequest,
  UpdateCourseButton,
} from '@/features/course'
import { useGetApi } from '@/hooks/useApi'
import { convertToJapanTime } from '@/utils/convertToJapanTime'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<CourseWithSections[]>(`/courses`)

  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()

  const columns = useMemo<MRT_ColumnDef<CourseWithSections>[]>(
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
        header: 'セクション数',
        maxSize: 0,
        Cell: ({
          row: {
            original: { sections },
          },
        }) => <div className='max-w-300px break-words'>{sections.length}</div>,
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
        accessorKey: 'imageUrl',
        header: '画像',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
            <img src={String(cell.getValue())} alt='' />
          </div>
        ),
      },
      {
        accessorKey: 'author',
        header: '製作者',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'organization',
        header: '所属',
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
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
      },
      {
        accessorKey: 'updatedAt',
        header: '最終更新日',
        maxSize: 0,
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
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
            imageUrl: course.imageUrl ?? '',
            author: course.author,
            organization: course.organization,
          }

          return (
            <Flex align='center' gap='sm' className='min-w-250px'>
              <ExportJsonButton data={course} fileName={course.name} />
              <UpdateCourseButton
                onSubmit={v => updateCourse(course.id, v)}
                initValue={courseFormRequest}
              />
              <IconX
                size='1.5rem'
                className='cursor-pointer'
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
