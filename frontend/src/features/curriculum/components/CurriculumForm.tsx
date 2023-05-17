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
import { UserAgent } from '@prisma/client'
import { IconAlertCircle } from '@tabler/icons-react'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetApi } from '@/hooks/useApi'
import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { curriculumSchema } from '@/libs/validates'

export type CurriculumFormRequest = z.infer<typeof curriculumSchema>

type Props = {
  onSubmit: (params: CurriculumFormRequest) => void
  submitButtonName?: string
  initValue?: CurriculumFormRequest
  onDirty: () => void
}

export const CurriculumForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const { data: userAgents } = useGetApi<UserAgent[]>('/useragents')
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<CurriculumFormRequest>({
    resolver: zodResolver(curriculumSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<CurriculumFormRequest>(onSubmitProps)

  // useEffectを使わないと、レンダリング中にsetStateを呼ぶことになりWarningが出る
  useEffect(() => {
    if (isDirty) onDirty()
  }, [isDirty, onDirty])

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
          {userAgents ? (
            <Select
              label='ユーザーエージェント'
              placeholder='体験する時の環境を選択してください'
              withAsterisk
              onChange={(e: string) => {
                setValue('userAgentId', e)
                clearErrors('userAgentId')
              }}
              data={userAgents.map(v => ({ value: v.id, label: v.name }))}
              defaultValue={initValue?.userAgentId}
              error={errors.userAgentId?.message}
            />
          ) : (
            <Select
              label='ユーザーエージェント'
              placeholder='体験する時の環境を選択してください'
              withAsterisk
              data={['']}
              disabled
              error={
                <p>
                  ユーザーエージェントが存在しません。
                  カリキュラムを作成するには、ユーザーエージェントが必要です。
                  <Link href='useragents' className='text-xs'>
                    ユーザーエージェントを作成する
                  </Link>
                </p>
              }
            />
          )}
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
    </>
  )
}
