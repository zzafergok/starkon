'use client'

import { AuthHeader } from '@/components/layout/AuthNavbar'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PomodoroTimer } from '@/components/ui/pomodoro/pomodoro-timer'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true}>
      <div className='min-h-screen flex flex-col'>
        <AuthHeader />
        <main className='flex-1 relative w-full max-w-9xl mx-auto lg:py-6'>{children}</main>
        <PomodoroTimer />
      </div>
    </ProtectedRoute>
  )
}
