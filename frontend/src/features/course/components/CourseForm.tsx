import { Button, Flex, Select, Stack, TextInput, Textarea } from '@mantine/core'
import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().nonempty('コース名は必須です'),
  description: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
})

export type CourseFormRequest = z.infer<typeof schema>

type Props = {
  onSubmit: (params: CourseFormRequest) => void
  submitButtonName?: string
  initValue?: CourseFormRequest
}

export const CourseForm: FC<Props> = ({
  onSubmit,
  submitButtonName,
  initValue,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseFormRequest>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  return (
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
  )
}
