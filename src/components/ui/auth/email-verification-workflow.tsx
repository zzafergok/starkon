'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, CheckCircle, XCircle, RefreshCw, ArrowRight, Clock, Shield } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Alert, AlertDescription } from '@/components/core/alert'
import { LoadingSpinner } from '@/components/core/loading-spinner'
import { Badge } from '@/components/core/badge'

import { useLocale } from '@/hooks/useLocale'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'

interface EmailVerificationWorkflowProps {
  className?: string
}

interface VerificationStatusProps {
  status: 'pending' | 'verifying' | 'success' | 'error' | 'expired'
  email?: string
  onResendVerification?: () => void
  onReturnToDashboard?: () => void
}

interface ResendVerificationProps {
  email: string
  onResend: () => void
  isLoading: boolean
}

function VerificationStatus({ status, email, onResendVerification, onReturnToDashboard }: VerificationStatusProps) {
  const { t } = useLocale()

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Mail className='w-12 h-12 text-blue-500' />,
          title: t('auth.emailVerification.pending.title'),
          description: t('auth.emailVerification.pending.description', { email }),
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        }
      case 'verifying':
        return {
          icon: <LoadingSpinner size='lg' />,
          title: t('auth.emailVerification.verifying.title'),
          description: t('auth.emailVerification.verifying.description'),
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        }
      case 'success':
        return {
          icon: <CheckCircle className='w-12 h-12 text-green-500' />,
          title: t('auth.emailVerification.success.title'),
          description: t('auth.emailVerification.success.description'),
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        }
      case 'error':
        return {
          icon: <XCircle className='w-12 h-12 text-red-500' />,
          title: t('auth.emailVerification.error.title'),
          description: t('auth.emailVerification.error.description'),
          color: 'text-red-600',
          bgColor: 'bg-red-50',
        }
      case 'expired':
        return {
          icon: <Clock className='w-12 h-12 text-orange-500' />,
          title: t('auth.emailVerification.expired.title'),
          description: t('auth.emailVerification.expired.description'),
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
        }
      default:
        return {
          icon: <Mail className='w-12 h-12 text-gray-500' />,
          title: t('auth.emailVerification.unknown.title'),
          description: t('auth.emailVerification.unknown.description'),
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={cn('flex flex-col items-center text-center p-8', config.bgColor)}>
      <div className='mb-6'>{config.icon}</div>

      <h2 className={cn('text-2xl font-bold mb-3', config.color)}>{config.title}</h2>

      <p className='text-muted-foreground mb-6 max-w-md'>{config.description}</p>

      <div className='flex flex-col sm:flex-row gap-3'>
        {(status === 'error' || status === 'expired') && onResendVerification && (
          <Button onClick={onResendVerification} variant='outline'>
            <RefreshCw className='w-4 h-4 mr-2' />
            {t('auth.emailVerification.actions.resend')}
          </Button>
        )}

        {status === 'success' && onReturnToDashboard && (
          <Button onClick={onReturnToDashboard}>
            {t('auth.emailVerification.actions.continueToApp')}
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        )}

        {status === 'pending' && onResendVerification && (
          <Button onClick={onResendVerification} variant='secondary'>
            <RefreshCw className='w-4 h-4 mr-2' />
            {t('auth.emailVerification.actions.resendEmail')}
          </Button>
        )}
      </div>
    </div>
  )
}

function ResendVerification({ email, onResend, isLoading }: ResendVerificationProps) {
  const { t } = useLocale()
  const [newEmail, setNewEmail] = useState(email || '')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = () => {
    onResend()
    setCountdown(60) // 60 second cooldown
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Mail className='w-5 h-5' />
          <span>{t('auth.emailVerification.resend.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>{t('auth.emailVerification.resend.emailLabel')}</Label>
          <Input
            id='email'
            type='email'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={t('auth.emailVerification.resend.emailPlaceholder')}
          />
        </div>

        <Alert>
          <Shield className='h-4 w-4' />
          <AlertDescription>{t('auth.emailVerification.resend.note')}</AlertDescription>
        </Alert>

        <Button onClick={handleResend} disabled={isLoading || countdown > 0 || !newEmail} className='w-full'>
          {isLoading ? (
            <LoadingSpinner size='sm' className='mr-2' />
          ) : countdown > 0 ? (
            <Clock className='w-4 h-4 mr-2' />
          ) : (
            <RefreshCw className='w-4 h-4 mr-2' />
          )}
          {countdown > 0
            ? t('auth.emailVerification.resend.cooldown', { seconds: countdown })
            : t('auth.emailVerification.resend.button')}
        </Button>
      </CardContent>
    </Card>
  )
}

export function EmailVerificationWorkflow({ className }: EmailVerificationWorkflowProps) {
  const { t } = useLocale()
  const { user, verifyEmail, resendVerification } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error' | 'expired'>('pending')
  const [isLoading, setIsLoading] = useState(false)
  const [showResendForm, setShowResendForm] = useState(false)

  // Get token from URL parameters
  const token = searchParams?.get('token')
  const email = searchParams?.get('email') || user?.email

  useEffect(() => {
    if (token) {
      handleVerification(token)
    }
  }, [token])

  const handleVerification = async (verificationToken: string) => {
    setStatus('verifying')
    setIsLoading(true)

    try {
      await verifyEmail(verificationToken)
      setStatus('success')

      // Auto-redirect after successful verification
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } catch (error: any) {
      if (error.message?.includes('expired') || error.message?.includes('invalid')) {
        setStatus('expired')
      } else {
        setStatus('error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) return

    setIsLoading(true)
    try {
      await resendVerification(email)
      setStatus('pending')
      setShowResendForm(false)
    } catch {
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReturnToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className={cn('min-h-screen bg-background flex items-center justify-center p-4', className)}>
      <div className='w-full max-w-md space-y-6'>
        <div className='text-center space-y-2'>
          <div className='flex items-center justify-center space-x-2'>
            <Shield className='w-8 h-8 text-primary' />
            <h1 className='text-3xl font-bold'>{t('auth.emailVerification.title')}</h1>
          </div>
          <p className='text-muted-foreground'>{t('auth.emailVerification.subtitle')}</p>
        </div>

        <Card>
          <CardContent className='p-0'>
            <VerificationStatus
              status={status}
              email={email}
              onResendVerification={() => setShowResendForm(true)}
              onReturnToDashboard={handleReturnToDashboard}
            />
          </CardContent>
        </Card>

        {showResendForm && (
          <ResendVerification email={email || ''} onResend={handleResendVerification} isLoading={isLoading} />
        )}

        {/* Verification Steps */}
        <Card>
          <CardHeader>
            <CardTitle className='text-sm'>{t('auth.emailVerification.steps.title')}</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-start space-x-3'>
              <Badge variant='outline' className='mt-0.5'>
                1
              </Badge>
              <div className='text-sm'>
                <p className='font-medium'>{t('auth.emailVerification.steps.step1.title')}</p>
                <p className='text-muted-foreground'>{t('auth.emailVerification.steps.step1.description')}</p>
              </div>
            </div>

            <div className='flex items-start space-x-3'>
              <Badge variant='outline' className='mt-0.5'>
                2
              </Badge>
              <div className='text-sm'>
                <p className='font-medium'>{t('auth.emailVerification.steps.step2.title')}</p>
                <p className='text-muted-foreground'>{t('auth.emailVerification.steps.step2.description')}</p>
              </div>
            </div>

            <div className='flex items-start space-x-3'>
              <Badge variant='outline' className='mt-0.5'>
                3
              </Badge>
              <div className='text-sm'>
                <p className='font-medium'>{t('auth.emailVerification.steps.step3.title')}</p>
                <p className='text-muted-foreground'>{t('auth.emailVerification.steps.step3.description')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className='text-sm'>{t('auth.emailVerification.help.title')}</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3 text-sm'>
            <div>
              <p className='font-medium'>{t('auth.emailVerification.help.notReceived.title')}</p>
              <p className='text-muted-foreground'>{t('auth.emailVerification.help.notReceived.description')}</p>
            </div>

            <div>
              <p className='font-medium'>{t('auth.emailVerification.help.wrongEmail.title')}</p>
              <p className='text-muted-foreground'>{t('auth.emailVerification.help.wrongEmail.description')}</p>
            </div>

            <div>
              <p className='font-medium'>{t('auth.emailVerification.help.support.title')}</p>
              <p className='text-muted-foreground'>{t('auth.emailVerification.help.support.description')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        {email && (
          <div className='text-center text-sm text-muted-foreground'>
            {t('auth.emailVerification.currentEmail')}: <strong>{email}</strong>
          </div>
        )}
      </div>
    </div>
  )
}
