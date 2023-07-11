import { Loader } from '@mantine/core'
import { Article } from '@prisma/client'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'

import { Preview } from '@/features/article'
import { useGetApi } from '@/hooks/useApi'

const ArticlePage: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || '' // 一回目のレンダリングで正常なidが取得できる

  const { data: article } = useGetApi<Article>(`/articles/${id}`)

  console.log('article: ', article)

  if (!article || !id) {
    return (
      <div className='h-screen grid place-items-center'>
        <Loader />
      </div>
    )
  }
  return (
    <div className='max-w-800px'>
      <style jsx global>{`
        .znc {
          background-color: #141517;
          color: #c1c2c5;
          border: none;
          padding: 8px;
          border-radius: 8px;
        }
      `}</style>
      <Preview markdown={article.body} />
    </div>
  )
}

export default ArticlePage
