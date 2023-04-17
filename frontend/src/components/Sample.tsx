import { FC, useCallback, useEffect, useState } from 'react'
import { Anpan, Sample as SampleType } from '@prisma/client'

export const Sample: FC = () => {
  const [samples, setSamples] = useState<SampleType[]>([])

  const getSamples = useCallback(async () => {
    const res = await fetch('api/samples', {
      method: 'GET',
    }).then(res => res.json())
    setSamples(res.data)
  }, [])

  useEffect(() => {
    getSamples()
  }, [])

  return (
    <div>
      {samples?.map(sample => (
        <li key={sample.id}>
          <p>id: {sample.id}</p>
          <p>username: {sample.username}</p>
          <p>email: {sample.email}</p>
          <p>price: {sample.price}</p>
        </li>
      ))}
      <p></p>
    </div>
  )
}
