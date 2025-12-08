'use client'

import * as React from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  showToggle?: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className='relative'>
        <input
          type='text'
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            !showPassword && 'password-input',
            showToggle && 'pr-10',
            className,
          )}
          ref={ref}
          {...props}
        />
        {showToggle && (
          <button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className='h-4 w-4 text-muted-foreground hover:text-foreground transition-colors' />
            ) : (
              <Eye className='h-4 w-4 text-muted-foreground hover:text-foreground transition-colors' />
            )}
            <span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
          </button>
        )}
        <style jsx>{`
          .password-input {
            -webkit-text-security: disc;
            text-security: disc;
          }
        `}</style>
      </div>
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
