import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'

import { Layout } from '@/components/Layout'
import {
  SectionWithRelation,
  SectionArticles,
  SectionQuizzes,
} from '@/features/section'
import { useGetApi } from '@/hooks/useApi'

const Courses: NextPage = () => {
  const searchParams = useSearchParams()
  const sectionId = searchParams.get('sectionId') || ''
  const { data: section } = useGetApi<SectionWithRelation>(
    `/sections/${sectionId}`,
  )

  if (!section || !sectionId) {
    return (
      <Layout>
        <p className='mt-200px text-center '>このセクションは存在しません</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>
        {section.name}
        {section.type === 'quiz' && 'の問題一覧'}
        {section.type === 'article' && 'の記事一覧'}
        {section.type === 'sandbox' && 'の記事一覧'}
      </h1>
      <div>
        {section.type === 'quiz' && (
          <div>
            <SectionQuizzes section={section} />
          </div>
        )}
        {section.type === 'article' && (
          <div>
            <SectionArticles section={section} />
          </div>
        )}
        {section.type === 'sandbox' && (
          <div>
            <SectionArticles section={section} />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Courses
