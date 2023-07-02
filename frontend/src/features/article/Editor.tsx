import dynamic from 'next/dynamic'
import { FC, useState } from 'react'

import { usePasteImage } from './usePasteImage'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Props = {
  body?: string
  onSave?: () => void
  onDirty?: () => void
  setMarkdown?: (v: string) => void
}
export const Editor: FC<Props> = ({
  body = '',
  onSave,
  onDirty,
  setMarkdown,
}) => {
  const [text, setText] = useState(body)
  const { pasteImage } = usePasteImage()

  return (
    <div>
      <div data-color-mode='light' className='h-[calc(100vh-290px)] '>
        <MDEditor
          value={text}
          onChange={value => {
            setText(value || '')
            setMarkdown?.(value || '')
            onDirty?.()
          }}
          height='100%'
          textareaProps={{
            placeholder: 'Fill in your text for the coolest of the cool.',
          }}
          hideToolbar
          preview='edit'
          onPaste={async e => {
            await pasteImage(e.clipboardData, setText)
            // 範囲選択していたら、リンク追加処理もする
          }}
          onDrop={async e => {
            e.preventDefault() // 画像を別タブで表示しない
            await pasteImage(e.dataTransfer, setText)
          }}
          onKeyDown={e => {
            if (e.ctrlKey && e.code === 'KeyS') {
              e.preventDefault()
              onSave?.()
              console.log('Controlボンバー')
            }
          }}
        />
      </div>
    </div>
  )
}
