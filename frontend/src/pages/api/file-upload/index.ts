import type { NextApiRequest, NextApiResponse } from 'next'

// import { apiValidation } from '@/libs/validates'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  // useragents
  switch (method) {
    case 'POST':
      // file が受け取れない

      try {
        await fetch(`http://localhost:8003/aaaa/${body.name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': body.contentType,
          },
          body: body.file,
        })
        res
          .status(200)
          .json({ data: `http://localhost:8003/aaaa/${body.name}` })
      } catch (e) {
        res.status(444).json({ data: 'err', body })
      }
      break

    default:
      res.status(405).end()
      break
  }
}
