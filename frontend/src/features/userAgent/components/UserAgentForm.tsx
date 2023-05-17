import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Stack, TextInput } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { userAgentSchema } from '@/libs/validates'

export type UserAgentFormRequest = z.infer<typeof userAgentSchema>

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
  submitButtonName?: string
  initValue?: UserAgentFormRequest
  onDirty: () => void
}

export const UserAgentForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserAgentFormRequest>({
    resolver: zodResolver(userAgentSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

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
          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
