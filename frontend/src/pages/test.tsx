import axios from 'axios'
import { NextPage } from 'next'
import  { useState, useEffect } from 'react'

type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const axiosFetcher = async (url: string): Promise<Comment[]> => {
  let res: Comment[] | undefined
  try {
    const result = await axios.get<Comment[]>(url)
    console.log(result.data)
    res = result.data
  } catch (e) {
    console.error(e)
  }
  return res ? res : []
}

const CommentPage: NextPage = () => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const getComments = async () => {
      const res = await axiosFetcher('https://jsonplaceholder.typicode.com/comments/?_limit=10')
      if (res) {
        setComments(res)
      }
    }
    getComments()
  }, [])

  console.log(comments)
  return (
    <>
      <h1 className='text-4xl'>comment page</h1>
      <ul className='mt-10'>
        {comments?.map(comment => (
          <p key={comment.id}>{comment.body}</p>
        ))}
      </ul>
      </>
  )
}

export default CommentPage
