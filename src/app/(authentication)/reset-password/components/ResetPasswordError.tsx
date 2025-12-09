'use client'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'
import { AlertCircle, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

interface ResetPasswordErrorProps {
  error: string
}

export function ResetPasswordError({ error }: ResetPasswordErrorProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4'>
          <AlertCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
        </div>
        <CardTitle className='text-xl font-semibold'>{t('auth.resetPassword.error.invalidToken')}</CardTitle>
        <CardDescription>{error}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href='/forgot-password'>
          <Button className='w-full'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t('auth.resetPassword.backToLogin')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
