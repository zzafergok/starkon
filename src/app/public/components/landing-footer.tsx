'use client'

import React from 'react'

import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/button'

export function LandingFooter() {
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
