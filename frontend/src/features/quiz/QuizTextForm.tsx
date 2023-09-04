import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Stack, TextInput } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { ChangeEvent, FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { quizFormRequestSchema } from '@/libs/validates'

import { QuizFormRequest } from './types'

type Props = {
  onSubmit: (params: QuizFormRequest) => void
  submitButtonName?: string
  initValue?: QuizFormRequest
  onDirty: () => void
}

export const QuizTextForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isDirty },
    setError,
  } = useForm<QuizFormRequest>({
    resolver: zodResolver(quizFormRequestSchema),
    criteriaMode: 'all',
    defaultValues: initValue ?? { type: 'text', choices: [], answers: [] },
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<QuizFormRequest>(onSubmitProps)

  // answerはstring[]なので、エラーを自力で出し分けする
  const onChangeAnswerText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value.length) {
        setError('answers', {
          type: 'custom',
          message: '答えは必須です',
        })
        // エラーメッセージを出すため
        setValue('answers', [])
        return
      }

      if (errors.answers) clearErrors('answers')

      setValue('answers', [e.target.value], {
        shouldDirty: true,
      })
    },
    [clearErrors, errors, setError, setValue],
  )

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
        <p className='text-center'>記述式</p>
        <Stack>
          <TextInput
            label='問題名'
            error={errors.question?.message}
            placeholder='XSSとは何ですか？'
            withAsterisk
            {...register('question')}
          />
          <TextInput
            label='模範回答'
            error={errors.answers?.message}
            placeholder='ウェブページに悪意のあるスクリプトを挿入する攻撃手法'
            withAsterisk
            defaultValue={initValue?.answers[0]}
            onChange={onChangeAnswerText}
          />
          <TextInput
            label='解説'
            error={errors.explanation?.message}
            placeholder='攻撃者がウェブページに悪意のあるスクリプトを挿入する攻撃手法です。これにより、ユーザーのブラウザ上でスクリプトが実行され、悪意のある動作や情報の漏洩が発生する可能性があります'
            {...register('explanation')}
          />

          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
