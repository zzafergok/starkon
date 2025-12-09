'use client'

import { useState, useEffect } from 'react'

import {
  Clock,
  Tablet,
  MapPin,
  Shield,
  Trash2,
  LogOut,
  Monitor,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/core/alert-dialog'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Separator } from '@/components/core/separator'
import { Alert, AlertDescription } from '@/components/core/alert'
import { LoadingSpinner } from '@/components/core/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { useLocale } from '@/hooks/useLocale'

import { useAuth } from '@/providers/AuthProvider'

import { cn } from '@/lib/utils'

interface SessionManagementProps {
  className?: string
}

interface Session {
  id: string
  deviceType: 'desktop' | 'mobile' | 'tablet'
  deviceName: string
  browser: string
  operatingSystem: string
  ipAddress: string
  location: {
    city: string
    country: string
    region: string
  }
  lastActive: string
  createdAt: string
  isCurrent: boolean
  isActive: boolean
}

interface SessionItemProps {
  session: Session
  onTerminate: (sessionId: string) => void
  isTerminating: boolean
}

interface SecurityInfoProps {
  sessionsCount: number
  lastPasswordChange?: string
  twoFactorEnabled: boolean
}

function SessionItem({ session, onTerminate, isTerminating }: SessionItemProps) {
  const { t } = useLocale()

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className='w-5 h-5' />
      case 'tablet':
        return <Tablet className='w-5 h-5' />
      default:
        return <Monitor className='w-5 h-5' />
    }
  }

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return t('auth.sessions.time.justNow')
    if (diffInMinutes < 60) return t('auth.sessions.time.minutesAgo', { minutes: diffInMinutes })

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return t('auth.sessions.time.hoursAgo', { hours: diffInHours })

    const diffInDays = Math.floor(diffInHours / 24)
    return t('auth.sessions.time.daysAgo', { days: diffInDays })
  }

  return (
    <div className={cn('p-4 border rounded-lg', session.isCurrent ? 'border-primary bg-primary/5' : 'border-border')}>
      <div className='flex items-start justify-between'>
        <div className='flex items-start space-x-3'>
          <div className='p-2 bg-muted rounded-lg'>{getDeviceIcon(session.deviceType)}</div>

          <div className='space-y-1'>
            <div className='flex items-center space-x-2'>
              <h3 className='font-medium'>{session.deviceName}</h3>
              {session.isCurrent && (
                <Badge variant='default' className='text-xs'>
                  {t('auth.sessions.current')}
                </Badge>
              )}
              {session.isActive && <div className='w-2 h-2 bg-green-500 rounded-full'></div>}
            </div>

            <div className='space-y-1 text-sm text-muted-foreground'>
              <p>
                {session.browser} • {session.operatingSystem}
              </p>
              <div className='flex items-center space-x-1'>
                <MapPin className='w-3 h-3' />
                <span>
                  {session.location.city}, {session.location.country}
                </span>
              </div>
              <p className='text-xs'>
                {t('auth.sessions.ipAddress')}: {session.ipAddress}
              </p>
            </div>

            <div className='flex items-center space-x-4 text-xs text-muted-foreground'>
              <div className='flex items-center space-x-1'>
                <Clock className='w-3 h-3' />
                <span>
                  {t('auth.sessions.lastActive')}: {getTimeSince(session.lastActive)}
                </span>
              </div>
              <span>
                {t('auth.sessions.created')}: {getTimeSince(session.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {!session.isCurrent && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' size='sm' disabled={isTerminating}>
                {isTerminating ? <LoadingSpinner size='sm' /> : <Trash2 className='w-4 h-4' />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('auth.sessions.terminate.title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('auth.sessions.terminate.description', { device: session.deviceName })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => onTerminate(session.id)}>
                  {t('auth.sessions.terminate.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}

function SecurityInfo({ sessionsCount, lastPasswordChange, twoFactorEnabled }: SecurityInfoProps) {
  const { t } = useLocale()

  const getPasswordChangeStatus = () => {
    if (!lastPasswordChange) return 'unknown'

    const lastChange = new Date(lastPasswordChange)
    const now = new Date()
    const daysSince = Math.floor((now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24))

    if (daysSince > 90) return 'warning'
    if (daysSince > 30) return 'caution'
    return 'good'
  }

  const passwordStatus = getPasswordChangeStatus()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Shield className='w-5 h-5' />
          <span>{t('auth.sessions.security.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='text-center p-4 border rounded-lg'>
            <div className='text-2xl font-bold text-blue-600 mb-1'>{sessionsCount}</div>
            <div className='text-sm text-muted-foreground'>{t('auth.sessions.security.activeSessions')}</div>
          </div>

          <div className='text-center p-4 border rounded-lg'>
            <div
              className={cn(
                'text-2xl font-bold mb-1',
                passwordStatus === 'good'
                  ? 'text-green-600'
                  : passwordStatus === 'caution'
                    ? 'text-yellow-600'
                    : passwordStatus === 'warning'
                      ? 'text-red-600'
                      : 'text-gray-600',
              )}
            >
              {passwordStatus === 'good' && <CheckCircle2 className='w-8 h-8 mx-auto' />}
              {passwordStatus === 'caution' && <Clock className='w-8 h-8 mx-auto' />}
              {passwordStatus === 'warning' && <AlertTriangle className='w-8 h-8 mx-auto' />}
              {passwordStatus === 'unknown' && <Shield className='w-8 h-8 mx-auto' />}
            </div>
            <div className='text-sm text-muted-foreground'>
              {t(`auth.sessions.security.passwordStatus.${passwordStatus}`)}
            </div>
          </div>

          <div className='text-center p-4 border rounded-lg'>
            <div className={cn('text-2xl font-bold mb-1', twoFactorEnabled ? 'text-green-600' : 'text-orange-600')}>
              {twoFactorEnabled ? (
                <CheckCircle2 className='w-8 h-8 mx-auto' />
              ) : (
                <AlertTriangle className='w-8 h-8 mx-auto' />
              )}
            </div>
            <div className='text-sm text-muted-foreground'>
              {twoFactorEnabled
                ? t('auth.sessions.security.twoFactorEnabled')
                : t('auth.sessions.security.twoFactorDisabled')}
            </div>
          </div>
        </div>

        <Separator />

        <div className='space-y-3'>
          <h4 className='text-sm font-medium'>{t('auth.sessions.security.recommendations')}</h4>
          <div className='space-y-2 text-sm'>
            {passwordStatus !== 'good' && (
              <Alert>
                <AlertTriangle className='h-4 w-4' />
                <AlertDescription>{t('auth.sessions.security.changePassword')}</AlertDescription>
              </Alert>
            )}

            {!twoFactorEnabled && (
              <Alert>
                <Shield className='h-4 w-4' />
                <AlertDescription>{t('auth.sessions.security.enableTwoFactor')}</AlertDescription>
              </Alert>
            )}

            {sessionsCount > 5 && (
              <Alert>
                <Monitor className='h-4 w-4' />
                <AlertDescription>{t('auth.sessions.security.tooManySessions')}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SessionManagement({ className }: SessionManagementProps) {
  const { t } = useLocale()
  const { user, terminateSession, terminateAllOtherSessions } = useAuth()

  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [terminatingSessions, setTerminatingSessions] = useState<Set<string>>(new Set())
  const [isTerminatingAll, setIsTerminatingAll] = useState(false)

  // Mock data - in real implementation, this would come from an API
  useEffect(() => {
    const mockSessions: Session[] = [
      {
        id: '1',
        deviceType: 'desktop',
        deviceName: 'MacBook Pro',
        browser: 'Chrome 120.0',
        operatingSystem: 'macOS 14.1',
        ipAddress: '192.168.1.100',
        location: {
          city: 'Istanbul',
          country: 'Turkey',
          region: 'Marmara',
        },
        lastActive: new Date().toISOString(),
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isCurrent: true,
        isActive: true,
      },
      {
        id: '2',
        deviceType: 'mobile',
        deviceName: 'iPhone 15',
        browser: 'Safari 17.0',
        operatingSystem: 'iOS 17.1',
        ipAddress: '192.168.1.101',
        location: {
          city: 'Istanbul',
          country: 'Turkey',
          region: 'Marmara',
        },
        lastActive: new Date(Date.now() - 3600000).toISOString(),
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        isCurrent: false,
        isActive: true,
      },
      {
        id: '3',
        deviceType: 'desktop',
        deviceName: 'Windows PC',
        browser: 'Edge 119.0',
        operatingSystem: 'Windows 11',
        ipAddress: '10.0.0.50',
        location: {
          city: 'Ankara',
          country: 'Turkey',
          region: 'Central Anatolia',
        },
        lastActive: new Date(Date.now() - 86400000 * 3).toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        isCurrent: false,
        isActive: false,
      },
    ]

    setTimeout(() => {
      setSessions(mockSessions)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleTerminateSession = async (sessionId: string) => {
    setTerminatingSessions((prev) => new Set([...prev, sessionId]))

    try {
      await terminateSession(sessionId)
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    } catch (error) {
      console.error('Failed to terminate session:', error)
    } finally {
      setTerminatingSessions((prev) => {
        const next = new Set(prev)
        next.delete(sessionId)
        return next
      })
    }
  }

  const handleTerminateAllOtherSessions = async () => {
    setIsTerminatingAll(true)

    try {
      await terminateAllOtherSessions()
      setSessions((prev) => prev.filter((s) => s.isCurrent))
    } catch (error) {
      console.error('Failed to terminate all sessions:', error)
    } finally {
      setIsTerminatingAll(false)
    }
  }

  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className='flex items-center justify-center h-64'>
          <LoadingSpinner size='lg' />
        </div>
      </div>
    )
  }

  const activeSessions = sessions.filter((s) => s.isActive)
  const otherSessions = sessions.filter((s) => !s.isCurrent)

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>{t('auth.sessions.title')}</h1>
          <p className='text-muted-foreground'>{t('auth.sessions.subtitle')}</p>
        </div>

        {otherSessions.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive' disabled={isTerminatingAll}>
                {isTerminatingAll ? <LoadingSpinner size='sm' className='mr-2' /> : <LogOut className='w-4 h-4 mr-2' />}
                {t('auth.sessions.terminateAll')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('auth.sessions.terminateAll.title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('auth.sessions.terminateAll.description', { count: otherSessions.length })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleTerminateAllOtherSessions}>
                  {t('auth.sessions.terminateAll.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Security Information */}
      <SecurityInfo
        sessionsCount={activeSessions.length}
        lastPasswordChange={user?.lastPasswordChange}
        twoFactorEnabled={user?.twoFactorEnabled || false}
      />

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.sessions.activeSessions')}</CardTitle>
          <p className='text-sm text-muted-foreground'>
            {t('auth.sessions.activeSessionsDescription', { count: activeSessions.length })}
          </p>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {sessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                onTerminate={handleTerminateSession}
                isTerminating={terminatingSessions.has(session.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Shield className='w-5 h-5' />
            <span>{t('auth.sessions.tips.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 bg-muted/50 rounded-lg'>
              <h4 className='font-medium mb-2'>{t('auth.sessions.tips.regular.title')}</h4>
              <p className='text-sm text-muted-foreground'>{t('auth.sessions.tips.regular.description')}</p>
            </div>

            <div className='p-4 bg-muted/50 rounded-lg'>
              <h4 className='font-medium mb-2'>{t('auth.sessions.tips.suspicious.title')}</h4>
              <p className='text-sm text-muted-foreground'>{t('auth.sessions.tips.suspicious.description')}</p>
            </div>

            <div className='p-4 bg-muted/50 rounded-lg'>
              <h4 className='font-medium mb-2'>{t('auth.sessions.tips.password.title')}</h4>
              <p className='text-sm text-muted-foreground'>{t('auth.sessions.tips.password.description')}</p>
            </div>

            <div className='p-4 bg-muted/50 rounded-lg'>
              <h4 className='font-medium mb-2'>{t('auth.sessions.tips.twoFactor.title')}</h4>
              <p className='text-sm text-muted-foreground'>{t('auth.sessions.tips.twoFactor.description')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
