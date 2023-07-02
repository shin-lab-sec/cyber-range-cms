import { Button, Flex, Tabs } from '@mantine/core'
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react'
import { FC, useState } from 'react'

import { Editor, Preview } from '.'

type Mode = 'edit' | 'preview' | 'live'

type Props = {
  body: string
  onSave: (v: string) => void
  onDelete: () => void
}

export const ArticleEditor: FC<Props> = ({ body, onSave, onDelete }) => {
  const [markdown, setMarkdown] = useState(body)
  const [mode, setMode] = useState<Mode>('live')

  return (
    <div>
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
          <Editor markdown={markdown} setMarkdown={setMarkdown} />
        </div>
        {/* preview、liveでmd以上の時表示する */}
        {(mode === 'preview' || (mode === 'live' && isMdScreen)) && (
          <div className='h-[calc(100vh-290px)] overflow-y-auto'>
            <Preview markdown={markdown} />
          </div>
      </div>

      <Flex mt='sm' gap='sm' justify='end'>
        <Button onClick={onDelete} color='red'>
          このページを削除
        </Button>
        <Button onClick={() => onSave(markdown)}>保存</Button>
      </Flex>
    </div>
  )
}
