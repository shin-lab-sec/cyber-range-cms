// PrismaのDateは協定世界時なので、日本時間に変換する
export const convertToJapanTime = (target: string) => {
  const date = new Date(target)
  return date.toLocaleDateString()
}
