import { NextPage } from 'next'
import Image from 'next/image'
import { ChangeEvent, useCallback, useState } from 'react'

import { Layout } from '@/components/Layout'
import { useUploadFile } from '@/hooks/useUploadFile'

const Minio: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const { uploadFile } = useUploadFile()

  const onChangeFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      // file選択していない
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0] // 1つでも配列になる

      const url = await uploadFile(file)
      if (url) setImageUrl(url)
    },
    [uploadFile],
  )

  return (
    <Layout>
      <div>minoo</div>
      <input type='file' onChange={onChangeFile} />
      {imageUrl && (
        <>
          <img src={imageUrl} alt='' />
          <Image src={imageUrl} alt='' width={200} height={200} />
        </>
      )}
      <img
        src='https://cms-storage.cypas.sec/images/0.9887783384628193-2023525.jpg'
        alt=''
      />
    </Layout>
  )
}

export default Minio
