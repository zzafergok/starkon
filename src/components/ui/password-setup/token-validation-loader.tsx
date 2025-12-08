'use client'

import { Lock, RefreshCw, Shield, CheckCircle } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

import { cn } from '@/lib/utils'

interface TokenValidationLoaderProps {
  className?: string
}

export function TokenValidationLoader({ className }: TokenValidationLoaderProps) {
  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader className='text-center'>
        <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 relative'>
          <Lock className='w-8 h-8 text-blue-600 dark:text-blue-400' />
          <div className='absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400 animate-spin' />
        </div>
        <CardTitle className='text-2xl'>Validating Setup Link</CardTitle>
        <CardDescription>Please wait while we verify your password setup token...</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Validation Steps */}
        <div className='space-y-4'>
          <div className='flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
            <div className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
              <RefreshCw className='w-3 h-3 text-white animate-spin' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm'>Verifying Token</div>
              <div className='text-xs text-muted-foreground'>Checking token validity and expiration</div>
            </div>
          </div>

          <div className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg'>
            <div className='w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0'>
              <Shield className='w-3 h-3 text-muted-foreground' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm text-muted-foreground'>Security Check</div>
              <div className='text-xs text-muted-foreground'>Validating user permissions</div>
            </div>
          </div>

          <div className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg'>
            <div className='w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0'>
              <CheckCircle className='w-3 h-3 text-muted-foreground' />
            </div>
            <div className='flex-1'>
              <div className='font-medium text-sm text-muted-foreground'>Loading Setup Form</div>
              <div className='text-xs text-muted-foreground'>Preparing password setup interface</div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
          <div className='flex items-start gap-3'>
            <Shield className='w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0' />
            <div className='space-y-1'>
              <h4 className='font-medium text-green-900 dark:text-green-100 text-sm'>Secure Setup Process</h4>
              <ul className='text-xs text-green-700 dark:text-green-300 space-y-1'>
                <li>• Your setup link is encrypted and time-limited</li>
                <li>• All data transmission is secured with HTTPS</li>
                <li>• Links expire automatically for security</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className='space-y-2'>
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>Validating...</span>
            <span>Please wait</span>
          </div>
          <div className='w-full bg-muted rounded-full h-2'>
            <div className='bg-blue-600 h-2 rounded-full animate-pulse' style={{ width: '60%' }} />
          </div>
        </div>

        {/* Help Text */}
        <div className='text-center text-xs text-muted-foreground'>
          <p>
            This process usually takes a few seconds. If it takes longer than expected, please check your internet
            connection.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
