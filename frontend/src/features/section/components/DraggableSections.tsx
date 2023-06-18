import { Button, Flex, ThemeIcon } from '@mantine/core'
import {
  IconArticle,
  IconBox,
  IconCurrencyQuetzal,
  IconGripVertical,
} from '@tabler/icons-react'
import { FC, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

import { SectionWithUserAgent } from '../types'

type Props = {
  sections: SectionWithUserAgent[]
  onUpdateOrder: (sections: SectionWithUserAgent[]) => void
  className?: string
}

export const DraggableSections: FC<Props> = ({
  sections: sectionList,
  onUpdateOrder,
  className = '',
}) => {
  const [sections, setSections] = useState(sectionList)

  const onDragEnd = (result: DropResult) => {
    const items = [...sections]
    const deleteItem = items.splice(result.source.index, 1)
    items.splice(result.destination?.index ?? 0, 0, deleteItem[0])
    setSections(items)
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
      )}

      <div className='flex justify-end'>
        <Button onClick={() => onUpdateOrder(sections)}>保存</Button>
      </div>
    </div>
  )
}
