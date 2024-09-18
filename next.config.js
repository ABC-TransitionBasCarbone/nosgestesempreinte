//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
import createMDX from '@next/mdx'
import { redirects } from './config/redirects.js'
import { remoteImagesPatterns } from './config/remoteImagesPatterns.js'

const withMDX = createMDX({
  extension: /\.mdx$/,
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    // @ts-expect-error remotePatterns is not typed
    remotePatterns: remoteImagesPatterns,
  },
  async redirects() {
    return redirects
  },
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      })
    }

    // Add a rule for YAML files
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    return config
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['.next/cache/webpack', '.git/**/*'],
      '/blog': ['public/NGC_Kit.diffusion.zip'],
      '/nouveautes': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/actions/plus': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/sitemap.xml': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
    },
    webpackBuildWorker: true,
    turbo: {
      rules: {
        '*.yaml': {
          loaders: ['yaml-loader'],
        },
      },
    },
  },
}

export default process.env.NODE_ENV !== 'development'
    ? withMDX(nextConfig)
    : nextConfig
