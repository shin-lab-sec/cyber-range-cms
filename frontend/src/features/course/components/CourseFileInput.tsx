import { FileInput, Loader } from '@mantine/core'
import {
  IconCircleCheck,
  IconDownload,
  IconExclamationMark,
} from '@tabler/icons-react'
import { FC, useCallback, useMemo, useState } from 'react'

import { CourseWithSections } from '@/types'

type FileInputState = 'default' | 'loading' | 'saved' | 'error'
type Props = { createWithRelationCourse: (params: CourseWithSections) => void }

export const CourseFileInput: FC<Props> = ({ createWithRelationCourse }) => {
  const [fileInputStatus, setFileInputStatus] =
    useState<FileInputState>('default')

  const createCourseWithRelation = useCallback(
    async (params: CourseWithSections) => {
      try {
        setFileInputStatus('loading')
        await createWithRelationCourse(params)
        setFileInputStatus('saved')

        setTimeout(() => {
          setFileInputStatus('default')
        }, 2000)
      } catch (err) {
        setFileInputStatus('error')
        alert(err)
        console.error(err)
      }
    },
    [createWithRelationCourse],
  )

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (!file) return
      const reader = new FileReader()

      // ファイルの中身を解析
      reader.onload = event => {
        const content = event?.target?.result
        try {
          const jsonData: CourseWithSections = JSON.parse(content as string) // 中身をJSONパースする
          createCourseWithRelation(jsonData) // 中身を元にコースを作成
        } catch (error) {
          alert(
            `JSONファイルを解析できませんでした。\n内容を確認して再度お試しください。\n${error}`,
          )
          console.error(
            'JSONファイルを解析できませんでした。\n内容を確認して再度お試しください。',
            error,
          )
          return
        }
      }
      reader.readAsText(file)
    },
    [createCourseWithRelation],
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
      placeholder='コースをインポート'
      accept='.json'
      icon={fileInputIcon}
      classNames={{
        placeholder: 'text-black',
        icon: 'text-black',
      }}
      error={fileInputStatus === 'error' ? true : false}
      onChange={handleFileChange}
    />
  )
}
