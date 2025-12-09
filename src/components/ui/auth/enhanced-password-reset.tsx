'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useState } from 'react'

import { Eye, EyeOff, Lock, Mail, CheckCircle2, XCircle, AlertTriangle, ArrowLeft, Shield, Key } from 'lucide-react'

import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Progress } from '@/components/core/progress'
import { Alert, AlertDescription } from '@/components/core/alert'
import { LoadingSpinner } from '@/components/core/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { useLocale } from '@/hooks/useLocale'

import { useAuth } from '@/providers/AuthProvider'

import { cn } from '@/lib/utils'

interface EnhancedPasswordResetProps {
  className?: string
}

interface PasswordStrengthProps {
  password: string
}

interface PasswordRequirement {
  label: string
  met: boolean
  regex?: RegExp
}

type ResetStep = 'request' | 'verify-token' | 'reset-password' | 'success' | 'error'

function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useLocale()

  const requirements: PasswordRequirement[] = [
    {
      label: t('auth.password.requirements.minLength'),
      met: password.length >= 8,
    },
    {
      label: t('auth.password.requirements.uppercase'),
      met: /[A-Z]/.test(password),
    },
    {
      label: t('auth.password.requirements.lowercase'),
      met: /[a-z]/.test(password),
    },
    {
      label: t('auth.password.requirements.number'),
      met: /\d/.test(password),
    },
    {
      label: t('auth.password.requirements.special'),
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ]

  const metRequirements = requirements.filter((req) => req.met).length
  const strength = (metRequirements / requirements.length) * 100

  const getStrengthLabel = () => {
    if (strength < 40) return { label: t('auth.password.strength.weak'), color: 'text-red-500' }
    if (strength < 60) return { label: t('auth.password.strength.fair'), color: 'text-orange-500' }
    if (strength < 80) return { label: t('auth.password.strength.good'), color: 'text-yellow-500' }
    return { label: t('auth.password.strength.strong'), color: 'text-green-500' }
  }

  const strengthInfo = getStrengthLabel()

  return (
    <div className='space-y-3'>
      <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <Label className='text-sm'>{t('auth.password.strength.title')}</Label>
          <span className={cn('text-sm font-medium', strengthInfo.color)}>{strengthInfo.label}</span>
        </div>
        <Progress value={strength} className='h-2' />
      </div>

      <div className='space-y-1'>
        {requirements.map((req, index) => (
          <div key={index} className='flex items-center space-x-2 text-sm'>
            {req.met ? (
              <CheckCircle2 className='w-4 h-4 text-green-500' />
            ) : (
              <XCircle className='w-4 h-4 text-gray-400' />
            )}
            <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EnhancedPasswordReset({ className }: EnhancedPasswordResetProps) {
  const { t } = useLocale()
  const { forgotPassword, resetPassword } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState<ResetStep>('request')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  // Form states
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(searchParams?.get('token') || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Check if we have a token in URL
  useState(() => {
    const urlToken = searchParams?.get('token')
    if (urlToken) {
      setToken(urlToken)
      setStep('reset-password')
    }
  })

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await forgotPassword(email)
      setSuccessMessage(t('auth.passwordReset.request.success', { email }))
      setStep('verify-token')
    } catch (err: any) {
      setError(err.message || t('auth.passwordReset.request.error'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError(t('auth.passwordReset.password.mismatch'))
      return
    }

    // Check password strength
    const requirements = [
      newPassword.length >= 8,
      /[A-Z]/.test(newPassword),
      /[a-z]/.test(newPassword),
      /\d/.test(newPassword),
      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    ]

    if (requirements.filter(Boolean).length < 4) {
      setError(t('auth.passwordReset.password.tooWeak'))
      return
    }

    setIsLoading(true)

    try {
      await resetPassword(token, newPassword)
      setSuccessMessage(t('auth.passwordReset.success.message'))
      setStep('success')

      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err: any) {
      if (err.message?.includes('expired') || err.message?.includes('invalid')) {
        setError(t('auth.passwordReset.error.tokenExpired'))
      } else {
        setError(err.message || t('auth.passwordReset.error.generic'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderRequestStep = () => (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
          <Lock className='w-6 h-6 text-primary' />
        </div>
        <CardTitle>{t('auth.passwordReset.request.title')}</CardTitle>
        <p className='text-sm text-muted-foreground'>{t('auth.passwordReset.request.subtitle')}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRequestReset} className='space-y-4'>
          {error && (
            <Alert variant='destructive'>
              <AlertTriangle className='h-4 w-4' />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className='space-y-2'>
            <Label htmlFor='email'>{t('auth.passwordReset.request.emailLabel')}</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.passwordReset.request.emailPlaceholder')}
              required
            />
          </div>

          <Button type='submit' disabled={isLoading || !email} className='w-full'>
            {isLoading ? <LoadingSpinner size='sm' className='mr-2' /> : <Mail className='w-4 h-4 mr-2' />}
            {t('auth.passwordReset.request.button')}
          </Button>
        </form>

        <div className='mt-6 text-center'>
          <Button variant='ghost' onClick={() => router.push('/login')}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t('auth.passwordReset.backToLogin')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderVerifyTokenStep = () => (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
          <Mail className='w-6 h-6 text-blue-600' />
        </div>
        <CardTitle>{t('auth.passwordReset.verify.title')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Alert>
          <CheckCircle2 className='h-4 w-4' />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>

        <div className='space-y-3'>
          <div className='p-4 bg-muted/50 rounded-lg'>
            <h4 className='font-medium text-sm mb-2'>{t('auth.passwordReset.verify.instructions')}</h4>
            <ol className='text-sm text-muted-foreground space-y-1'>
              <li>1. {t('auth.passwordReset.verify.step1')}</li>
              <li>2. {t('auth.passwordReset.verify.step2')}</li>
              <li>3. {t('auth.passwordReset.verify.step3')}</li>
            </ol>
          </div>

          <div className='text-center'>
            <Button variant='outline' onClick={() => setStep('request')} size='sm'>
              {t('auth.passwordReset.verify.resend')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderResetPasswordStep = () => (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4'>
          <Key className='w-6 h-6 text-green-600' />
        </div>
        <CardTitle>{t('auth.passwordReset.password.title')}</CardTitle>
        <p className='text-sm text-muted-foreground'>{t('auth.passwordReset.password.subtitle')}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResetPassword} className='space-y-4'>
          {error && (
            <Alert variant='destructive'>
              <AlertTriangle className='h-4 w-4' />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className='space-y-2'>
            <Label htmlFor='newPassword'>{t('auth.passwordReset.password.newPasswordLabel')}</Label>
            <div className='relative'>
              <Input
                id='newPassword'
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('auth.passwordReset.password.newPasswordPlaceholder')}
                required
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </Button>
            </div>
          </div>

          {newPassword && <PasswordStrength password={newPassword} />}

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>{t('auth.passwordReset.password.confirmPasswordLabel')}</Label>
            <div className='relative'>
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('auth.passwordReset.password.confirmPasswordPlaceholder')}
                required
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </Button>
            </div>
          </div>

          {confirmPassword && newPassword !== confirmPassword && (
            <Alert variant='destructive'>
              <XCircle className='h-4 w-4' />
              <AlertDescription>{t('auth.passwordReset.password.mismatch')}</AlertDescription>
            </Alert>
          )}

          <Button
            type='submit'
            disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            className='w-full'
          >
            {isLoading ? <LoadingSpinner size='sm' className='mr-2' /> : <Shield className='w-4 h-4 mr-2' />}
            {t('auth.passwordReset.password.button')}
          </Button>
        </form>

        <Alert className='mt-4'>
          <Shield className='h-4 w-4' />
          <AlertDescription>{t('auth.passwordReset.password.securityNote')}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )

  const renderSuccessStep = () => (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4'>
          <CheckCircle2 className='w-6 h-6 text-green-600' />
        </div>
        <CardTitle className='text-green-600'>{t('auth.passwordReset.success.title')}</CardTitle>
      </CardHeader>
      <CardContent className='text-center space-y-4'>
        <Alert>
          <CheckCircle2 className='h-4 w-4' />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>

        <div className='space-y-3'>
          <p className='text-sm text-muted-foreground'>{t('auth.passwordReset.success.autoRedirect')}</p>

          <Button onClick={() => router.push('/login')} className='w-full'>
            {t('auth.passwordReset.success.loginButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderErrorStep = () => (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4'>
          <XCircle className='w-6 h-6 text-red-600' />
        </div>
        <CardTitle className='text-red-600'>{t('auth.passwordReset.error.title')}</CardTitle>
      </CardHeader>
      <CardContent className='text-center space-y-4'>
        <Alert variant='destructive'>
          <AlertTriangle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className='space-y-3'>
          <Button
            variant='outline'
            onClick={() => {
              setStep('request')
              setError('')
              setEmail('')
              setToken('')
            }}
            className='w-full'
          >
            {t('auth.passwordReset.error.tryAgain')}
          </Button>

          <Button variant='ghost' onClick={() => router.push('/login')} className='w-full'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t('auth.passwordReset.backToLogin')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={cn('min-h-screen bg-background flex items-center justify-center p-4', className)}>
      <div className='w-full max-w-md space-y-6'>
        <div className='text-center space-y-2'>
          <div className='flex items-center justify-center space-x-2'>
            <Lock className='w-8 h-8 text-primary' />
            <h1 className='text-3xl font-bold'>{t('auth.passwordReset.title')}</h1>
          </div>
          <p className='text-muted-foreground'>{t('auth.passwordReset.subtitle')}</p>
        </div>

        {/* Progress indicator */}
        <div className='flex items-center justify-center space-x-2'>
          {['request', 'verify-token', 'reset-password', 'success'].map((stepName, index) => {
            const isActive = step === stepName
            const isCompleted = ['request', 'verify-token', 'reset-password', 'success'].indexOf(step) > index

            return (
              <div key={stepName} className='flex items-center'>
                <div
                  className={cn(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs',
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-muted bg-muted text-muted-foreground',
                  )}
                >
                  {isCompleted ? <CheckCircle2 className='w-4 h-4' /> : index + 1}
                </div>
                {index < 3 && <div className={cn('w-8 h-0.5 mx-1', isCompleted ? 'bg-green-500' : 'bg-muted')} />}
              </div>
            )
          })}
        </div>

        {step === 'request' && renderRequestStep()}
        {step === 'verify-token' && renderVerifyTokenStep()}
        {step === 'reset-password' && renderResetPasswordStep()}
        {step === 'success' && renderSuccessStep()}
        {step === 'error' && renderErrorStep()}

        {/* Security notice */}
        <div className='text-center text-xs text-muted-foreground'>{t('auth.passwordReset.securityNotice')}</div>
      </div>
    </div>
  )
}
