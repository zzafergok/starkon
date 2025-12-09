'use client'

import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/forms'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { ThemeSwitcher } from '@/components/ui/theme/theme-switcher'
import { LanguageSwitcher } from '@/components/ui/language/language-switcher'

import { ForgotPasswordHeader, ForgotPasswordForm, ForgotPasswordSuccess } from './components'

import { forgotPasswordSchema, ForgotPasswordFormData } from './schemas/forgotPasswordSchema'

import { useForgotPassword } from './hooks'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const { handleSubmit, emailSent, isSuccess } = useForgotPassword()

  const defaultValues: ForgotPasswordFormData = {
    email: '',
  }

  if (isSuccess) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4 bg-background'>
        <div className='w-full max-w-md space-y-6'>
          <div className='flex justify-center items-center space-x-2'>
            <LanguageSwitcher variant='button' showLabel className='bg-card shadow-theme-sm border border-border' />
            <ThemeSwitcher variant='button' showLabel />
          </div>
          <ForgotPasswordSuccess emailSent={emailSent} />
        </div>
      </div>
    )
  }

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
            <ForgotPasswordHeader />
            <Form schema={forgotPasswordSchema} defaultValues={defaultValues} onSubmit={handleSubmit}>
              <ForgotPasswordForm />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
