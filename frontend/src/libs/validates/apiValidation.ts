import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, ZodSchema } from 'zod'

export const apiValidation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  schema: ZodSchema,
  onSuccess: () => Promise<void>, // parseに成功した時の処理
) => {
  try {
    schema.parse(req.body) // parseしてエラーが出たらcatchに行く
    await onSuccess() // prismaのエラーが出たらcatchに行く
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: `ZodError: ${err.message}` })
      return
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message })
      return
    }

    res.status(400).json({ message: `Invalid request: ${JSON.stringify(err)}` })
  }
  return
}
