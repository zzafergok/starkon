'use client'

import React from 'react'

import { useTranslation } from 'react-i18next'
import { Settings, Code2, Palette, Zap, Rocket, Package, ArrowRight, Star, Github } from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Avatar, AvatarFallback } from '@/components/core/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { useAuth } from '@/hooks/useAuth'
import { logAuthDebug } from '@/utils/authDebug'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      // console.error('Logout failed:', error)
    }
  }

  const handleDebugAuth = () => {
    if (process.env.NODE_ENV === 'development') {
      logAuthDebug('Manual Debug - Dashboard')
    }
  }

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-center'>{t('pages.dashboard.userInfoNotLoaded')}</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Button onClick={handleLogout} variant='outline' className='w-full'>
              {t('auth.logout')}
            </Button>
            {process.env.NODE_ENV === 'development' && (
              <Button onClick={handleDebugAuth} variant='ghost' size='sm' className='w-full'>
                {t('pages.dashboard.debugAuthState')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const boilerplateFeatures = [
    {
      title: t('pages.dashboard.features.components'),
      description: t('pages.dashboard.features.componentsDesc'),
      count: '30+',
      icon: Palette,
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
      href: '/components',
    },
    {
      title: t('pages.dashboard.features.readyToUse'),
      description: t('pages.dashboard.features.readyToUseDesc'),
      count: '100%',
      icon: Zap,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      href: '/components',
    },
    {
      title: t('pages.dashboard.features.typescript'),
      description: t('pages.dashboard.features.typescriptDesc'),
      count: 'TS',
      icon: Code2,
      color: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      href: '/components',
    },
    {
      title: t('pages.dashboard.features.performance'),
      description: t('pages.dashboard.features.performanceDesc'),
      count: '⚡',
      icon: Rocket,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      href: '/components',
    },
  ]

  return (
    <div className='w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-4 lg:p-8 lg:h-full lg:overflow-hidden'>
      <div className='max-w-[1800px] mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:h-full'>
        {/* Left Column: Welcome & Stats */}
        <div className='flex flex-col justify-center gap-8 lg:h-full lg:overflow-y-auto lg:pr-2 lg:custom-scrollbar'>
          {/* Welcome Header */}
          <div className='text-left space-y-6'>
            <div className='inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/30'>
              <Package className='h-4 w-4 text-blue-600 dark:text-blue-400' />
              <span className='text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide uppercase'>
                {t('pages.dashboard.boilerplateProject')}
              </span>
            </div>

            <div className='space-y-4'>
              <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white leading-tight'>
                {t('pages.dashboard.welcomeToStarkon')}
              </h1>

              <p className='text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl'>
                {t('pages.dashboard.boilerplateDescription')}
              </p>
            </div>

            {/* User Badge */}
            <div className='inline-flex items-center gap-4 bg-white dark:bg-neutral-800 p-2 pr-6 rounded-full shadow-sm border border-neutral-200 dark:border-neutral-700'>
              <Avatar className='h-10 w-10 border-2 border-white dark:border-neutral-700'>
                <AvatarFallback className='bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold'>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='font-semibold text-sm text-neutral-900 dark:text-neutral-100 leading-none mb-1'>
                  {user.name || t('pages.dashboard.defaultUser')}
                </span>
                <span className='text-xs text-neutral-500 dark:text-neutral-400 leading-none'>{user.role}</span>
              </div>
            </div>
          </div>

          {/* Features Grid - Balanced */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {boilerplateFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className='group relative overflow-hidden bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'
                  onClick={() => (window.location.href = feature.href)}
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div className={`${feature.color} p-2.5 rounded-xl text-white shadow-inner`}>
                      <IconComponent className='h-5 w-5' />
                    </div>
                    <span className='bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-300 text-xs font-bold px-2.5 py-1 rounded-full'>
                      {feature.count}
                    </span>
                  </div>
                  <h3 className='font-bold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2'>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Installation Guide */}
        <div className='flex flex-col bg-white/50 dark:bg-neutral-800/30 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-neutral-700/50 lg:h-full lg:overflow-hidden'>
          <div className='p-6 lg:p-8 flex flex-col h-full'>
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h2 className='text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-3'>
                  <Rocket className='h-6 w-6 text-blue-600' />
                  {t('pages.dashboard.installationTitle')}
                </h2>
                <p className='text-neutral-500 dark:text-neutral-400 mt-1 ml-9'>
                  {t('pages.dashboard.installationDescription')}
                </p>
              </div>
              <Button
                onClick={() => (window.location.href = '/components')}
                variant='outline'
                className='hidden sm:flex border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-700'
              >
                {t('pages.dashboard.exploreComponents')} <ArrowRight className='h-4 w-4 ml-2' />
              </Button>
            </div>

            <div className='flex-1 space-y-4 lg:overflow-y-auto lg:custom-scrollbar lg:pr-2'>
              {/* Step 1 */}
              <div className='bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-100 dark:border-neutral-700/50 shadow-sm'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold border border-blue-100 dark:border-blue-800/30'>
                    1
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
                      {t('pages.dashboard.step1Title')}
                    </h4>
                    <div className='group relative bg-neutral-950 dark:bg-neutral-950 rounded-lg p-3 font-mono text-sm text-neutral-300'>
                      <span className='text-purple-400'>npx</span> starkon my-app
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className='bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-100 dark:border-neutral-700/50 shadow-sm'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center text-sm font-bold border border-purple-100 dark:border-purple-800/30'>
                    2
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
                      {t('pages.dashboard.step2Title')}
                    </h4>
                    <div className='group relative bg-neutral-950 dark:bg-neutral-950 rounded-lg p-3 font-mono text-sm text-neutral-300'>
                      <span className='text-blue-400'>cd</span> my-app && <span className='text-green-400'>npm</span>{' '}
                      run dev
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className='bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-100 dark:border-neutral-700/50 shadow-sm'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm font-bold border border-green-100 dark:border-green-800/30'>
                    3
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-1'>
                      {t('pages.dashboard.step3Title')}
                    </h4>
                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                      {t('pages.dashboard.step3Description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <div className='mt-6 pt-6 border-t border-neutral-200/50 dark:border-neutral-700/50 text-center'>
              <p className='text-xs text-neutral-400 dark:text-neutral-500'>{t('pages.dashboard.freeAndOpenSource')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
