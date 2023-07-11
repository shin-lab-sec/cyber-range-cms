import { Button, Flex, Loader, Tabs } from '@mantine/core'
import { useMediaQuery, useDebouncedState } from '@mantine/hooks'
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react'
import { FC, useCallback, useState } from 'react'

import { Editor, Preview } from '.'

type Mode = 'edit' | 'preview' | 'live'
type EditorState = 'clean' | 'dirty' | 'saving' | 'saved'
type Props = {
  body: string
  onSave: (v: string) => void
  onDelete: () => void
}

export const ArticleEditor: FC<Props> = ({ body, onSave, onDelete }) => {
  // setの間隔が500ms以上で、debouncedに反映される
  const [markdown, setMarkdown] = useDebouncedState(body, 500)
  const [mode, setMode] = useState<Mode>('live')
  const [editorState, setEditorState] = useState<EditorState>('clean')
  const isMdScreen = useMediaQuery('(min-width: 768px)')

  const onClickSave = useCallback(async () => {
    if (editorState !== 'dirty') return

    setEditorState('saving')
    await onSave(markdown)
    setEditorState('saved')

    setTimeout(() => {
      setEditorState('clean')
    }, 2000)
  }, [markdown, editorState, onSave])

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
          <Editor
            body={body}
            setMarkdown={(v: string) => setMarkdown(v)}
            onSave={onClickSave}
            onDirty={() => setEditorState('dirty')}
          />
        </div>
        {/* preview、liveでmd以上の時表示する */}
        {(mode === 'preview' || (mode === 'live' && isMdScreen)) && (
          <div className='h-[calc(100vh-290px)] overflow-y-auto'>
            <Preview markdown={markdown} />
          </div>
        )}
      </div>

      <Flex mt='sm' gap='sm' justify='end'>
        <Button onClick={onDelete} color='red'>
          このページを削除
        </Button>
        <Button
          onClick={onClickSave}
          color={editorState === 'saved' ? 'green' : 'blue'}
          disabled={editorState === 'clean'}
          leftIcon={
            editorState === 'saving' && <Loader size='sm' color='gray' />
          }
        >
          {(editorState === 'clean' || editorState === 'dirty') && '保存'}
          {editorState === 'saving' && '保存中...'}
          {editorState === 'saved' && '保存しました！'}
        </Button>
      </Flex>
    </div>
  )
}
