import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Stack, TextInput } from '@mantine/core'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { AlertCircle } from 'tabler-icons-react'
import { z } from 'zod'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { userAgentSchema } from '@/libs/validates'

export type UserAgentFormRequest = z.infer<typeof userAgentSchema>

type Props = {
  onSubmit: (params: UserAgentFormRequest) => void
  submitButtonName?: string
  initValue?: UserAgentFormRequest
}

export const UserAgentForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAgentFormRequest>({
    resolver: zodResolver(userAgentSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<UserAgentFormRequest>(onSubmitProps)

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
            label='ユーザーエージェント名'
            error={errors.name?.message}
            placeholder='仮想デスクトップ'
            withAsterisk
            {...register('name')}
          />
          <TextInput
            label='GitHubリポジトリのURL'
            placeholder='https://github.com/example/useragent'
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
