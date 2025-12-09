'use client'

import { useTranslation } from 'react-i18next'

import { SubmitButton } from '@/components/forms'

import { LoginFormFields } from './LoginFormFields'
import { DemoAccountButtons } from './DemoAccountButtons'

import { useRememberMe } from '../hooks/useRememberMe'

/**
 * Complete login form content with all fields and actions
 */
export function LoginFormContent() {
  const { t } = useTranslation()

  // Initialize remember me functionality
  useRememberMe()

  return (
    <>
      <LoginFormFields />
      <SubmitButton loadingText={t('auth.login.loggingIn')} size='lg' className='w-full theme-transition-colors'>
        {t('auth.login.loginButton')}
      </SubmitButton>
      <DemoAccountButtons />
    </>
  )
}
