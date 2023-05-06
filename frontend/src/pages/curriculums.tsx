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
                  .ProseMirror h1 {
                    margin: 1.5em 0 1em;
                    font-size: 2em;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h2 {
                    margin: 1.5em 0 1em;
                    font-size: 1.5em;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h3 {
                    margin: 1.5em 0 1em;
                    font-size: 1.17em;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h4 {
                    margin: 1.5em 0 1em;
                    font-size: 1em;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h5 {
                    margin: 1.5em 0 1em;
                    font-size: 0.83em;
                    font-weight: bold;
                    line-height: 1.2;
                  }
                  .ProseMirror h6 {
                    margin: 1.5em 0 1em;
                    font-size: 0.67em;
                    font-weight: bold;
                    line-height: 1.2;
                  }

                  .ProseMirror ul,
                  .ProseMirror ol {
                    margin: 0;
                    padding-left: 20px;
                  }
                  .ProseMirror ul {
                    list-style: disc;
                  }
                  .ProseMirror ol {
                    list-style: decimal;
                  }
                  .ProseMirror li {
                    margin: 0.5em 0;
                  }

                  .ProseMirror code {
                    font-family: 'Courier New', Courier, monospace;
                    background-color: #f5f5f5;
                    padding: 0.2em 0.4em;
                    border-radius: 0.2em;
                    border: 1px solid #ccc;
                  }
                  .ProseMirror pre code {
                    display: block;
                    font-family: 'Courier New', Courier, monospace;
                    background-color: #f5f5f5;
                    padding: 1em;
                    overflow: auto;
                    border-radius: 0.2em;
                    white-space: pre-wrap;
                  }

                  .ProseMirror a {
                    color: #228be6;
                  }
                  .ProseMirror a:hover {
                    text-decoration: underline;
                  }

                  .ProseMirror hr {
                    border: none;
                    height: 1px;
                    background-color: #ccc;
                    margin: 1em 0;
                  }

                  .ProseMirror blockquote {
                    border-left: 4px solid #ccc;
                    color: #555;
                    font-style: italic;
                    margin: 0;
                    padding: 1em;
                  }
                  .ProseMirror blockquote p {
                    margin: 0;
                  }

                  .ProseMirror p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 1em 0;
                  }

                  .ProseMirror sup,
                  .ProseMirror sub {
                    font-size: 0.8em;
                    position: relative;
                    vertical-align: baseline;
                  }
                  .ProseMirror sup {
                    top: -0.5em;
                  }
                  .ProseMirror sub {
                    bottom: -0.25em;
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
