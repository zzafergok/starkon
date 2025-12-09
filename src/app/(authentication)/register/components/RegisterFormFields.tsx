'use client'

import { useTranslation } from 'react-i18next'

import { TextField } from '@/components/forms'

/**
 * Register form input fields
 */
export function RegisterFormFields() {
  const { t } = useTranslation()

  return (
    <div className='space-y-6'>
      <TextField
        name='fullName'
        label={t('auth.register.fullName')}
        placeholder={t('auth.register.fullNamePlaceholder')}
        required
        className='theme-transition-colors'
      />

      <TextField
        name='email'
        label={t('auth.register.email')}
        type='email'
        placeholder={t('auth.register.emailPlaceholder')}
        required
        className='theme-transition-colors'
      />

      <TextField
        name='password'
        label={t('auth.register.password')}
        type='text'
        isPassword={true}
        showPasswordStrength={true}
        placeholder={t('auth.register.passwordPlaceholder')}
        required
        className='theme-transition-colors'
      />

      <TextField
        name='confirmPassword'
        label={t('auth.register.confirmPassword')}
        type='text'
        isPassword={true}
        placeholder={t('auth.register.confirmPasswordPlaceholder')}
        required
        className='theme-transition-colors'
      />
    </div>
  )
}
