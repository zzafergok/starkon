'use client'

import { AuthHeader } from '@/components/layout/AuthNavbar'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true}>
      <div className='min-h-screen flex flex-col lg:h-screen lg:overflow-hidden'>
        <AuthHeader />
        <main className='flex-1 relative lg:overflow-hidden'>{children}</main>
      </div>
    </ProtectedRoute>
  )
}
