import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Select, Stack, TextInput } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { userAgentRequestSchema } from '@/libs/validates'

import { UserAgentFormRequest } from '../types'

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
  submitButtonName?: string
  initValue?: UserAgentFormRequest
  onDirty: () => void
}

// ユーザーエージェント作成・更新のフォーム
export const UserAgentForm: FC<Props> = ({
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
  } = useForm<UserAgentFormRequest>({
    resolver: zodResolver(userAgentRequestSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  // 送信時の関数をラップし、エラーハンドリングを行う
  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<UserAgentFormRequest>(onSubmitProps)

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
            label='ユーザーエージェント名'
            error={errors.name?.message}
            placeholder='仮想デスクトップ'
            withAsterisk
            {...register('name')}
          />
          <TextInput
            label='GitHubリポジトリのURL'
            placeholder='https://github.com/example/useragent'
            withAsterisk
            error={errors.gitHubUrl?.message}
            {...register('gitHubUrl')}
          />
          <Select
            label='仮想環境のタイプ'
            placeholder='体験する時の環境を選択してください'
            withAsterisk
            onChange={(e: 'vdi' | 'terminal') => {
              setValue('type', e)
              clearErrors('type')
            }}
            data={[
              { label: '仮想デスクトップ', value: 'vdi' },
              { label: 'ターミナル', value: 'terminal' },
            ]}
            defaultValue={initValue?.type || 'vdi'}
            error={errors.type?.message}
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

          {/* 送信ボタン */}
          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
