import { Button, Flex } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { X, GripVertical } from 'tabler-icons-react'

import { CurriculumsWithUserAgent } from '../types'

type Props = {
  curriculums: CurriculumsWithUserAgent[]
  onUpdateOrder: (curriculums: CurriculumsWithUserAgent[]) => void
  onRemove: (id: string) => void
  className: string
}

export const DraggableCurriculums: FC<Props> = ({
  curriculums: curriculumList,
  onUpdateOrder,
  onRemove,
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
                        >
                          <Flex align='center' gap='sm'>
                            <GripVertical size={25} />
                            <span className='rounded-md flex border-2 shadow-md mb-3 w-full py-4 px-4 items-center justify-between'>
                              {curriculum.name}
                              <X
                                size={44}
                                className='cursor-pointer mt-0.5 p-2.5'
                                onClick={() => onRemove(curriculum.id)}
                              />
                            </span>
                          </Flex>
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
    </div>
  )
}
