import type { Metadata, Viewport } from 'next'
import React from 'react'
import './globals.css'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'

// Auth ve I18n provider'larını optional olarak import et
let AuthProvider: React.ComponentType<{ children: React.ReactNode }> | null = null
let I18nProvider: React.ComponentType<{ children: React.ReactNode }> | null = null

try {
  const authModule = require('@/providers/AuthProvider')
  AuthProvider = authModule.AuthProvider
} catch {
  // AuthProvider mevcut değil
}

try {
  const i18nModule = require('@/providers/I18nProvider')
  I18nProvider = i18nModule.default
} catch {
  // I18nProvider mevcut değil
}

export const metadata: Metadata = {
  title: {
    default: 'Starkon - Modern React Component Library',
    template: '%s | Starkon',
  },
  description:
    'Enterprise seviyede React component kütüphanesi. Radix UI tabanlı, erişilebilir ve özelleştirilebilir komponentler.',
  keywords: ['React', 'Next.js', 'UI Kit', 'Components', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Zafer Gök', url: 'https://github.com/zzafergok' }],
  creator: 'Zafer Gök',
  publisher: 'Starkon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    title: 'Starkon - Modern React Component Library',
    description: 'Enterprise seviyede React component kütüphanesi.',
    siteName: 'Starkon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starkon - Modern React Component Library',
    description: 'Enterprise seviyede React component kütüphanesi.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='tr'>
      <body className='bg-background text-foreground antialiased'>
        <ReactQueryProvider>
          {AuthProvider ? (
            <AuthProvider>
              <ThemeProvider>
                {I18nProvider ? (
                  <I18nProvider>
                    <ToastProvider>
                      <div className='min-h-screen flex flex-col'>
                        <main className='flex-1'>{children}</main>
                      </div>
                    </ToastProvider>
                  </I18nProvider>
                ) : (
                  <ToastProvider>
                    <div className='min-h-screen flex flex-col'>
                      <main className='flex-1'>{children}</main>
                    </div>
                  </ToastProvider>
                )}
              </ThemeProvider>
            </AuthProvider>
          ) : (
            <ThemeProvider>
              {I18nProvider ? (
                <I18nProvider>
                  <ToastProvider>
                    <div className='min-h-screen flex flex-col'>
                      <main className='flex-1'>{children}</main>
                    </div>
                  </ToastProvider>
                </I18nProvider>
              ) : (
                <ToastProvider>
                  <div className='min-h-screen flex flex-col'>
                    <main className='flex-1'>{children}</main>
                  </div>
                </ToastProvider>
              )}
            </ThemeProvider>
          )}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
