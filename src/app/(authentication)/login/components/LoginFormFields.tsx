'use client'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'

import { TextField, CheckboxField } from '@/components/forms'

/**
 * Login form input fields (email, password, remember me)
 */
export function LoginFormFields() {
  const { t } = useTranslation()

  return (
    <>
      <TextField
        name='email'
        label={t('auth.login.email.label')}
        type='email'
        placeholder={t('auth.login.email.placeholder')}
        required
        className='theme-transition-colors'
      />

      <TextField
        name='password'
        label={t('auth.login.password.label')}
        type='text'
        isPassword={true}
        placeholder={t('auth.login.password.placeholder')}
        required
        className='theme-transition-colors'
      />

      <div className='flex items-center justify-between'>
        <CheckboxField name='rememberMe' label={t('auth.login.rememberMe')} />

        <Link href='/forgot-password' className='text-sm text-primary hover:text-primary/80 transition-colors'>
          {t('auth.login.forgotPassword')}
        </Link>
      </div>
    </>
  )
}
