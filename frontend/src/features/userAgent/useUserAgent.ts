import { UserAgent } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { postApi, putApi, deleteApi } from '@/utils/api'

import { UserAgentFormRequest } from './types'

export const useCreateUserAgent = () => {
  const { data: userAgents, mutate: mutateUserAgents } =
    useGetApi<UserAgent[]>('/useragents')

  const createUserAgent = useCallback(
    async (params: UserAgentFormRequest) => {
      try {
        const newUserAgent = await postApi<UserAgent>('/useragents', params)
        console.log('追加に成功', newUserAgent)
        if (!userAgents) return
        // 再度データを取得しキャッシュを更新する
        mutateUserAgents([...userAgents, newUserAgent])
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [userAgents, mutateUserAgents],
  )

  return { createUserAgent }
}

export const useUpdateUserAgent = () => {
  const { data: userAgents, mutate: mutateUserAgents } =
    useGetApi<UserAgent[]>('/useragents')

  const updateUserAgent = useCallback(
    async (id: string, params: UserAgentFormRequest) => {
      try {
        const updatedUserAgent = await putApi<UserAgent>(
          `/useragents/${id}`,
          params,
        )
        console.log('更新に成功', updatedUserAgent)

        if (!userAgents) return
        // 対象のidだけ更新されたユーザーエージェントに置き換える
        const updatedUserAgents = userAgents.map(v =>
          v.id === id ? updatedUserAgent : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateUserAgents(updatedUserAgents)
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [userAgents, mutateUserAgents],
  )
  return { updateUserAgent }
}

export const useDeleteUserAgent = () => {
  const { data: userAgents, mutate: mutateUserAgents } =
    useGetApi<UserAgent[]>('/useragents')

  const deleteUserAgent = useCallback(
    async (id: string) => {
      try {
        await deleteApi(`/useragents/${id}`)
        console.log('削除に成功')

        if (!userAgents) return
        // ユーザーエージェント一覧から対象のidのユーザーエージェントを除く
        const filteredUserAgents = userAgents.filter(v => v.id !== id)
        // 再度データを取得しキャッシュを更新する
        mutateUserAgents(filteredUserAgents)
      } catch (e) {
        console.error(e)
      }
    },
    [userAgents, mutateUserAgents],
  )

  return { deleteUserAgent }
}
