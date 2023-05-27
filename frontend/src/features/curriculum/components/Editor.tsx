import dynamic from 'next/dynamic'
import { useState } from 'react'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export const Editor = () => {
  const [markdown, setMarkdown] = useState<string | undefined>('')

  console.log(markdown)

  return (
    <div data-color-mode='light'>
      <MDEditor
        value={markdown}
        onChange={value => {
          setMarkdown(value)
        }}
        height={440}
        textareaProps={{
          placeholder: 'Fill in your markdown for the coolest of the cool.',
        }}
        // hideToolbar
        preview='edit'
      />
    </div>
  )
}
