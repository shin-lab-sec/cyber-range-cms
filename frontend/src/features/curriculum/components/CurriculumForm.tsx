import { Button, Flex, Stack, TextInput, Textarea } from '@mantine/core'
import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { curriculumSchema } from '@/lib/validates/curriculum'

export type CurriculumFormRequest = z.infer<typeof curriculumSchema>

type Props = {
  onSubmit: (params: CurriculumFormRequest) => void
  submitButtonName?: string
  initValue?: CurriculumFormRequest
}

export const CurriculumForm: FC<Props> = ({
  onSubmit,
  submitButtonName,
  initValue,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurriculumFormRequest>({
    resolver: zodResolver(curriculumSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label='カリキュラム名'
          error={errors.name?.message}
          placeholder='ブルートフォース攻撃とは何か'
          withAsterisk
          {...register('name')}
        />
        <TextInput
          label='GitHubのURL'
          placeholder='https://github.com/example/curriculum1'
          error={errors.gitHubUrl?.message}
          {...register('gitHubUrl')}
        />
        <TextInput
          label='画像のURL'
          placeholder='https://example.image'
          error={errors.imageUrl?.message}
          {...register('imageUrl')}
        />
        <TextInput
          label='記事のURL'
          placeholder='https://example.article'
          error={errors.articleUrl?.message}
          {...register('articleUrl')}
        />
        <Textarea
          label='コース詳細'
          autosize
          placeholder='このカリキュラムでは、ブルートフォース攻撃とは何かを学びます。ブルートフォース攻撃は、自動化ツールを使って、パスワードを推測する攻撃手法です。このカリキュラムでは、ブルートフォース攻撃の基本的な概念や、実際にどのように攻撃が行われるかを学ぶことができます。'
          {...register('description')}
        />

        <Flex justify='end'>
          <Button type='submit'>{submitButtonName}</Button>
        </Flex>
      </Stack>
    </form>
  )
}
