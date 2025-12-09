'use client'

import { UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * Register page header with navigation and title
 */
export function RegisterHeader() {
  const { t } = useTranslation()

  return (
    <>
      {/* Title section */}
      <div className='text-center mb-8'>
        <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4'>
          <UserPlus className='w-8 h-8 text-primary' />
        </div>
        <h1 className='text-2xl font-bold text-foreground mb-2'>{t('auth.register.title')}</h1>
        <p className='text-muted-foreground'>{t('auth.register.subtitle')}</p>
      </div>
    </>
  )
}
