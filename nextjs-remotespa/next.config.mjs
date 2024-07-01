/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import WebpackAssetsManifest from 'webpack-assets-manifest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const { protocol, hostname, port } = new URL(process.env.NEXT_PUBLIC_AEM_HOST);

const nextConfig = {
  reactStrictMode: true,
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
        output: path.join(__dirname, 'public', 'asset-manifest.json'),
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
        resourceQuery: /react/, // *.svg?react
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /react/] },
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

export default bundleAnalyzer(nextConfig);
