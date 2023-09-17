import { FileInput, Flex } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { NextPage } from 'next'
import { useCallback } from 'react'

import { Layout } from '@/components/Layout'
import {
  CreateCourseButton,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  CourseTable,
} from '@/features/course'
import { useGetApi } from '@/hooks/useApi'
import { CourseWithSections } from '@/types'
import { postApi } from '@/utils/api'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<CourseWithSections[]>(`/courses`)

  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()

  const createCourseWithRelation = useCallback(async (fileContent: any) => {
    try {
      const res = await postApi('/courses/bulk', fileContent)
      console.log('res: ', res)
    } catch (err) {
      if (err instanceof Error) {
        alert(
          `コースの作成に失敗しました。\n以下が原因である可能性があるので、内容を確認し再度お試しください。\n
- コースの名前(name)・制作者(author)・所属(organization)の組み合わせが既に存在する。
- 必須項目が抜けている。
- 項目の値に誤りがある。
\n 以下はエラー内容です${err.message}`,
        )
        return
      }
    }
  }, [])

  const handleFileChange = useCallback(
    async (file: File) => {
      const reader = new FileReader()

      // ファイルの中身を解析
      reader.onload = event => {
        const content = event?.target?.result
        try {
          const jsonData = JSON.parse(content as string) // 中身をJSONパースする
          createCourseWithRelation(jsonData) // 中身を元にコースを作成
        } catch (error) {
          alert(
            `JSONファイルを解析できませんでした。\n内容を確認して再度お試しください。\n${error}`,
          )
          return
        }
      }
      reader.readAsText(file)
    },
    [createCourseWithRelation],
  )

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>コース一覧</h1>
        <Flex gap='sm' align='center'>
          <FileInput
            placeholder='コースをインポート'
            accept='.json'
            icon={<IconDownload />}
            classNames={{
              root: 'border border-black rounded-md',
              placeholder: 'text-black',
              icon: 'text-black',
            }}
            onChange={handleFileChange}
          />
          <CreateCourseButton onSubmit={createCourse} />
        </Flex>
      </Flex>

      {courses?.length ? (
        <div className='mt-8'>
          <CourseTable
            courses={courses}
            updateCourse={updateCourse}
            deleteCourse={deleteCourse}
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
