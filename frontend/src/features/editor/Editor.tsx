import { Button, Flex } from '@mantine/core'
import dynamic from 'next/dynamic'
import { FC, useState } from 'react'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Props = {
  onPreview: (v: string) => void
}
export const Editor: FC<Props> = ({ onPreview }) => {
  const [markdown, setMarkdown] = useState<string | undefined>('')

  return (
    <div>
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
          preview='edit'
        />
      </div>

      <Flex justify='end' mt='sm'>
        <Button onClick={() => onPreview(markdown || '')}>プレビュー</Button>
      </Flex>
    </div>
  )
}
