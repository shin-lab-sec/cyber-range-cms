import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import { FC, useCallback } from 'react'
import { useBoolean } from '../../hooks/useBoolean'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CourseFormRequest } from './CreateCourseButton'

// 作成、更新でも使うなら、Propsで初期値、onSubmitを受け取る
const schema = z.object({
  name: z.string().nonempty('コース名は必須です'),
  description: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
})

type Props = {
  onSubmit: (params: CourseFormRequest) => void
  initValue: CourseFormRequest
}

export const UpdateCourseButton: FC<Props> = ({ onSubmit, initValue }) => {
  const isOpen = useBoolean()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CourseFormRequest>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  const onClose = useCallback(() => {
    isOpen.setFalse()
    reset()
  }, [isOpen, reset])

  return (
    <>
      <Button onClick={isOpen.setTrue}>編集</Button>
      <Modal
        opened={isOpen.v}
        onClose={onClose}
        title='コース編集'
        centered
        classNames={{ title: 'text-xl' }}
      >
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
              defaultValue={String(initValue.level)}
              data={['1', '2', '3'].map(v => ({ value: v, label: v }))}
            />
            <Textarea
              label='コース詳細'
              autosize
              placeholder='このコースは、セキュリティの基礎的な概念や攻撃の手法を学習します。また、実践的な演習を通じて、学習した知識を実際にアプリケーションに適用し、攻撃手法を理解することができます。'
              {...register('description')}
            />

            <Flex justify='end'>
              <Button type='submit'>更新</Button>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
