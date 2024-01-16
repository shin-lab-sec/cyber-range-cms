// react-mdは古い記法があるのでトランスパイルする
const withTM = require('next-transpile-modules')([
  '@uiw/react-md-editor',
  '@uiw/react-markdown-preview',
])
// WindiCSSのプラグイン
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: false, // devで起きる2度のレンダリングをさせない
  swcMinify: true, // swcでminifyする
  output: 'standalone', // ビルドしたときにindex.htmlを生成する
  optimizeFonts: true, // フォントを最適化する
  images: {
    domains: ['localhost', 'cms-storage.cypas.sec'], // NextImageで別ドメインの画像を許容する
  },
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
})
