import { Button, Flex, Pagination } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { FC, useMemo, useState } from 'react'

import {
  useCreateArticle,
  useDeleteArticle,
  useUpdateArticle,
} from '@/features/article'
import { ArticleEditor } from '@/features/article/ArticleEditor'

import { SectionWithRelation } from '../types'

type Props = {
  section: SectionWithRelation
}

export const SectionArticles: FC<Props> = ({ section }) => {
  const { articles } = section
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0)
  const selectedArticle = useMemo(
    () => articles[selectedArticleIndex],
    [articles, selectedArticleIndex],
  )

  const { createArticle } = useCreateArticle(section.id)
  const { updateArticle } = useUpdateArticle(section.id)
  const { deleteArticle } = useDeleteArticle(section.id)

  if (!articles.length) {
    return (
      <Flex justify='center' className='mt-200px'>
        <Button onClick={createArticle}>記事を作成</Button>
      </Flex>
    )
  }

  return (
    <div>
      {selectedArticle && (
        <div>
          <Flex gap='sm' justify='end' align='center'>
            <Flex>
              {/* 0を1にする */}
              <Pagination
                value={selectedArticleIndex + 1}
                onChange={v => setSelectedArticleIndex(v - 1)}
                total={articles.length}
              />
            </Flex>

            <IconPlus
              size='1.5rem'
              onClick={createArticle}
              className='cursor-pointer'
            />
          </Flex>

          <ArticleEditor
            key={selectedArticle.id}
            body={selectedArticle.body}
            onSave={body => updateArticle(selectedArticle.id, body)}
            onDelete={() => deleteArticle(selectedArticle.id)}
          />
        </div>
      )}
    </div>
  )
}
