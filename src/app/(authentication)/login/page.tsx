'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { Form } from '@/components/forms'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

import { loginSchema } from './schemas/loginSchema'
import { useLoginForm } from './hooks/useLoginForm'
import { LoginHeader } from './components/LoginHeader'
import { getDefaultLoginValues } from './hooks/useRememberMe'
import { LoginFormContent } from './components/LoginFormContent'

export default function LoginPage() {
  const { t } = useTranslation()
  const { handleSubmit } = useLoginForm()
  const defaultValues = getDefaultLoginValues()

  return (
    <ProtectedRoute requireAuth={false}>
      <div className='h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 overflow-hidden'>
        <div className='max-w-md w-full space-y-8'>
          <LoginHeader />

          <Card className='w-full bg-card border-border shadow-theme-lg'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl font-bold text-foreground'>{t('auth.login.title')}</CardTitle>
              <CardDescription className='text-muted-foreground'>{t('auth.login.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form schema={loginSchema} defaultValues={defaultValues} onSubmit={handleSubmit} className='space-y-6'>
                <LoginFormContent />
              </Form>
            </CardContent>
          </Card>

          {/* Register Link */}
          <div className='text-center'>
            <p className='text-sm text-muted-foreground'>
              {t('auth.register.haveAccount')}{' '}
              <Link href='/register' className='text-primary hover:text-primary/80 transition-colors'>
                {t('auth.register.loginLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
