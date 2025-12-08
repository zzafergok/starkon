'use client'

import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import {
  Eye,
  Zap,
  Key,
  User,
  Star,
  Bell,
  Save,
  Lock,
  Check,
  Shield,
  Trash2,
  EyeOff,
  Palette,
  Package,
  Download,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/core/dialog'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/core/alert-dialog'
import { Input } from '@/components/core/input'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Switch } from '@/components/core/switch'
import { Textarea } from '@/components/core/textarea'
import { Separator } from '@/components/core/separator'
import { Avatar, AvatarFallback } from '@/components/core/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs'
import { SettingsThemeSection } from '@/components/ui/theme/settings-theme-section'
import { SettingsLanguageSection } from '@/components/ui/language/settings-language-section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

import { useAuth } from '@/hooks/useAuth'

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  securityAlerts: boolean
  productUpdates: boolean
  weeklyDigest: boolean
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  showEmail: boolean
  showPhone: boolean
  allowIndexing: boolean
  dataProcessing: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  loginAlerts: boolean
  deviceTracking: boolean
}

export default function SettingsPage() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  // State management
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    username: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    website: '',
    location: '',
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    productUpdates: true,
    weeklyDigest: false,
  })

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowIndexing: true,
    dataProcessing: true,
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
    deviceTracking: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Utility functions
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  // Event handlers
  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const handleNotificationChange = (setting: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
    setHasUnsavedChanges(true)
  }

  const handlePrivacyChange = (setting: keyof PrivacySettings, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [setting]: value }))
    setHasUnsavedChanges(true)
  }

  const handleSecurityChange = (setting: keyof SecuritySettings, value: any) => {
    setSecuritySettings((prev) => ({ ...prev, [setting]: value }))
    setHasUnsavedChanges(true)
  }

  const handleSaveChanges = () => {
    console.log('Saving changes...')
    setHasUnsavedChanges(false)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(t('pages.settings.passwordDialog.mismatchError'))
      return
    }
    console.log('Changing password...')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setShowPasswordDialog(false)
  }

  const handleDeleteAccount = () => {
    console.log('Deleting account...')
    logout()
  }

  const handleExportData = () => {
    console.log('Exporting user data...')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800'>
      <div className='container mx-auto px-4 py-6 lg:py-8'>
        <div className='max-w-5xl mx-auto space-y-6 lg:space-y-8'>
          {/* Page Header */}
          <div className='text-center space-y-4'>
            <div className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 px-4 py-2 rounded-full border border-orange-200/50 dark:border-orange-800/50 mb-4'>
              <Package className='h-4 w-4 text-orange-600 dark:text-orange-400' />
              <span className='text-sm font-medium text-orange-700 dark:text-orange-300'>
                {t('pages.settings.boilerplateDemo')}
              </span>
            </div>
            <h1 className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent'>
              {t('pages.settings.title')}
            </h1>
            <p className='text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto'>
              {t('pages.settings.description')}
            </p>
            {hasUnsavedChanges && (
              <div className='inline-flex items-center gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 px-6 py-3 rounded-2xl border border-amber-200/50 dark:border-amber-800/50 shadow-lg'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></div>
                  <Badge
                    variant='outline'
                    className='text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/20 font-medium'
                  >
                    {t('pages.settings.unsavedChanges')}
                  </Badge>
                </div>
                <Button
                  onClick={handleSaveChanges}
                  className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg'
                >
                  <Save className='h-4 w-4 mr-2' />
                  {t('common.save')}
                </Button>
              </div>
            )}
          </div>

          {/* Settings Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-8'>
            <TabsList className='w-full h-auto p-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl grid grid-cols-2 sm:grid-cols-5 gap-2'>
              <TabsTrigger
                value='profile'
                className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl h-auto whitespace-nowrap transition-all hover:scale-105'
              >
                <User className='h-4 w-4 group-data-[state=active]:text-white' />
                <span>{t('pages.settings.tabs.profile')}</span>
              </TabsTrigger>

              <TabsTrigger
                value='notifications'
                className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl h-auto whitespace-nowrap transition-all hover:scale-105'
              >
                <Bell className='h-4 w-4 group-data-[state=active]:text-white' />
                <span className='hidden xs:block sm:hidden md:block'>{t('pages.settings.tabs.notifications')}</span>
                <span className='xs:hidden sm:block md:hidden'>{t('pages.settings.tabs.notificationsShort')}</span>
              </TabsTrigger>

              <TabsTrigger
                value='privacy'
                className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl h-auto whitespace-nowrap transition-all hover:scale-105'
              >
                <Shield className='h-4 w-4 group-data-[state=active]:text-white' />
                <span>{t('pages.settings.tabs.privacy')}</span>
              </TabsTrigger>

              <TabsTrigger
                value='appearance'
                className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl h-auto whitespace-nowrap transition-all hover:scale-105'
              >
                <Palette className='h-4 w-4 group-data-[state=active]:text-white' />
                <span>{t('pages.settings.tabs.appearance')}</span>
              </TabsTrigger>

              <TabsTrigger
                value='security'
                className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl h-auto whitespace-nowrap col-span-2 sm:col-span-1 transition-all hover:scale-105'
              >
                <Key className='h-4 w-4 group-data-[state=active]:text-white' />
                <span>{t('pages.settings.tabs.security')}</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value='profile' className='space-y-6'>
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none'></div>
                <div className='relative'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      <div className='p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg'>
                        <User className='h-5 w-5 text-white' />
                      </div>
                      <span>{t('pages.settings.profile.title')}</span>
                    </CardTitle>
                    <CardDescription>{t('pages.settings.profile.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Avatar Section */}
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                      <div className='relative group'>
                        <Avatar className='h-24 w-24 border-4 border-white dark:border-neutral-700 shadow-xl bg-gradient-to-br from-blue-500 to-purple-500'>
                          <AvatarFallback className='bg-transparent text-white text-3xl font-bold'>
                            {getInitials(profileData.name || 'U U')}
                          </AvatarFallback>
                        </Avatar>
                        <div className='absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg group-hover:scale-110 transition-transform'>
                          <Star className='h-3 w-3 text-white' />
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <div className='flex flex-col sm:flex-row gap-2'>
                          <Button
                            className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
                            size='sm'
                          >
                            <Zap className='h-4 w-4 mr-2' />
                            {t('pages.settings.profile.uploadPhoto')}
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20'
                          >
                            {t('pages.settings.profile.removePhoto')}
                          </Button>
                        </div>
                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                          {t('pages.settings.profile.photoRequirements')}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Profile Form */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          {t('pages.settings.profile.fullNameLabel')}
                        </label>
                        <Input
                          value={profileData.name}
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                          placeholder={t('pages.settings.profile.fullNamePlaceholder')}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          {t('pages.settings.profile.usernameLabel')}
                        </label>
                        <Input
                          value={profileData.username}
                          onChange={(e) => handleProfileChange('username', e.target.value)}
                          placeholder={t('pages.settings.profile.usernamePlaceholder')}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          {t('pages.settings.profile.emailLabel')}
                        </label>
                        <Input
                          type='email'
                          value={profileData.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          placeholder={t('pages.settings.profile.emailPlaceholder')}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          {t('pages.settings.profile.phoneLabel')}
                        </label>
                        <Input
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          placeholder={t('pages.settings.profile.phonePlaceholder')}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          {t('pages.settings.profile.websiteLabel')}
                        </label>
                        <Input
                          value={profileData.website}
                          onChange={(e) => handleProfileChange('website', e.target.value)}
                          placeholder={t('pages.settings.profile.websitePlaceholder')}
                        />
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                          {t('pages.settings.profile.locationLabel')}
                        </label>
                        <Input
                          value={profileData.location}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                          placeholder={t('pages.settings.profile.locationPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                        {t('pages.settings.profile.bioLabel')}
                      </label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        placeholder={t('pages.settings.profile.bioPlaceholder')}
                        className='resize-none'
                        rows={3}
                      />
                      <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                        {t('pages.settings.profile.bioNote')}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value='notifications' className='space-y-6'>
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 pointer-events-none'></div>
                <div className='relative'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      <div className='p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg'>
                        <Bell className='h-5 w-5 text-white' />
                      </div>
                      <span>{t('pages.settings.notifications.title')}</span>
                    </CardTitle>
                    <CardDescription>{t('pages.settings.notifications.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Email Notifications */}
                    <div className='space-y-4'>
                      <h3 className='font-medium text-neutral-900 dark:text-neutral-50'>
                        {t('pages.settings.notifications.emailNotifications')}
                      </h3>
                      <div className='space-y-3'>
                        {[
                          {
                            key: 'emailNotifications' as keyof NotificationSettings,
                            label: t('pages.settings.notifications.emailNotifications'),
                            description: t('pages.settings.notifications.emailNotificationsDesc'),
                          },
                          {
                            key: 'securityAlerts' as keyof NotificationSettings,
                            label: t('pages.settings.notifications.securityAlerts'),
                            description: t('pages.settings.notifications.securityAlertsDesc'),
                          },
                          {
                            key: 'productUpdates' as keyof NotificationSettings,
                            label: t('pages.settings.notifications.productUpdates'),
                            description: t('pages.settings.notifications.productUpdatesDesc'),
                          },
                          {
                            key: 'marketingEmails' as keyof NotificationSettings,
                            label: t('pages.settings.notifications.marketingEmails'),
                            description: t('pages.settings.notifications.marketingEmailsDesc'),
                          },
                          {
                            key: 'weeklyDigest' as keyof NotificationSettings,
                            label: t('pages.settings.notifications.weeklyDigest'),
                            description: t('pages.settings.notifications.weeklyDigestDesc'),
                          },
                        ].map((item) => (
                          <div key={item.key} className='flex items-center justify-between py-2'>
                            <div className='space-y-1'>
                              <div className='text-sm font-medium text-neutral-900 dark:text-neutral-50'>
                                {item.label}
                              </div>
                              <div className='text-xs text-neutral-600 dark:text-neutral-400'>{item.description}</div>
                            </div>
                            <Switch
                              checked={notificationSettings[item.key]}
                              onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Push Notifications */}
                    <div className='space-y-4'>
                      <h3 className='font-medium text-neutral-900 dark:text-neutral-50'>
                        {t('pages.settings.notifications.instantNotifications')}
                      </h3>
                      <div className='space-y-3'>
                        {[
                          {
                            key: 'pushNotifications' as keyof NotificationSettings,
                            label: t('pages.settings.notifications.pushNotifications'),
                            description: t('pages.settings.notifications.pushNotificationsDesc'),
                          },
                          {
                            key: 'smsNotifications' as keyof NotificationSettings,
                            label: t('pages.settings.notifications.smsNotifications'),
                            description: t('pages.settings.notifications.smsNotificationsDesc'),
                          },
                        ].map((item) => (
                          <div key={item.key} className='flex items-center justify-between py-2'>
                            <div className='space-y-1'>
                              <div className='text-sm font-medium text-neutral-900 dark:text-neutral-50'>
                                {item.label}
                              </div>
                              <div className='text-xs text-neutral-600 dark:text-neutral-400'>{item.description}</div>
                            </div>
                            <Switch
                              checked={notificationSettings[item.key]}
                              onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value='privacy' className='space-y-6'>
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-500/5 pointer-events-none'></div>
                <div className='relative'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      <div className='p-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg'>
                        <Shield className='h-5 w-5 text-white' />
                      </div>
                      <span>{t('pages.settings.privacy.title')}</span>
                    </CardTitle>
                    <CardDescription>{t('pages.settings.privacy.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Profile Visibility */}
                    <div className='space-y-3'>
                      <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                        {t('pages.settings.privacy.profileVisibilityLabel')}
                      </label>
                      <Select
                        value={privacySettings.profileVisibility}
                        onValueChange={(value: 'public' | 'private' | 'friends') =>
                          handlePrivacyChange('profileVisibility', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='public'>{t('pages.settings.privacy.profileVisibilityPublic')}</SelectItem>
                          <SelectItem value='friends'>
                            {t('pages.settings.privacy.profileVisibilityFriends')}
                          </SelectItem>
                          <SelectItem value='private'>
                            {t('pages.settings.privacy.profileVisibilityPrivate')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className='text-xs text-neutral-600 dark:text-neutral-400'>
                        {t('pages.settings.privacy.profileVisibilityDesc')}
                      </p>
                    </div>

                    <Separator />

                    {/* Data Export */}
                    <div className='space-y-4'>
                      <h3 className='font-medium text-neutral-900 dark:text-neutral-50'>
                        {t('pages.settings.privacy.dataManagement')}
                      </h3>
                      <div className='flex flex-col sm:flex-row gap-3'>
                        <Button variant='outline' onClick={handleExportData} className='flex items-center gap-2'>
                          <Download className='h-4 w-4' />
                          {t('pages.settings.privacy.downloadData')}
                        </Button>
                        <Button
                          variant='outline'
                          onClick={() => setShowDeleteDialog(true)}
                          className='flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/20'
                        >
                          <Trash2 className='h-4 w-4' />
                          {t('pages.settings.privacy.deleteAccount')}
                        </Button>
                      </div>
                      <p className='text-xs text-neutral-600 dark:text-neutral-400'>
                        {t('pages.settings.privacy.dataManagementDesc')}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value='security' className='space-y-6'>
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-yellow-500/5 pointer-events-none'></div>
                <div className='relative'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      <div className='p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg'>
                        <Key className='h-5 w-5 text-white' />
                      </div>
                      <span>{t('pages.settings.security.title')}</span>
                    </CardTitle>
                    <CardDescription>{t('pages.settings.security.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Password Section */}
                    <div className='space-y-4'>
                      <h3 className='font-medium text-neutral-900 dark:text-neutral-50'>
                        {t('pages.settings.security.passwordAndSession')}
                      </h3>
                      <div className='flex flex-col sm:flex-row gap-3'>
                        <Button
                          variant='outline'
                          onClick={() => setShowPasswordDialog(true)}
                          className='flex items-center gap-2'
                        >
                          <Lock className='h-4 w-4' />
                          {t('pages.settings.security.changePassword')}
                        </Button>
                        <Button variant='outline' className='flex items-center gap-2'>
                          <RefreshCw className='h-4 w-4' />
                          {t('pages.settings.security.endAllSessions')}
                        </Button>
                      </div>
                      <div className='text-xs text-neutral-600 dark:text-neutral-400 space-y-1'>
                        <p>• {t('pages.settings.security.lastPasswordChange')}</p>
                        <p>• {t('pages.settings.security.activeSessions')}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Two-Factor Authentication */}
                    <div className='space-y-4'>
                      <h3 className='font-medium text-neutral-900 dark:text-neutral-50'>
                        {t('pages.settings.security.twoFactorAuth')}
                      </h3>
                      <div className='flex items-center justify-between py-2'>
                        <div className='space-y-1'>
                          <div className='text-sm font-medium text-neutral-900 dark:text-neutral-50'>
                            {t('pages.settings.security.enable2FA')}
                          </div>
                          <div className='text-xs text-neutral-600 dark:text-neutral-400'>
                            {t('pages.settings.security.twoFactorDesc')}
                          </div>
                        </div>
                        <Switch
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                        />
                      </div>
                      {securitySettings.twoFactorAuth && (
                        <div className='p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg'>
                          <div className='flex items-center gap-2 text-green-800 dark:text-green-300'>
                            <Check className='h-4 w-4' />
                            <span className='text-sm font-medium'>{t('pages.settings.security.twoFactorActive')}</span>
                            <Badge variant='outline' className='text-xs'>
                              {t('pages.settings.security.twoFactorConfigured')}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value='appearance' className='space-y-6'>
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-pink-500/5 via-rose-500/5 to-red-500/5 pointer-events-none'></div>
                <div className='relative'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      <div className='p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg'>
                        <Palette className='h-5 w-5 text-white' />
                      </div>
                      <span>{t('pages.settings.appearance.title')}</span>
                    </CardTitle>
                    <CardDescription>{t('pages.settings.appearance.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Theme Selection */}
                    <SettingsThemeSection />

                    <Separator />

                    {/* Language Selection */}
                    <SettingsLanguageSection />

                    <Separator />

                    {/* Display Settings */}
                    <div className='space-y-4'>
                      <h3 className='font-medium text-neutral-900 dark:text-neutral-50'>
                        {t('pages.settings.appearance.displaySettings')}
                      </h3>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between py-2'>
                          <div className='space-y-1'>
                            <div className='text-sm font-medium text-neutral-900 dark:text-neutral-50'>
                              {t('pages.settings.appearance.compactMode')}
                            </div>
                            <div className='text-xs text-neutral-600 dark:text-neutral-400'>
                              {t('pages.settings.appearance.compactModeDesc')}
                            </div>
                          </div>
                          <Switch defaultChecked={false} />
                        </div>

                        <div className='flex items-center justify-between py-2'>
                          <div className='space-y-1'>
                            <div className='text-sm font-medium text-neutral-900 dark:text-neutral-50'>
                              {t('pages.settings.appearance.reduceAnimations')}
                            </div>
                            <div className='text-xs text-neutral-600 dark:text-neutral-400'>
                              {t('pages.settings.appearance.reduceAnimationsDesc')}
                            </div>
                          </div>
                          <Switch defaultChecked={false} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating Elements */}
      <div className='fixed top-20 left-10 opacity-20 dark:opacity-10 pointer-events-none'>
        <div className='w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl animate-pulse'></div>
      </div>
      <div className='fixed bottom-20 right-10 opacity-20 dark:opacity-10 pointer-events-none'>
        <div
          className='w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl animate-pulse'
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className='max-w-md p-6'>
          <DialogHeader>
            <DialogTitle>{t('pages.settings.passwordDialog.title')}</DialogTitle>
            <DialogDescription>{t('pages.settings.passwordDialog.description')}</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>{t('pages.settings.passwordDialog.currentPasswordLabel')}</label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder={t('pages.settings.passwordDialog.currentPasswordPlaceholder')}
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
                >
                  {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </Button>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>{t('pages.settings.passwordDialog.newPasswordLabel')}</label>
              <Input
                type='password'
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                placeholder={t('pages.settings.passwordDialog.newPasswordPlaceholder')}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>{t('pages.settings.passwordDialog.confirmPasswordLabel')}</label>
              <Input
                type='password'
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder={t('pages.settings.passwordDialog.confirmPasswordPlaceholder')}
              />
            </div>

            <div className='text-xs text-neutral-600 dark:text-neutral-400 space-y-1'>
              <p>{t('pages.settings.passwordDialog.passwordRequirements')}</p>
              <ul className='list-disc list-inside space-y-1 ml-2'>
                <li>{t('pages.settings.passwordDialog.requirement1')}</li>
                <li>{t('pages.settings.passwordDialog.requirement2')}</li>
                <li>{t('pages.settings.passwordDialog.requirement3')}</li>
                <li>{t('pages.settings.passwordDialog.requirement4')}</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setShowPasswordDialog(false)}>
              {t('pages.settings.passwordDialog.cancel')}
            </Button>
            <Button onClick={handlePasswordChange}>{t('pages.settings.passwordDialog.change')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center gap-2 text-red-600'>
              <AlertTriangle className='h-5 w-5' />
              {t('pages.settings.deleteDialog.title')}
            </AlertDialogTitle>
            <AlertDialogDescription className='space-y-2'>
              <p>{t('pages.settings.deleteDialog.warning')}</p>
              <ul className='list-disc list-inside space-y-1 text-sm'>
                <li>{t('pages.settings.deleteDialog.consequence1')}</li>
                <li>{t('pages.settings.deleteDialog.consequence2')}</li>
                <li>{t('pages.settings.deleteDialog.consequence3')}</li>
                <li>{t('pages.settings.deleteDialog.consequence4')}</li>
              </ul>
              <p className='text-red-600 dark:text-red-400 font-medium'>
                {t('pages.settings.deleteDialog.confirmation')}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('pages.settings.deleteDialog.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className='bg-red-600 hover:bg-red-700 text-white'>
              {t('pages.settings.deleteDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
