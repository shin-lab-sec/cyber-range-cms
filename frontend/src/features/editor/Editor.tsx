import dynamic from 'next/dynamic'
import { FC, SetStateAction } from 'react'

import { usePasteImage } from './usePasteImage'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Props = {
  markdown: string
  setMarkdown: (v: SetStateAction<string>) => void
}
export const Editor: FC<Props> = ({ markdown, setMarkdown }) => {
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
    </div>
  )
}
