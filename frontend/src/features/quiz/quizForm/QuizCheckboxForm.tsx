import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Flex,
  List,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'
import { IconAlertCircle, IconPlus, IconTrash } from '@tabler/icons-react'
import { FC, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { quizFormRequestSchema } from '@/libs/validates'

import { QuizFormRequest } from '../types'

type Props = {
  onSubmit: (params: QuizFormRequest) => void
  submitButtonName?: string
  initValue?: QuizFormRequest
  onDirty: () => void
}

export const QuizCheckboxForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isDirty },
    setError,
  } = useForm<QuizFormRequest>({
    resolver: zodResolver(quizFormRequestSchema),
    criteriaMode: 'all',
    defaultValues: initValue ?? { type: 'checkbox', choices: [], answers: [] },
  })

  const [choiceText, setChoiceText] = useState('')

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<QuizFormRequest>(onSubmitProps)

  const choices = watch('choices')
  const answers = watch('answers')

  const onClickAddChoiceButton = useCallback(() => {
    console.log('nin')
    if (choices.some(v => v === choiceText)) {
      setError('choices', {
        message: '同じ選択肢は入れられません',
      })
      return
    }

    if (errors.choices) clearErrors('choices')

    // choicesに追加
    setValue('choices', [...choices, choiceText], {
      shouldDirty: true,
    })
    setChoiceText('')
  }, [choiceText, choices, clearErrors, errors, setError, setValue])

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
        <p className='text-center'>複数選択</p>
        <Stack>
          <TextInput
            label='問題名'
            error={errors.question?.message}
            placeholder='XSSとは何ですか？'
            withAsterisk
            {...register('question')}
          />

          {/* choiceをTODOリストみたいにする */}
          <Flex gap='sm'>
            <TextInput
              label='選択肢'
              error={errors.choices?.message}
              placeholder='選択肢1'
              withAsterisk
              className='flex-1'
              value={choiceText}
              onChange={e => {
                setChoiceText(e.target.value)
              }}
            />
            <Button
              mt='xl'
              disabled={!choiceText}
              onClick={onClickAddChoiceButton}
              leftIcon={<IconPlus size='1rem' />}
            >
              追加
            </Button>
          </Flex>
          <List size='sm' className='break-all'>
            {choices.map((choice, i) => (
              <Flex
                key={i}
                justify='space-between'
                gap='sm'
                align='center'
                className='mt-3 first:mt-0'
              >
                <Flex gap='sm'>
                  {i + 1}.<span>{choice}</span>
                </Flex>

                <button
                  type='button'
                  className='h-1.2rem'
                  onClick={() => {
                    // choicesが1つなら全て消えるのでエラーを出す
                    if (choices.length === 1) {
                      setError('choices', {
                        message: '選択肢は必須です',
                      })
                    }
                    // choicesをfilterして更新
                    setValue(
                      'choices',
                      choices.filter((_, index) => index !== i),
                    )

                    //消したのがanswerで唯一選択していたらエラーを出す
                    if (answers.length === 1 && answers[0] === choice) {
                      setError('answers', {
                        message:
                          '選択肢が削除されました。再度回答を選択して下さい',
                      })
                    }

                    // answersをfilterして更新
                    setValue(
                      'answers',
                      answers.filter(v => v !== choice),
                    )
                  }}
                >
                  <IconTrash
                    size='1.2rem'
                    className='min-w-1.2rem'
                    color='red'
                  />
                </button>
              </Flex>
            ))}
          </List>

          {/* answerをTODOリストみたいにする */}
          <Select
            label='回答'
            error={errors.answers?.message}
            placeholder='ウェブページに悪意のあるスクリプトを挿入する攻撃手法'
            withAsterisk
            disabled={!choices.filter(v => !answers.includes(v)).length}
            data={choices.filter(v => !answers.includes(v))}
            onChange={(value: string) => {
              setValue('answers', [...answers, value], {
                shouldDirty: true,
                shouldValidate: true,
              })
            }}
          />
          <List size='sm' className='break-all'>
            {answers.map((answer, i) => (
              <Flex
                key={i}
                justify='space-between'
                gap='sm'
                align='center'
                className='mt-3 first:mt-0'
              >
                <Flex gap='sm'>
                  {i + 1}.<span>{answer}</span>
                </Flex>

                <button
                  type='button'
                  className='h-1.2rem'
                  onClick={() => {
                    // answersが1つなら全て消えるのでエラーを出す
                    if (answers.length === 1) {
                      setError('answers', {
                        message: '選択肢は必須です',
                      })
                    }

                    setValue(
                      'answers',
                      answers.filter((_, index) => index !== i),
                    )
                  }}
                >
                  <IconTrash
                    size='1.2rem'
                    className='min-w-1.2rem'
                    color='red'
                  />
                </button>
              </Flex>
            ))}
          </List>

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
