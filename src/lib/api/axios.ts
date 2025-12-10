/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

import { SessionTokenManager } from '@/lib/services/sessionTokenManager'
// import type { RefreshTokenResponse } from '@/lib/types/auth'

// Global toast instance for interceptors
let globalToast: any = null

export const setGlobalToast = (toastInstance: any) => {
  globalToast = toastInstance
}

export interface ApiError {
  code?: string
  message: string
  status?: number
}

// Extended config interface for toast control
export interface ExtendedRequestConfig {
  skipAuth?: boolean
  skipErrorToast?: boolean
  skipSuccessToast?: boolean
  params?: Record<string, any>
  headers?: Record<string, string>
}

interface QueueItem {
  reject: (error: any) => void
  config: InternalAxiosRequestConfig
  resolve: (config: InternalAxiosRequestConfig) => void
}

let isRefreshing = false
let requestQueue: QueueItem[] = []

const createAxiosInstance = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig & ExtendedRequestConfig) => {
      // Skip auth eğer belirtilmişse
      if (config.skipAuth) {
        return config
      }

      const token = SessionTokenManager.getAccessToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('No access token available')
        }
        // Token yoksa ve auth gerekiyorsa hata fırlat
        throw new Error('No access token available')
      }

      return config
    },
    (error: AxiosError) => Promise.reject(error),
  )
}

// const refreshAccessToken = async (): Promise<string> => {
//   const refreshToken = SessionTokenManager.getRefreshToken()
//   if (!refreshToken) {
//     throw new Error('No refresh token available')
//   }

//   if (process.env.NODE_ENV === 'development') {
//     console.info('Attempting to refresh access token')
//   }

//   try {
//     const response = await axios.post<RefreshTokenResponse>(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//       { refreshToken },
//       {
//         headers: { 'Content-Type': 'application/json' },
//         timeout: 10000,
//       },
//     )

//     const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data.data || response.data

//     SessionTokenManager.setTokens(accessToken, newRefreshToken, expiresIn)

//     if (process.env.NODE_ENV === 'development') {
//       console.info('Access token refreshed successfully')
//     }
//     return accessToken
//   } catch (error) {
//     console.error('Failed to refresh access token:', error instanceof Error ? error.message : 'Unknown error')
//     SessionTokenManager.clearTokens()
//     throw error
//   }
// }

const processRequestQueue = (error: any, token: string | null): void => {
  requestQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    } else if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
      resolve(config)
    }
  })
  requestQueue = []
}

const handleAuthFailure = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.info('Authentication failure - clearing tokens and redirecting')
  }
  SessionTokenManager.clearTokens()
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const config = response.config as InternalAxiosRequestConfig & ExtendedRequestConfig

      // GET istekleri hariç tüm başarılı işlemler için toast göster
      if (config.method !== 'get' && globalToast && !config.skipSuccessToast) {
        const message = response.data?.message || 'İşlem başarıyla tamamlandı'
        globalToast.success(message)
      }

      return response.data
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & ExtendedRequestConfig & { _retry?: boolean }
      const status = error.response?.status

      // Handle 403 Forbidden - Show modal instead of toast
      if (status === 403) {
        if (typeof window !== 'undefined') {
          // Dynamically import to avoid SSR issues
        }

        const apiError: ApiError = {
          message: (error.response?.data as any)?.message || 'Forbidden',
          status: 403,
          code: error.code,
        }
        return Promise.reject(apiError)
      }

      // GET istekleri hariç tüm başarısız işlemler için toast göster (403 hariç)
      if (originalRequest?.method !== 'get' && globalToast && !originalRequest?.skipErrorToast) {
        const errorMessage =
          (error.response?.data as any)?.message ||
          (typeof error.response?.data === 'object' && error.response?.data && 'error' in error.response.data
            ? (error.response.data as any).error
            : undefined) ||
          'Bir hata oluştu'
        globalToast.error(errorMessage)
      }

      // if (status === 401 && !originalRequest._retry && SessionTokenManager.getRefreshToken()) {
      //   if (process.env.NODE_ENV === 'development') {
      //     console.info('Attempting token refresh for 401 error')
      //   }

      //   if (isRefreshing) {
      //     if (process.env.NODE_ENV === 'development') {
      //       console.info('Token refresh already in progress, queuing request')
      //     }
      //     return new Promise((resolve, reject) => {
      //       requestQueue.push({
      //         resolve: (config: InternalAxiosRequestConfig) => resolve(instance(config)),
      //         reject: (err: any) => reject(err),
      //         config: originalRequest,
      //       })
      //     })
      //   }

      //   originalRequest._retry = true
      //   isRefreshing = true

      //   try {
      //     const newToken = await refreshAccessToken()
      //     processRequestQueue(null, newToken)

      //     if (originalRequest.headers) {
      //       originalRequest.headers.Authorization = `Bearer ${newToken}`
      //     }

      //     if (process.env.NODE_ENV === 'development') {
      //       console.info('Retrying original request with new token')
      //     }
      //     return instance(originalRequest)
      //   } catch (refreshError) {
      //     console.error('Token refresh failed:', refreshError instanceof Error ? refreshError.message : 'Unknown error')
      //     processRequestQueue(refreshError, null)
      //     handleAuthFailure()
      //     return Promise.reject(refreshError)
      //   } finally {
      //     isRefreshing = false
      //   }
      // }

      const apiError: ApiError = {
        message: (error.response?.data as any)?.message || error.message || 'Unknown error occurred',
        status: status || 500,
        code: error.code,
      }

      return Promise.reject(apiError)
    },
  )
}

const createApiClient = (): AxiosInstance => {
  const instance = createAxiosInstance()
  setupRequestInterceptor(instance)
  setupResponseInterceptor(instance)
  return instance
}

export const apiClient = createApiClient()

export const apiRequest = {
  get: <T = any>(url: string, config?: ExtendedRequestConfig): Promise<T> => apiClient.get(url, config),
  post: <T = any>(url: string, data?: any, config?: ExtendedRequestConfig): Promise<T> =>
    apiClient.post(url, data, config),
  put: <T = any>(url: string, data?: any, config?: ExtendedRequestConfig): Promise<T> =>
    apiClient.put(url, data, config),
  delete: <T = any>(url: string, config?: ExtendedRequestConfig): Promise<T> => apiClient.delete(url, config),
  patch: <T = any>(url: string, data?: any, config?: ExtendedRequestConfig): Promise<T> =>
    apiClient.patch(url, data, config),
}
