'use client'

import { useState, useEffect } from 'react'
import { Clock, AlertTriangle, Shield, CheckCircle2, XCircle, Info } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/core/alert'
import { Progress } from '@/components/core/progress'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'

import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

interface RateLimitingFeedbackProps {
  isRateLimited: boolean
  remainingRequests?: number
  totalRequests?: number
  resetTime?: string
  lastRequestTime?: string
  rateLimitType?: 'contact' | 'support' | 'api' | 'general'
  className?: string
  onRetry?: () => void
}

interface RateLimitInfo {
  current: number
  max: number
  resetTime: Date
  windowDuration: number // in minutes
}

export function RateLimitingFeedback({
  isRateLimited,
  remainingRequests = 0,
  totalRequests = 10,
  resetTime,
  lastRequestTime,
  rateLimitType = 'general',
  className,
  onRetry,
}: RateLimitingFeedbackProps) {
  const { t } = useLocale()
  const [timeUntilReset, setTimeUntilReset] = useState<number>(0)
  const [isCountingDown, setIsCountingDown] = useState(false)

  useEffect(() => {
    if (resetTime && isRateLimited) {
      setIsCountingDown(true)
      const resetDate = new Date(resetTime)

      const updateCountdown = () => {
        const now = new Date()
        const timeDiff = resetDate.getTime() - now.getTime()

        if (timeDiff <= 0) {
          setTimeUntilReset(0)
          setIsCountingDown(false)
        } else {
          setTimeUntilReset(Math.ceil(timeDiff / 1000))
        }
      }

      updateCountdown()
      const interval = setInterval(updateCountdown, 1000)

      return () => clearInterval(interval)
    }
  }, [resetTime, isRateLimited])

  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return t('contact.rateLimit.time.seconds', { seconds })
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return remainingSeconds > 0
        ? t('contact.rateLimit.time.minutesAndSeconds', { minutes, seconds: remainingSeconds })
        : t('contact.rateLimit.time.minutes', { minutes })
    } else {
      const hours = Math.floor(seconds / 3600)
      const remainingMinutes = Math.floor((seconds % 3600) / 60)
      return remainingMinutes > 0
        ? t('contact.rateLimit.time.hoursAndMinutes', { hours, minutes: remainingMinutes })
        : t('contact.rateLimit.time.hours', { hours })
    }
  }

  const getRateLimitMessage = () => {
    switch (rateLimitType) {
      case 'contact':
        return t('contact.rateLimit.messages.contact')
      case 'support':
        return t('contact.rateLimit.messages.support')
      case 'api':
        return t('contact.rateLimit.messages.api')
      default:
        return t('contact.rateLimit.messages.general')
    }
  }

  const getUsagePercentage = () => {
    const used = totalRequests - remainingRequests
    return (used / totalRequests) * 100
  }

  const getUsageStatus = () => {
    const percentage = getUsagePercentage()
    if (percentage >= 100) return 'blocked'
    if (percentage >= 80) return 'warning'
    if (percentage >= 50) return 'caution'
    return 'normal'
  }

  const usageStatus = getUsageStatus()

  if (!isRateLimited && remainingRequests === totalRequests) {
    return null // Don't show anything if no rate limiting is active
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Rate Limit Status Alert */}
      {isRateLimited ? (
        <Alert variant='destructive'>
          <XCircle className='h-4 w-4' />
          <AlertDescription className='space-y-2'>
            <div className='font-medium'>{t('contact.rateLimit.blocked.title')}</div>
            <p>{getRateLimitMessage()}</p>
            {timeUntilReset > 0 && (
              <div className='flex items-center space-x-2'>
                <Clock className='w-4 h-4' />
                <span>
                  {t('contact.rateLimit.blocked.resetIn')} <strong>{formatTime(timeUntilReset)}</strong>
                </span>
              </div>
            )}
          </AlertDescription>
        </Alert>
      ) : usageStatus === 'warning' ? (
        <Alert variant='destructive'>
          <AlertTriangle className='h-4 w-4' />
          <AlertDescription>
            <strong>{t('contact.rateLimit.warning.title')}</strong>
            <p>{t('contact.rateLimit.warning.description', { remaining: remainingRequests })}</p>
          </AlertDescription>
        </Alert>
      ) : usageStatus === 'caution' ? (
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            {t('contact.rateLimit.caution.description', { remaining: remainingRequests, total: totalRequests })}
          </AlertDescription>
        </Alert>
      ) : null}

      {/* Usage Progress */}
      {totalRequests > 0 && (
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center space-x-2'>
              <Shield className='w-4 h-4 text-muted-foreground' />
              <span className='font-medium'>{t('contact.rateLimit.usage.title')}</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Badge
                variant={
                  usageStatus === 'blocked'
                    ? 'destructive'
                    : usageStatus === 'warning'
                      ? 'destructive'
                      : usageStatus === 'caution'
                        ? 'secondary'
                        : 'outline'
                }
              >
                {totalRequests - remainingRequests}/{totalRequests}
              </Badge>
            </div>
          </div>

          <Progress
            value={getUsagePercentage()}
            className={cn(
              'h-2',
              usageStatus === 'blocked' && 'bg-red-100',
              usageStatus === 'warning' && 'bg-red-100',
              usageStatus === 'caution' && 'bg-yellow-100',
            )}
          />

          <p className='text-xs text-muted-foreground'>
            {remainingRequests > 0
              ? t('contact.rateLimit.usage.remaining', { count: remainingRequests })
              : t('contact.rateLimit.usage.depleted')}
          </p>
        </div>
      )}

      {/* Countdown Timer */}
      {isCountingDown && timeUntilReset > 0 && (
        <div className='bg-muted/50 rounded-lg p-4'>
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-primary' />
              <span className='text-sm font-medium'>{t('contact.rateLimit.countdown.title')}</span>
            </div>
            <div className='text-lg font-mono font-bold text-primary'>{formatTime(timeUntilReset)}</div>
          </div>

          {resetTime && (
            <p className='text-xs text-muted-foreground'>
              {t('contact.rateLimit.countdown.resetAt')} {new Date(resetTime).toLocaleTimeString()}
            </p>
          )}
        </div>
      )}

      {/* Last Request Info */}
      {lastRequestTime && !isRateLimited && (
        <div className='text-xs text-muted-foreground flex items-center space-x-1'>
          <CheckCircle2 className='w-3 h-3 text-green-500' />
          <span>
            {t('contact.rateLimit.lastRequest')} {new Date(lastRequestTime).toLocaleString()}
          </span>
        </div>
      )}

      {/* Retry Button */}
      {isRateLimited && timeUntilReset <= 0 && onRetry && (
        <div className='flex justify-center'>
          <Button onClick={onRetry} variant='outline' size='sm'>
            <CheckCircle2 className='w-4 h-4 mr-2' />
            {t('contact.rateLimit.retry')}
          </Button>
        </div>
      )}

      {/* Help Text */}
      <div className='bg-muted/30 rounded-lg p-3'>
        <div className='flex items-start space-x-2'>
          <Info className='w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0' />
          <div className='text-xs text-muted-foreground space-y-1'>
            <p className='font-medium'>{t('contact.rateLimit.help.title')}</p>
            <ul className='list-disc list-inside space-y-1 ml-2'>
              <li>{t('contact.rateLimit.help.tip1')}</li>
              <li>{t('contact.rateLimit.help.tip2')}</li>
              <li>{t('contact.rateLimit.help.tip3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for managing rate limit state
export function useRateLimit(type: 'contact' | 'support' | 'api' = 'contact') {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkRateLimit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock API call - replace with actual rate limit check
      const response = await fetch(`/api/rate-limit/${type}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to check rate limit')
      }

      setRateLimitInfo({
        current: data.current,
        max: data.max,
        resetTime: new Date(data.resetTime),
        windowDuration: data.windowDuration,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetRateLimit = () => {
    setRateLimitInfo(null)
    setError(null)
  }

  return {
    rateLimitInfo,
    isLoading,
    error,
    checkRateLimit,
    resetRateLimit,
    isRateLimited: rateLimitInfo ? rateLimitInfo.current >= rateLimitInfo.max : false,
    remainingRequests: rateLimitInfo ? rateLimitInfo.max - rateLimitInfo.current : 0,
  }
}
