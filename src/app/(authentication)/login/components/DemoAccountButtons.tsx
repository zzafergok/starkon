'use client'

import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/core/button'

import { LoginFormData } from '../schemas/loginSchema'

type DemoAccountType = 'demo'

interface DemoAccount {
  email: string
  password: string
}

const DEMO_ACCOUNTS: Record<DemoAccountType, DemoAccount> = {
  demo: { email: 'demo@example.com', password: 'demo123' },
}

/**
 * Demo account selection buttons for quick login
 */
export function DemoAccountButtons() {
  const { t } = useTranslation()
  const {
    formState: { isSubmitting },
    setValue,
  } = useFormContext<LoginFormData>()

  const fillDemoAccount = (type: DemoAccountType) => {
    const account = DEMO_ACCOUNTS[type]
    setValue('email', account.email)
    setValue('password', account.password)
  }

  return (
    <div className='space-y-3'>
      <div className='text-center'>
        <span className='text-sm text-muted-foreground'>{t('auth.login.demoAccounts.title')}</span>
      </div>
      <div className='flex w-full justify-center'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => fillDemoAccount('demo')}
          disabled={isSubmitting}
          className='text-xs theme-transition-colors'
        >
          {t('auth.login.demoAccounts.demo')}
        </Button>
      </div>
    </div>
  )
}
