'use client'

import { CheckCircle } from 'lucide-react'

interface VerificationSuccessProps {
  title: string
  description: string
}

export function VerificationSuccess({ title, description }: VerificationSuccessProps) {
  return (
    <div className='text-center'>
      <CheckCircle className='mx-auto h-12 w-12 text-green-600 dark:text-green-400' />
      <h2 className='mt-4 text-xl font-semibold text-green-900 dark:text-green-100'>{title}</h2>
      <p className='mt-2 text-sm text-green-700 dark:text-green-300'>{description}</p>
    </div>
  )
}
