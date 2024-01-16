import { Flex } from '@mantine/core'
import { FC } from 'react'

import {
  useCreateQuiz,
  useDeleteQuiz,
  useUpdateQuiz,
  QuizFormModalButton,
  QuizTable,
} from '@/features/quiz'
import { SectionWithRelation } from '@/types'

type Props = {
  section: SectionWithRelation
}

// セクションタイプがクイズ
export const SectionQuizzes: FC<Props> = ({ section }) => {
  const { quizzes } = section

  // クイズ作成、更新、削除関数
  const { createQuiz } = useCreateQuiz(section.id)
  const { updateQuiz } = useUpdateQuiz(section.id)
  const { deleteQuiz } = useDeleteQuiz(section.id)

  // クイズがないなら作成ボタンを表示
  if (!quizzes.length) {
    return (
      <Flex justify='center' className='mt-200px'>
        <QuizFormModalButton
          onSubmit={createQuiz}
          buttonName='テスト作成'
          modalTitle='テスト作成'
          submitButtonName='作成する'
        />
      </Flex>
    )
  }

  // クイズがあるならクイズ追加ボタン、クイズ一覧テーブルを表示
  return (
    <div>
      <div>
        <Flex gap='sm' justify='end' align='center'>
          <QuizFormModalButton
            onSubmit={createQuiz}
            buttonName='問題追加'
            modalTitle='問題追加'
            submitButtonName='追加する'
          />
        </Flex>

        <div className='mt-6' />
        <QuizTable
          quizzes={quizzes}
          updateQuiz={updateQuiz}
          deleteQuiz={deleteQuiz}
        />
      </div>
    </div>
  )
}
