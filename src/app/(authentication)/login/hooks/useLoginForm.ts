'use client'

import { useRouter } from 'next/navigation'

import { useTranslation } from 'react-i18next'

import { useAuth } from '@/providers/AuthProvider'

import { SessionTokenManager } from '@/lib/services/sessionTokenManager'

import { LoginFormData } from '../schemas/loginSchema'

/**
 * Custom hook for login form submission logic
 */
export function useLoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useTranslation()

  const handleSubmit = async (data: LoginFormData) => {
    try {
      // Login fonksiyonuna remember me durumunu da gönder
      await login(data.email, data.password, data.rememberMe ?? false)
      console.log('✅ Login successful, checking redirect URL')

      if (process.env.NODE_ENV === 'development') {
        SessionTokenManager.debugInfo()
      }

      // Check for saved redirect URL
      const redirectUrl = sessionStorage.getItem('auth_redirect_url')
      if (redirectUrl) {
        console.log('🔄 Redirecting to saved URL:', redirectUrl)
        sessionStorage.removeItem('auth_redirect_url')
        router.replace(redirectUrl)
      } else {
        console.log('🔄 No redirect URL, going to dashboard')
        router.replace('/dashboard')
      }
    } catch (err: any) {
      console.error('❌ Login error:', err)
      SessionTokenManager.clearTokens()
      // Re-throw the error so react-hook-form can handle it
      throw new Error(err.message || t('auth.login.validation.loginError'))
    }
  }

  return { handleSubmit }
}
