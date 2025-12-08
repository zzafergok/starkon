export interface User {
  id: string
  email: string
  name?: string
  role?: string
  createdAt?: string
  updatedAt?: string
  lastPasswordChange?: string
  twoFactorEnabled?: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  role?: string
}

export interface AuthData {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: User
}

export interface LoginResponse {
  success: boolean
  data: AuthData
  message?: string
}

export interface RegisterResponse {
  success: boolean
  data: {
    message: string
    email: string
    emailSent: boolean
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

export interface TokenInfo {
  hasTokens: boolean
  isAccessTokenExpired: boolean
  isRefreshTokenExpired: boolean
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
  timeUntilExpiry: number | null
  isValid: boolean
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    accessToken: string
    refreshToken: string
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  success: boolean
}
