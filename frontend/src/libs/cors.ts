import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

const cors = Cors({
  methods: ['GET'],
  origin: 'https://cypas.sec',
})

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
