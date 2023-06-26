import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Flex,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { ChangeEvent, FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { useUploadFile } from '@/hooks/useUploadFile'
import { courseSchema } from '@/libs/validates'

export type CourseFormRequest = z.infer<typeof courseSchema>

type Props = {
  onSubmit: (params: CourseFormRequest) => void
  submitButtonName?: string
  initValue?: CourseFormRequest
  onDirty: () => void
}

export const CourseForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CourseFormRequest>({
    resolver: zodResolver(courseSchema),
    criteriaMode: 'all',
    defaultValues: initValue ?? { imageUrl: '' },
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<CourseFormRequest>(onSubmitProps)

  // useEffectを使わないと、レンダリング中にsetStateを呼ぶことになりWarningが出る
  useEffect(() => {
    if (isDirty) onDirty()
  }, [isDirty, onDirty])

  // 画像アップロード
  const { uploadFile } = useUploadFile()

  const onChangeFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      // file選択していない
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0] // ファイルを取得

      const url = await uploadFile(file)
      if (url) setValue('imageUrl', url)
    },
    [setValue, uploadFile],
  )

  return (
    <>
      {errorMessage && (
        <Alert
          icon={<IconAlertCircle size='1rem' />}
          title='サーバーでエラーが発生しました'
          color='red'
          onClose={clearErrorMessage}
          mb='sm'
          classNames={{ message: 'mt-0' }}
          withCloseButton
        >
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label='コース名'
            error={errors.name?.message}
            placeholder='基礎体験コース'
            withAsterisk
            {...register('name')}
          />
          <Select
            label='コース難易度'
            placeholder='難易度を選択してください'
            onChange={(e: '1' | '2' | '3') =>
              setValue('level', Number(e) as 1 | 2 | 3)
            }
            data={['1', '2', '3'].map(v => ({ value: v, label: v }))}
            defaultValue={String(initValue?.level)}
          />
          <Textarea
            label='コース詳細'
            autosize
            placeholder='このコースは、セキュリティの基礎的な概念や攻撃の手法を学習します。また、実践的な演習を通じて、学習した知識を実際にアプリケーションに適用し、攻撃手法を理解することができます。'
            {...register('description')}
          />
          <TextInput
            label='制作者名'
            error={errors.author?.message}
            placeholder='サイパス太郎'
            withAsterisk
            {...register('author')}
          />
          <TextInput
            label='所属'
            error={errors.organization?.message}
            placeholder='サイパス大学'
            withAsterisk
            {...register('organization')}
          />

          <label>
            コース画像
            <input type='file' onChange={onChangeFile} />
          </label>

          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
