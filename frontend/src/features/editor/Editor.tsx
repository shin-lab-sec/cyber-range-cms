import { Button, Flex } from '@mantine/core'
import dynamic from 'next/dynamic'
import { FC, useState } from 'react'

import { usePasteImage } from './usePasteImage'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Props = {
  onPreview: (v: string) => void
}
export const Editor: FC<Props> = ({ onPreview }) => {
  const [markdown, setMarkdown] = useState<string>('')

  const { pasteImage } = usePasteImage()

  return (
    <div>
      <div data-color-mode='light'>
        <MDEditor
          value={markdown}
          onChange={value => {
            setMarkdown(value || '')
          }}
          height={440}
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

      <Flex justify='end' mt='sm'>
        <Button onClick={() => onPreview(markdown || '')}>プレビュー</Button>
      </Flex>
    </div>
  )
}
