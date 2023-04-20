// export default function Page() {
//   // const curriculums = await fetch('/api/curriculums')
//   // return <div>{JSON.stringify(curriculums)}</div>
//   return <>page</>
// }

// const getUsers = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users')
//   if (!res.ok) throw new Error('Something went wrong')
//   const users = await res.json()
//   return users
// }

import { getApi } from '../../src/utilis/api'
import { num, getUsers } from '../../src/utilis/sample'
import { Sample } from '../../src/components/Sample'
import Page2 from '../a'
import { Suspense } from 'react'
import { CurriculumItem } from '../../src/components/CurriculumItem'
import { CourseList } from '../../src/components/CourseList'
import { Relation } from '../../src/components/Relation'

export default async function Page() {
  // const curriculums = await getApi('/courses')
  // const users = await getUsers()

  return (
    <div>
      <h1>about</h1>
      <CourseList />
      <Relation />
      {/* <Suspense fallback={<p className='mt-4'>ユーザデータ　Loading...</p>}>
        <Sample />
      </Suspense> */}
      <Page2 />
      {/* <p>{JSON.stringify(curriculums)}</p> */}
      {/* <p>{JSON.stringify(users)}</p> */}
    </div>
  )
  // return <>page</>
}
