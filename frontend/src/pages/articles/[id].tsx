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

  if (!article || !id) {
    return (
      <div className='h-screen grid place-items-center'>
        <Loader size='lg' />
        <style jsx global>
          {`
            body {
              background-color: #141517;
            }
          `}
        </style>
      </div>
    )
  }
  return (
    <>
      <div className='max-w-800px'>
        <Preview markdown={article.body} />
      </div>

      {/* ZennのPreviewをダークモードに */}
      <style jsx global>{`
        body {
          background-color: #141517;
        }
        .znc {
          background-color: #141517;
          color: #c1c2c5;
        }
        .znc h1,
        .znc h2 {
          border-color: #373a40;
        }

        .znc ul > li::marker,
        .znc ol > li::marker {
          color: #c1c2c5;
        }
        .znc hr {
          border-color: #373a40;
        }
        .znc blockquote {
          color: #c1c2c5;
        }
        .znc th {
          background: #323e52;
          border-color: #373a40;
        }
        .znc td {
          background: #141517;
          border-color: #373a40;
        }
        .znc pre {
          border: solid 1px #323e52;
        }
        .znc summary {
          background: #141517;
          border-color: #373a40;
        }
        .znc details[open] summary {
          background: #323e52;
        }
        .znc .details-content {
          background: #141517;
        }
      `}</style>
      {/* c1c2c5 文字 */}
      {/* 141517 背景 */}
      {/* 373a40 border */}
      {/* 323e52 code, 微妙に明るい色 */}
    </>
  )
}

export default ArticlePage
