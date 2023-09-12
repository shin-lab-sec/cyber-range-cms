import { IconDownload } from '@tabler/icons-react'
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
    <a href={jsonURL} download={fileNameWithJson} className='flex'>
      エクスポート
      <IconDownload size='1.5rem' className='cursor-pointer' />
    </a>
  )
}
