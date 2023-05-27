import { NextPage } from 'next'
import { useState } from 'react'

import { Layout } from '@/components/Layout'
import { Editor, Preview } from '@/features/editor'

const Minio: NextPage = () => {
  const [markdown, setMarkdown] = useState('')

  return (
    <Layout>
      <Editor onPreview={v => setMarkdown(v)} />

      <Preview markdown={markdown} />
    </Layout>
  )
}

export default Minio
