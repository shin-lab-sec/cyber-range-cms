import { useCallback } from 'react'

import { useBoolean } from './useBoolean'

export const useModalForm = <T>(onSubmitProps: (params: T) => void) => {
  const isOpen = useBoolean()
  const isDirtyForm = useBoolean()

  const onClose = useCallback(() => {
    if (!isDirtyForm.v) {
      isOpen.setFalse()
      isDirtyForm.setFalse()
      return
    }

    if (window.confirm('編集内容を破棄しますか？')) {
      isOpen.setFalse()
      isDirtyForm.setFalse()
    }
  }, [isDirtyForm, isOpen])

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
