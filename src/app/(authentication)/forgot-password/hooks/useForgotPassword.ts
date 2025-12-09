'use client'

import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { ForgotPasswordFormData } from '../schemas/forgotPasswordSchema'

/**
 * Custom hook for handling forgot password form submission
 */
export function useForgotPassword() {
  const { t } = useTranslation()
  const [emailSent, setEmailSent] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // TODO: Replace with actual API call
      // await authApi.forgotPassword(data.email)
      console.log('🚀 Forgot password request:', data.email)

      setEmailSent(data.email)
      setIsSuccess(true)
    } catch (error) {
      console.error('❌ Forgot password error:', error)
      throw new Error(error instanceof Error ? error.message : t('auth.forgotPassword.error.default'))
    }
  }

  return { handleSubmit, emailSent, isSuccess }
}
