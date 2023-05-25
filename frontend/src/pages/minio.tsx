import { NextPage } from 'next'
// import Image from 'next/image'
// import LegacyImage from 'next/legacy/image'
import { ChangeEvent, useCallback, useState } from 'react'

const Minio: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const uploadFile = useCallback(
    async (file: File, fileName: string, contentType: string) => {
      console.log(file, fileName, contentType)

      try {
        const res = await fetch(`http://localhost:8003/aaaa/${fileName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': contentType,
          },
          body: file,
        })
        console.log('res: ', res)
        setImageUrl(`http://localhost:8003/aaaa/${fileName}`)
      } catch (e) {
        console.error(e)
      }
    },
    [],
  )

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log('file: ', e, e.target.files)
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select the image file')
      }

      const file = e.target.files[0] // 1つでも配列になる
      const fileExt = file.name.split('.').pop()
      const dateString = new Date().toLocaleDateString().replace(/\//g, '')
      const fileName = `${Math.random()}-${dateString}.${fileExt}` // storageに保存する名前
      const contentType = file.type

      uploadFile(file, fileName, contentType)
    },
    [uploadFile],
  )

  return (
    <>
      <div>minoo</div>

      <input type='file' onChange={onChangeFile} />

      {imageUrl && <img src={imageUrl} alt='' />}
      {/* <Image
        src='https://source.unsplash.com/AwUIE3DdfGE'
        width={400}
        height={400}
        alt=''
      />

      <Image
        src='http://localhost:8003/aaaa/BlueHush.png'
        width={400}
        height={400}
        alt=''
      />
      <LegacyImage
        src='http://localhost:8003/aaaa/BlueHush.png'
        width={400}
        height={400}
        alt=''
      /> */}

      {/* <img src='http://localhost:8003/aaaa/BlueHush.png' alt='' /> */}
    </>
  )
}

export default Minio
