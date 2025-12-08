'use client'

import { useState } from 'react'

import {
  X,
  Key,
  Wifi,
  Clock,
  Shield,
  MapPin,
  Monitor,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  MoreHorizontal,
} from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Switch } from '@/components/core/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/core/dropdown'

import { cn } from '@/lib/utils'

interface Session {
  id: string
  device: string
  browser: string
  os: string
  location: string
  ip: string
  lastActive: string
  current: boolean
  trusted: boolean
}

interface LoginAttempt {
  id: string
  timestamp: string
  location: string
  ip: string
  success: boolean
  device: string
}

export function SecuritySessions() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loginNotifications, setLoginNotifications] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with real data
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'MacBook Pro',
      browser: 'Chrome 119',
      os: 'macOS',
      location: 'İstanbul, TR',
      ip: '185.xxx.xxx.xxx',
      lastActive: 'Şu an aktif',
      current: true,
      trusted: true,
    },
    {
      id: '2',
      device: 'iPhone 15',
      browser: 'Safari',
      os: 'iOS 17',
      location: 'İstanbul, TR',
      ip: '185.xxx.xxx.xxx',
      lastActive: '2 saat önce',
      current: false,
      trusted: true,
    },
    {
      id: '3',
      device: 'Windows PC',
      browser: 'Firefox 118',
      os: 'Windows 11',
      location: 'Ankara, TR',
      ip: '212.xxx.xxx.xxx',
      lastActive: '1 gün önce',
      current: false,
      trusted: false,
    },
  ])

  const loginHistory: LoginAttempt[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30',
      location: 'İstanbul, TR',
      ip: '185.xxx.xxx.xxx',
      success: true,
      device: 'MacBook Pro',
    },
    {
      id: '2',
      timestamp: '2024-01-15 09:15',
      location: 'İstanbul, TR',
      ip: '185.xxx.xxx.xxx',
      success: true,
      device: 'iPhone 15',
    },
    {
      id: '3',
      timestamp: '2024-01-14 22:45',
      location: 'Ankara, TR',
      ip: '212.xxx.xxx.xxx',
      success: false,
      device: 'Unknown Device',
    },
    {
      id: '4',
      timestamp: '2024-01-14 18:20',
      location: 'İstanbul, TR',
      ip: '185.xxx.xxx.xxx',
      success: true,
      device: 'MacBook Pro',
    },
  ]

  const terminateSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId))
  }

  const terminateAllOtherSessions = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSessions((prev) => prev.filter((session) => session.current))
    } finally {
      setIsLoading(false)
    }
  }

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <Smartphone className='w-4 h-4' />
    }
    return <Monitor className='w-4 h-4' />
  }

  return (
    <div className='space-y-6'>
      {/* Security Overview */}
      <Card className='relative overflow-hidden'>
        {/* Animated Background */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-4 right-4 w-24 h-24 border border-green-500/10 rounded-full animate-pulse' />
          <div className='absolute bottom-4 left-4 w-32 h-32 border border-blue-500/5 rounded-full animate-spin-slow' />
        </div>

        <CardHeader className='relative z-10'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-green-500/10 rounded-lg'>
              <Shield className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <CardTitle>Güvenlik Durumu</CardTitle>
              <CardDescription>Hesabınızın güvenlik ayarları</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-4 relative z-10'>
          {/* Security Status */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <CheckCircle2 className='w-4 h-4 text-green-600' />
                <span className='text-sm font-medium text-green-700 dark:text-green-400'>Güvenli</span>
              </div>
              <p className='text-xs text-green-600 dark:text-green-400'>Güçlü şifre kullanılıyor</p>
            </div>

            <div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <AlertTriangle className='w-4 h-4 text-yellow-600' />
                <span className='text-sm font-medium text-yellow-700 dark:text-yellow-400'>Uyarı</span>
              </div>
              <p className='text-xs text-yellow-600 dark:text-yellow-400'>2FA etkinleştirilmedi</p>
            </div>

            <div className='p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <Wifi className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium text-blue-700 dark:text-blue-400'>Aktif</span>
              </div>
              <p className='text-xs text-blue-600 dark:text-blue-400'>{sessions.length} cihaz bağlı</p>
            </div>
          </div>

          {/* Security Settings */}
          <div className='space-y-4 pt-4 border-t border-border/50'>
            <div className='flex items-center justify-between p-3 bg-muted/30 rounded-lg'>
              <div className='flex items-center gap-3'>
                <Key className='w-4 h-4 text-primary' />
                <div>
                  <Label className='text-sm font-medium'>İki Faktörlü Doğrulama (2FA)</Label>
                  <p className='text-xs text-muted-foreground'>Ekstra güvenlik katmanı</p>
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                className='data-[state=checked]:bg-green-500'
              />
            </div>

            <div className='flex items-center justify-between p-3 bg-muted/30 rounded-lg'>
              <div className='flex items-center gap-3'>
                <Shield className='w-4 h-4 text-primary' />
                <div>
                  <Label className='text-sm font-medium'>Giriş Bildirimleri</Label>
                  <p className='text-xs text-muted-foreground'>Yeni giriş denemelerinde bildirim al</p>
                </div>
              </div>
              <Switch
                checked={loginNotifications}
                onCheckedChange={setLoginNotifications}
                className='data-[state=checked]:bg-primary'
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className='relative overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-0 right-0 w-40 h-40 border border-primary/5 rounded-full animate-spin-slow' />
        </div>

        <CardHeader className='relative z-10'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <Monitor className='w-5 h-5 text-primary' />
              </div>
              <div>
                <CardTitle>Aktif Oturumlar</CardTitle>
                <CardDescription>Hesabınıza bağlı cihazlar</CardDescription>
              </div>
            </div>

            <Button
              onClick={terminateAllOtherSessions}
              disabled={isLoading || sessions.filter((s) => !s.current).length === 0}
              variant='outline'
              size='sm'
              className='hover:bg-red-50 hover:text-red-600 hover:border-red-200'
            >
              {isLoading ? (
                <div className='w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin' />
              ) : (
                'Diğerlerini Sonlandır'
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className='space-y-3 relative z-10'>
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className={cn(
                'p-4 border rounded-lg transition-all duration-200 hover:shadow-sm animate-in slide-in-from-left',
                session.current
                  ? 'border-green-200 bg-green-50/50 dark:bg-green-900/10'
                  : 'border-border bg-background',
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-3 flex-1'>
                  <div className={cn('p-2 rounded-lg', session.current ? 'bg-green-100 text-green-600' : 'bg-muted')}>
                    {getDeviceIcon(session.device)}
                  </div>

                  <div className='space-y-1 flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium text-sm'>{session.device}</span>
                      {session.current && (
                        <Badge variant='secondary' className='bg-green-100 text-green-700 text-xs'>
                          Mevcut
                        </Badge>
                      )}
                      {session.trusted && (
                        <Badge variant='outline' className='text-xs'>
                          Güvenilir
                        </Badge>
                      )}
                    </div>

                    <div className='space-y-1 text-xs text-muted-foreground'>
                      <div className='flex items-center gap-4'>
                        <span>
                          {session.browser} • {session.os}
                        </span>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-1'>
                          <MapPin className='w-3 h-3' />
                          {session.location}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='w-3 h-3' />
                          {session.lastActive}
                        </div>
                      </div>
                      <div className='text-xs text-muted-foreground/70'>IP: {session.ip}</div>
                    </div>
                  </div>
                </div>

                {!session.current && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                        <MoreHorizontal className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        onClick={() => terminateSession(session.id)}
                        className='text-red-600 focus:text-red-600'
                      >
                        <X className='w-4 h-4 mr-2' />
                        Oturumu Sonlandır
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Login History */}
      <Card>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-secondary/10 rounded-lg'>
              <Clock className='w-5 h-5 text-secondary-foreground' />
            </div>
            <div>
              <CardTitle>Giriş Geçmişi</CardTitle>
              <CardDescription>Son giriş denemeleriniz</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {loginHistory.map((attempt, index) => (
              <div
                key={attempt.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border transition-all duration-200 animate-in slide-in-from-bottom',
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={cn(
                      'p-1.5 rounded-full',
                      attempt.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                    )}
                  >
                    {attempt.success ? <CheckCircle2 className='w-3 h-3' /> : <X className='w-3 h-3' />}
                  </div>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-sm'>
                      <span className='font-medium'>{attempt.device}</span>
                      <Badge variant={attempt.success ? 'secondary' : 'destructive'} className='text-xs'>
                        {attempt.success ? 'Başarılı' : 'Başarısız'}
                      </Badge>
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      {attempt.timestamp} • {attempt.location} • {attempt.ip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
