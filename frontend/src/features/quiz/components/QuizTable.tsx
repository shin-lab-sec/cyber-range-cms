import { Flex, List, ThemeIcon } from '@mantine/core'
import { Quiz } from '@prisma/client'
import {
  IconArticle,
  IconListCheck,
  IconSelect,
  IconX,
} from '@tabler/icons-react'
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table'
import { FC, useMemo } from 'react'

import { ConfirmButton } from '@/components/ConfirmButton'
import { convertToJapanTime } from '@/utils/convertToJapanTime'

import { QuizFormModalButton } from './QuizFormModalButton'
import { QuizFormRequest } from '../types'

type Props = {
  quizzes: Quiz[]
  updateQuiz: (id: string, params: QuizFormRequest) => void
  deleteQuiz: (id: string) => void
}

export const QuizTable: FC<Props> = ({ quizzes, updateQuiz, deleteQuiz }) => {
  const columns = useMemo<MRT_ColumnDef<Quiz>[]>(
    () => [
      {
        accessorKey: 'type',
        header: 'タイプ',
        maxSize: 0,
        Cell: ({ row: { original: quiz } }) => (
          <div className='min-w-100px max-w-100px break-words'>
            {quiz.type === 'text' && (
              <Flex align='center' gap='sm'>
                <ThemeIcon color='red' size='lg' variant='light' radius='md'>
                  <IconArticle size='1.5rem' />
                </ThemeIcon>
                記述式
              </Flex>
            )}
            {quiz.type === 'radio' && (
              <Flex align='center' gap='sm'>
                <ThemeIcon color='blue' size='lg' variant='light' radius='md'>
                  <IconSelect size='1.5rem' />
                </ThemeIcon>
                単一選択
              </Flex>
            )}
            {quiz.type === 'checkbox' && (
              <Flex align='center' gap='sm'>
                <ThemeIcon color='violet' size='lg' variant='light' radius='md'>
                  <IconListCheck size='1.5rem' />
                </ThemeIcon>
                複数選択
              </Flex>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'question',
        header: '問題',
        Cell: ({ row: { original: quiz } }) => (
          <div className='min-w-200px max-w-400px break-words'>
            {quiz.question}
          </div>
        ),
      },
      {
        accessorKey: 'choices',
        header: '選択肢',
        Cell: ({ row: { original: quiz } }) => (
          <List className='min-w-200px max-w-400px break-words'>
            {quiz.choices.map((v, i) => (
              <Flex key={v} gap='sm'>
                {i + 1}.<span>{v}</span>
              </Flex>
            ))}
          </List>
        ),
      },
      {
        accessorKey: 'answers',
        header: '回答',
        maxSize: 0,
        Cell: ({ row: { original: quiz } }) => (
          <ul className='min-w-100px max-w-200px break-words'>
            {quiz.answers.map(v => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        ),
      },
      {
        accessorKey: 'explanation',
        header: '解説',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='min-w-200px max-w-400px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: '作成日',
        maxSize: 0,
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
      },
      {
        accessorKey: 'updatedAt',
        header: '更新日',
        maxSize: 0,
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
      },
      // 編集・削除ボタンをCellに置く
      {
        header: ' ',
        // 操作出来なくする
        enableColumnActions: false,
        enableColumnDragging: false,
        enableSorting: false,
        maxSize: 0,
        Cell: ({ row: { original: quiz } }) => {
          const quizFormRequest: QuizFormRequest = {
            question: quiz.question,
            explanation: quiz.explanation,
            type: quiz.type as 'text' | 'radio' | 'checkbox',
            choices: quiz.choices,
            answers: quiz.answers,
          }

          return (
            <Flex align='center' gap='sm'>
              <QuizFormModalButton
                onSubmit={v => updateQuiz(quiz.id, v)}
                initValue={quizFormRequest}
                buttonName='編集'
                modalTitle='テスト編集'
                submitButtonName='更新する'
              />
              <IconX
                size='1.5rem'
                onClick={() => deleteQuiz(quiz.id)}
                className='cursor-pointer'
              />

              <ConfirmButton
                confirmMessage={`問題: "${quiz.question}" を削除しますか？`}
                onConfirm={() => deleteQuiz(quiz.id)}
              >
                <IconX size='1.5rem' />
              </ConfirmButton>
            </Flex>
          )
        },
      },
    ],
    [deleteQuiz, updateQuiz],
  )

  return (
    <MantineReactTable columns={columns} data={quizzes} enableColumnOrdering />
  )
}
