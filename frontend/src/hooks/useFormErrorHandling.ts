import { useState, useCallback } from 'react'

// 送信関数をラップして、エラーメッセージを返すフック
export const useFormErrorHandling = <T = any>(
  func: (args: T) => Promise<void> | void,
): {
  onSubmit: (params: T) => Promise<void>
  errorMessage: string | null
  clearErrorMessage: () => void
} => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const onSubmit = useCallback(
    async (params: T) => {
      try {
        await func(params)
      } catch (error) {
        if (error instanceof Error) {
          // エラーメッセージをセット
          setErrorMessage(error.message)
          return
        }
        setErrorMessage(String(error))
      }
    },
    [func],
  )

  // エラーメッセージを消す関数
  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null)
  }, [])

  return { onSubmit, errorMessage, clearErrorMessage }
}
