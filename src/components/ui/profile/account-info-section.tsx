'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { User, Edit, Save, X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/providers/AuthProvider'

import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

// import { userApi } from '@/lib/api/api'
import AuthApiService from '@/lib/services/authApiService'
import { updateUserProfileSchema, type UpdateUserProfileRequest } from '@/lib/validations/profile'

export function AccountInfoSection() {
  const { user } = useAuth()
  const { t } = useTranslation()

  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserProfileRequest>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  })

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UpdateUserProfileRequest) => {
    setIsUpdating(true)
    try {
      // await userApi.updateProfile(data)
      await AuthApiService.getCurrentUser() // Refresh user data
      setIsEditing(false)
    } catch (error) {
      console.log('Profile update error:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
    })
    setIsEditing(false)
  }

  const getRoleDisplayName = (role: string | undefined) => {
    switch (role) {
      case 'BASIC':
        return t('auth.register.roles.basic')
      case 'ADMIN':
        return t('auth.register.roles.admin')
      default:
        return t('profile.userInfo.defaultRole')
    }
  }

  return (
    <Card className='relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-4 right-4 w-24 h-24 border border-primary/5 rounded-full animate-spin-slow' />
      </div>
      <CardHeader className='relative z-10'>
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <User className='w-5 h-5 text-primary' />
              {t('profile.userInfo.title')}
            </CardTitle>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant='outline' size='sm'>
              <Edit className='h-4 w-4 mr-2' />
              {t('profile.buttons.edit')}
            </Button>
          ) : (
            <div className='flex space-x-2'>
              <Button onClick={handleSubmit(onSubmit)} size='sm' disabled={isUpdating}>
                <Save className='h-4 w-4 mr-2' />
                {isUpdating ? t('profile.buttons.saving') : t('profile.buttons.save')}
              </Button>
              <Button onClick={handleCancel} variant='outline' size='sm'>
                <X className='h-4 w-4 mr-2' />
                {t('profile.buttons.cancel')}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-4 relative z-10'>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>{t('profile.userInfo.fullName')}</Label>
              <Input
                id='name'
                placeholder={t('profile.userInfo.fullNamePlaceholder')}
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>{t('profile.userInfo.email')}</Label>
              <Input
                id='email'
                type='email'
                placeholder={t('profile.userInfo.emailPlaceholder')}
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>
          </form>
        ) : (
          <div className='grid gap-3'>
            <div className='flex justify-between items-center p-3 rounded-lg border'>
              <span className='text-sm font-medium'>{t('profile.userInfo.fullName')}</span>
              <span className='text-sm text-muted-foreground'>{user?.name || t('settings.notSpecified')}</span>
            </div>
            <div className='flex justify-between items-center p-3 rounded-lg border'>
              <span className='text-sm font-medium'>{t('profile.userInfo.email')}</span>
              <span className='text-sm text-muted-foreground'>{user?.email}</span>
            </div>
            <div className='flex justify-between items-center p-3 rounded-lg border'>
              <span className='text-sm font-medium'>{t('profile.userInfo.role')}</span>
              <span className='text-sm text-muted-foreground'>{getRoleDisplayName(user?.role)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
