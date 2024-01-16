import type { NextApiRequest, NextApiResponse } from 'next'

// api/v1/quizzes/[id]のAPI定義
// Basic認証失敗のエラーを返す
export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader('WWW-authenticate', 'Basic realm="Secure Area"')
  res.statusCode = 401
  res.end(`Basic Auth Required.`)
}
