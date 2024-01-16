import { Tabs } from '@mantine/core'
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react'
import { NextPage } from 'next'
import { useState } from 'react'

import { Layout } from '@/components/Layout'
import { Editor, Preview } from '@/features/article'

type Mode = 'edit' | 'preview' | 'live'

// テストページ
const Minio: NextPage = () => {
  const [markdown, setMarkdown] = useState('')
  const [mode, setMode] = useState<Mode>('live')

  return (
    <Layout>
      <Tabs
        variant='outline'
        defaultValue='live'
        onTabChange={(v: Mode) => setMode(v)}
      >
        <Tabs.List>
          <Tabs.Tab value='edit' icon={<IconPhoto size='0.8rem' />}>
            Edit
          </Tabs.Tab>
          <Tabs.Tab value='preview' icon={<IconMessageCircle size='0.8rem' />}>
            Preview
          </Tabs.Tab>
          <Tabs.Tab
            value='live'
            icon={<IconSettings size='0.8rem' />}
            className='hidden md:flex'
          >
            Live
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <div
        className={`break-words ${
          mode === 'live' && 'md:(grid grid-cols-2 gap-3)'
        }`}
      >
        <div className={`${mode === 'preview' && 'hidden'}`}>
          <Editor body={markdown} setMarkdown={setMarkdown} />
        </div>
        <div
          className={`max-h-[calc(100vh-140px)] overflow-y-auto ${
            mode === 'edit' && 'hidden'
          } ${mode === 'live' && 'hidden md:block'}`}
        >
          <Preview markdown={markdown} />
        </div>
      </div>
    </Layout>
  )
}

export default Minio
