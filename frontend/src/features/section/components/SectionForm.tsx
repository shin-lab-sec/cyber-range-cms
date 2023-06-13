import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Flex,
  Select,
  Stack,
  Tabs,
  TextInput,
} from '@mantine/core'
import { UserAgent } from '@prisma/client'
import {
  IconAlertCircle,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from '@tabler/icons-react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
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
              カリキュラムを作成するには、ユーザーエージェントが必要です。
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
  const [sectionType, setSectionType] = useState<SectionType | undefined>(
    initValue?.type,
  )
  const { data: userAgents } = useGetApi<UserAgent[]>('/useragents')
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
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

      <Tabs
        variant='outline'
        defaultValue='live'
        onTabChange={(v: SectionType) => {
          setSectionType(v)
          setValue('type', v)
        }}
      >
        <Tabs.List>
          <Tabs.Tab value='quiz' icon={<IconPhoto size='0.8rem' />}>
            Quiz
          </Tabs.Tab>
          <Tabs.Tab value='article' icon={<IconMessageCircle size='0.8rem' />}>
            Article
          </Tabs.Tab>
          <Tabs.Tab value='sandbox' icon={<IconSettings size='0.8rem' />}>
            Sandbox
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label='セクション名'
            error={errors.name?.message}
            placeholder='ブルートフォース攻撃とは何か'
            withAsterisk
            {...register('name')}
          />
          <TextInput
            label='type(消す)'
            error={errors.type?.message}
            {...register('type')}
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
      </form> */}

      {/* {sectionType === 'quiz' && (
        <SectionQuizForm
          onSubmit={onSubmit}
          onDirty={onDirty}
          initValue={initValue}
          submitButtonName={submitButtonName}
        />
      )} */}

      {sectionType === 'sandbox' && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionSandboxForm
            register={register}
            errors={errors}
            initValue={initValue}
            setValue={setValue}
            clearErrors={clearErrors}
          />

          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </form>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {(getValues('type') === 'quiz' || getValues('type') === 'article') && (
          <Stack>
            <TextInput
              label='セクション名'
              error={errors.name?.message}
              placeholder='ブルートフォース攻撃とは何か'
              withAsterisk
              {...register('name')}
            />
            {/* <TextInput
              label='type(消す)'
              error={errors.type?.message}
              {...register('type')}
            /> */}
            <Flex justify='end'>
              <Button type='submit'>{submitButtonName}</Button>
            </Flex>
          </Stack>
        )}

        {/* {getValues('type') === 'sandbox' && (
          <Stack>
            <TextInput
              label='セクション名'
              error={errors.name?.message}
              placeholder='ブルートフォース攻撃とは何か'
              withAsterisk
              {...register('name')}
            />
            <TextInput
              label='type(消す)'
              error={errors.type?.message}
              {...register('type')}
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
                    カリキュラムを作成するには、ユーザーエージェントが必要です。
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
        )} */}
      </form>
    </>
  )
}

// const sandboxForm = () => {
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Stack>
//         <TextInput
//           label='セクション名'
//           error={errors.name?.message}
//           placeholder='ブルートフォース攻撃とは何か'
//           withAsterisk
//           {...register('name')}
//         />
//         <TextInput
//           label='type(消す)'
//           error={errors.type?.message}
//           {...register('type')}
//         />
//         <TextInput
//           label='シナリオGitHubURL'
//           placeholder='https://example.article'
//           error={errors.scenarioGitHubUrl?.message}
//           {...register('scenarioGitHubUrl')}
//         />
//         {userAgents ? (
//           <Select
//             label='ユーザーエージェント'
//             placeholder='体験する時の環境を選択してください'
//             withAsterisk
//             onChange={(e: string) => {
//               setValue('userAgentId', e)
//               clearErrors('userAgentId')
//             }}
//             data={userAgents.map(v => ({ value: v.id, label: v.name }))}
//             defaultValue={
//               initValue?.type === 'sandbox' ? initValue?.userAgentId : ''
//             }
//             error={errors?.userAgentId?.message}
//           />
//         ) : (
//           <Select
//             label='ユーザーエージェント'
//             placeholder='体験する時の環境を選択してください'
//             withAsterisk
//             data={[]}
//             disabled
//             error={
//               <p>
//                 ユーザーエージェントが存在しません。
//                 カリキュラムを作成するには、ユーザーエージェントが必要です。
//                 <Link href='/useragents' className='text-xs'>
//                   ユーザーエージェントを作成する
//                 </Link>
//               </p>
//             }
//           />
//         )}

//         <Flex justify='end'>
//           <Button type='submit'>{submitButtonName}</Button>
//         </Flex>
//       </Stack>
//     </form>
//   )
// }
