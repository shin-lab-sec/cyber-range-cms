import { Button, Flex } from '@mantine/core'
import { IconX, IconGripVertical } from '@tabler/icons-react'
import { FC, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

import { SectionFormRequest } from './SectionForm'
import { UpdateSectionButton } from './UpdateSectionButton'
import { SectionWithUserAgent } from '../types'

type Props = {
  sections: SectionWithUserAgent[]
  onUpdateOrder: (sections: SectionWithUserAgent[]) => void
  onRemove: (id: string) => void
  onUpdate: (id: string, v: SectionFormRequest) => void
  className: string
}

export const DraggableSections: FC<Props> = ({
  sections: sectionList,
  onUpdateOrder,
  onRemove,
  onUpdate,
  className,
}) => {
  const [sections, setCurriculums] = useState(sectionList)

  const onDragEnd = (result: DropResult) => {
    const items = [...sections]
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
                {sections.map((section, index) => {
                  // name, type, courseId, scenarioGitHubUrl, userAgentId
                  const sectionFormRequest: SectionFormRequest = {
                    name: section.name,
                    type: section.type as 'quiz' | 'article' | 'sandbox',
                    scenarioGitHubUrl: section.scenarioGitHubUrl ?? '',
                    userAgentId: section.userAgentId ?? '',
                  }
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
                            <IconGripVertical size={25} />
                            <div className='rounded-md flex border-2 shadow-md mb-3 w-full py-4 px-4 items-center justify-between'>
                              {section.name} type: {section.type}
                              {/* <div>{JSON.stringify(section)}</div> */}
                              <div className='flex gap-3 items-center'>
                                <UpdateSectionButton
                                  onSubmit={v => onUpdate(section.id, v)}
                                  initValue={sectionFormRequest}
                                />
                                <IconX
                                  size={44}
                                  className='cursor-pointer mt-0.5 p-2.5'
                                  onClick={() => onRemove(section.id)}
                                />
                              </div>
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
