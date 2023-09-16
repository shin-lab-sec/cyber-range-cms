import { Loader } from '@mantine/core'
import { Article } from '@prisma/client'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'

import { Preview } from '@/features/article'
import { useGetApi } from '@/hooks/useApi'

const ArticlePage: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || '' // 一回目のレンダリングで正常なidが取得できる
  const ref = useRef<HTMLIFrameElement>(null)

  const { data: article } = useGetApi<Article>(`/articles/${id}`)

  // iframeで呼び出す側に高さを渡す
  useLayoutEffect(() => {
    if (!ref.current) return

    const height = ref.current.clientHeight
    const sendEmbedSizeInfo = () => {
      window.parent.postMessage(
        {
          height,
        },
        '*',
      )
    }

    sendEmbedSizeInfo()
    window.addEventListener('resize', sendEmbedSizeInfo)
    return () => window.removeEventListener('resize', sendEmbedSizeInfo)
  }, [article]) // articleが取得した時に発火させる

  if (!article || !id) {
    return (
      <div className='h-screen bg-[#141517] grid place-items-center'>
        <Loader size='lg' />
      </div>
    )
  }

  return (
    <>
      <div className='max-w-800px' ref={ref}>
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
