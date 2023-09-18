import { Button } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { FC } from 'react'

type Props = {
  data: any
  fileName: string
}

export const ExportJsonButton: FC<Props> = ({ data, fileName }) => {
  const fileNameWithJson = `${fileName}.json`
  const blobData = new Blob([JSON.stringify(data)], {
    type: 'text/json',
  })
  const jsonURL = URL.createObjectURL(blobData)

  return (
    <Button
      component='a'
      href={jsonURL}
      download={fileNameWithJson}
      leftIcon={<IconUpload size='1.5rem' />}
      variant='default'
    >
      エクスポート
    </Button>
  )
}
