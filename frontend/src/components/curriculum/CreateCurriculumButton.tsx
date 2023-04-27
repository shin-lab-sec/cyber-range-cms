import { Button, Modal, TextInput, Textarea } from '@mantine/core'
import { FC } from 'react'
import { useBoolean } from '../../hooks/useBoolean'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Course, Curriculum } from '@prisma/client'

// 作成、更新でも使うなら、Propsで初期値、onSubmitを受け取る

const schema = z.object({
  name: z.string().min(1, '短い！'),
  description: z.string(),
  url: z.string(),
  imageUrl: z.string(),
  article: z.string(),
})

type Form = z.infer<typeof schema>

export const CreateCurriculumButton: FC = () => {
  const isOpen = useBoolean()
  const {
    register,
    handleSubmit,
    formState: { errors }, // isDirty 一文字でも入力したらtrue
  } = useForm<Form>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
  })

  const onSubmit = (data: Record<string, any>) => {
    console.log(data)
  }

  return (
    <>
      <Button onClick={isOpen.setTrue}>コースを作成</Button>

      <Modal opened={isOpen.v} onClose={isOpen.setFalse} title='Authentication'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label='コース名' {...register('name')} />
          <TextInput label='GitHubのURL' {...register('url')} />
          <TextInput label='画像URL' {...register('imageUrl')} />
          <TextInput label='関連記事' {...register('article')} />
          <Textarea label='コース詳細' {...register('description')} />
          <Button type='submit'>送信！</Button>
        </form>
      </Modal>
    </>
  )
}
