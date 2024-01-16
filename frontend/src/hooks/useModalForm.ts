import { useCallback } from 'react'

import { useBoolean } from './useBoolean'

// モーダルフォームのフック
export const useModalForm = <T>(onSubmitProps: (params: T) => void) => {
  const isOpen = useBoolean() // モーダルの開閉状態、状態更新関数
  const isDirtyForm = useBoolean() // フォームの変更状態、状態更新関数

  // 閉じるときの処理
  const onClose = useCallback(() => {
    // フォームに変更を加えていなかったら、モーダルを閉じる
    if (!isDirtyForm.v) {
      isOpen.setFalse()
      isDirtyForm.setFalse()
      return
    }

    // フォームに変更を加えていたら、確認メッセージを出す
    if (window.confirm('編集内容を破棄しますか？')) {
      isOpen.setFalse()
      isDirtyForm.setFalse()
    }
  }, [isDirtyForm, isOpen])

  // 送信処理成功したら、モーダルを閉じる
  const onSubmit = useCallback(
    async (params: T) => {
      await onSubmitProps(params)
      isOpen.setFalse()
      isDirtyForm.setFalse()
    },
    [isDirtyForm, isOpen, onSubmitProps],
  )

  return { isOpen, isDirtyForm, onClose, onSubmit }
}
