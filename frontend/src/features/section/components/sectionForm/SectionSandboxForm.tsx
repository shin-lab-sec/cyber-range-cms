import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Select, Stack, TextInput } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import { IconAlertCircle, IconLoader2 } from '@tabler/icons-react'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useGetApi } from '@/hooks/useApi'
import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { sectionFormRequestSchema } from '@/libs/validates'

import { SectionFormRequest } from '../../types'

type Props = {
  onSubmit: (params: SectionFormRequest) => void
  submitButtonName?: string
  initValue?: SectionFormRequest
  onDirty: () => void
}

// セクションタイプサンドボックスのフォーム
export const SectionSandboxForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  // フォームの状態を管理する
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<SectionFormRequest>({
    resolver: zodResolver(sectionFormRequestSchema),
    criteriaMode: 'all',
    defaultValues: { ...initValue, type: 'sandbox' },
  })

  // 送信関数をラップして、エラーハンドリングを行う
  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<SectionFormRequest>(onSubmitProps)

  // useEffectを使わないと、レンダリング中にsetStateを呼ぶことになりWarningが出る
  useEffect(() => {
    if (isDirty) onDirty()
  }, [isDirty, onDirty])

  // ユーザーエージェント一覧
  const { data: userAgents } = useGetApi<UserAgent[]>('/useragents')

  // ユーザーエージェントが存在しない場合はローディングを表示する
  if (!userAgents)
    return (
      <div className='text-center'>
        <IconLoader2 size='1.5rem' className='animate-spin' />
      </div>
    )

  // ユーザーエージェントが存在する場合はフォームを表示する
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
        <p className='text-center'>サンドボックス</p>
        <Stack>
          <TextInput
            label='セクション名'
            error={errors.name?.message}
            placeholder='ブルートフォース攻撃とは何か'
            withAsterisk
            {...register('name')}
          />
          <TextInput
            label='シナリオGitHubURL'
            placeholder='https://example.article'
            error={
              'scenarioGitHubUrl' in errors && errors.scenarioGitHubUrl?.message
            }
            {...register('scenarioGitHubUrl')}
          />
          {userAgents.length > 0 ? (
            <Select
              label='ユーザーエージェント'
              placeholder='体験する時の環境を選択してください'
              withAsterisk
              onChange={(e: string) => {
                setValue('userAgentId', e)
                clearErrors('userAgentId')
              }}
              data={userAgents.map(v => ({ value: v.id, label: v.name }))}
              defaultValue={
                initValue?.type === 'sandbox' ? initValue?.userAgentId : ''
              }
              error={'userAgentId' in errors && errors?.userAgentId?.message}
            />
          ) : (
            <Select
              label='ユーザーエージェント'
              placeholder='体験する時の環境を選択してください'
              withAsterisk
              data={[]}
              disabled
              error={
                <p>
                  ユーザーエージェントが存在しません。
                  セクションを作成するには、ユーザーエージェントが必要です。
                  <Link href='/useragents' className='text-xs'>
                    ユーザーエージェントを作成する
                  </Link>
                </p>
              }
            />
          )}

          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
