'use client'

import { useEffect } from 'react'

type Props = {
  error: Error
  reset: () => void
}

const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <p>Something went wrong!</p>
      <button className='bg-red-500 px-2' onClick={reset}>
        Reset error boundary
      </button>
    </div>
  )
}

export default Error
