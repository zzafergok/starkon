'use client'

import { useEffect } from 'react'

import { useFormContext } from 'react-hook-form'

import { LoginFormData } from '../schemas/loginSchema'

import { SessionTokenManager } from '@/lib/services/sessionTokenManager'

/**
 * Custom hook for managing remember me functionality
 */
export function useRememberMe() {
  const { watch } = useFormContext<LoginFormData>()
  const rememberMe = watch('rememberMe')

  // Handle remember me change
  useEffect(() => {
    if (!rememberMe) {
      SessionTokenManager.clearRememberMe()
      console.log('🔄 Remember me disabled, cleared saved email')
    }
  }, [rememberMe])

  // Load saved remember me status on mount
  useEffect(() => {
    const savedRememberMe = SessionTokenManager.getRememberMeStatus()
    const rememberedEmail = SessionTokenManager.getRememberedEmail()
    const timeLeft = SessionTokenManager.getRememberMeTimeLeft()

    if (savedRememberMe && rememberedEmail) {
      console.log('💾 Remember me and email loaded from storage:', rememberedEmail, `(${timeLeft}h remaining)`)
    } else if (savedRememberMe) {
      console.log('💾 Remember me status loaded from storage', `(${timeLeft}h remaining)`)
    }

    // Development modunda debug bilgisi göster
    if (process.env.NODE_ENV === 'development' && savedRememberMe) {
      console.log('🐛 Debug - Remember Me Status:', {
        isValid: savedRememberMe,
        email: rememberedEmail,
        hoursLeft: timeLeft,
        willExpireAt: new Date(Date.now() + timeLeft * 60 * 60 * 1000).toLocaleString(),
      })
    }
  }, [])
}

/**
 * Get default form values from saved remember me data
 */
export function getDefaultLoginValues(): LoginFormData {
  // Prevent SSR errors - only access localStorage in browser
  if (typeof window === 'undefined') {
    return {
      email: '',
      password: '',
      rememberMe: false,
    }
  }

  const savedRememberMe = SessionTokenManager.getRememberMeStatus()
  const rememberedEmail = SessionTokenManager.getRememberedEmail()

  return {
    email: savedRememberMe && rememberedEmail ? rememberedEmail : '',
    password: '',
    rememberMe: savedRememberMe,
  }
}
