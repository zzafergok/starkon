/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Image optimization konfigürasyonu
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Build konfigürasyonu
  typescript: {
    // Type checking sırasında build'i bloklamayı devre dışı bırak
    ignoreBuildErrors: false,
  },

  eslint: {
    // Linting hatalarını warning olarak işaretle
    ignoreDuringBuilds: false,
  },

  // Bundle analyzer desteği (isteğe bağlı)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      if (process.env.ANALYZE) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          }),
        )
      }
      return config
    },
  }),
}

export default nextConfig
