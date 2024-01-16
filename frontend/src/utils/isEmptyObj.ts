// 引数のオブジェクトが空かを判定
export const isEmptyObj = (obj: Record<any, any>) => {
  return Object.entries(obj).length === 0
}
