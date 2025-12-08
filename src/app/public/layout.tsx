'use client'

import React from 'react'

import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/button'

function LandingNavbar() {
  const { t } = useTranslation()

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('#hero')}
              className='text-2xl font-bold text-blue-600 hover:text-blue-700 hover:bg-transparent p-0'
            >
              Starkon
            </Button>
          </div>
          <div className='flex items-center space-x-8'>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('#features')}
              className='text-gray-900 dark:text-white hover:text-blue-600 transition-colors'
            >
              {t('landing.navbar.features')}
            </Button>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('#pricing')}
              className='text-gray-900 dark:text-white hover:text-blue-600 transition-colors'
            >
              {t('landing.navbar.pricing')}
            </Button>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('#testimonials')}
              className='text-gray-900 dark:text-white hover:text-blue-600 transition-colors'
            >
              {t('landing.navbar.reviews')}
            </Button>
            <Button
              variant='ghost'
              onClick={() => scrollToSection('#faq')}
              className='text-gray-900 dark:text-white hover:text-blue-600 transition-colors'
            >
              {t('landing.navbar.faq')}
            </Button>
            <Button onClick={() => scrollToSection('#contact')}>{t('landing.navbar.getStarted')}</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function LandingFooter() {
  const { t } = useTranslation()

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center'>
          <h3 className='text-xl font-bold mb-4'>Starkon</h3>
          <p className='text-gray-300 mb-6'>{t('landing.footer.description')}</p>
          <div className='flex justify-center space-x-6'>
            <Button variant='link' className='text-gray-300 hover:text-white transition-colors p-0 h-auto'>
              <a href='#'>{t('landing.footer.github')}</a>
            </Button>
            <Button variant='link' className='text-gray-300 hover:text-white transition-colors p-0 h-auto'>
              <a href='#'>{t('landing.footer.documentation')}</a>
            </Button>
            <Button variant='link' className='text-gray-300 hover:text-white transition-colors p-0 h-auto'>
              <a href='#'>{t('landing.footer.support')}</a>
            </Button>
          </div>
          <div className='border-t border-gray-800 mt-8 pt-8'>
            <p className='text-gray-400'>{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <LandingNavbar />
      <main className='flex-1 pt-16'>{children}</main>
      <LandingFooter />
    </div>
  )
}
