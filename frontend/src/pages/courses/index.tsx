import { FileInput, Flex } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { NextPage } from 'next'
import { ChangeEvent, useCallback, useState } from 'react'

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

  const [fileContent, setFileContent] = useState<HTMLInputElement | null>(null)

  const createCourseWithRelation = useCallback(async () => {
    try {
      const res = await postApi('/courses/bulk', fileContent)
      console.log('res: ', res)
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
        return
      }
    }
  }, [fileContent])

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error('JSONファイルを選択して下さい')
      return
    }

    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      const content = event?.target?.result
      try {
        const jsonData = JSON.parse(content as string)
        setFileContent(jsonData)
      } catch (error) {
        console.error('JSONファイルを解析できませんでした。', error)
      }
    }
    reader.readAsText(file)
  }, [])
  const handleFileChange2 = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = event => {
      const content = event?.target?.result
      try {
        const jsonData = JSON.parse(content as string)
        setFileContent(jsonData)
      } catch (error) {
        console.error('JSONファイルを解析できませんでした。', error)
      }
    }
    reader.readAsText(file)
  }, [])

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>コース一覧</h1>
        <Flex gap='sm' align='center'>
          <FileInput
            placeholder='コースをインポート'
            accept='.json'
            icon={<IconDownload />}
            variant='unstyled'
            classNames={{
              placeholder: 'text-black',
              icon: 'text-black',
            }}
            onChange={handleFileChange2}
          />
          <CreateCourseButton onSubmit={createCourse} />
          {/* <Button onClick={createCourseWithRelation}>インポートコース</Button> */}

          {/* <FileInput
            placeholder='コースをインポート'
            accept='.json'
            icon={<IconDownload />}
            classNames={{
              root: 'border border-black rounded-md w-fit',
              placeholder: 'text-black',
              icon: 'text-black',
            }}
            onChange={handleFileChange2}
          /> */}
        </Flex>
      </Flex>

      {/* <input type='file' accept='.json' onChange={handleFileChange} /> */}

      {/* <label htmlFor='file'>
        <button className='flex items-center'>
          コースをインポート
          <IconDownload />
        </button>
      </label>

      <label tabIndex={0}>
        <span>コースをインポート</span>
        <IconDownload />
        <input
          type='file'
          id='file'
          accept='.json'
          onChange={handleFileChange}
          // className='hidden'
          className='opacity-0'
        />
      </label> */}

      {fileContent && (
        <div>
          <h2>JSONデータ</h2>
          <p>filename:</p>
          <pre>{JSON.stringify(fileContent, null, 2)}</pre>
        </div>
      )}

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
