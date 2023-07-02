// 引数の配列の要素に被りがない想定
export const checkEqualArray = (arr1: readonly any[], arr2: readonly any[]) => {
  // 要素数が異なるならfalse
  if (arr1.length !== arr2.length) {
    return false
  }

  // arr1の要素を全てarr2が含まなければfalse
  for (let i = 0; i < arr1.length; i++) {
    const val = arr1[i]
    if (!arr2.includes(val)) {
      return false
    }
  }

  return true
}
