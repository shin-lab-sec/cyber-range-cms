import { FC } from 'react'

type Props = {
  children: React.ReactNode
}

const layout: FC<Props> = ({ children }) => {
  return (
    <div className='h-screen flex'>
      <div className='bg-gray-100 p-2 w-48'>サイドバー</div>
      <div className='p-2'>{children}</div>
    </div>
  )
}
export default layout
