'use client'

import Link from 'next/link'

import { Mail, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { TextField, SubmitButton } from '@/components/forms'

export function ForgotPasswordForm() {
  const { t } = useTranslation()

  return (
    <div className='space-y-6'>
      <TextField
        name='email'
        label={t('auth.forgotPassword.emailLabel')}
        type='email'
        placeholder={t('auth.forgotPassword.emailPlaceholder')}
        required
      />

      <SubmitButton icon={<Mail className='w-4 h-4' />} loadingText={t('auth.forgotPassword.sending')}>
        {t('auth.forgotPassword.sendResetLink')}
      </SubmitButton>

      <div className='text-center'>
        <Link
          href='/login'
          className='text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1'
        >
          <ArrowLeft className='w-3 h-3' />
          {t('auth.forgotPassword.backToLogin')}
        </Link>
      </div>
    </div>
  )
}
