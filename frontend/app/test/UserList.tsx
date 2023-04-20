type User = {
  id: number
  name: string
  email: string
}

const getUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Something went wrong')
  const users: User[] = await res.json()
  console.log(users) // SCだから表示されない
  return users
}

// 3秒遅延している
const getUser = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = await res.json()
  return user
}

export const UserList = async () => {
  const users = await getUsers()
  const user = await getUser('1')
  return (
    <>
      <h2 className='text-lg font-bold mt-4'>ユーザ一覧</h2>
      <ul>{users && users.map(user => <li key={user.id}>{user.name}</li>)}</ul>

      <h2 className='text-lg font-bold mt-4'>ユーザ一1</h2>
      <ul>{user && <li>{user.name}</li>}</ul>
    </>
  )
}
