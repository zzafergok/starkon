'use client'

import { usePathname } from 'next/navigation'
import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { PublicFooter } from '@/components/layout/PublicFooter'

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <div className='min-h-screen flex flex-col'>
      {!isLoginPage && <PublicNavbar />}
      <main className='flex-1'>{children}</main>
      {!isLoginPage && <PublicFooter />}
    </div>
  )
}
