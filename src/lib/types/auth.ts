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
  user: User
  expiresIn: number
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  data: AuthData
  success: boolean
  message?: string
}

export interface RegisterResponse {
  success: boolean
  message?: string
  data: {
    email: string
    message: string
    emailSent: boolean
  }
}

export interface AuthError extends Error {
  code?: string
  success: false
  message: string
  status?: number
}

export interface BasicResponse {
  message: string
  success: boolean
}

export interface TokenInfo {
  isValid: boolean
  hasTokens: boolean
  expiresAt: number | null
  accessToken: string | null
  refreshToken: string | null
  isAccessTokenExpired: boolean
  timeUntilExpiry: number | null
  isRefreshTokenExpired: boolean
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
  isLoading: boolean
  isAuthenticated: boolean
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  success: boolean
}
