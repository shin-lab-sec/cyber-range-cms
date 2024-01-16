import { FileInput, Loader } from '@mantine/core'
import {
  IconCircleCheck,
  IconDownload,
  IconExclamationMark,
} from '@tabler/icons-react'
import { FC, useCallback, useMemo, useState } from 'react'
import { ZodSchema } from 'zod'

type FileInputState = 'default' | 'loading' | 'saved' | 'error'
type Props = {
  createData: (params: any) => void
  validateSchema: ZodSchema<any>
}

// JSONファイルのデータをインポートするInput
export const ImportFileInput: FC<Props> = ({ createData, validateSchema }) => {
  const [fileInputStatus, setFileInputStatus] =
    useState<FileInputState>('default')

  // JSON.parse用のエラーメッセージをthrowする
  const parseJson = useCallback((content: any) => {
    try {
      return JSON.parse(content)
    } catch (error) {
      throw `JSONファイルを解析できませんでした。\n内容を確認して再度お試しください。\n以下はエラー内容です。\n${error}`
    }
  }, [])

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (!file) return
      const reader = new FileReader()

      setFileInputStatus('loading')
      // ファイルの中身を解析
      reader.onload = async event => {
        const content = event?.target?.result

        try {
          const jsonData = parseJson(content)
          const zodParseResponse = validateSchema.safeParse(jsonData)

          if (!zodParseResponse.success) {
            throw `選択したファイルの項目が正しくありません。以下のような原因が考えられます。内容を確認し再度お試しください。\n- 必須項目が抜けている。- 項目の値に誤りがある。\n以下はエラー内容です\n${zodParseResponse.error}`
          }

          await createData(jsonData)

          setFileInputStatus('saved')
          setTimeout(() => {
            setFileInputStatus('default')
          }, 2000)
        } catch (error) {
          // TODO: エラーメッセージを画面に表示する
          alert(error)
          console.error(error)
          setFileInputStatus('error')
        }
      }
      reader.readAsText(file)
    },
    [createData, parseJson, validateSchema],
  )

  const fileInputIcon = useMemo(() => {
    if (fileInputStatus === 'loading') return <Loader size='sm' color='gray' />
    if (fileInputStatus === 'saved') return <IconCircleCheck color='green' />
    if (fileInputStatus === 'error')
      return (
        <IconExclamationMark
          color='red'
          className='border rounded-full border-red-500'
        />
      )
    return <IconDownload />
  }, [fileInputStatus])

  return (
    <FileInput
      placeholder='JSON形式でインポート'
      accept='.json'
      icon={fileInputIcon}
      classNames={{
        placeholder: 'text-black font-bold',
        input: 'font-bold',
        icon: 'text-black',
      }}
      error={fileInputStatus === 'error' ? true : false}
      onChange={handleFileChange}
    />
  )
}
