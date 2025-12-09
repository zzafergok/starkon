'use client'

import Link from 'next/link'

import { Suspense } from 'react'

import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/forms'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { RegisterHeader, RegisterFormContent } from './components'
import { LoadingSpinner } from '@/components/core/loading-spinner'
import { ThemeSwitcher } from '@/components/ui/theme/theme-switcher'
import { LanguageSwitcher } from '@/components/ui/language/language-switcher'

import { registerSchema, RegisterFormData } from './schemas/registerSchema'

import { useRegisterForm } from './hooks'

/**
 * Register page with atomic design structure
 */
function RegisterContent() {
  const { t } = useTranslation()
  const { handleSubmit } = useRegisterForm()

  const defaultValues: RegisterFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
    agreedToPrivacy: false,
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-200'>
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

        <Card className='rounded-2xl shadow-xl border border-border overflow-hidden'>
          <CardContent className='p-8'>
            <RegisterHeader />

            <Form schema={registerSchema} defaultValues={defaultValues} onSubmit={handleSubmit}>
              <RegisterFormContent />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterContent />
    </Suspense>
  )
}
