// import { Button, Flex } from '@mantine/core'
import dynamic from 'next/dynamic'
// import { FC, useState } from 'react'
import { FC, SetStateAction } from 'react'

import { usePasteImage } from './usePasteImage'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Props = {
  markdown: string
  setMarkdown: (v: SetStateAction<string>) => void
  onPreview: (v: string) => void
}
export const Editor: FC<Props> = ({ markdown, setMarkdown, onPreview }) => {
  // const [markdown, setMarkdown] = useState<string>('')

  const { pasteImage } = usePasteImage()

  return (
    <div>
      <div data-color-mode='light' className='h-[calc(100vh-140px)] '>
        <MDEditor
          value={markdown}
          onChange={value => {
            setMarkdown(value || '')
          }}
          height='100%'
          textareaProps={{
            placeholder: 'Fill in your markdown for the coolest of the cool.',
          }}
          hideToolbar
          preview='edit'
          onPaste={async e => {
            await pasteImage(e.clipboardData, setMarkdown)
            // 範囲選択していたら、リンク追加処理もする
          }}
          onDrop={async e => {
            e.preventDefault() // 画像を別タブで表示しない
            await pasteImage(e.dataTransfer, setMarkdown)
          }}
        />
      </div>

      {/* <Flex justify='end' mt='sm'>
        <Button onClick={() => onPreview(markdown || '')}>プレビュー</Button>
      </Flex> */}
    </div>
  )
}
