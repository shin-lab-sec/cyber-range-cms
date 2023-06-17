import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Select, Stack, TextInput } from '@mantine/core'
import { UserAgent } from '@prisma/client'
import {
  IconAlertCircle,
  IconCurrencyQuetzal,
  IconArticle,
  IconBox,
} from '@tabler/icons-react'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormClearErrors,
} from 'react-hook-form'
import { z } from 'zod'

import { useGetApi } from '@/hooks/useApi'
import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { sectionFormRequestSchema } from '@/libs/validates'

export type SectionFormRequest = z.infer<typeof sectionFormRequestSchema>

type SectionType = 'quiz' | 'article' | 'sandbox'

type Props = {
  onSubmit: (params: SectionFormRequest) => void
  submitButtonName?: string
  initValue?: SectionFormRequest
  onDirty: () => void
}

const SectionQuizForm: FC<Props> = ({
  // onSubmit: onSubmitProps,
  onSubmit,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SectionFormRequest>({
    resolver: zodResolver(sectionFormRequestSchema),
    criteriaMode: 'all',
    defaultValues: { ...initValue, type: 'quiz' },
  })

  // const { onSubmit, errorMessage, clearErrorMessage } =
  //   useFormErrorHandling<SectionFormRequest>(onSubmitProps)

  // useEffectを使わないと、レンダリング中にsetStateを呼ぶことになりWarningが出る
  useEffect(() => {
    if (isDirty) onDirty()
  }, [isDirty, onDirty])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label='セクション名'
          error={errors.name?.message}
          placeholder='ブルートフォース攻撃とは何か'
          withAsterisk
          {...register('name')}
        />
        <Flex justify='end'>
          <Button type='submit'>{submitButtonName}</Button>
        </Flex>
      </Stack>
    </form>
  )
}

const SectionSandboxForm: FC<{
  register: UseFormRegister<
    | {
        name: string
        type: 'quiz'
      }
    | {
        name: string
        type: 'article'
      }
    | {
        name: string
        type: 'sandbox'
        scenarioGitHubUrl: string
        userAgentId: string
      }
  >
  errors: FieldErrors<{
    name: string
    type: 'sandbox'
    scenarioGitHubUrl: string
    userAgentId: string
  }>
  initValue:
    | {
        name: string
        type: 'quiz'
      }
    | {
        name: string
        type: 'article'
      }
    | {
        name: string
        type: 'sandbox'
        scenarioGitHubUrl: string
        userAgentId: string
      }
    | undefined
  setValue: UseFormSetValue<
    | {
        name: string
        type: 'quiz'
      }
    | {
        name: string
        type: 'article'
      }
    | {
        name: string
        type: 'sandbox'
        scenarioGitHubUrl: string
        userAgentId: string
      }
  >
  clearErrors: UseFormClearErrors<
    | {
        name: string
        type: 'quiz'
      }
    | {
        name: string
        type: 'article'
      }
    | {
        name: string
        type: 'sandbox'
        scenarioGitHubUrl: string
        userAgentId: string
      }
  >
}> = ({ register, errors, initValue, setValue, clearErrors }) => {
  const { data: userAgents } = useGetApi<UserAgent[]>('/useragents')

  return (
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
        error={errors.scenarioGitHubUrl?.message}
        {...register('scenarioGitHubUrl')}
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
          defaultValue={
            initValue?.type === 'sandbox' ? initValue?.userAgentId : ''
          }
          error={errors?.userAgentId?.message}
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
    </Stack>
  )
}

// TODO: type毎にschemaを分ける
// 一旦SectionFormでonSubmit定義して、registerを渡すパターンやりたい
export const SectionForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  // const [sectionType, setSectionType] = useState<SectionType | undefined>(
  //   initValue?.type,
  // )
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<SectionFormRequest>({
    resolver: zodResolver(sectionFormRequestSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<SectionFormRequest>(onSubmitProps)

  // useEffectを使わないと、レンダリング中にsetStateを呼ぶことになりWarningが出る
  useEffect(() => {
    if (isDirty) onDirty()
  }, [isDirty, onDirty])

  // name, type, courseId, scenarioGitHubUrl, userAgentId

  const sectionType = watch('type')
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
      {!sectionType && (
        <div className='flex justify-around'>
          <div
            className='rounded-md cursor-pointer flex flex-col border-2 shadow-md p-2 gap-1 duration-300 items-center hover:bg-blue-50'
            onClick={() => setValue('type', 'quiz')}
          >
            <IconCurrencyQuetzal size='2rem' />
            小テスト
          </div>
          <div
            className='rounded-md cursor-pointer flex flex-col border-2 shadow-md p-2 gap-1 duration-300 items-center hover:bg-blue-50'
            onClick={() => setValue('type', 'article')}
          >
            <IconArticle size='2rem' />
            テキスト
          </div>
          <div
            className='rounded-md cursor-pointer flex flex-col border-2 shadow-md p-2 gap-1 duration-300 items-center hover:bg-blue-50'
            onClick={() => setValue('type', 'sandbox')}
          >
            <IconBox size='2rem' />
            演習体験
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {(sectionType === 'quiz' || sectionType === 'article') && (
            <TextInput
              label='セクション名'
              error={errors.name?.message}
              placeholder='ブルートフォース攻撃とは何か'
              withAsterisk
              {...register('name')}
            />
          )}
          {sectionType === 'sandbox' && (
            <SectionSandboxForm
              register={register}
              errors={errors}
              initValue={initValue}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          )}

          {sectionType && (
            <Flex justify='end'>
              <Button type='submit'>{submitButtonName}</Button>
            </Flex>
          )}
        </Stack>
      </form>
    </>
  )
}
