import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

// cors設定、GET、POSTのみ許可。originはhttps://cypas.secのみ許可
const cors = Cors({
  methods: ['GET', 'POST'],
  origin: 'https://cypas.sec',
})

// corsを実行する関数
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
