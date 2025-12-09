'use client'

import Link from 'next/link'

import { useSearchParams } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/forms'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { ThemeSwitcher } from '@/components/ui/theme/theme-switcher'
import { LanguageSwitcher } from '@/components/ui/language/language-switcher'

import { ResetPasswordHeader, ResetPasswordForm, ResetPasswordSuccess, ResetPasswordError } from './components'

import { resetPasswordSchema, ResetPasswordFormData } from './schemas/resetPasswordSchema'

import { useResetPassword } from './hooks'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function ResetPasswordPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { handleSubmit, isSuccess, error, hasToken } = useResetPassword(token)

  const defaultValues: ResetPasswordFormData = {
    newPassword: '',
    confirmPassword: '',
  }

  // Error screen (no token or invalid)
  if (!hasToken || error) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4 bg-background'>
        <div className='w-full max-w-md space-y-6'>
          <div className='flex justify-center items-center space-x-2'>
            <LanguageSwitcher variant='button' showLabel className='bg-card shadow-theme-sm border border-border' />
            <ThemeSwitcher variant='button' showLabel />
          </div>
          <ResetPasswordError error={error} />
        </div>
      </div>
    )
  }

  // Success screen
  if (isSuccess) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4 bg-background'>
        <div className='w-full max-w-md space-y-6'>
          <div className='flex justify-center items-center space-x-2'>
            <LanguageSwitcher variant='button' showLabel className='bg-card shadow-theme-sm border border-border' />
            <ThemeSwitcher variant='button' showLabel />
          </div>
          <ResetPasswordSuccess />
        </div>
      </div>
    )
  }

  // Main form
  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* Navigation bar */}
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Button variant='ghost' size='sm' className='text-muted-foreground hover:text-primary gap-2 pl-0'>
              <ArrowLeft className='h-4 w-4' />
              {t('homepage.returnToHome') || 'Ana Sayfa'}
            </Button>
          </Link>

          <div className='flex items-center space-x-2'>
            <LanguageSwitcher variant='button' showLabel className='bg-card shadow-theme-sm border border-border' />
            <ThemeSwitcher variant='button' showLabel />
          </div>
        </div>

        <Card>
          <CardContent className='p-8'>
            <ResetPasswordHeader />
            <Form schema={resetPasswordSchema} defaultValues={defaultValues} onSubmit={handleSubmit}>
              <ResetPasswordForm />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
