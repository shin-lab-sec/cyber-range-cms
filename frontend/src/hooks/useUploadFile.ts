import { useCallback } from 'react'

export const useUploadFile = () => {
  const uploadFile = useCallback(async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const dateString = new Date().toLocaleDateString().replace(/\//g, '')
    const fileName = `${Math.random()}-${dateString}.${fileExt}` // storageに保存する名前
    const contentType = file.type

    try {
      const res = await fetch(
        `https://cms-storage.cypas.sec/images/${fileName}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': contentType,
          },
          body: file,
        },
      )
      console.log('res: ', res)

      return `https://cms-storage.cypas.sec/images/${fileName}`
    } catch (e) {
      console.error(e)
    }
  }, [])

  return { uploadFile }
}
