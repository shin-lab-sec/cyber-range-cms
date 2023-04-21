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
import { Suspense } from 'react'
import { CurriculumItem } from '../../src/components/CurriculumItem'

import { CourseList } from '../../src/components/CourseList'
import { Relation } from '../../src/components/Relation'
import { Counter } from '../../src/components/SampleCounter'
import Page2 from '../a'
import { SampleServer } from '../../src/components/SampleServer'
import { ServerCourseList } from '../../src/components/ServerCourseList'

// export default async function Page() {
const Page = () => {
  // const curriculums = await getApi('/courses')
  // const users = await getUsers()

  return (
    <div>
      <h1>about</h1>
      <Counter />
      <Suspense fallback={<p className='mt-4'>ユーザデータ　Loading...</p>}>
        {/* @ts-expect-error Server Component */}
        <ServerCourseList />
        {/* <Sample /> */}
      </Suspense>

      {/* @ts-expect-error Server Component */}
      <SampleServer title='anpaaa' />
      {/* <p>{JSON.stringify(curriculums)}</p> */}
      {/* <p>{JSON.stringify(users)}</p> */}
    </div>
  )
}

export default Page
