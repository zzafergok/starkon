'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  User,
  setUser,
  setError,
  logoutUser,
  setLoading,
  selectUser,
  selectError,
  selectIsLoading,
  selectIsAuthenticated,
} from '@/store/slices/userSlice'
import { showToast } from '@/store/slices/toastSlice'
import { useAppDispatch, useAppSelector } from '@/store'

import { useTokenManagerContext } from '@/providers/TokenManagerProvider'

import { LoginFormValues } from '@/lib/validations/auth'

// Mock kullanıcı veritabanı
const MOCK_USERS_DB = [
  {
    id: '1',
    name: 'Admin Kullanıcı',
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin123!',
    role: 'admin',
    avatar: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLoginAt: null,
  },
  {
    id: '2',
    name: 'Standart Kullanıcı',
    username: 'user',
    email: 'user@example.com',
    password: 'User123!',
    role: 'user',
    avatar: null,
    createdAt: '2024-01-02T00:00:00.000Z',
    lastLoginAt: null,
  },
  {
    id: '3',
    name: 'Demo Kullanıcı',
    username: 'demo',
    email: 'demo@example.com',
    password: 'Demo123!',
    role: 'demo',
    avatar: null,
    createdAt: '2024-01-03T00:00:00.000Z',
    lastLoginAt: null,
  },
] as const

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: LoginFormValues) => Promise<User>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
  refreshUser: () => Promise<void>
}

export function useAuth(): AuthState & AuthActions {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const tokenManager = useTokenManagerContext()

  // Initialization state'lerini güvenli yönetim
  const initializationRef = useRef<{
    hasInitialized: boolean
    isInitializing: boolean
  }>({
    hasInitialized: false,
    isInitializing: false,
  })

  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)

  // Cookie'lerde token'ları ayarlama
  const setTokensInCookies = useCallback((accessToken: string, refreshToken: string, expiresIn?: number) => {
    if (typeof window !== 'undefined') {
      const maxAge = expiresIn ? expiresIn : 7 * 24 * 60 * 60 // 7 gün varsayılan
      const expires = new Date(Date.now() + maxAge * 1000).toUTCString()

      document.cookie = `accessToken=${accessToken}; path=/; max-age=${maxAge}; samesite=lax; expires=${expires}`
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; samesite=lax; expires=${expires}`

      // Token expiry time'ını da cookie'ye kaydet
      const expiryTime = Date.now() + maxAge * 1000
      document.cookie = `tokenExpiry=${expiryTime}; path=/; max-age=${maxAge}; samesite=lax; expires=${expires}`
    }
  }, [])

  // Cookie'lerden token'ları temizleme
  const clearTokensFromCookies = useCallback(() => {
    if (typeof window !== 'undefined') {
      const expiredDate = 'Thu, 01 Jan 1970 00:00:01 GMT'
      document.cookie = `accessToken=; path=/; expires=${expiredDate}`
      document.cookie = `refreshToken=; path=/; expires=${expiredDate}`
      document.cookie = `tokenExpiry=; path=/; expires=${expiredDate}`
    }
  }, [])

  // Kullanıcı bilgilerini yenileme
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const token = tokenManager.getAccessToken()
      if (!token) {
        throw new Error('No access token available')
      }

      // Mock user fetch
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Token'dan user ID'yi parse et (gerçek projede JWT decode edilecek)
      const tokenParts = token.split('-')
      const userId = tokenParts[3] || '1' // fallback to admin user
      const mockUser = MOCK_USERS_DB.find((u) => u.id === userId)

      if (mockUser) {
        const { password: _password, ...userWithoutPassword } = mockUser
        dispatch(
          setUser({
            ...userWithoutPassword,
            avatar: userWithoutPassword.avatar || undefined,
          }),
        )
      } else {
        throw new Error('User not found')
      }
    } catch (error) {
      console.error('User refresh failed:', error)
      throw error
    }
  }, [dispatch, tokenManager])

  // Auth durumu kontrolü - Server-side ile uyumlu
  const checkAuth = useCallback(async (): Promise<void> => {
    // Zaten initialize edilmişse veya initialization devam ediyorsa çık
    if (initializationRef.current.hasInitialized || initializationRef.current.isInitializing) {
      return
    }

    initializationRef.current.isInitializing = true
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const token = tokenManager.getAccessToken()
      const refreshToken = tokenManager.getRefreshToken()

      if (!token || !refreshToken) {
        console.log('[useAuth] No tokens found, user not authenticated')
        await logout()
        return
      }

      // Token geçerliliği kontrolü
      if (tokenManager.isTokenExpired()) {
        console.log('[useAuth] Token expired, attempting refresh')
        try {
          // Mock token refresh
          await new Promise((resolve) => setTimeout(resolve, 500))

          const newAccessToken = `mock-access-token-refreshed-${Date.now()}`
          const newRefreshToken = `mock-refresh-token-refreshed-${Date.now()}`
          const expiresIn = 3600 // 1 saat

          tokenManager.setTokens(newAccessToken, newRefreshToken, expiresIn)
          setTokensInCookies(newAccessToken, newRefreshToken, expiresIn)

          await refreshUser()
          console.log('[useAuth] Token refresh successful')
        } catch (refreshError) {
          console.error('[useAuth] Token refresh failed:', refreshError)
          await logout()
          return
        }
      }
    } catch (error) {
      console.error('[useAuth] Auth check failed:', error)
      dispatch(setError(t('auth.sessionExpired')))
      await logout()
    } finally {
      dispatch(setLoading(false))
      initializationRef.current.hasInitialized = true
      initializationRef.current.isInitializing = false
    }
  }, [dispatch, tokenManager, setTokensInCookies, refreshUser, t]) // Stable dependencies

  // Giriş işlemi - Geliştirilmiş
  const login = useCallback(
    async (credentials: LoginFormValues): Promise<User> => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        console.log('[useAuth] Attempting login with:', credentials.email)

        // Mock authentication
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const foundUser = MOCK_USERS_DB.find(
          (user) => user.email === credentials.email && user.password === credentials.password,
        )

        if (!foundUser) {
          throw new Error(t('auth.invalidCredentials'))
        }

        // Mock token generation
        const expiresIn = credentials.rememberMe ? 7 * 24 * 3600 : 3600 // 7 gün veya 1 saat
        const mockTokens = {
          accessToken: `mock-access-token-${foundUser.id}-${Date.now()}`,
          refreshToken: `mock-refresh-token-${foundUser.id}-${Date.now()}`,
          expiresIn,
        }

        console.log('[useAuth] Login successful, setting tokens')

        // Token'ları kaydet
        tokenManager.setTokens(mockTokens.accessToken, mockTokens.refreshToken, mockTokens.expiresIn)
        setTokensInCookies(mockTokens.accessToken, mockTokens.refreshToken, mockTokens.expiresIn)

        // Kullanıcı bilgilerini kaydet
        const { password: _password, ...userWithoutPassword } = foundUser
        const loginUser: User = {
          ...userWithoutPassword,
          avatar: userWithoutPassword.avatar || undefined,
        }

        dispatch(setUser(loginUser))

        // Başarı mesajı
        dispatch(
          showToast({
            type: 'success',
            title: t('common.success'),
            message: t('auth.welcomeBack') + ` ${loginUser.username}!`,
            duration: 3000,
          }),
        )

        // Initialization state'ini reset et
        initializationRef.current.hasInitialized = true
        initializationRef.current.isInitializing = false

        console.log('[useAuth] Login process completed')
        return loginUser
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : t('auth.loginFailed')
        console.error('[useAuth] Login failed:', errorMessage)

        dispatch(setError(errorMessage))
        dispatch(
          showToast({
            type: 'error',
            title: t('auth.loginFailed'),
            message: errorMessage,
            duration: 5000,
          }),
        )

        throw error
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch, tokenManager, setTokensInCookies, t],
  )

  // Çıkış işlemi - Güvenli
  const logout = useCallback(async (): Promise<void> => {
    console.log('[useAuth] Logout initiated')
    dispatch(setLoading(true))

    try {
      // Token'ları temizle
      tokenManager.removeTokens()
      clearTokensFromCookies()

      // Store'u temizle
      dispatch(logoutUser())
      dispatch(setError(null))

      console.log('[useAuth] Logout completed')

      // Başarı mesajı (sadece manuel logout'ta)
      if (user) {
        dispatch(
          showToast({
            type: 'success',
            title: t('auth.logoutSuccess'),
            message: t('auth.safelyLoggedOut'),
            duration: 3000,
          }),
        )
      }
    } catch (error) {
      console.warn('[useAuth] Logout error:', error)
      // Hata olsa bile local cleanup yapıyoruz
      tokenManager.removeTokens()
      clearTokensFromCookies()
      dispatch(logoutUser())
    } finally {
      dispatch(setLoading(false))
      // Initialization state'ini reset et
      initializationRef.current.hasInitialized = false
      initializationRef.current.isInitializing = false
    }
  }, [dispatch, tokenManager, clearTokensFromCookies, user, t])

  // Hata temizleme
  const clearError = useCallback(() => {
    dispatch(setError(null))
  }, [dispatch])

  // Component mount olduğunda auth durumunu kontrol et - Server-side safe
  useEffect(() => {
    // Sadece client-side'da çalışacak
    if (
      typeof window !== 'undefined' &&
      !initializationRef.current.hasInitialized &&
      !initializationRef.current.isInitializing
    ) {
      console.log('[useAuth] Initializing auth check')
      checkAuth()
    }
  }, []) // BOŞ dependency array - sadece mount'ta çalışır

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
    refreshUser,
  }
}
