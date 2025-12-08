'use client'

import { AlertCircle } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'

import { cn } from '@/lib/utils'

interface TextFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'number'
  required?: boolean
  description?: string
  className?: string
  disabled?: boolean
  autoComplete?: string
  maxLength?: number
  minLength?: number
  pattern?: string
}

export function TextField({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  description,
  className,
  disabled,
  autoComplete,
  maxLength,
  minLength,
  pattern,
}: TextFieldProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()

  // Get nested error if field name contains dots (e.g., "settings.defaultProjectType")
  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors)

  const isDisabled = disabled || isSubmitting

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <Label htmlFor={name} className='text-xs sm:text-sm'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        error={error?.message as string}
        {...register(name, {
          valueAsNumber: type === 'number',
        })}
        className='text-xs sm:text-sm'
      />
      {description && !error && <p className='text-[10px] sm:text-xs text-muted-foreground'>{description}</p>}
      {error && (
        <p className='text-[10px] sm:text-xs text-red-500 flex items-center gap-1'>
          <AlertCircle className='w-3 h-3' />
          {error.message as string}
        </p>
      )}
    </div>
  )
}
