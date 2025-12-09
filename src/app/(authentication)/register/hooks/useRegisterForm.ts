'use client'

import { useRouter } from 'next/navigation'

import { useTranslation } from 'react-i18next'

import AuthApiService from '@/lib/services/authApiService'

import { RegisterFormData } from '../schemas/registerSchema'

/**
 * Custom hook for handling register form submission
 */
export function useRegisterForm() {
  const router = useRouter()
  const { t } = useTranslation()

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      const response = await AuthApiService.registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
      })

      if (!response.success) {
        throw new Error(response.message || t('auth.register.error'))
      }

      console.log('✅ Registration successful:', response.data)

      // Show success message
      alert(t('auth.register.success'))

      // Redirect to login page with registered flag
      router.push('/login?registered=true')
    } catch (error) {
      console.error('❌ Registration error:', error)

      // Re-throw error to let react-hook-form handle it
      throw new Error(error instanceof Error ? error.message : t('auth.register.error'))
    }
  }

  return { handleSubmit }
}
