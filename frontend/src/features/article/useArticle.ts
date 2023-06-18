import { Article } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { postApi, putApi, deleteApi } from '@/utils/api'

import { SectionWithRelation } from '../section'

// sectionのmutate
export const useCreateArticle = (sectionId: string) => {
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // article作成
  // section更新
  const createArticle = useCallback(async () => {
    try {
      const newArticle = await postApi<Article>('/articles', {
        body: 'ここに記事をマークダウン形式で書きます',
        sectionId,
      })
      console.log('追加に成功', newArticle)
      if (!section) return

      const newArticleIds = [...section.articleIds, newArticle.id]

      // sectionIds更新
      const updatedSection = await putApi<SectionWithRelation>(
        `/sections/${sectionId}`,
        {
          ...section,
          articleIds: newArticleIds,
        },
      )
      console.log('articleIdsの更新に成功', updatedSection)

      // 再度データを取得しキャッシュを更新する
      mutateSection(updatedSection)
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        throw e.message
      }
      throw JSON.stringify(e)
    }
  }, [sectionId, section, mutateSection])

  return { createArticle }
}

// sectionのmutate
export const useUpdateArticle = (sectionId: string) => {
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // article更新
  const updateArticle = useCallback(
    async (articleId: string, body: string) => {
      console.log({ articleId }, { body })
      try {
        const updatedArticle = await putApi<Article>(`/articles/${articleId}`, {
          body,
        })
        console.log('更新に成功', updatedArticle)

        if (!section) return
        // 対象のidだけ更新されたArticleに置き換える
        const updatedArticles = section.articles.map(v =>
          v.id === articleId ? updatedArticle : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateSection({ ...section, articles: updatedArticles })
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [section, mutateSection],
  )
  return { updateArticle }
}

// sectionのmutate
export const useDeleteArticle = (sectionId: string) => {
  const { data: section, mutate: mutateSection } =
    useGetApi<SectionWithRelation>(`/sections/${sectionId}`)

  // article削除
  // sectionを更新
  const deleteArticle = useCallback(
    async (articleId: string) => {
      try {
        await deleteApi(`/articles/${articleId}`)
        console.log('article削除に成功')
        if (!section) return

        const filteredArticles = section.articleIds.filter(v => v !== articleId)

        // sectionIds更新
        const updatedSection = await putApi<SectionWithRelation>(
          `/sections/${sectionId}`,
          {
            ...section,
            articleIds: filteredArticles,
          },
        )
        console.log('articleIdsの更新に成功', updatedSection)

        // 再度データを取得しキャッシュを更新する
        mutateSection(updatedSection)
      } catch (e) {
        console.error(e)
      }
    },
    [section, sectionId, mutateSection],
  )

  return { deleteArticle }
}
