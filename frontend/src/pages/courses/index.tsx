import { Flex } from '@mantine/core'
import { NextPage } from 'next'

import { ImportFileInput } from '@/components/ImportFileInput'
import { Layout } from '@/components/Layout'
import {
  CreateCourseButton,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  CourseTable,
  useCreateCourseWithRelation,
} from '@/features/course'
import { useGetApi } from '@/hooks/useApi'
import { courseWithRelationSchema } from '@/libs/validates'
import { CourseWithSections } from '@/types'

// coursesページ
const Courses: NextPage = () => {
  // コース一覧を取得
  const { data: courses } = useGetApi<CourseWithSections[]>(`/courses`)

  // コースの作成、更新、削除、まとめて作成関数
  const { createCourse } = useCreateCourse()
  const { updateCourse } = useUpdateCourse()
  const { deleteCourse } = useDeleteCourse()
  const { createWithRelationCourse } = useCreateCourseWithRelation()

  return (
    <Layout>
      <Flex gap='sm' justify='space-between' align='center'>
        <h1>コース一覧</h1>
        <Flex gap='sm' align='center'>
          {/* JSONファイルで作成するInput */}
          <ImportFileInput
            createData={createWithRelationCourse}
            validateSchema={courseWithRelationSchema}
          />
          {/* コース作成モーダルボタン */}
          <CreateCourseButton onSubmit={createCourse} />
        </Flex>
      </Flex>

      {/* コース存在すれば、一覧をテーブルで表示 */}
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
