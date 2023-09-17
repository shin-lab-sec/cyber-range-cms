import { FileInput, Flex, Loader } from '@mantine/core'
import {
  IconCircleCheck,
  IconDownload,
  IconExclamationMark,
} from '@tabler/icons-react'
import { NextPage } from 'next'
import { useCallback, useMemo, useState } from 'react'

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

// FIXME: cleanはdefaultでもいいかな？
type FileInputState = 'clean' | 'saving' | 'saved' | 'error'

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<CourseWithSections[]>(`/courses`)
  const [fileInputStatus, setFileInputStatus] =
    useState<FileInputState>('clean')

  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()

  const createCourseWithRelation = useCallback(async (fileContent: any) => {
    try {
      setFileInputStatus('saving')
      const res = await postApi('/courses/bulk', fileContent)
      console.log('res: ', res)
      setFileInputStatus('saved')

      setTimeout(() => {
        setFileInputStatus('clean')
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        alert(
          `コースの作成に失敗しました。\n以下が原因である可能性があるので、内容を確認し再度お試しください。\n
- コースの名前(name)・制作者(author)・所属(organization)の組み合わせが既に存在する。
- 必須項目が抜けている。
- 項目の値に誤りがある。
\n 以下はエラー内容です${err.message}`,
        )

        console.error(
          'コースの作成に失敗しました。\n',
          '以下が原因である可能性があるので、内容を確認し再度お試しください。\n',
          '- コースの名前(name)・制作者(author)・所属(organization)の組み合わせが既に存在する。\n',
          '- 必須項目が抜けている。\n',
          '- 項目の値に誤りがある。\n\n',
          '以下はエラー内容です\n',
          err.message,
        ),
          setFileInputStatus('error')

        return
      }
    }
  }, [])

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (!file) return
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
          console.error(
            'JSONファイルを解析できませんでした。\n内容を確認して再度お試しください。',
            error,
          )
          return
        }
      }
      reader.readAsText(file)
    },
    [createCourseWithRelation],
  )

  const fileInputIcon = useMemo(() => {
    if (fileInputStatus === 'saving') return <Loader size='sm' color='gray' />
    if (fileInputStatus === 'error')
      return (
        <IconExclamationMark
          color='red'
          className='border rounded-full border-red-500'
        />
      )
    if (fileInputStatus === 'saved') return <IconCircleCheck color='green' />

    return <IconDownload />
  }, [fileInputStatus])

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>コース一覧</h1>
        <Flex gap='sm' align='center'>
          <FileInput
            placeholder='コースをインポート'
            accept='.json'
            icon={fileInputIcon}
            classNames={{
              // wrapper: 'border border-black rounded-md',
              placeholder: 'text-black',
              icon: 'text-black',
            }}
            error={fileInputStatus === 'error' ? true : false}
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
