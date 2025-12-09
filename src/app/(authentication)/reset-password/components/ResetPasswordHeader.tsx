'use client'

import { Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ResetPasswordHeader() {
  const { t } = useTranslation()

  return (
    <div className='text-center mb-8'>
      <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4'>
        <Lock className='w-8 h-8 text-primary' />
      </div>
      <h1 className='text-2xl font-bold text-foreground mb-2'>{t('auth.resetPassword.title')}</h1>
      <p className='text-muted-foreground'>{t('auth.resetPassword.description')}</p>
    </div>
  )
}
