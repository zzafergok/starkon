'use client'

import React, { useState } from 'react'
import { Bell, Mail, MessageSquare, Smartphone, Volume2, VolumeX } from 'lucide-react'

import { Label } from '@/components/core/label'
import { Switch } from '@/components/core/switch'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

import { cn } from '@/lib/utils'

interface NotificationSetting {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  enabled: boolean
  category: 'email' | 'push' | 'desktop' | 'mobile'
}

export function NotificationPreferences() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'task-assigned',
      title: 'Task Ataması',
      description: 'Size yeni bir task atandığında bildirim al',
      icon: <MessageSquare className='w-4 h-4' />,
      enabled: true,
      category: 'email',
    },
    {
      id: 'project-updates',
      title: 'Proje Güncellemeleri',
      description: 'Projelerinizdeki değişiklikler hakkında bilgilendirilme',
      icon: <Bell className='w-4 h-4' />,
      enabled: true,
      category: 'push',
    },
    {
      id: 'comments',
      title: 'Yorumlar',
      description: 'Tasklerinize yapılan yorumlar için bildirim',
      icon: <MessageSquare className='w-4 h-4' />,
      enabled: false,
      category: 'email',
    },
    {
      id: 'deadlines',
      title: 'Teslim Tarihleri',
      description: 'Yaklaşan teslim tarihleri için hatırlatma',
      icon: <Bell className='w-4 h-4' />,
      enabled: true,
      category: 'desktop',
    },
    {
      id: 'team-mentions',
      title: 'Takım Etiketlemeleri',
      description: 'Siz etiketlendiğinizde bildirim al',
      icon: <MessageSquare className='w-4 h-4' />,
      enabled: true,
      category: 'mobile',
    },
    {
      id: 'status-changes',
      title: 'Durum Değişiklikleri',
      description: 'Task durumu değişikliklerinde bilgilendirilme',
      icon: <Bell className='w-4 h-4' />,
      enabled: false,
      category: 'push',
    },
  ])

  const [masterVolume, setMasterVolume] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      email: <Mail className='w-4 h-4' />,
      push: <Smartphone className='w-4 h-4' />,
      desktop: <Bell className='w-4 h-4' />,
      mobile: <Smartphone className='w-4 h-4' />,
    }
    return icons[category as keyof typeof icons]
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      email: 'bg-blue-500',
      push: 'bg-green-500',
      desktop: 'bg-purple-500',
      mobile: 'bg-orange-500',
    }
    return colors[category as keyof typeof colors]
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // API call to save notification preferences
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } finally {
      setIsSaving(false)
    }
  }

  const groupedSettings = settings.reduce(
    (acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = []
      }
      acc[setting.category].push(setting)
      return acc
    },
    {} as Record<string, NotificationSetting[]>,
  )

  return (
    <Card className='relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-4 right-4 w-32 h-32 border border-primary/5 rounded-full animate-spin-slow' />
        <div className='absolute bottom-4 left-4 w-24 h-24 border border-secondary/5 rounded-full animate-pulse' />
        <div className='absolute top-1/2 left-1/2 w-16 h-16 border border-accent/5 rounded-full animate-bounce' />
      </div>

      <CardHeader className='relative z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Bell className='w-5 h-5 text-primary' />
            </div>
            <div>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>Hangi bildirimleri almak istediğinizi seçin</CardDescription>
            </div>
          </div>

          {/* Master Volume Control */}
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setMasterVolume(!masterVolume)}
              className={cn(
                'p-2 rounded-lg transition-all duration-200 hover:scale-110',
                masterVolume ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
              )}
            >
              {masterVolume ? <Volume2 className='w-5 h-5' /> : <VolumeX className='w-5 h-5' />}
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-6 relative z-10'>
        {/* Global Toggle */}
        <div className='p-4 bg-muted/30 rounded-lg border border-border/50'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <Label className='text-base font-medium'>Tüm Bildirimler</Label>
              <p className='text-sm text-muted-foreground'>
                {masterVolume ? 'Bildirimler aktif' : 'Tüm bildirimler kapalı'}
              </p>
            </div>
            <Switch
              checked={masterVolume}
              onCheckedChange={setMasterVolume}
              className='data-[state=checked]:bg-primary'
            />
          </div>
        </div>

        {/* Notification Categories */}
        <div className='space-y-6'>
          {Object.entries(groupedSettings).map(([category, categorySettings], categoryIndex) => (
            <div
              key={category}
              className={cn(
                'space-y-4 animate-in slide-in-from-bottom duration-300',
                !masterVolume && 'opacity-50 pointer-events-none',
              )}
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className='flex items-center gap-2'>
                <div className={cn('p-1.5 rounded text-white text-xs', getCategoryColor(category))}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className='font-medium text-foreground capitalize'>
                  {category === 'email' && 'E-posta'}
                  {category === 'push' && 'Anlık Bildirim'}
                  {category === 'desktop' && 'Masaüstü'}
                  {category === 'mobile' && 'Mobil'}
                </h3>
              </div>

              <div className='grid gap-3'>
                {categorySettings.map((setting, settingIndex) => (
                  <div
                    key={setting.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg bg-background border border-border/50 hover:border-border hover:shadow-sm transition-all duration-200 animate-in slide-in-from-left',
                    )}
                    style={{ animationDelay: `${categoryIndex * 100 + settingIndex * 50}ms` }}
                  >
                    <div className='flex items-start gap-3 flex-1'>
                      <div className={cn('p-1.5 rounded-lg mt-0.5', getCategoryColor(category), 'text-white')}>
                        {setting.icon}
                      </div>
                      <div className='space-y-1 flex-1'>
                        <Label className='text-sm font-medium cursor-pointer' htmlFor={setting.id}>
                          {setting.title}
                        </Label>
                        <p className='text-xs text-muted-foreground leading-relaxed'>{setting.description}</p>
                      </div>
                    </div>

                    <Switch
                      id={setting.id}
                      checked={setting.enabled && masterVolume}
                      onCheckedChange={() => toggleSetting(setting.id)}
                      disabled={!masterVolume}
                      className='data-[state=checked]:bg-primary flex-shrink-0'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className='pt-4 border-t border-border/50'>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className='w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
          >
            {isSaving ? (
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                Kaydediliyor...
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Bell className='w-4 h-4' />
                Ayarları Kaydet
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
