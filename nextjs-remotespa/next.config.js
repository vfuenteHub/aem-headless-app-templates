/** @type {import('next').NextConfig} */
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const { protocol, hostname, port } = new URL(process.env.NEXT_PUBLIC_AEM_HOST);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  experimental: {
    webpackBuildWorker: true
  },
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: '/api/getNextProps',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/asset-manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: protocol.replace(':', ''),
        hostname,
        port,
        pathname: '/content/**',
      },
    ],
  },
  webpack(config) {
    config.plugins.push(
      new WebpackAssetsManifest({
        output: '../public/asset-manifest.json',
        transform: assets => {
          const entrypoints = [];

          for (let file in assets) {
            if (file.includes('server/')) {
              delete assets[file];
            } else if (
              assets[file].endsWith('.js') ||
              assets[file].endsWith('.css')
            ) {
              entrypoints.push(assets[file]);
            }
          }

          return {
            files: assets,
            entrypoints,
          };
        },
      })
    );

    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ['@svgr/webpack'],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
