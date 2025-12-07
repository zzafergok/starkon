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

  // Webpack konfigürasyonu
  webpack: (config) => {
    // Bundle analyzer desteği
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        }),
      )
    }

    // Optional modüller için warning'leri gizle
    config.resolve.fallback = {
      ...config.resolve.fallback,
    }

    // Module not found warning'lerini filtrele
    const originalWarn = config.infrastructureLogging?.level !== 'error'
    config.infrastructureLogging = {
      level: 'error',
    }

    // Optional dependencies için warning'leri ignore et
    config.ignoreWarnings = [
      /Module not found: Can't resolve '@\/providers\/AuthProvider'/,
      /Module not found: Can't resolve '@\/providers\/I18nProvider'/,
      /Module not found: Can't resolve '@\/lib\/services\/sessionTokenManager'/,
      /Module not found: Can't resolve '@\/hooks\/useAuth'/,
    ]

    return config
  },

  turbopack: {},
}

export default nextConfig
