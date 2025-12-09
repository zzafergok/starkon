'use client'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'
import { CheckCircle, Mail, Clock, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

interface ForgotPasswordSuccessProps {
  emailSent: string
}

export function ForgotPasswordSuccess({ emailSent }: ForgotPasswordSuccessProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4'>
          <CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
        </div>
        <CardTitle className='text-xl font-semibold'>{t('auth.forgotPassword.success.title')}</CardTitle>
        <CardDescription className='text-center'>
          {t('auth.forgotPassword.success.description', { email: emailSent })}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4'>
          <div className='flex items-start gap-3'>
            <Mail className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0' />
            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-blue-900 dark:text-blue-100'>
                {t('auth.forgotPassword.success.checkEmail')}
              </h4>
              <p className='text-xs text-blue-700 dark:text-blue-300'>
                {t('auth.forgotPassword.success.emailInstructions')}
              </p>
              <p className='text-xs text-blue-600 dark:text-blue-400'>{t('auth.forgotPassword.success.linkExpiry')}</p>
            </div>
          </div>
        </div>

        <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3'>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
            <p className='text-xs text-yellow-700 dark:text-yellow-300'>
              {t('auth.forgotPassword.success.rateLimitInfo')}
            </p>
          </div>
        </div>

        <Link href='/login'>
          <Button className='w-full'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t('auth.forgotPassword.success.backToLoginButton')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
