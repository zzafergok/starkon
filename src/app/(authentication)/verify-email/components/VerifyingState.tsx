'use client'

import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function VerifyingState() {
  const { t } = useTranslation()

  return (
    <div className='text-center'>
      <Loader2 className='mx-auto h-12 w-12 text-primary animate-spin' />
      <h2 className='mt-4 text-xl font-semibold text-foreground'>{t('auth.emailVerification.verifying.title')}</h2>
      <p className='mt-2 text-sm text-muted-foreground'>{t('auth.emailVerification.verifying.description')}</p>
    </div>
  )
}
