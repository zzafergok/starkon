// TODO: Bu dosya mock authentication içindir - production'da silinebilir
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

// Mock kullanıcı verileri - kolayca silinebilir
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'user',
  },
] as const

// Mock JWT token generator - basit string formatında
const generateMockToken = (userId: string, expiresIn: number = 3600): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
      iat: Math.floor(Date.now() / 1000),
    }),
  )
  const signature = btoa(`mock_signature_${userId}_${Date.now()}`)
  return `${header}.${payload}.${signature}`
}

// Mock auth delay - gerçek API deneyimini simüle eder
const mockDelay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms))

export class MockAuthService {
  // Mock login - gerçek auth sistemini simüle eder
  static async login(email: string, password: string): Promise<any> {
    await mockDelay()

    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const accessToken = generateMockToken(user.id, 3600) // 1 saat
    const refreshToken = generateMockToken(user.id, 86400) // 24 saat

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 3600,
        },
      },
      message: 'Login successful',
    }
  }

  // Mock kullanıcı bilgisi getir
  static async getCurrentUser(token: string): Promise<any> {
    await mockDelay(300)

    try {
      // Token'dan user ID'yi çıkar (mock format)
      const payload = token.split('.')[1]
      const decoded = JSON.parse(atob(payload))
      const userId = decoded.sub

      const user = MOCK_USERS.find((u) => u.id === userId)
      if (!user) {
        throw new Error('User not found')
      }

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }
    } catch {
      throw new Error('Invalid token')
    }
  }

  // Mock token refresh
  static async refreshToken(refreshToken: string): Promise<any> {
    await mockDelay(500)

    try {
      const payload = refreshToken.split('.')[1]
      const decoded = JSON.parse(atob(payload))
      const userId = decoded.sub

      const user = MOCK_USERS.find((u) => u.id === userId)
      if (!user) {
        throw new Error('User not found')
      }

      const newAccessToken = generateMockToken(user.id, 3600)
      const newRefreshToken = generateMockToken(user.id, 86400)

      return {
        success: true,
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresIn: 3600,
        },
      }
    } catch {
      throw new Error('Invalid refresh token')
    }
  }

  // Mock logout
  static async logout(): Promise<any> {
    await mockDelay(200)
    return {
      success: true,
      message: 'Logout successful',
    }
  }

  // Mock kullanıcıları listele - development için
  static getMockUsers() {
    return MOCK_USERS.map((user) => ({
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
    }))
  }
}
