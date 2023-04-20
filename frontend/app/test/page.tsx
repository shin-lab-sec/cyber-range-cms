import { UserList } from './UserList'
import { Counter } from './Counter'
import { Suspense } from 'react'
import { PostList } from './PostList'

const Test = () => {
  return (
    <div>
      <h1>Testページ</h1>
      <Counter />
      <Suspense fallback={<p className='mt-4 animate-ping'>loading...</p>}>
        {/* これを前に置くと、ビルド通る */}
        {/* @ts-expect-error Server Component */}
        <UserList />
      </Suspense>
      <Suspense fallback={<p className='mt-4 animate-ping'>loading...</p>}>
        {/* @ts-expect-error Server Component */}
        <PostList />
      </Suspense>

      {/* 遅い方に合わせられる */}
      <Suspense fallback={<p className='mt-4 animate-ping'>loading...</p>}>
        {/* @ts-expect-error Server Component */}
        <UserList />
        {/* @ts-expect-error Server Component */}
        <PostList />
      </Suspense>
    </div>
  )
}

export default Test
