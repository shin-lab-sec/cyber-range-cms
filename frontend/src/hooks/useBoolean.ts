import { useState, useMemo } from 'react'

// Booleanの状態を管理するフック
export const useBoolean = (
  init: boolean = false,
): {
  v: boolean
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
} => {
  const [boolean, setBoolean] = useState(init)

  const res = useMemo(
    () => ({
      v: boolean,
      setTrue: () => setBoolean(true),
      setFalse: () => setBoolean(false),
      toggle: () => setBoolean(v => !v),
    }),
    [boolean],
  )

  return res
}
