'use client'

import { useState } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, CheckCircle, AlertTriangle, Shield } from 'lucide-react'

import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Checkbox } from '@/components/core/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

import { useToast } from '@/store/toastStore'

import { cn } from '@/lib/utils'

// Validation schema
const passwordSetupSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

interface PasswordSetupFormData {
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface PasswordSetupFormProps {
  token: string
  userEmail: string
  onSetupComplete: () => void
}

export function PasswordSetupForm({ token, userEmail: _userEmail, onSetupComplete }: PasswordSetupFormProps) {
  const toast = useToast()
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<PasswordSetupFormData>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const password = form.watch('password')
  const confirmPassword = form.watch('confirmPassword')

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(requirements).filter(Boolean).length

    return {
      score,
      requirements,
      strength: score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong',
    }
  }

  const passwordStrength = getPasswordStrength(password)
  const passwordsMatch = password && confirmPassword && password === confirmPassword

  const onSubmit = async (data: PasswordSetupFormData) => {
    if (!passwordsMatch) {
      toast.error('Passwords do not match', t('error.title'))
      return
    }

    if (passwordStrength.score < 3) {
      toast.error('Password does not meet minimum requirements', t('error.title'))
      return
    }

    if (!data.agreeToTerms) {
      toast.error('You must agree to the terms and conditions', t('error.title'))
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement API call to set up password
      console.log('Setting up password with token:', token)
      console.log('Password data:', { ...data, password: '[REDACTED]', confirmPassword: '[REDACTED]' })

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success(t('passwordSetup.setupSuccessDescription'), t('passwordSetup.setupSuccess'))

      onSetupComplete()
    } catch (error) {
      console.error('Error setting up password:', error)
      toast.error(t('passwordSetup.setupError'), t('error.title'))
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'strong':
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  const getStrengthText = (strength: string) => {
    switch (strength) {
      case 'weak':
        return 'Weak'
      case 'medium':
        return 'Medium'
      case 'strong':
        return 'Strong'
      default:
        return 'Very Weak'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Lock className='w-5 h-5' />
          Create Your Password
        </CardTitle>
        <CardDescription>Choose a strong password to secure your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Password Field */}
          <div className='space-y-2'>
            <Label htmlFor='password'>Password *</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                {...form.register('password')}
                disabled={isLoading}
                className='pr-10'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4 text-muted-foreground' />
                ) : (
                  <Eye className='h-4 w-4 text-muted-foreground' />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-muted-foreground'>Password Strength:</span>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      passwordStrength.strength === 'weak'
                        ? 'text-red-600'
                        : passwordStrength.strength === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600',
                    )}
                  >
                    {getStrengthText(passwordStrength.strength)}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      getStrengthColor(passwordStrength.strength),
                    )}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Password Requirements */}
          {password && (
            <div className='space-y-2'>
              <Label className='text-sm'>Password Requirements:</Label>
              <div className='grid grid-cols-1 gap-1 text-xs'>
                {Object.entries({
                  'At least 8 characters': passwordStrength.requirements.length,
                  'Uppercase letter (A-Z)': passwordStrength.requirements.uppercase,
                  'Lowercase letter (a-z)': passwordStrength.requirements.lowercase,
                  'Number (0-9)': passwordStrength.requirements.number,
                  'Special character (!@#$...)': passwordStrength.requirements.special,
                }).map(([requirement, met]) => (
                  <div key={requirement} className='flex items-center gap-2'>
                    <CheckCircle className={cn('w-3 h-3', met ? 'text-green-500' : 'text-gray-300')} />
                    <span className={cn(met ? 'text-green-700 dark:text-green-400' : 'text-muted-foreground')}>
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Password Field */}
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password *</Label>
            <div className='relative'>
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your password'
                {...form.register('confirmPassword')}
                disabled={isLoading}
                className='pr-10'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-4 w-4 text-muted-foreground' />
                ) : (
                  <Eye className='h-4 w-4 text-muted-foreground' />
                )}
              </button>
            </div>

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className='flex items-center gap-2 text-xs'>
                {passwordsMatch ? (
                  <>
                    <CheckCircle className='w-3 h-3 text-green-500' />
                    <span className='text-green-700 dark:text-green-400'>Passwords match</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className='w-3 h-3 text-red-500' />
                    <span className='text-red-700 dark:text-red-400'>Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Terms Agreement */}
          <div className='space-y-3'>
            <div className='flex items-start gap-3'>
              <Checkbox
                id='agreeToTerms'
                checked={form.watch('agreeToTerms')}
                onCheckedChange={(checked) => form.setValue('agreeToTerms', checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor='agreeToTerms' className='text-sm leading-relaxed'>
                I agree to the{' '}
                <a href='/terms' target='_blank' className='text-blue-600 hover:underline'>
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href='/privacy' target='_blank' className='text-blue-600 hover:underline'>
                  Privacy Policy
                </a>
              </Label>
            </div>
          </div>

          {/* Security Notice */}
          <div className='p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800'>
            <div className='flex items-start gap-3'>
              <Shield className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
              <div className='space-y-1'>
                <h4 className='font-medium text-blue-900 dark:text-blue-100 text-sm'>Security Notice</h4>
                <ul className='text-xs text-blue-700 dark:text-blue-300 space-y-1'>
                  <li>• Your password will be securely encrypted and stored</li>
                  <li>• This setup link will expire after use for security</li>
                  <li>• You'll be able to log in immediately after setup</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={
              isLoading ||
              !password ||
              !confirmPassword ||
              !passwordsMatch ||
              passwordStrength.score < 3 ||
              !form.watch('agreeToTerms')
            }
            className='w-full'
          >
            {isLoading ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                Setting up password...
              </>
            ) : (
              <>
                <Lock className='w-4 h-4 mr-2' />
                Set Up Password
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
