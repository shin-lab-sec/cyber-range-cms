import { Flex } from '@mantine/core'
import { NextPage } from 'next'

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

const Courses: NextPage = () => {
  const { data: courses } = useGetApi<CourseWithSections[]>(`/courses`)

  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()

  const [fileContent, setFileContent] = useState(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  }

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>コース一覧</h1>
        <CreateCourseButton onSubmit={createCourse} />
      </Flex>

      <input type='file' accept='.json' onChange={handleFileChange} />
      {fileContent && (
        <div>
          <h2>JSONデータ</h2>
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
