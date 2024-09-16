import createMDX from '@next/mdx'
import { redirects } from './config/redirects.js';
import { remoteImagesPatterns } from './config/remoteImagesPatterns.js';
import withYAML from 'next-yaml';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: remoteImagesPatterns,
  },
  async redirects() {
    return redirects;
  },
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      });
      config.cache.maxMemoryGenerations = 0;
    }

    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        '@mdx-js/loader',
      ],
    });

    return config;
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
  },
};

export default withYAML(withMDX(nextConfig));
