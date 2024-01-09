const withMakeswift = require('@makeswift/runtime/next/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn11.bigcommerce.com', 'media.graphassets.com'],
  },
}

module.exports = withMakeswift(nextConfig)
