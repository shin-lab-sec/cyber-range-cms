import { useCallback } from 'react'
import { z } from 'zod'

import { fileUploadSchema } from '@/libs/validates/fileUpload'

type FileUpload = z.infer<typeof fileUploadSchema>

export const useUploadFile = () => {
  const uploadFile = useCallback(async (params: FileUpload) => {
    const { file, name, contentType } = params

    try {
      const res = await fetch(`http://localhost:8003/images/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: file,
      })
      console.log('res: ', res)

      return `http://localhost:8003/images/${name}`
    } catch (e) {
      console.error(e)
    }
  }, [])

  return { uploadFile }
}
