'use client'

import { useState } from 'react'

import {
  Clock,
  Users,
  Tablet,
  LogOut,
  Shield,
  Monitor,
  Smartphone,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Checkbox } from '@/components/core/checkbox'
import { Alert, AlertDescription } from '@/components/core/alert'
import { LoadingSpinner } from '@/components/core/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { useLocale } from '@/hooks/useLocale'

import { useAuth } from '@/providers/AuthProvider'

import { cn } from '@/lib/utils'

interface MultiSessionLogoutProps {
  onClose?: () => void
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

interface LogoutOptionProps {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  sessions: Session[]
  onSelect: (optionId: string, sessionIds: string[]) => void
  isSelected: boolean
  isLoading?: boolean
}

function LogoutOption({ id, title, description, icon, sessions, onSelect, isSelected, isLoading }: LogoutOptionProps) {
  const { t } = useLocale()

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className='w-4 h-4' />
      case 'tablet':
        return <Tablet className='w-4 h-4' />
      default:
        return <Monitor className='w-4 h-4' />
    }
  }

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all',
        isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50',
      )}
    >
      <CardContent className='p-4'>
        <div className='flex items-start space-x-4'>
          <Checkbox
            checked={isSelected}
            onCheckedChange={() =>
              onSelect(
                id,
                sessions.map((s) => s.id),
              )
            }
            disabled={isLoading}
          />

          <div className='flex-1'>
            <div className='flex items-center space-x-2 mb-2'>
              {icon}
              <h3 className='font-medium'>{title}</h3>
              <Badge variant='outline' className='text-xs'>
                {sessions.length} {t('auth.multiLogout.sessions')}
              </Badge>
            </div>

            <p className='text-sm text-muted-foreground mb-3'>{description}</p>

            <div className='space-y-2'>
              {sessions.slice(0, 3).map((session) => (
                <div key={session.id} className='flex items-center space-x-2 text-xs'>
                  {getDeviceIcon(session.deviceType)}
                  <span className='text-muted-foreground'>
                    {session.deviceName} • {session.browser}
                    {session.isCurrent && (
                      <Badge variant='default' className='text-xs ml-2'>
                        {t('auth.sessions.current')}
                      </Badge>
                    )}
                  </span>
                </div>
              ))}
              {sessions.length > 3 && (
                <p className='text-xs text-muted-foreground'>
                  {t('auth.multiLogout.andMore', { count: sessions.length - 3 })}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MultiSessionLogout({ onClose, className }: MultiSessionLogoutProps) {
  const { t } = useLocale()
  const { logout, terminateSession, terminateAllOtherSessions } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())
  const [step, setStep] = useState<'select' | 'confirm' | 'processing' | 'success'>('select')

  // Mock sessions data - in real implementation, this would come from API
  const sessions: Session[] = [
    {
      id: '1',
      deviceType: 'desktop',
      deviceName: 'MacBook Pro',
      browser: 'Chrome 120.0',
      operatingSystem: 'macOS 14.1',
      ipAddress: '192.168.1.100',
      location: { city: 'Istanbul', country: 'Turkey', region: 'Marmara' },
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
      location: { city: 'Istanbul', country: 'Turkey', region: 'Marmara' },
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
      location: { city: 'Ankara', country: 'Turkey', region: 'Central Anatolia' },
      lastActive: new Date(Date.now() - 86400000 * 3).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      isCurrent: false,
      isActive: false,
    },
  ]

  const currentSession = sessions.find((s) => s.isCurrent)
  const otherSessions = sessions.filter((s) => !s.isCurrent)
  const inactiveSessions = sessions.filter((s) => !s.isActive)
  const mobileSessions = sessions.filter((s) => s.deviceType === 'mobile')

  const logoutOptions = [
    {
      id: 'current',
      title: t('auth.multiLogout.options.current.title'),
      description: t('auth.multiLogout.options.current.description'),
      icon: <Monitor className='w-5 h-5 text-blue-500' />,
      sessions: currentSession ? [currentSession] : [],
    },
    {
      id: 'other',
      title: t('auth.multiLogout.options.other.title'),
      description: t('auth.multiLogout.options.other.description'),
      icon: <Users className='w-5 h-5 text-orange-500' />,
      sessions: otherSessions,
    },
    {
      id: 'all',
      title: t('auth.multiLogout.options.all.title'),
      description: t('auth.multiLogout.options.all.description'),
      icon: <Shield className='w-5 h-5 text-red-500' />,
      sessions: sessions,
    },
    {
      id: 'mobile',
      title: t('auth.multiLogout.options.mobile.title'),
      description: t('auth.multiLogout.options.mobile.description'),
      icon: <Smartphone className='w-5 h-5 text-green-500' />,
      sessions: mobileSessions,
    },
    {
      id: 'inactive',
      title: t('auth.multiLogout.options.inactive.title'),
      description: t('auth.multiLogout.options.inactive.description'),
      icon: <Clock className='w-5 h-5 text-gray-500' />,
      sessions: inactiveSessions,
    },
  ].filter((option) => option.sessions.length > 0)

  const handleOptionSelect = (optionId: string, _sessionIds: string[]) => {
    const newSelected = new Set(selectedOptions)
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId)
    } else {
      newSelected.add(optionId)
    }
    setSelectedOptions(newSelected)
  }

  const getSelectedSessions = () => {
    const selectedSessionIds = new Set<string>()

    selectedOptions.forEach((optionId) => {
      const option = logoutOptions.find((opt) => opt.id === optionId)
      if (option) {
        option.sessions.forEach((session) => {
          selectedSessionIds.add(session.id)
        })
      }
    })

    return sessions.filter((session) => selectedSessionIds.has(session.id))
  }

  const handleConfirmLogout = async () => {
    setStep('processing')
    setIsLoading(true)

    try {
      const selectedSessions = getSelectedSessions()
      const hasCurrentSession = selectedSessions.some((s) => s.isCurrent)

      if (selectedOptions.has('all')) {
        await terminateAllOtherSessions()
        await logout()
      } else {
        // Terminate selected sessions
        await Promise.all(selectedSessions.filter((s) => !s.isCurrent).map((session) => terminateSession(session.id)))

        // If current session is selected, logout
        if (hasCurrentSession) {
          await logout()
        }
      }

      setStep('success')

      // Auto-close after success
      setTimeout(() => {
        onClose?.()
      }, 2000)
    } catch (error) {
      console.error('Logout failed:', error)
      setStep('select')
    } finally {
      setIsLoading(false)
    }
  }

  const renderSelectStep = () => (
    <div className='space-y-6'>
      <div className='text-center space-y-2'>
        <div className='flex items-center justify-center space-x-2'>
          <LogOut className='w-8 h-8 text-primary' />
          <h2 className='text-2xl font-bold'>{t('auth.multiLogout.title')}</h2>
        </div>
        <p className='text-muted-foreground'>{t('auth.multiLogout.subtitle')}</p>
      </div>

      <Alert>
        <Shield className='h-4 w-4' />
        <AlertDescription>{t('auth.multiLogout.securityNote')}</AlertDescription>
      </Alert>

      <div className='space-y-3'>
        <h3 className='font-medium'>{t('auth.multiLogout.selectSessions')}</h3>
        {logoutOptions.map((option) => (
          <LogoutOption
            key={option.id}
            id={option.id}
            title={option.title}
            description={option.description}
            icon={option.icon}
            sessions={option.sessions}
            onSelect={handleOptionSelect}
            isSelected={selectedOptions.has(option.id)}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className='flex items-center justify-between pt-4'>
        <Button variant='outline' onClick={onClose} disabled={isLoading}>
          {t('common.cancel')}
        </Button>

        <Button onClick={() => setStep('confirm')} disabled={selectedOptions.size === 0 || isLoading}>
          {t('auth.multiLogout.continue')}
        </Button>
      </div>
    </div>
  )

  const renderConfirmStep = () => {
    const selectedSessions = getSelectedSessions()
    const hasCurrentSession = selectedSessions.some((s) => s.isCurrent)

    return (
      <div className='space-y-6'>
        <div className='text-center space-y-2'>
          <div className='flex items-center justify-center space-x-2'>
            <AlertTriangle className='w-8 h-8 text-orange-500' />
            <h2 className='text-2xl font-bold'>{t('auth.multiLogout.confirm.title')}</h2>
          </div>
          <p className='text-muted-foreground'>{t('auth.multiLogout.confirm.subtitle')}</p>
        </div>

        <Alert variant={hasCurrentSession ? 'destructive' : 'default'}>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            {hasCurrentSession
              ? t('auth.multiLogout.confirm.currentSessionWarning')
              : t('auth.multiLogout.confirm.otherSessionsWarning')}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className='text-sm'>{t('auth.multiLogout.confirm.sessionsToLogout')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              {selectedSessions.map((session) => (
                <div key={session.id} className='flex items-center space-x-3 p-2 border rounded'>
                  {session.deviceType === 'mobile' ? (
                    <Smartphone className='w-4 h-4' />
                  ) : session.deviceType === 'tablet' ? (
                    <Tablet className='w-4 h-4' />
                  ) : (
                    <Monitor className='w-4 h-4' />
                  )}
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-sm font-medium'>{session.deviceName}</span>
                      {session.isCurrent && (
                        <Badge variant='default' className='text-xs'>
                          {t('auth.sessions.current')}
                        </Badge>
                      )}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {session.browser} • {session.location.city}, {session.location.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='flex items-center justify-between pt-4'>
          <Button variant='outline' onClick={() => setStep('select')} disabled={isLoading}>
            {t('common.back')}
          </Button>

          <Button variant='destructive' onClick={handleConfirmLogout} disabled={isLoading}>
            {isLoading ? <LoadingSpinner size='sm' className='mr-2' /> : <LogOut className='w-4 h-4 mr-2' />}
            {t('auth.multiLogout.confirm.button', { count: selectedSessions.length })}
          </Button>
        </div>
      </div>
    )
  }

  const renderProcessingStep = () => (
    <div className='text-center space-y-6 py-12'>
      <LoadingSpinner size='lg' />
      <div className='space-y-2'>
        <h2 className='text-xl font-bold'>{t('auth.multiLogout.processing.title')}</h2>
        <p className='text-muted-foreground'>{t('auth.multiLogout.processing.subtitle')}</p>
      </div>
    </div>
  )

  const renderSuccessStep = () => (
    <div className='text-center space-y-6 py-12'>
      <div className='flex items-center justify-center space-x-2'>
        <CheckCircle2 className='w-12 h-12 text-green-500' />
      </div>
      <div className='space-y-2'>
        <h2 className='text-xl font-bold text-green-600'>{t('auth.multiLogout.success.title')}</h2>
        <p className='text-muted-foreground'>{t('auth.multiLogout.success.subtitle')}</p>
      </div>
    </div>
  )

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <Card>
        <CardContent className='p-6'>
          {step === 'select' && renderSelectStep()}
          {step === 'confirm' && renderConfirmStep()}
          {step === 'processing' && renderProcessingStep()}
          {step === 'success' && renderSuccessStep()}
        </CardContent>
      </Card>
    </div>
  )
}
