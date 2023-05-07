import { Flex } from '@mantine/core'
import { Curriculum } from '@prisma/client'
import { NextPage } from 'next'
import { X } from 'tabler-icons-react'

import { Layout } from '@/components/Layout'
import {
  CreateCurriculumButton,
  CurriculumFormRequest,
  UpdateCurriculumButton,
  useCreateCurriculum,
  useDeleteCurriculum,
  useUpdateCurriculum,
} from '@/features/curriculum'
import { useGetApi } from '@/hooks/useApi'
import { deleteApi } from '@/utils/api'
const Curriculums: NextPage = () => {
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)
  deleteApi

  const { createCurriculum } = useCreateCurriculum()
  const { updateCurriculum } = useUpdateCurriculum()
  const { deleteCurriculum } = useDeleteCurriculum()

  return (
    <Layout>
      <h1>カリキュラム一覧ページ</h1>

      <Flex gap='sm' justify='end'>
        <CreateCurriculumButton onSubmit={createCurriculum} />
      </Flex>

      <ul className='mt-3'>
        {curriculums?.map(curriculum => {
          const curriculumFormRequest: CurriculumFormRequest = {
            name: curriculum.name,
            gitHubUrl: curriculum.gitHubUrl ?? '',
            imageUrl: curriculum.imageUrl ?? '',
            articleUrl: curriculum.articleUrl ?? '',
            description: curriculum.description ?? '',
          }
          return (
            <li
              key={curriculum.id}
              // className='rounded-md flex border-2 shadow-md mb-3 py-4 px-4 items-center justify-between'
            >
              <div>
                {curriculum.name}
                <div
                  className='ProseMirror'
                  dangerouslySetInnerHTML={{
                    __html: curriculum.articleUrl || '',
                  }}
                />

                <style jsx global>{`
                  .ProseMirror {
                    word-break: break-word;
                    word-wrap: break-word;
                  }

                  .ProseMirror h1 {
                    margin: 1.5rem 0 1rem;
                    font-size: 2rem;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h2 {
                    margin: 1.5rem 0 1rem;
                    font-size: 1.5rem;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h3 {
                    margin: 1.5rem 0 1rem;
                    font-size: 1.17rem;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h4 {
                    margin: 1.5rem 0 1rem;
                    font-size: 1rem;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h5 {
                    margin: 1.5rem 0 1rem;
                    font-size: 0.83rem;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h6 {
                    margin: 1.5rem 0 1rem;
                    font-size: 0.67rem;
                    font-weight: bold;
                    line-height: 1.2;
                  }

                  .ProseMirror ul,
                  .ProseMirror ol {
                    margin: 0;
                    padding-left: 1.5rem;
                  }
                  .ProseMirror ul {
                    list-style: disc;
                  }
                  .ProseMirror ol {
                    list-style: decimal;
                  }
                  .ProseMirror li p {
                    margin: 0.5rem 0;
                  }

                  .ProseMirror code {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco,
                      Consolas, 'Liberation Mono', 'Courier New', monospace;
                    background-color: #f5f5f5;
                    padding: 0.2rem 0.4rem;
                    font-size: 0.75rem;
                    border-radius: 0.2rem;
                    border: 1px solid #ccc;
                  }
                  .ProseMirror pre {
                    display: block;
                    background-color: #f5f5f5;
                    padding: 1rem;
                    overflow: auto;
                    border-radius: 0.2rem;
                    border: 1px solid #ccc;
                    white-space: pre-wrap;
                  }
                  .ProseMirror pre code {
                    display: block;
                    padding: 0;
                    font-size: 0.875rem;
                    border: none;
                  }

                  .ProseMirror a {
                    color: #228be6;
                  }
                  .ProseMirror a:hover {
                    text-decoration: underline;
                  }

                  .ProseMirror p {
                    font-size: 1rem;
                    line-height: 1.5;
                    margin: 1rem 0;
                  }

                  .ProseMirror hr {
                    border: none;
                    height: 1px;
                    background-color: #ccc;
                    margin: 1rem 0;
                  }

                  .ProseMirror blockquote {
                    border-left: 0.25rem solid #ccc;
                    color: #555;
                    font-style: italic;
                    margin: 0;
                    padding: 1rem;
                  }
                  .ProseMirror blockquote p {
                    margin: 0;
                  }
                  .ProseMirror sup,
                  .ProseMirror sub {
                    font-size: 0.8rem;
                    position: relative;
                    vertical-align: baseline;
                  }
                  .ProseMirror sup {
                    top: -0.5rem;
                  }
                  .ProseMirror sub {
                    bottom: -0.25rem;
                  }

                  .ProseMirror strong {
                    font-weight: bold;
                  }
                  .ProseMirror s {
                    text-decoration: line-through;
                  }
                  .ProseMirror em {
                    font-style: italic;
                  }
                  .ProseMirror u {
                    text-decoration: underline;
                  }
                  .ProseMirror mark {
                    background-color: yellow;
                  }
                `}</style>
              </div>

              <Flex align='center'>
                <UpdateCurriculumButton
                  onSubmit={v => updateCurriculum(curriculum.id, v)}
                  initValue={curriculumFormRequest}
                />
                <X
                  size={44}
                  className='cursor-pointer mt-0.5 p-2.5'
                  onClick={() => deleteCurriculum(curriculum.id)}
                />
              </Flex>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Curriculums
