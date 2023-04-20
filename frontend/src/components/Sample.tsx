'use client'
import { Loader } from '@mantine/core'
import { num, getUsers } from '../utilis/sample'

export const Sample = async () => {
  const users = await getUsers()
  return (
    <div>
      {num}
      <p>Sample</p>
      {JSON.stringify(users)}
      <Loader />
    </div>
  )
}
