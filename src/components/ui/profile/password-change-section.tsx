'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Shield, Check, X } from 'lucide-react'

import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

import { cn } from '@/lib/utils'
// import { userApi } from '@/lib/api/api'
import { changePasswordSchema, type ChangePasswordRequest } from '@/lib/validations/profile'

export function PasswordChangeSection() {
  const { t } = useTranslation()

  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    current: false,
    confirm: false,
  })

  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
  })

  const newPassword = watch('newPassword', '')

  const getPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/(?=.*[a-z])/.test(password)) score++
    if (/(?=.*[A-Z])/.test(password)) score++
    if (/(?=.*\d)/.test(password)) score++
    if (/(?=.*[!@#$%^&*])/.test(password)) score++

    const levels = [
      t('passwordChange.strength.veryWeak'),
      t('passwordChange.strength.weak'),
      t('passwordChange.strength.medium'),
      t('passwordChange.strength.strong'),
      t('passwordChange.strength.veryStrong'),
    ]
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']

    return { score, level: levels[score] || levels[0], color: colors[score] || colors[0] }
  }

  const strength = getPasswordStrength(newPassword)

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const onSubmit = async (data: ChangePasswordRequest) => {
    setIsLoading(true)
    try {
      // await userApi.changePassword(data)
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Password change failed:', error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-4 right-4 w-32 h-32 border border-primary/10 rounded-full animate-spin-slow' />
        <div className='absolute bottom-4 left-4 w-24 h-24 border border-secondary/10 rounded-full animate-bounce' />
      </div>

      <CardHeader className='relative z-10'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Lock className='w-5 h-5 text-primary' />
          </div>
          <div>
            <CardTitle className='flex items-center gap-2'>
              {t('passwordChange.title')}
              <Shield className='w-4 h-4 text-muted-foreground' />
            </CardTitle>
            <CardDescription>{t('passwordChange.description')}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className='relative z-10'>
        {success && (
          <div className='mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-in slide-in-from-top duration-300'>
            <div className='flex items-center gap-2 text-green-700 dark:text-green-400'>
              <Check className='w-5 h-5' />
              <span className='font-medium'>{t('passwordChange.successMessage')}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Current Password */}
          <div className='space-y-2'>
            <Label htmlFor='currentPassword'>{t('passwordChange.currentPassword')}</Label>
            <div className='relative'>
              <Input
                id='currentPassword'
                type={showPasswords.current ? 'text' : 'password'}
                placeholder={t('passwordChange.currentPasswordPlaceholder')}
                {...register('currentPassword')}
                className={cn(
                  'pr-10 transition-all duration-200',
                  errors.currentPassword && 'border-red-500 focus:border-red-500',
                )}
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('current')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
              >
                {showPasswords.current ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className='text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left duration-200'>
                <X className='w-3 h-3' />
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className='space-y-2'>
            <Label htmlFor='newPassword'>{t('passwordChange.newPassword')}</Label>
            <div className='relative'>
              <Input
                id='newPassword'
                type={showPasswords.new ? 'text' : 'password'}
                placeholder={t('passwordChange.newPasswordPlaceholder')}
                {...register('newPassword')}
                className={cn(
                  'pr-10 transition-all duration-200',
                  errors.newPassword && 'border-red-500 focus:border-red-500',
                )}
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('new')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
              >
                {showPasswords.new ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className='space-y-2 animate-in slide-in-from-bottom duration-300'>
                <div className='flex items-center justify-between text-xs'>
                  <span className='text-muted-foreground'>{t('passwordChange.passwordStrength')}:</span>
                  <span className={cn('font-medium', strength.score >= 3 ? 'text-green-600' : 'text-orange-600')}>
                    {strength.level}
                  </span>
                </div>
                <div className='w-full bg-muted rounded-full h-2 overflow-hidden'>
                  <div
                    className={cn('h-full transition-all duration-500 rounded-full', strength.color)}
                    style={{ width: `${(strength.score / 5) * 100}%` }}
                  />
                </div>
                <div className='grid grid-cols-2 gap-2 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    {/(?=.*[a-z])/.test(newPassword) ? (
                      <Check className='w-3 h-3 text-green-500' />
                    ) : (
                      <X className='w-3 h-3 text-red-500' />
                    )}
                    {t('passwordChange.requirements.lowercase')}
                  </div>
                  <div className='flex items-center gap-1'>
                    {/(?=.*[A-Z])/.test(newPassword) ? (
                      <Check className='w-3 h-3 text-green-500' />
                    ) : (
                      <X className='w-3 h-3 text-red-500' />
                    )}
                    {t('passwordChange.requirements.uppercase')}
                  </div>
                  <div className='flex items-center gap-1'>
                    {/(?=.*\d)/.test(newPassword) ? (
                      <Check className='w-3 h-3 text-green-500' />
                    ) : (
                      <X className='w-3 h-3 text-red-500' />
                    )}
                    {t('passwordChange.requirements.number')}
                  </div>
                  <div className='flex items-center gap-1'>
                    {newPassword.length >= 8 ? (
                      <Check className='w-3 h-3 text-green-500' />
                    ) : (
                      <X className='w-3 h-3 text-red-500' />
                    )}
                    {t('passwordChange.requirements.minLength')}
                  </div>
                </div>
              </div>
            )}

            {errors.newPassword && (
              <p className='text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left duration-200'>
                <X className='w-3 h-3' />
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>{t('passwordChange.confirmPassword')}</Label>
            <div className='relative'>
              <Input
                id='confirmPassword'
                type={showPasswords.confirm ? 'text' : 'password'}
                placeholder={t('passwordChange.confirmPasswordPlaceholder')}
                {...register('confirmPassword')}
                className={cn(
                  'pr-10 transition-all duration-200',
                  errors.confirmPassword && 'border-red-500 focus:border-red-500',
                )}
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('confirm')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
              >
                {showPasswords.confirm ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-left duration-200'>
                <X className='w-3 h-3' />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isLoading || strength.score < 3}
            className='w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                {t('passwordChange.changing')}
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Lock className='w-4 h-4' />
                {t('passwordChange.changePassword')}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
