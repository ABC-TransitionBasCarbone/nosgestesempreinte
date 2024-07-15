const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const redirects = require('./config/redirects.js');
const remoteImagesPatterns = require('./config/remoteImagesPatterns.js');
const withYAML = require('next-yaml');

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'fr',
  },
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
      '*': ['.next/cache/webpack', '.git/**/*', 'cypress/**/*'],
      '/blog': ['public/NGC_Kit.diffusion.zip'],
      '/nouveautes': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/actions/plus': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/sitemap.xml': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
    },
    webpackBuildWorker: true,
  },
};

module.exports = withYAML(withMDX(nextConfig));
