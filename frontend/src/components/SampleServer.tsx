import { FC } from 'react'
import { num, getUsers } from '../utilis/sample'

type Props = {
  title: string
}

// export const SampleServer: FC<Props> = async({ title }) => {
export async function SampleServer({ title }: Props) {
  const users = await getUsers()
  return (
    <div>
      <h1>サーバーコンポーネント</h1>
      <h2>{title}</h2>
      {JSON.stringify(users)}
    </div>
  )
}
