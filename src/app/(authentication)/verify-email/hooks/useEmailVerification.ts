'use client'

import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { useAuth } from '@/providers/AuthProvider'

import AuthApiService from '@/lib/services/authApiService'

type VerificationStatus = 'verifying' | 'success' | 'error'

interface VerificationMessage {
  title: string
  description: string
}

/**
 * Custom hook for email verification logic
 */
export function useEmailVerification(token: string | null) {
  const router = useRouter()
  const { t } = useTranslation()
  const { checkAuth } = useAuth()

  const [message, setMessage] = useState<VerificationMessage>({
    title: '',
    description: '',
  })
  const [status, setStatus] = useState<VerificationStatus>('verifying')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage({
        title: t('auth.emailVerification.error.invalidLink.title'),
        description: t('auth.emailVerification.error.invalidLink.description'),
      })
      return
    }

    verifyEmailToken(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, t])

  const verifyEmailToken = async (token: string) => {
    try {
      const response = await AuthApiService.verifyEmail(token)

      if (response.success) {
        setStatus('success')
        setMessage({
          title: t('auth.emailVerification.success.title'),
          description: t('auth.emailVerification.success.description'),
        })

        await checkAuth()

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        throw new Error(response.message || t('auth.emailVerification.error.defaultError'))
      }
    } catch (error) {
      setStatus('error')
      setMessage({
        title: t('auth.emailVerification.error.verificationFailed.title'),
        description:
          error instanceof Error ? error.message : t('auth.emailVerification.error.verificationFailed.description'),
      })
    }
  }

  const handleReturnToLogin = () => {
    router.push('/login')
  }

  return { status, message, handleReturnToLogin }
}
