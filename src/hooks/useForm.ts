'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm, UseFormProps } from 'react-hook-form'

/**
 * Enhanced form hook that combines React Hook Form with Zod validation
 * and adds internationalization support for error messages
 */
export function useForm<T extends z.ZodType<any, any>>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>,
) {
  // Create a custom resolver that translates Zod error messages
  const resolver = zodResolver(schema)

  // Return the useForm hook with our custom resolver
  return useReactHookForm<z.infer<T>>({
    resolver,
    ...options,
  })
}
