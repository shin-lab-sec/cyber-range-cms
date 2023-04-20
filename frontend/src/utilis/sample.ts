export const num = 1

export const getUsers = async () => {
  // await new Promise(resolve => setTimeout(resolve, 5000))
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Something went wrong')
  const users = await res.json()
  return users
}
