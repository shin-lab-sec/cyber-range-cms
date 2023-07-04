import { useCallback } from 'react'

import { useUploadFile } from '@/hooks/useUploadFile'

// textareaのカーソルの位置に文字を追加した結果を返す
const insertToTextArea = (insertString: string) => {
  const textarea = document.querySelector('textarea')
  if (!textarea) return ''

  let sentence = textarea.value
  const len = sentence.length
  const pos = textarea.selectionStart
  const end = textarea.selectionEnd

  const front = sentence.slice(0, pos)
  const back = sentence.slice(pos, len)

  sentence = front + insertString + back

  // 複数ペーストする際に必要
  textarea.value = sentence
  textarea.selectionEnd = end + insertString.length

  return sentence
}

export default insertToTextArea

// TODO: uploadFileをAPIにする
// 画像をアップロードして、そのリンクをeditorに追加
export const usePasteImage = () => {
  const { uploadFile } = useUploadFile()

  const pasteImage = useCallback(
    async (dataTransfer: DataTransfer, setValue: (v: string) => void) => {
      // 複数の画像のペーストにも対応
      const files: File[] = []
      for (let index = 0; index < dataTransfer.items.length; index++) {
        const file = dataTransfer.files.item(index)

        if (file) files.push(file)
      }

      await Promise.all(
        files.map(async file => {
          const url = (await uploadFile(file)) || ''
          setValue(insertToTextArea(`![](${url})`))
        }),
      )
    },
    [uploadFile],
  )

  return { pasteImage }
}
