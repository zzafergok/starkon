/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

export interface TokenData {
  expiresAt: number
  accessToken: string
  refreshToken: string
}

export interface TokenInfo {
  hasTokens: boolean
  expiresAt: number | null
  accessToken: string | null
  refreshToken: string | null
  isAccessTokenExpired: boolean
  isRefreshTokenExpired: boolean
  timeUntilExpiry: number | null
}

// Constants
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  EXPIRES_AT: 'token_expires_at',
} as const

const REFRESH_BUFFER_MS = 5 * 60 * 1000 // 5 minutes buffer

// Remember me storage keys
const REMEMBER_ME_KEY = 'remember_me'
const REMEMBERED_EMAIL_KEY = 'remembered_email'
const REMEMBER_ME_EXPIRY_KEY = 'remember_me_expiry'

// Remember me süresi (3 gün)
const REMEMBER_ME_DURATION = 3 * 24 * 60 * 60 * 1000 // 3 gün milisaniye

/**
 * Kullanıcı email adresini kaydet (remember me ile birlikte)
 * @param email - Kaydedilecek email adresi
 */
export const setRememberedEmail = (email: string): void => {
  try {
    const expiryTime = Date.now() + REMEMBER_ME_DURATION
    localStorage.setItem(REMEMBERED_EMAIL_KEY, email)
    localStorage.setItem(REMEMBER_ME_KEY, 'true')
    localStorage.setItem(REMEMBER_ME_EXPIRY_KEY, expiryTime.toString())
    if (process.env.NODE_ENV === 'development') {
      console.info('Email remembered for 3 days')
    }
  } catch (error) {
    console.warn('Error saving remembered email:', error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Kaydedilmiş email adresini getir
 * @returns string | null - Kaydedilmiş email adresi
 */
export const getRememberedEmail = (): string | null => {
  try {
    if (!isRememberMeValid()) {
      clearRememberedEmail()
      return null
    }

    const email = localStorage.getItem(REMEMBERED_EMAIL_KEY)
    if (email) {
      if (process.env.NODE_ENV === 'development') {
        console.info('Remembered email loaded successfully')
      }
      return email
    }

    return null
  } catch (error) {
    console.warn('Error loading remembered email:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

/**
 * Kaydedilmiş email adresini temizle
 */
export const clearRememberedEmail = (): void => {
  try {
    localStorage.removeItem(REMEMBERED_EMAIL_KEY)
    if (process.env.NODE_ENV === 'development') {
      console.info('Remembered email cleared')
    }
  } catch (error) {
    console.warn('Error clearing remembered email:', error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Remember me durumunu kaydet (email ile birlikte)
 * @param remember - Hatırlanacak mı
 * @param email - Hatırlanacak email adresi
 */
export const setRememberMe = (remember: boolean, email?: string): void => {
  try {
    if (remember && email) {
      setRememberedEmail(email)
      if (process.env.NODE_ENV === 'development') {
        console.info('Remember me enabled for 3 days')
      }
    } else {
      clearRememberMe()
    }
  } catch (error) {
    console.warn('Error setting remember me:', error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Remember me durumunu temizle (email ile birlikte)
 */
export const clearRememberMe = (): void => {
  try {
    localStorage.removeItem(REMEMBER_ME_KEY)
    localStorage.removeItem(REMEMBER_ME_EXPIRY_KEY)
    clearRememberedEmail()
    if (process.env.NODE_ENV === 'development') {
      console.info('Remember me and email cleared')
    }
  } catch (error) {
    console.warn('Error clearing remember me:', error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Remember me durumunu kontrol et
 * @returns boolean - Geçerli mi
 */
export const isRememberMeValid = (): boolean => {
  try {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY)
    const expiryTime = localStorage.getItem(REMEMBER_ME_EXPIRY_KEY)

    if (!rememberMe || !expiryTime) return false

    const now = Date.now()
    const expiry = parseInt(expiryTime)

    if (now > expiry) {
      clearRememberMe()
      if (process.env.NODE_ENV === 'development') {
        console.info('Remember me expired after 3 days, clearing data')
      }
      return false
    }

    return true
  } catch (error) {
    console.warn('Error checking remember me:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

/**
 * Remember me durumunu getir
 * @returns boolean - Aktif mi
 */
export const getRememberMeStatus = (): boolean => {
  return isRememberMeValid() && localStorage.getItem(REMEMBER_ME_KEY) === 'true'
}

/**
 * Remember me süresinin ne kadar kaldığını getir
 * @returns number - Kalan süre (saat cinsinden)
 */
export const getRememberMeTimeLeft = (): number => {
  try {
    const expiryTime = localStorage.getItem(REMEMBER_ME_EXPIRY_KEY)
    if (!expiryTime) return 0

    const now = Date.now()
    const expiry = parseInt(expiryTime)
    const timeLeft = expiry - now

    return timeLeft > 0 ? Math.ceil(timeLeft / (60 * 60 * 1000)) : 0
  } catch (error) {
    console.warn('Error calculating time left:', error instanceof Error ? error.message : 'Unknown error')
    return 0
  }
}

// Utility functions
const isClientEnvironment = (): boolean => {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
}

const isJWTFormat = (token: string): boolean => {
  if (!token || typeof token !== 'string') return false
  return token.split('.').length === 3
}

// Core token management functions
export const setTokens = (accessToken: string, refreshToken: string, expiresIn: number = 3600): void => {
  if (!isClientEnvironment()) return

  try {
    const expiresAt = Date.now() + expiresIn * 1000

    sessionStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken)
    sessionStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken)
    sessionStorage.setItem(TOKEN_KEYS.EXPIRES_AT, expiresAt.toString())

    if (process.env.NODE_ENV === 'development') {
      console.info('Tokens saved to sessionStorage')
    }
  } catch (error) {
    console.error('Error saving tokens:', error instanceof Error ? error.message : 'Unknown error')
  }
}

export const getAccessToken = (): string | null => {
  if (!isClientEnvironment()) return null

  try {
    return sessionStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
  } catch (error) {
    console.error('Error getting access token:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

export const getRefreshToken = (): string | null => {
  if (!isClientEnvironment()) return null

  try {
    return sessionStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN)
  } catch (error) {
    console.error('Error getting refresh token:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

export const isAccessTokenExpired = (): boolean => {
  if (!isClientEnvironment()) return true

  try {
    const expiresAtStr = sessionStorage.getItem(TOKEN_KEYS.EXPIRES_AT)
    if (!expiresAtStr) return true

    const expiresAt = parseInt(expiresAtStr, 10)
    if (isNaN(expiresAt)) return true

    const now = Date.now()
    return now >= expiresAt - REFRESH_BUFFER_MS
  } catch (error) {
    console.error('Error checking token expiry:', error instanceof Error ? error.message : 'Unknown error')
    return true
  }
}

const parseJWTPayload = (token: string): Record<string, any> | null => {
  try {
    const tokenParts = token.split('.')
    const payload = tokenParts[1]

    if (!payload || payload.length === 0) {
      return null
    }

    // Validate base64 characters
    const base64Regex = /^[A-Za-z0-9_-]+$/
    if (!base64Regex.test(payload)) {
      return null
    }

    // Add base64 padding
    const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4)

    // Decode and parse
    const decodedString = atob(paddedPayload)
    const decodedPayload = JSON.parse(decodedString)

    if (!decodedPayload || typeof decodedPayload !== 'object') {
      return null
    }

    return decodedPayload
  } catch {
    return null
  }
}

export const isRefreshTokenExpired = (): boolean => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return true

  try {
    // Basic token validation
    if (typeof refreshToken !== 'string' || refreshToken.length === 0) {
      return true
    }

    // Check if token is in JWT format
    if (!isJWTFormat(refreshToken)) {
      // Fallback to access token expiration logic for non-JWT tokens
      return isAccessTokenExpired()
    }

    // Parse JWT payload
    const payload = parseJWTPayload(refreshToken)
    if (!payload) return true

    // Validate expiration field
    if (!payload.exp || typeof payload.exp !== 'number') {
      return true
    }

    // Check expiration time
    const currentTimeInSeconds = Math.floor(Date.now() / 1000)
    return payload.exp < currentTimeInSeconds
  } catch {
    return true
  }
}

export const clearTokens = (): void => {
  if (!isClientEnvironment()) return

  try {
    sessionStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
    sessionStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN)
    sessionStorage.removeItem(TOKEN_KEYS.EXPIRES_AT)

    if (process.env.NODE_ENV === 'development') {
      console.info('Tokens cleared from sessionStorage')
    }
  } catch (error) {
    console.error('Error clearing tokens:', error instanceof Error ? error.message : 'Unknown error')
  }
}

export const hasValidTokens = (): boolean => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  if (!accessToken || !refreshToken) return false

  try {
    return !isRefreshTokenExpired()
  } catch {
    return false
  }
}

export const hasValidAccessToken = (): boolean => {
  const accessToken = getAccessToken()
  return Boolean(accessToken && !isAccessTokenExpired())
}

export const getTokenInfo = (): TokenInfo => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const expiresAtStr = isClientEnvironment() ? sessionStorage.getItem(TOKEN_KEYS.EXPIRES_AT) : null
  const expiresAt = expiresAtStr ? parseInt(expiresAtStr, 10) : null

  const hasTokens = Boolean(accessToken && refreshToken)
  const isAccessExpired = isAccessTokenExpired()

  let isRefreshExpired: boolean
  try {
    isRefreshExpired = isRefreshTokenExpired()
  } catch {
    isRefreshExpired = true
  }

  const timeUntilExpiry = expiresAt && !isNaN(expiresAt) ? Math.max(0, expiresAt - Date.now()) : null

  return {
    hasTokens,
    isAccessTokenExpired: isAccessExpired,
    isRefreshTokenExpired: isRefreshExpired,
    accessToken,
    refreshToken,
    expiresAt,
    timeUntilExpiry,
  }
}

export const debugTokenInfo = (): void => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  if (!isClientEnvironment()) {
    console.info('Debug: Not in client environment')
    return
  }

  try {
    const info = getTokenInfo()
    const timeUntilExpiryMinutes = info.timeUntilExpiry ? Math.round(info.timeUntilExpiry / (1000 * 60)) : null

    console.info('Token Debug Info:', {
      hasTokens: info.hasTokens,
      isAccessTokenExpired: info.isAccessTokenExpired,
      isRefreshTokenExpired: info.isRefreshTokenExpired,
      timeUntilExpiryMinutes,
    })
  } catch (error) {
    console.warn('Debug Info Error (non-critical):', error instanceof Error ? error.message : 'Unknown error')
    console.info('Basic Token Status:', {
      hasAccessToken: Boolean(getAccessToken()),
      hasRefreshToken: Boolean(getRefreshToken()),
      accessTokenLength: getAccessToken()?.length || 0,
      refreshTokenLength: getRefreshToken()?.length || 0,
    })
  }
}

// Legacy class compatibility wrapper (optional - can be removed if not needed)
export class SessionTokenManager {
  static setTokens = setTokens
  static clearTokens = clearTokens
  static debugInfo = debugTokenInfo
  static getTokenInfo = getTokenInfo
  static setRememberMe = setRememberMe
  static hasValidTokens = hasValidTokens
  static getAccessToken = getAccessToken
  static getRefreshToken = getRefreshToken
  static clearRememberMe = clearRememberMe
  static isRememberMeValid = isRememberMeValid
  static setRememberedEmail = setRememberedEmail
  static getRememberedEmail = getRememberedEmail
  static getRememberMeStatus = getRememberMeStatus
  static hasValidAccessToken = hasValidAccessToken
  static clearRememberedEmail = clearRememberedEmail
  static isAccessTokenExpired = isAccessTokenExpired
  static isRefreshTokenExpired = isRefreshTokenExpired
  static getRememberMeTimeLeft = getRememberMeTimeLeft
}
