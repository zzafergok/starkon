import { z } from 'zod'

/**
 * Forgot password form validation schema
 */
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').toLowerCase().trim(),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
