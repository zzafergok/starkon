'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useTranslation } from 'react-i18next'

import { ResetPasswordFormData } from '../schemas/resetPasswordSchema'

/**
 * Custom hook for handling reset password form submission
 */
export function useResetPassword(token: string | null) {
  const router = useRouter()
  const { t } = useTranslation()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      setError(t('auth.resetPassword.error.tokenRequired'))
    }
  }, [token, t])

  const handleSubmit = async (data: ResetPasswordFormData) => {
    try {
      // TODO: Replace with actual API call
      // await authApi.resetPassword(token, data.newPassword)
      console.log('🚀 Reset password request:', { token, password: data.newPassword })

      setIsSuccess(true)

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      console.error('❌ Reset password error:', err)
      throw new Error(err instanceof Error ? err.message : t('auth.resetPassword.error.default'))
    }
  }

  return { handleSubmit, isSuccess, error, hasToken: !!token }
}
