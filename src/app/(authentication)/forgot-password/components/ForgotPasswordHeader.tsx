'use client'

import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ForgotPasswordHeader() {
  const { t } = useTranslation()

  return (
    <div className='text-center mb-8'>
      <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4'>
        <Mail className='w-8 h-8 text-primary' />
      </div>
      <h1 className='text-2xl font-bold text-foreground mb-2'>{t('auth.forgotPassword.title')}</h1>
      <p className='text-muted-foreground'>{t('auth.forgotPassword.description')}</p>
    </div>
  )
}
