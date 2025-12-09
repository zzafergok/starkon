'use client'

import Link from 'next/link'

import { Lock, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { TextField, SubmitButton } from '@/components/forms'

export function ResetPasswordForm() {
  const { t } = useTranslation()

  return (
    <div className='space-y-6'>
      <TextField
        name='newPassword'
        label={t('auth.resetPassword.newPasswordLabel')}
        type='text'
        isPassword={true}
        showPasswordStrength={true}
        placeholder={t('auth.resetPassword.newPasswordPlaceholder')}
        required
      />

      <TextField
        name='confirmPassword'
        label={t('auth.resetPassword.confirmPasswordLabel')}
        type='text'
        isPassword={true}
        placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
        required
      />

      <SubmitButton icon={<Lock className='w-4 h-4' />} loadingText={t('auth.resetPassword.resetting')}>
        {t('auth.resetPassword.resetButton')}
      </SubmitButton>

      <div className='text-center'>
        <Link
          href='/login'
          className='text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1'
        >
          <ArrowLeft className='w-3 h-3' />
          {t('auth.resetPassword.backToLogin')}
        </Link>
      </div>
    </div>
  )
}
