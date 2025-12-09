'use client'

import { XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/button'

interface VerificationErrorProps {
  title: string
  description: string
  onReturnToLogin: () => void
}

export function VerificationError({ title, description, onReturnToLogin }: VerificationErrorProps) {
  const { t } = useTranslation()

  return (
    <div className='text-center'>
      <XCircle className='mx-auto h-12 w-12 text-red-600 dark:text-red-400' />
      <h2 className='mt-4 text-xl font-semibold text-red-900 dark:text-red-100'>{title}</h2>
      <p className='mt-2 text-sm text-red-700 dark:text-red-300 mb-6'>{description}</p>
      <Button onClick={onReturnToLogin} className='w-full'>
        {t('auth.emailVerification.returnToLogin')}
      </Button>
    </div>
  )
}
