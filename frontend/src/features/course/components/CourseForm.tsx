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
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { AlertCircle } from 'tabler-icons-react'
import { z } from 'zod'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { courseSchema } from '@/libs/validates'

export type CourseFormRequest = z.infer<typeof courseSchema>

type Props = {
  onSubmit: (params: CourseFormRequest) => void
  submitButtonName?: string
  initValue?: CourseFormRequest
}

export const CourseForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseFormRequest>({
    resolver: zodResolver(courseSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<CourseFormRequest>(onSubmitProps)

  return (
    <>
      {errorMessage && (
        <Alert
          icon={<AlertCircle size='1rem' />}
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

          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
