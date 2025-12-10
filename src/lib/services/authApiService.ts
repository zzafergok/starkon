/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  setTokens,
  clearTokens,
  debugTokenInfo,
  getRefreshToken,
  SessionTokenManager,
  isRefreshTokenExpired,
} from './sessionTokenManager'

import { API_ENDPOINTS, RequestConfig } from '@/services/utils'

import { apiClient } from '../api/axios'

// TODO: Mock data - template projesi için, production'da silinebilir
import { MockAuthService } from './mockAuthService'

const USE_MOCK_DATA = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL

// ========== TYPE DEFINITIONS ==========

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  role?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name: string
  role?: string
}

export interface AuthData {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: User
}

export interface RegisterResponse {
  success: boolean
  data: RegisterData
  message?: string
}

export interface RegisterData {
  message: string
  email: string
  emailSent: boolean
}

export interface LoginResponse {
  success: boolean
  data: AuthData
  message?: string
}

export interface RefreshTokenResponse {
  success: boolean
  data: {
    accessToken: string
    expiresIn: number
  }
  message?: string
}

export interface AuthError extends Error {
  success: false
  message: string
  code?: string
  status?: number
}

export interface BasicResponse {
  success: boolean
  message: string
}

export interface CurrentUserResponse {
  user: User
}

export interface VerifyEmailRequest {
  token: string
}

export interface ResendVerificationRequest {
  email: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileRequest {
  name?: string
  email?: string
}

/**
 * Kullanıcı kayıt işlemi
 * @param userData - Kullanıcı kayıt bilgileri
 * @returns Promise<RegisterResponse>
 */
export const registerUser = async (userData: RegisterCredentials): Promise<RegisterResponse> => {
  try {
    console.log('🔄 Register attempt for:', userData.email)

    if (USE_MOCK_DATA) {
      console.log('✅ Mock registration successful')
      return {
        success: true,
        data: {
          message: 'Registration successful. Please verify your email.',
          email: userData.email,
          emailSent: true,
        },
      }
    }

    const config: RequestConfig = { skipAuth: true }
    const response: any = await apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, userData, config)

    if (response.success && response.data) {
      console.log('✅ Registration successful, email verification required')

      if (process.env.NODE_ENV === 'development') {
        debugTokenInfo()
      }
    }

    return response
  } catch (error) {
    console.error('❌ Registration failed:', error)
    clearTokens()
    throw error
  }
}

/**
 * Kullanıcı giriş işlemi
 * @param credentials - Kullanıcı giriş bilgileri
 * @returns Promise<LoginResponse>
 */
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('🔄 Login attempt for:', credentials.email)

    // TODO: Mock authentication - production'da silinebilir
    if (USE_MOCK_DATA) {
      const mockResponse = await MockAuthService.login(credentials.email, credentials.password)

      // Mock service'den gelen tokenlari session'a kaydet
      setTokens(
        mockResponse.data.tokens.accessToken,
        mockResponse.data.tokens.refreshToken,
        mockResponse.data.tokens.expiresIn,
      )

      console.log('✅ Mock login successful for:', mockResponse.data.user.email)

      return {
        success: true,
        data: {
          accessToken: mockResponse.data.tokens.accessToken,
          refreshToken: mockResponse.data.tokens.refreshToken,
          expiresIn: mockResponse.data.tokens.expiresIn,
          user: mockResponse.data.user,
        },
      }
    }

    // Real API call
    const config: RequestConfig = { skipAuth: true }
    const response: any = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials, config)

    if (response.success && response.data) {
      setTokens(response.data.accessToken, response.data.refreshToken, response.data.expiresIn)

      console.log('✅ Login successful, tokens saved to sessionStorage')

      if (process.env.NODE_ENV === 'development') {
        debugTokenInfo()
      }
    }

    return response
  } catch (error) {
    console.error('❌ Login failed:', error)
    clearTokens()
    throw error
  }
}

/**
 * Email doğrulama işlemi
 * @param token - Email doğrulama token'ı
 * @returns Promise<LoginResponse>
 */
export const verifyEmail = async (token: string): Promise<LoginResponse> => {
  try {
    console.log('🔄 Email verification attempt with token')

    if (USE_MOCK_DATA) {
      console.log('✅ Mock email verification successful')
      // Simulate login after verification
      const mockUser = await MockAuthService.login('admin@example.com', 'admin123')
      return mockUser
    }

    const config: RequestConfig = { skipAuth: true }
    const verifyData: VerifyEmailRequest = { token }
    const response: any = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, verifyData, config)

    if (response.success && response.data) {
      SessionTokenManager.setTokens(response.data.accessToken, response.data.refreshToken, response.data.expiresIn)

      console.log('✅ Email verification successful, tokens saved')

      if (process.env.NODE_ENV === 'development') {
        SessionTokenManager.debugInfo()
      }
    }

    return response
  } catch (error) {
    console.error('❌ Email verification failed:', error)
    throw error
  }
}

/**
 * Email doğrulama tekrar gönderme işlemi
 * @param email - Kullanıcı email adresi
 * @returns Promise<BasicResponse>
 */
export const resendVerification = async (email: string): Promise<BasicResponse> => {
  try {
    console.log('🔄 Resend verification attempt for:', email)

    if (USE_MOCK_DATA) {
      console.log('✅ Mock resend verification successful')
      return { success: true, message: 'Verification email resent' }
    }

    const config: RequestConfig = { skipAuth: true }
    const resendData: ResendVerificationRequest = { email }
    const response: any = await apiClient.post<BasicResponse>(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
      resendData,
      config,
    )

    console.log('✅ Verification email resent successfully')
    return response
  } catch (error) {
    console.error('❌ Resend verification failed:', error)
    throw error
  }
}

/**
 * Access token yenileme işlemi
 * @returns Promise<string> - Yeni access token
 */
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  if (isRefreshTokenExpired()) {
    clearTokens()
    throw new Error('Refresh token expired')
  }

  try {
    console.log('🔄 Refreshing access token...')

    const config: RequestConfig = { skipAuth: true }
    const response: any = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken },
      config,
    )

    if (response.success && response.data) {
      const currentRefreshToken = getRefreshToken()

      if (!currentRefreshToken) {
        throw new Error('Refresh token lost during refresh process')
      }

      setTokens(response.data.accessToken, currentRefreshToken, response.data.expiresIn)

      console.log('✅ Access token refreshed successfully')
      return response.data.accessToken
    } else {
      throw new Error('Invalid refresh response')
    }
  } catch (error) {
    console.error('❌ Token refresh failed:', error)
    clearTokens()
    throw error
  }
}

/**
 * Şifre unutma işlemi
 * @param email - Kullanıcı email adresi
 * @returns Promise<BasicResponse>
 */
export const forgotPassword = async (email: string): Promise<BasicResponse> => {
  try {
    console.log('🔄 Forgot password attempt for:', email)

    if (USE_MOCK_DATA) {
      console.log('✅ Mock forgot password email sent')
      return { success: true, message: 'Password reset email sent' }
    }

    const config: RequestConfig = { skipAuth: true }
    const forgotData: ForgotPasswordRequest = { email }
    const response: any = await apiClient.post<BasicResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, forgotData, config)

    console.log('✅ Password reset email sent successfully')
    return response
  } catch (error) {
    console.error('❌ Forgot password failed:', error)
    throw error
  }
}

/**
 * Şifre sıfırlama işlemi
 * @param resetData - Şifre sıfırlama bilgileri
 * @returns Promise<BasicResponse>
 */
export const resetPassword = async (resetData: ResetPasswordRequest): Promise<BasicResponse> => {
  try {
    console.log('🔄 Password reset attempt')

    if (USE_MOCK_DATA) {
      console.log('✅ Mock password reset successful')
      return { success: true, message: 'Password reset successful' }
    }

    const config: RequestConfig = { skipAuth: true }
    const response: any = await apiClient.post<BasicResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData, config)

    console.log('✅ Password reset successful')
    return response
  } catch (error) {
    console.error('❌ Password reset failed:', error)
    throw error
  }
}

/**
 * Mevcut kullanıcı bilgilerini getir
 * @param accessToken - Access token (opsiyonel)
 * @returns Promise<CurrentUserResponse> - Kullanıcı bilgileri
 */
export const getCurrentUser = async (accessToken?: string): Promise<CurrentUserResponse> => {
  try {
    console.log('🔄 Fetching current user...')

    const token = accessToken || SessionTokenManager.getAccessToken()

    if (!token) {
      throw new Error('No access token available')
    }

    // TODO: Mock user data - production'da silinebilir
    if (USE_MOCK_DATA) {
      const mockUserResponse = await MockAuthService.getCurrentUser(token)

      console.log('✅ Mock current user fetched successfully')
      return mockUserResponse
    }

    const config: RequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response: any = await apiClient.get<CurrentUserResponse>(API_ENDPOINTS.AUTH.ME, config)

    console.log('✅ Current user fetched successfully')
    return response
  } catch (error) {
    console.error('❌ Failed to fetch current user:', error)
    throw error
  }
}

/**
 * Kullanıcı profil güncelleme işlemi
 * @param profileData - Güncellenecek profil bilgileri
 * @returns Promise<CurrentUserResponse>
 */
export const updateProfile = async (profileData: UpdateProfileRequest): Promise<CurrentUserResponse> => {
  try {
    console.log('🔄 Updating user profile...')

    if (USE_MOCK_DATA) {
      console.log('✅ Mock profile update successful')
      return {
        user: {
          id: '1',
          email: profileData.email || 'admin@example.com',
          name: profileData.name || 'Admin User',
          role: 'admin',
        },
      }
    }

    const response: any = await apiClient.put<CurrentUserResponse>(API_ENDPOINTS.AUTH.PROFILE, profileData)

    console.log('✅ Profile updated successfully')
    return response
  } catch (error) {
    console.error('❌ Profile update failed:', error)
    throw error
  }
}

/**
 * Şifre değiştirme işlemi
 * @param passwordData - Şifre değiştirme bilgileri
 * @returns Promise<BasicResponse>
 */
export const changePassword = async (passwordData: ChangePasswordRequest): Promise<BasicResponse> => {
  try {
    console.log('🔄 Changing password...')

    if (USE_MOCK_DATA) {
      console.log('✅ Mock password change successful')
      return { success: true, message: 'Password changed successfully' }
    }

    const response: any = await apiClient.put<BasicResponse>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData)

    console.log('✅ Password changed successfully')
    return response
  } catch (error) {
    console.error('❌ Password change failed:', error)
    throw error
  }
}

/**
 * Kullanıcı çıkış işlemi
 * @returns Promise<void>
 */
export const logoutUser = async (): Promise<void> => {
  try {
    console.log('🔄 Logout attempt...')

    if (USE_MOCK_DATA) {
      console.log('✅ Mock logout successful')
      return
    }

    const refreshToken = SessionTokenManager.getRefreshToken()

    if (refreshToken) {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken })
    }

    console.log('✅ Logout successful')
  } catch (error) {
    console.error('⚠️ Logout API call failed, but continuing with local cleanup:', error)
  } finally {
    clearTokens()
  }
}

// Default export with all functions
const AuthApiService = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile,
  changePassword,
  logoutUser,
}

export default AuthApiService
