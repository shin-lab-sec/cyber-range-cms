'use client'
import { FC, useState } from 'react'

export const Counter: FC = () => {
  const [counter, setCounter] = useState(0)
  return (
    <>
      <button
        className='border bg-blue-500 border-blue-500 text-white py-1 px-2 duration-300 hover:(bg-white text-blue-500) '
        onClick={() => setCounter(s => s + 1)}
      >
        {counter}
      </button>
    </>
  )
}
