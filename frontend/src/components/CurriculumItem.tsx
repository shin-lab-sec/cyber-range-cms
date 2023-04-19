import { FC, useCallback, useEffect, useState } from 'react'
import { Curriculum } from '@prisma/client'
import { deleteApi, getApi, postApi, putApi } from '../utilis/api'
import { useGetApi } from '../hooks/useApi'
import { Button, Flex, List, Select, Text, TextInput } from '@mantine/core'

export const CurriculumItem: FC = () => {
  const { data: curriculums } = useGetApi<Curriculum[]>(`/curriculums`)

  const [name, setName] = useState('')
  const [selectedCurriculumId, setselectedCurriculumId] = useState('')

  const createCurriculum = useCallback(async () => {
    if (!name) return
    try {
      const res = await postApi('/curriculums', { name, level: 1 })
      console.log('追加に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [name])

  const updateCurriculum = useCallback(async () => {
    try {
      const res = await putApi(`/curriculums/${selectedCurriculumId}`, {
        name,
        level: 2,
      })
      console.log('更新に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [name, selectedCurriculumId])

  const deleteCurriculum = useCallback(async () => {
    try {
      const res = await deleteApi(`/curriculums/${selectedCurriculumId}`)
      console.log('削除に成功', res)
    } catch (e) {
      console.error(e)
    }
  }, [selectedCurriculumId])

  return (
    <div>
      <Text className='text-xl'>カリキュラム一覧</Text>
      <List withPadding mt='sm'>
        {curriculums?.map(curriculum => (
          <List.Item key={curriculum.id}>○ {curriculum.name}</List.Item>
        ))}
      </List>

      <form className='mt-3'>
        <Flex gap='sm'>
          <TextInput
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            placeholder='カリキュラム名を入力して下さい'
            className='max-w-300px w-300px'
          />
          <Button onClick={createCurriculum}>作成</Button>
        </Flex>
      </form>

      {curriculums && (
        <Flex gap='sm' mt='sm'>
          <Select
            placeholder='カリキュラムを選択してください'
            onChange={(e: string) => setselectedCurriculumId(e)}
            data={curriculums.map(v => ({ value: v.id, label: v.name }))}
            className='max-w-300px w-300px'
          />

          <Button onClick={updateCurriculum}>更新</Button>
          <Button color='red' onClick={deleteCurriculum}>
            削除
          </Button>
        </Flex>
      )}
      {selectedCurriculumId}
    </div>
  )
}
