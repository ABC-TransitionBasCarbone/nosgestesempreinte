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
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  productionBrowserSourceMaps: true,
  i18n: {
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'fr',
    localeDetector: (request) => {
      const acceptedLanguages = request.headers
        ?.get('accept-language')
        ?.split(',')
      if (!acceptedLanguages) {
        return 'fr'
      }
      const preferedLanguage = acceptedLanguages.find((acceptedLanguage) =>
        ['fr', 'en', 'es'].includes(acceptedLanguage.split('-'))
      )
      return preferedLanguage || 'fr'
    },
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: remoteImagesPatterns,
  },
  async redirects() {
    return redirects;
  },
  webpack: (config, { dev, isServer }) => {
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

    if (isServer) {
      config.devtool = 'source-map'
      
    }

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
