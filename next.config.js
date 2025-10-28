/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  // images: {
  //   remotePatterns: [
  //     // Raydium launch mint service
  //     { protocol: 'https', hostname: 'launch-mint-v1.raydium.io' },
  //     // Common NFT gateways
  //     { protocol: 'https', hostname: 'ipfs.io' },
  //     { protocol: 'https', hostname: 'gateway.pinata.cloud' },
  //     { protocol: 'https', hostname: 'cloudflare-ipfs.com' },
  //     { protocol: 'https', hostname: 'arweave.net' },
  //     { protocol: 'https', hostname: 'uploads.pinata.cloud' },
  //     { protocol: 'https', hostname: 'pinata.cloud' },
  //     { protocol: 'https', hostname: 'silver-passive-marten-530.mypinata.cloud' },
  //     // (optional) Shadow drive or other CDNs your API returns
  //     { protocol: 'https', hostname: 'shdw-drive.genesysgo.net' }
  //   ]
  // },
  trailingSlash: true,
  output: 'export', // ⬅️ NEW: replaces `next export`
  trailingSlash: true, // keeps .../index.html paths
  images: {
    unoptimized: true,
    domains: [
      'gateway.lighthouse.storage',
      'shdw-drive.genesysgo.net',
      'launch-mint-v1.raydium.io',
      'silver-passive-marten-530.mypinata.cloud',
      'ipfs.io',
      'nftstorage.link',
      'cloudflare-ipfs.com',
      'gateway.pinata.cloud',
      'arweave.net',
      'api.nft.storage'
    ]
  }, // needed for static export
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src')
    }

    // config.optimization.splitChunks = {
    //   chunks: 'async',
    //   minSize: 10000,
    //   minRemainingSize: 0,
    //   minChunks: 2,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   enforceSizeThreshold: 30000,
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }

    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/birthpad/',
        permanent: false
      }
    ]
  },
  async rewrites() {
    return [{ source: '/token', destination: '/birthpad/token' }]
  }
}

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'queen-sherex',
  project: 'sherex-fun',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true
  },

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  sourcemaps: {
    disable: true
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
})
