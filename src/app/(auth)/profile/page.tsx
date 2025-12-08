'use client'

import React, { useState } from 'react'

import {
  X,
  Zap,
  User,
  Mail,
  Save,
  Bell,
  Star,
  Edit3,
  Phone,
  Globe,
  Award,
  Camera,
  Shield,
  MapPin,
  Github,
  Twitter,
  Package,
  Calendar,
  Settings,
  Linkedin,
  Briefcase,
  TrendingUp,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Textarea } from '@/components/core/textarea'
import { Separator } from '@/components/core/separator'
import { Avatar, AvatarFallback } from '@/components/core/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const { user } = useAuth()
  const { t } = useTranslation()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    location: '',
    phone: '',
    company: '',
    website: '',
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Mock save - in real app would call API
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      location: '',
      phone: '',
      company: '',
      website: '',
    })
  }

  const profileStats = [
    {
      label: t('pages.profile.stats.projectsCompleted'),
      value: '12',
      icon: Award,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      label: t('pages.profile.stats.totalHours'),
      value: '240h',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
    {
      label: t('pages.profile.stats.teamMembers'),
      value: '8',
      icon: User,
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
    {
      label: t('pages.profile.stats.achievements'),
      value: '5',
      icon: Star,
      color: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
  ]

  const quickActions = [
    {
      label: t('pages.profile.actions.editProfile'),
      description: t('pages.profile.actions.editProfileDesc'),
      icon: Edit3,
      action: handleEdit,
    },
    {
      label: t('pages.profile.actions.security'),
      description: t('pages.profile.actions.securityDesc'),
      icon: Shield,
      action: () => {},
    },
    {
      label: t('pages.profile.actions.notifications'),
      description: t('pages.profile.actions.notificationsDesc'),
      icon: Bell,
      action: () => {},
    },
    {
      label: t('pages.profile.actions.preferences'),
      description: t('pages.profile.actions.preferencesDesc'),
      icon: Settings,
      action: () => {},
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800'>
      <div className='container mx-auto px-4 py-6 lg:py-8'>
        <div className='max-w-6xl mx-auto space-y-6 lg:space-y-8'>
          {/* Header */}
          <div className='text-center space-y-4'>
            <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50 mb-4'>
              <Package className='h-4 w-4 text-blue-600 dark:text-blue-400' />
              <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>
                {t('pages.profile.boilerplateDemo')}
              </span>
            </div>
            <h1 className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent'>
              {t('pages.profile.title')}
            </h1>
            <p className='text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto'>
              {t('pages.profile.description')}
            </p>
          </div>

          {/* Profile Card */}
          <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden'>
            <div className='relative'>
              {/* Cover Photo */}
              <div className='h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden'>
                <div className='absolute inset-0 bg-black/20'></div>

                {/* Floating Elements */}
                <div className='absolute top-8 left-12 w-12 h-12 bg-white/20 rounded-full blur-sm animate-pulse'></div>
                <div
                  className='absolute bottom-12 right-20 w-8 h-8 bg-white/30 rounded-full blur-sm animate-pulse'
                  style={{ animationDelay: '1s' }}
                ></div>
              </div>

              {/* Profile Info */}
              <CardContent className='relative p-6 pt-0'>
                <div className='flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16'>
                  {/* Avatar */}
                  <div className='relative group'>
                    <Avatar className='h-32 w-32 border-4 border-white dark:border-neutral-800 shadow-xl bg-gradient-to-br from-blue-500 to-purple-600'>
                      <AvatarFallback className='text-white text-3xl font-bold bg-transparent'>
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size='sm'
                      className='absolute bottom-2 right-2 rounded-full h-8 w-8 p-0 bg-white hover:bg-gray-50 text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <Camera className='h-4 w-4' />
                    </Button>
                  </div>

                  {/* User Info */}
                  <div className='flex-1 space-y-4'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                      <div>
                        <h2 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2'>
                          {isEditing ? (
                            <Input
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className='text-2xl font-bold border-2 border-dashed'
                            />
                          ) : (
                            <>
                              {user?.name || t('user.defaultName')}
                              <Badge variant='secondary' className='text-xs'>
                                {user?.role}
                              </Badge>
                            </>
                          )}
                        </h2>
                        <div className='flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mt-2'>
                          <div className='flex items-center gap-1'>
                            <Mail className='h-4 w-4' />
                            {isEditing ? (
                              <Input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className='text-sm h-8'
                              />
                            ) : (
                              user?.email
                            )}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-4 w-4' />
                            {t('pages.profile.joinedDate', { date: 'Jan 2024' })}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex gap-2'>
                        {isEditing ? (
                          <>
                            <Button onClick={handleSave} size='sm' className='bg-green-600 hover:bg-green-700'>
                              <Save className='h-4 w-4 mr-1' />
                              {t('common.save')}
                            </Button>
                            <Button onClick={handleCancel} size='sm' variant='outline'>
                              <X className='h-4 w-4 mr-1' />
                              {t('common.cancel')}
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={handleEdit}
                            size='sm'
                            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          >
                            <Edit3 className='h-4 w-4 mr-1' />
                            {t('pages.profile.editProfile')}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      {isEditing ? (
                        <div className='space-y-2'>
                          <Label>{t('pages.profile.bio')}</Label>
                          <Textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder={t('pages.profile.bioPlaceholder')}
                            className='resize-none'
                            rows={3}
                          />
                        </div>
                      ) : (
                        <p className='text-neutral-700 dark:text-neutral-300 max-w-2xl'>
                          {formData.bio || t('pages.profile.defaultBio')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
            {/* Stats */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Profile Stats */}
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-lg'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <TrendingUp className='h-5 w-5 text-blue-600' />
                    {t('pages.profile.stats.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {profileStats.map((stat, index) => {
                      const IconComponent = stat.icon
                      return (
                        <div key={index} className='text-center group hover:scale-105 transition-transform'>
                          <div
                            className={`${stat.color} p-4 rounded-2xl mx-auto w-fit mb-3 group-hover:shadow-lg transition-shadow`}
                          >
                            <IconComponent className='h-6 w-6 text-white' />
                          </div>
                          <div className='text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1'>
                            {stat.value}
                          </div>
                          <div className='text-sm text-neutral-600 dark:text-neutral-400'>{stat.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-lg'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <User className='h-5 w-5 text-green-600' />
                    {t('pages.profile.details.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                      <div className='flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50'>
                        <MapPin className='h-5 w-5 text-neutral-500' />
                        <div>
                          <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                            {t('pages.profile.location')}
                          </div>
                          {isEditing ? (
                            <Input
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              placeholder={t('pages.profile.locationPlaceholder')}
                              className='h-7 text-sm'
                            />
                          ) : (
                            <div className='font-medium'>{formData.location || t('pages.profile.notSpecified')}</div>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50'>
                        <Phone className='h-5 w-5 text-neutral-500' />
                        <div>
                          <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                            {t('pages.profile.phone')}
                          </div>
                          {isEditing ? (
                            <Input
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder={t('pages.profile.phonePlaceholder')}
                              className='h-7 text-sm'
                            />
                          ) : (
                            <div className='font-medium'>{formData.phone || t('pages.profile.notSpecified')}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div className='flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50'>
                        <Briefcase className='h-5 w-5 text-neutral-500' />
                        <div>
                          <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                            {t('pages.profile.company')}
                          </div>
                          {isEditing ? (
                            <Input
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder={t('pages.profile.companyPlaceholder')}
                              className='h-7 text-sm'
                            />
                          ) : (
                            <div className='font-medium'>{formData.company || t('pages.profile.notSpecified')}</div>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50'>
                        <Globe className='h-5 w-5 text-neutral-500' />
                        <div>
                          <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                            {t('pages.profile.website')}
                          </div>
                          {isEditing ? (
                            <Input
                              value={formData.website}
                              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                              placeholder={t('pages.profile.websitePlaceholder')}
                              className='h-7 text-sm'
                            />
                          ) : (
                            <div className='font-medium'>{formData.website || t('pages.profile.notSpecified')}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <Separator />
                  <div>
                    <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
                      {t('pages.profile.socialLinks')}
                    </h4>
                    <div className='flex gap-3'>
                      <Button size='sm' variant='outline' className='flex items-center gap-2'>
                        <Github className='h-4 w-4' />
                        GitHub
                      </Button>
                      <Button size='sm' variant='outline' className='flex items-center gap-2'>
                        <Twitter className='h-4 w-4' />
                        Twitter
                      </Button>
                      <Button size='sm' variant='outline' className='flex items-center gap-2'>
                        <Linkedin className='h-4 w-4' />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className='space-y-6'>
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-lg'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Zap className='h-5 w-5 text-yellow-600' />
                    {t('pages.profile.quickActions')}
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className='w-full p-3 text-left rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors group'
                      >
                        <div className='flex items-start gap-3'>
                          <div className='p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform'>
                            <IconComponent className='h-4 w-4 text-white' />
                          </div>
                          <div className='flex-1'>
                            <div className='font-medium text-neutral-900 dark:text-neutral-100 mb-1'>
                              {action.label}
                            </div>
                            <div className='text-sm text-neutral-600 dark:text-neutral-400'>{action.description}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-lg'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Star className='h-5 w-5 text-purple-600' />
                    {t('pages.profile.recentActivity')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3 text-sm'>
                    <div className='flex items-center gap-3 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700/30'>
                      <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                      <span>{t('pages.profile.activities.profileUpdated')}</span>
                    </div>
                    <div className='flex items-center gap-3 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700/30'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <span>{t('pages.profile.activities.loginSuccess')}</span>
                    </div>
                    <div className='flex items-center gap-3 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700/30'>
                      <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                      <span>{t('pages.profile.activities.passwordChanged')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className='fixed top-32 left-8 opacity-20 dark:opacity-10 pointer-events-none'>
        <div className='w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl animate-pulse'></div>
      </div>
      <div className='fixed bottom-32 right-12 opacity-20 dark:opacity-10 pointer-events-none'>
        <div
          className='w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-2xl animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>
    </div>
  )
}
