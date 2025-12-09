'use client'

import { Suspense } from 'react'

import { useSearchParams } from 'next/navigation'

import { Card } from '@/components/core/card'
import { LoadingSpinner } from '@/components/core/loading-spinner'
import { ThemeSwitcher } from '@/components/ui/theme/theme-switcher'
import { LanguageSwitcher } from '@/components/ui/language/language-switcher'
import { VerifyingState, VerificationSuccess, VerificationError } from './components'

import { useEmailVerification } from './hooks'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { status, message, handleReturnToLogin } = useEmailVerification(token)

  return (
    <div className='min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8'>
      {/* Theme & Language Switchers */}
      <div className='absolute top-4 right-4 flex items-center gap-2'>
        <LanguageSwitcher variant='button' size='sm' />
        <ThemeSwitcher variant='button' size='sm' />
      </div>

      <div className='max-w-md w-full'>
        <Card className='p-8'>
          {status === 'verifying' && <VerifyingState />}
          {status === 'success' && <VerificationSuccess title={message.title} description={message.description} />}
          {status === 'error' && (
            <VerificationError
              title={message.title}
              description={message.description}
              onReturnToLogin={handleReturnToLogin}
            />
          )}
        </Card>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailContent />
    </Suspense>
  )
}
