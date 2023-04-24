import { Button, Code } from '@mantine/core'
import { Curriculum } from '@prisma/client'
import { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { X } from 'tabler-icons-react'

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

type Props = {
  curriculums: Curriculum[]
  onUpdateOrder: (curriculums: Curriculum[]) => void
  className: string
}

// TODO: ここで更新、削除も出来るようにする

export const DraggableCurriculums: FC<Props> = ({
  curriculums: curriculumList,
  onUpdateOrder,
  className,
}) => {
  const [curriculums, setCurriculums] = useState(curriculumList)

  const onDragEnd = (result: DropResult) => {
    const items = [...curriculums]
    const deleteItem = items.splice(result.source.index, 1)
    items.splice(result.destination?.index ?? 0, 0, deleteItem[0])
    setCurriculums(items)
  }

  const [windowReady, setWindowReady] = useState(false)
  useEffect(() => {
    setWindowReady(true)
  }, [])

  return (
    <div className={className}>
      {windowReady && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {provided => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {curriculums.map((curriculum, index) => {
                  return (
                    <Draggable
                      key={curriculum.id}
                      draggableId={curriculum.id}
                      index={index}
                    >
                      {provided => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className='rounded-md flex border-2 shadow-md mb-3 py-4 px-4 items-center justify-between'
                        >
                          <div>{curriculum.name}</div>
                          <X
                            size={44}
                            className='cursor-pointer p-2.5'
                            onClick={() => onRemove(curriculum.id)}
                          />
                        </li>
                      )}
                    </Draggable>
                  )
                })}
                <div>{provided.placeholder}</div>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <div className='flex justify-end'>
        <Button onClick={() => onUpdateOrder(curriculums)}>保存</Button>
      </div>

      <Code block className='mt-4'>
        {JSON.stringify(curriculums, null, 2)}
      </Code>
    </div>
  )
}
