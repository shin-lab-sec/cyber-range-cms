import { FC, ReactNode, useCallback } from 'react'

type Props = {
  confirmMessage: string
  onConfirm: () => void
  children: ReactNode
}

export const ConfirmButton: FC<Props> = ({
  confirmMessage,
  onConfirm,
  children,
}) => {
  const onClick = useCallback(() => {
    // 確認ダイアログを表示し、OKを押すとtrueになる
    if (window.confirm(confirmMessage)) {
      onConfirm()
    }
  }, [confirmMessage, onConfirm])

  return (
    <button onClick={onClick} className='grid place-items-center'>
      {children}
    </button>
  )
}
