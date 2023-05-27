// react-mdは古い記法があるのでトランスパイルする
const withTM = require('next-transpile-modules')([
  '@uiw/react-md-editor',
  '@uiw/react-markdown-preview',
])
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: false,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: ['localhost'],
  },
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
})
