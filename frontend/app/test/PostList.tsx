import { FC } from 'react'

type Post = {
  id: number
  title: string
}

const getPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Something went wrong')
  const posts: Post[] = await res.json()
  return posts
}

export const PostList = async () => {
  const posts = await getPosts()
  return (
    <>
      <h2 className='text-lg font-bold mt-4'>記事一覧</h2>
      <ul>{posts && posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
    </>
  )
}
