/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  optimizeFonts: true,
}
