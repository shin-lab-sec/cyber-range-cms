import { Button, Flex, ThemeIcon } from '@mantine/core'
import {
  IconArticle,
  IconBox,
  IconCurrencyQuetzal,
  IconGripVertical,
} from '@tabler/icons-react'
import { FC, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

import { SectionWithRelation } from '@/types'

type Props = {
  sections: SectionWithRelation[]
  onUpdateOrder: (sections: SectionWithRelation[]) => void
  className?: string
  onClose?: () => void
}

export const DraggableSections: FC<Props> = ({
  sections: sectionList,
  onUpdateOrder,
  className = '',
  onClose,
}) => {
  const [sections, setSections] = useState(sectionList)

  const onDragEnd = (result: DropResult) => {
    const items = [...sections]
    const deleteItem = items.splice(result.source.index, 1)
    items.splice(result.destination?.index ?? 0, 0, deleteItem[0])
    setSections(items)
  }

  return (
    <div className={className}>
      <Flex gap='sm' justify='end' align='center'>
        <button onClick={onClose}>キャンセル</button>
        <Button
          onClick={() => {
            onUpdateOrder(sections)
            onClose?.()
          }}
        >
          保存
        </Button>
      </Flex>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='mt-3'
            >
              {sections.map((section, index) => {
                return (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {provided => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Flex align='center' gap='sm'>
                          <IconGripVertical size='1.5rem' />
                          <div className='rounded-md flex border-2 shadow-md mb-3 w-full py-4 px-4 gap-3 items-center'>
                            {section.type === 'quiz' && (
                              <ThemeIcon
                                color='red'
                                size='lg'
                                variant='light'
                                radius='md'
                              >
                                <IconCurrencyQuetzal size='1.5rem' />
                              </ThemeIcon>
                            )}
                            {section.type === 'article' && (
                              <ThemeIcon
                                color='blue'
                                size='lg'
                                variant='light'
                                radius='md'
                              >
                                <IconArticle size='1.5rem' />
                              </ThemeIcon>
                            )}
                            {section.type === 'sandbox' && (
                              <ThemeIcon
                                color='violet'
                                size='lg'
                                variant='light'
                                radius='md'
                              >
                                <IconBox size='1.5rem' />
                              </ThemeIcon>
                            )}
                            {section.name}
                          </div>
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
    </div>
  )
}
