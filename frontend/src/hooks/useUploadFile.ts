import { useCallback } from 'react'

// ファイルをアップロードするフック
export const useUploadFile = () => {
  // ファイルをアップロードする関数
  const uploadFile = useCallback(async (file: File) => {
    // ファイル名、中身を取得
    const fileExt = file.name.split('.').pop()
    const dateString = new Date().toLocaleDateString().replace(/\//g, '')
    const fileName = `${Math.random()}-${dateString}.${fileExt}` // storageに保存する名前
    const contentType = file.type

    try {
      // storageにファイルをアップロード
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
