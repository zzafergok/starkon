'use client'

import { useState } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Send, CheckCircle, AlertTriangle, RefreshCw, Clock } from 'lucide-react'

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/core/dialog'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { useToast } from '@/store/toastStore'

import { cn } from '@/lib/utils'

// Validation schema
const resendPasswordSetupSchema = z.object({
  email: z.string().email('Invalid email address'),
})

interface ResendPasswordSetupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userEmail?: string
}

interface ResendFormData {
  email: string
}

export function ResendPasswordSetupDialog({ open, onOpenChange, userEmail }: ResendPasswordSetupDialogProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [resendAttempts, setResendAttempts] = useState(0)

  const form = useForm<ResendFormData>({
    resolver: zodResolver(resendPasswordSetupSchema),
    defaultValues: {
      email: userEmail || '',
    },
  })

  const maxResendAttempts = 3
  const canResend = resendAttempts < maxResendAttempts

  const onSubmit = async (data: ResendFormData) => {
    if (!canResend) {
      toast.error('Maximum resend attempts reached. Please contact support.', t('error.title'))
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement API call to resend password setup email
      console.log('Resending password setup email to:', data.email)

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setEmailSent(true)
      setResendAttempts((prev) => prev + 1)

      toast.success(t('passwordSetup.resendSuccessDescription'), t('passwordSetup.resendSuccess'))
    } catch (error) {
      console.error('Error resending password setup email:', error)
      toast.error(t('passwordSetup.resendError'), t('error.title'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    setEmailSent(false)
    onOpenChange(false)
  }

  const handleClose = () => {
    if (emailSent) {
      // Reset state when closing after successful send
      setEmailSent(false)
      form.reset()
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-md'>
        {emailSent ? (
          // Success State
          <>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2 text-green-600'>
                <CheckCircle className='w-5 h-5' />
                Setup Link Sent!
              </DialogTitle>
              <DialogDescription>A new password setup link has been sent to your email address.</DialogDescription>
            </DialogHeader>

            <div className='space-y-4'>
              <Card className='border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-lg text-green-900 dark:text-green-100'>Check Your Email</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Mail className='w-4 h-4 text-green-600 dark:text-green-400' />
                    <span className='font-medium text-sm'>{form.watch('email')}</span>
                  </div>

                  <div className='text-sm text-green-700 dark:text-green-300 space-y-2'>
                    <p>• Check your inbox for the new setup link</p>
                    <p>• The link will expire in 24 hours</p>
                    <p>• Check spam folder if you don't see it</p>
                  </div>
                </CardContent>
              </Card>

              <div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
                <span className='text-sm text-muted-foreground'>Resend attempts used:</span>
                <span className='font-medium'>
                  {resendAttempts} / {maxResendAttempts}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className='w-full'>
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          // Request Form State
          <>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <Mail className='w-5 h-5' />
                Request New Setup Link
              </DialogTitle>
              <DialogDescription>Enter your email address to receive a new password setup link.</DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address *</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  {...form.register('email')}
                  disabled={isLoading}
                />
                {form.formState.errors.email && (
                  <p className='text-sm text-destructive'>{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Resend Limitations */}
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
                  <span className='text-sm text-muted-foreground'>Resend attempts remaining:</span>
                  <span className={cn('font-medium', canResend ? 'text-green-600' : 'text-red-600')}>
                    {maxResendAttempts - resendAttempts}
                  </span>
                </div>

                {!canResend && (
                  <div className='p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800'>
                    <div className='flex items-center gap-2 text-red-700 dark:text-red-300'>
                      <AlertTriangle className='w-4 h-4' />
                      <span className='text-sm font-medium'>Maximum attempts reached</span>
                    </div>
                    <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                      Please contact support if you continue to have issues.
                    </p>
                  </div>
                )}

                {canResend && resendAttempts > 0 && (
                  <div className='p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800'>
                    <div className='flex items-center gap-2 text-amber-700 dark:text-amber-300'>
                      <Clock className='w-4 h-4' />
                      <span className='text-sm font-medium'>Rate limiting active</span>
                    </div>
                    <p className='text-xs text-amber-600 dark:text-amber-400 mt-1'>
                      Please wait before requesting another link if this one doesn't arrive.
                    </p>
                  </div>
                )}
              </div>

              {/* Information */}
              <div className='p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800'>
                <h4 className='font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm'>What happens next?</h4>
                <ul className='text-xs text-blue-700 dark:text-blue-300 space-y-1'>
                  <li>• A new setup link will be sent to your email</li>
                  <li>• Previous setup links will be invalidated</li>
                  <li>• The new link expires in 24 hours</li>
                  <li>• Check spam folder if you don't receive it</li>
                </ul>
              </div>
            </form>

            <DialogFooter className='flex items-center gap-2'>
              <Button type='button' variant='outline' onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button type='submit' onClick={form.handleSubmit(onSubmit)} disabled={isLoading || !canResend}>
                {isLoading ? (
                  <>
                    <RefreshCw className='w-4 h-4 mr-2 animate-spin' />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4 mr-2' />
                    Send New Link
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
