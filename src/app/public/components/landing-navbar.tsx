'use client'

import React from 'react'

import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/button'

export function LandingNavbar() {
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
