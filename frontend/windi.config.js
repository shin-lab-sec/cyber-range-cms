import { defineConfig } from 'windicss/helpers'

// windicssの設定
export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'], // 対象ファイル
    exclude: ['node_modules', '.git', '.next'], // 対象外ファイル
  },
  theme: {
    extend: {
      width: {
        fit: 'fit-content', // w-fitで指定できるようにする
      },
    },
  },
})
