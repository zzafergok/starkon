'use client'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'
import { CheckCircle, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

export function ResetPasswordSuccess() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4'>
          <CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
        </div>
        <CardTitle className='text-xl font-semibold'>{t('auth.resetPassword.success.title')}</CardTitle>
        <CardDescription>{t('auth.resetPassword.success.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href='/login'>
          <Button className='w-full'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t('auth.resetPassword.success.loginButton')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
