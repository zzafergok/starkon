'use client'

import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/core/button'

import { LoginFormData } from '../schemas/loginSchema'

type DemoAccountType = 'ahmet' | 'admin' | 'mehmet'

interface DemoAccount {
  email: string
  password: string
}

const DEMO_ACCOUNTS: Record<DemoAccountType, DemoAccount> = {
  ahmet: { email: 'user@example.com', password: 'user123' },
  admin: { email: 'admin@example.com', password: 'admin123' },
  mehmet: { email: 'demo@example.com', password: 'demo123' },
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
      <div className='grid grid-cols-3 gap-2'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => fillDemoAccount('ahmet')}
          disabled={isSubmitting}
          className='text-xs theme-transition-colors'
        >
          {t('auth.login.demoAccounts.ortak')}
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => fillDemoAccount('admin')}
          disabled={isSubmitting}
          className='text-xs theme-transition-colors'
        >
          {t('auth.login.demoAccounts.zafer')}
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => fillDemoAccount('mehmet')}
          disabled={isSubmitting}
          className='text-xs theme-transition-colors'
        >
          {t('auth.login.demoAccounts.akin')}
        </Button>
      </div>
    </div>
  )
}
