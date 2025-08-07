'use client'

import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Mail, Heart, Sparkles, ArrowRight, ExternalLink } from 'lucide-react'

import { Button } from '@/components/core/button'

const footerLinks = {
  quickLinks: [
    { href: '/', labelKey: 'navigation.home' },
    { href: '/about', labelKey: 'navigation.about' },
    { href: '/contact', labelKey: 'İletişim' },
  ],
  legal: [
    { href: '/privacy', labelKey: 'Gizlilik Politikası' },
    { href: '/terms', labelKey: 'Kullanım Şartları' },
    { href: '/cookies', labelKey: 'Çerez Politikası' },
  ],
  support: [
    { href: '/help', labelKey: 'Yardım Merkezi', external: false },
    { href: '/support', labelKey: 'Destek', external: false },
    { href: 'https://github.com/zzafergok/starkon-template', labelKey: 'GitHub', external: true },
  ],
} as const

const socialLinks = [
  { href: 'https://github.com/zzafergok/starkon-template', icon: '🐙', label: 'GitHub' },
  { href: 'https://twitter.com/zzafergok', icon: '🐦', label: 'Twitter' },
  { href: 'https://linkedin.com/in/zzafergok', icon: '💼', label: 'LinkedIn' },
  { href: 'mailto:contact@stark.dev', icon: Mail, label: 'Email' },
] as const

export function PublicFooter() {
  const currentYear = new Date().getFullYear()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = href
    }
  }

  if (!mounted) {
    return (
      <footer className='bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-12'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              <div className='space-y-4'>
                <div className='w-32 h-6 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                <div className='w-full h-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                <div className='flex space-x-2'>
                  <div className='w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse'></div>
                  <div className='w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse'></div>
                  <div className='w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse'></div>
                  <div className='w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse'></div>
                </div>
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='space-y-4'>
                  <div className='w-24 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                  <div className='space-y-2'>
                    <div className='w-20 h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                    <div className='w-16 h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                    <div className='w-24 h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='border-t border-neutral-200 dark:border-neutral-700 py-6'>
            <div className='flex justify-between items-center'>
              <div className='w-32 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
              <div className='w-24 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse'></div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className='relative bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-primary-900/20 border-t border-neutral-200 dark:border-neutral-700'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-grid-neutral-200/20 dark:bg-grid-neutral-700/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.4),transparent)] dark:[mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.3),transparent)]' />
      
      {/* Floating Elements */}
      <div className='absolute top-20 left-10 w-64 h-64 bg-primary-200/20 dark:bg-primary-700/10 rounded-full blur-3xl animate-pulse opacity-40' />
      <div className='absolute bottom-20 right-10 w-80 h-80 bg-accent-200/20 dark:bg-accent-700/10 rounded-full blur-3xl animate-pulse opacity-30' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Newsletter Section */}
        <div className='py-16'>
          <div className='text-center mb-12'>
            <div className='inline-flex items-center space-x-3 mb-6'>
              <div className='w-12 h-12 bg-gradient-to-br from-primary-500 via-blue-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg'>
                <Sparkles className='h-6 w-6 text-white' />
              </div>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-primary-600 via-blue-500 to-accent-600 dark:from-primary-400 dark:via-blue-300 dark:to-accent-400 bg-clip-text text-transparent'>
                Stark
              </h2>
            </div>
            <h3 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>
              Yeniliklerden Haberdar Ol
            </h3>
            <p className='text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto'>
              En son özellikler, güncellemeler ve özel içeriklerden ilk sen haberdar ol.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto'>
              <input
                type='email'
                placeholder='E-posta adresin'
                className='w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300'
              />
              <Button className='w-full sm:w-auto bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'>
                <span className='mr-2'>Abone Ol</span>
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className='py-12 border-t border-neutral-200/60 dark:border-neutral-700/60'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Brand Section */}
            <div className='lg:col-span-1'>
              <div className='flex items-center space-x-3 mb-6'>
                <div className='w-10 h-10 bg-gradient-to-br from-primary-500 via-blue-500 to-accent-500 rounded-xl flex items-center justify-center'>
                  <Sparkles className='h-5 w-5 text-white' />
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent'>
                  Stark
                </span>
              </div>
              <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm leading-relaxed'>
                Modern React uygulamaları için tasarlanmış kapsamlı bileşen kütüphanesi. Radix UI tabanlı, erişilebilir
                ve özelleştirilebilir komponentler.
              </p>
              <div className='flex space-x-2'>
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Button
                      key={social.href}
                      variant='ghost'
                      size='sm'
                      onClick={() => handleLinkClick(social.href, true)}
                      className='h-10 w-10 p-0 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group'
                      aria-label={social.label}
                    >
                      {typeof Icon === 'string' ? (
                        <span className='text-lg group-hover:scale-110 transition-transform duration-300'>{Icon}</span>
                      ) : (
                        <Icon className='h-5 w-5 group-hover:scale-110 transition-transform duration-300' />
                      )}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-6 flex items-center'>
                <div className='w-2 h-2 bg-primary-500 rounded-full mr-2'></div>
                Hızlı Linkler
              </h3>
              <ul className='space-y-3'>
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className='group text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 flex items-center'
                    >
                      <span className='group-hover:translate-x-1 transition-transform duration-300'>
                        {link.labelKey === 'navigation.home' ? 'Ana Sayfa' : link.labelKey === 'navigation.about' ? 'Hakkımızda' : link.labelKey}
                      </span>
                      <ArrowRight className='h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className='text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-6 flex items-center'>
                <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                Destek
              </h3>
              <ul className='space-y-3'>
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.external)}
                      className='group text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 flex items-center'
                    >
                      <span className='group-hover:translate-x-1 transition-transform duration-300'>
                        {link.labelKey}
                      </span>
                      {link.external ? (
                        <ExternalLink className='h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                      ) : (
                        <ArrowRight className='h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className='text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-6 flex items-center'>
                <div className='w-2 h-2 bg-accent-500 rounded-full mr-2'></div>
                Yasal
              </h3>
              <ul className='space-y-3'>
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className='group text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 flex items-center'
                    >
                      <span className='group-hover:translate-x-1 transition-transform duration-300'>
                        {link.labelKey}
                      </span>
                      <ArrowRight className='h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-neutral-200/60 dark:border-neutral-700/60 py-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0'>
            <div className='flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400'>
              <span>© {currentYear} Stark.</span>
              <span>Tüm hakları saklıdır.</span>
            </div>

            <div className='flex items-center space-x-3'>
              <div className='flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400'>
                <span>Türkiye'den</span>
                <Heart className='h-4 w-4 text-red-500 fill-current animate-pulse' />
                <span>ile yapıldı</span>
              </div>
              <div className='flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 rounded-full border border-primary-200 dark:border-primary-700/50'>
                <Sparkles className='h-3 w-3 text-primary-600 dark:text-primary-400' />
                <span className='text-xs font-medium text-primary-600 dark:text-primary-400'>v2024.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
