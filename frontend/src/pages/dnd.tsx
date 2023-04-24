import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

const TestList = [
  {
    id: '01',
    name: 'みかん',
  },
  {
    id: '02',
    name: 'りんご',
  },
  {
    id: '03',
    name: 'ぶどう',
  },
  {
    id: '04',
    name: 'メロン',
  },
]

function App() {
  const [testList, setTestList] = useState(TestList)

  const onDragEndTest = (result: DropResult) => {
    const items = [...testList]
    const deleteItem = items.splice(result.source.index, 1)
    items.splice(result.destination?.index ?? 0, 0, deleteItem[0])
    setTestList(items)
  }

  const [winReady, setwinReady] = useState(false)
  useEffect(() => {
    setwinReady(true)
  }, [])

  return (
    <div className='App'>
      <h2 className='text-center mb-4'>ドラッグアンドドロップ</h2>
      {winReady && (
        <DragDropContext onDragEnd={onDragEndTest}>
          <Droppable droppableId='droppable'>
            {provided => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='mx-auto w-300px'
              >
                {testList.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {provided => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className='border border-black rounded-md bg-gray-50 text-center mb-2 py-4'
                        >
                          <div>
                            <span>{id}</span>
                            <span>{name}</span>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <p className='mx-auto mt-4 w-300px'>{JSON.stringify(testList)}</p>
    </div>
  )
}

export default App
