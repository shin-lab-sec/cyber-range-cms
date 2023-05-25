import { z } from 'zod'

export const fileUploadSchema = z.object({
  file: z.custom<FileList>().transform(file => file[0]),
  name: z.string().nonempty('ファイル名は必須です'),
  contentType: z.string().nonempty('ファイルのタイプは必須です'),
})
