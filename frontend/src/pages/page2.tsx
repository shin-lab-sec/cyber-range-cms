import { NextPage } from 'next'
import Link from 'next/link'

const page2: NextPage = () => {
  return (
    <div>
      <h1>page2</h1>
      <Link href='/'>home</Link>
    </div>
  )
}

export default page2
