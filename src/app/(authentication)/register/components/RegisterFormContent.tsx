'use client'

import { useRouter } from 'next/navigation'

import { UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SubmitButton } from '@/components/forms'

import { RegisterFormFields } from './RegisterFormFields'
import { RegisterAgreements } from './RegisterAgreements'

/**
 * Complete register form content with all fields and actions
 */
export function RegisterFormContent() {
  const router = useRouter()
  const { t } = useTranslation()

  const handleLoginRedirect = () => {
    router.push('/login')
  }

  return (
    <div className='space-y-6'>
      <RegisterFormFields />
      <RegisterAgreements />

      <SubmitButton icon={<UserPlus className='w-4 h-4' />} loadingText={t('auth.register.loading')}>
        {t('auth.register.submitButton')}
      </SubmitButton>

      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          {t('auth.register.alreadyHaveAccount')}{' '}
          <button
            type='button'
            onClick={handleLoginRedirect}
            className='text-primary hover:text-primary/80 font-medium transition-colors'
          >
            {t('auth.register.loginLink')}
          </button>
        </p>
      </div>
    </div>
  )
}
