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
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800'>
      <div className='container mx-auto px-4 py-6 lg:py-8'>
        <div className='max-w-7xl mx-auto space-y-6 lg:space-y-8'>
          {/* Welcome Header */}
          <div className='text-center space-y-6'>
            <div className='relative'>
              <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                <div className='flex space-x-1'>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50 mb-4'>
                <Package className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>
                  {t('pages.dashboard.boilerplateProject')}
                </span>
              </div>
              <h1 className='text-4xl lg:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4'>
                {t('pages.dashboard.welcomeToStarkon')}
              </h1>
              <p className='text-neutral-600 dark:text-neutral-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed'>
                {t('pages.dashboard.boilerplateDescription')}
              </p>
            </div>

            {/* User Badge */}
            <div className='inline-flex items-center gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50'>
              <Avatar className='h-10 w-10'>
                <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold'>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className='text-left'>
                <p className='font-semibold text-neutral-900 dark:text-neutral-100'>
                  {user.name || t('pages.dashboard.defaultUser')}
                </p>
                <Badge variant='secondary' className='text-xs'>
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Boilerplate Features */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
            {boilerplateFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className='group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg cursor-pointer bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm'
                  onClick={() => (window.location.href = feature.href)}
                >
                  <CardContent className='p-6'>
                    <div className='text-center space-y-4'>
                      <div className='relative'>
                        <div
                          className={`${feature.color} p-4 rounded-2xl mx-auto w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <IconComponent className='h-6 w-6 text-white' />
                        </div>
                        <div className='absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse'>
                          {feature.count}
                        </div>
                      </div>
                      <div>
                        <h3 className='font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                          {feature.title}
                        </h3>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Installation Guide */}
          <Card className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-0 shadow-xl'>
            <CardContent className='p-8'>
              <div className='text-center mb-8'>
                <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold mb-4'>
                  <Rocket className='h-4 w-4' />
                  {t('pages.dashboard.getStarted')}
                </div>
                <h2 className='text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>
                  {t('pages.dashboard.installationTitle')}
                </h2>
                <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
                  {t('pages.dashboard.installationDescription')}
                </p>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Installation Steps */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2'>
                    <Code2 className='h-5 w-5 text-blue-600' />
                    {t('pages.dashboard.installationSteps')}
                  </h3>

                  <div className='space-y-4'>
                    <div className='flex items-start gap-4 p-4 bg-white/80 dark:bg-neutral-800/50 rounded-xl'>
                      <div className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
                        1
                      </div>
                      <div>
                        <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-1'>
                          {t('pages.dashboard.step1Title')}
                        </h4>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-2'>
                          {t('pages.dashboard.step1Description')}
                        </p>
                        <div className='bg-neutral-900 dark:bg-neutral-800 text-green-400 p-3 rounded-lg font-mono text-sm'>
                          npx starkon my-app
                        </div>
                      </div>
                    </div>

                    <div className='flex items-start gap-4 p-4 bg-white/80 dark:bg-neutral-800/50 rounded-xl'>
                      <div className='flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
                        2
                      </div>
                      <div>
                        <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-1'>
                          {t('pages.dashboard.step2Title')}
                        </h4>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-2'>
                          {t('pages.dashboard.step2Description')}
                        </p>
                        <div className='bg-neutral-900 dark:bg-neutral-800 text-green-400 p-3 rounded-lg font-mono text-sm'>
                          cd my-app && npm run dev
                        </div>
                      </div>
                    </div>

                    <div className='flex items-start gap-4 p-4 bg-white/80 dark:bg-neutral-800/50 rounded-xl'>
                      <div className='flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
                        3
                      </div>
                      <div>
                        <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 mb-1'>
                          {t('pages.dashboard.step3Title')}
                        </h4>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                          {t('pages.dashboard.step3Description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Preview */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2'>
                    <Star className='h-5 w-5 text-yellow-500' />
                    {t('pages.dashboard.whatYouGet')}
                  </h3>

                  <div className='space-y-4'>
                    {[
                      {
                        icon: Palette,
                        title: t('pages.dashboard.preview.components'),
                        desc: t('pages.dashboard.preview.componentsDesc'),
                      },
                      {
                        icon: Code2,
                        title: t('pages.dashboard.preview.typescript'),
                        desc: t('pages.dashboard.preview.typescriptDesc'),
                      },
                      {
                        icon: Zap,
                        title: t('pages.dashboard.preview.performance'),
                        desc: t('pages.dashboard.preview.performanceDesc'),
                      },
                      {
                        icon: Settings,
                        title: t('pages.dashboard.preview.authentication'),
                        desc: t('pages.dashboard.preview.authenticationDesc'),
                      },
                    ].map((item, index) => {
                      const IconComponent = item.icon
                      return (
                        <div
                          key={index}
                          className='flex items-center gap-4 p-4 bg-white/80 dark:bg-neutral-800/50 rounded-xl hover:shadow-lg transition-shadow'
                        >
                          <div className='flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center'>
                            <IconComponent className='h-5 w-5 text-white' />
                          </div>
                          <div>
                            <h4 className='font-semibold text-neutral-900 dark:text-neutral-100'>{item.title}</h4>
                            <p className='text-sm text-neutral-600 dark:text-neutral-400'>{item.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className='mt-8 text-center space-y-4'>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button
                    onClick={() => (window.location.href = '/components')}
                    className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg'
                    size='lg'
                  >
                    <Palette className='h-5 w-5 mr-2' />
                    {t('pages.dashboard.exploreComponents')}
                    <ArrowRight className='h-4 w-4 ml-2' />
                  </Button>
                  <Button
                    onClick={() => window.open('https://github.com/your-repo/starkon-template', '_blank')}
                    variant='outline'
                    className='border-2 border-neutral-300 dark:border-neutral-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-3 rounded-xl font-semibold'
                    size='lg'
                  >
                    <Github className='h-5 w-5 mr-2' />
                    {t('pages.dashboard.viewOnGithub')}
                  </Button>
                </div>
                <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                  {t('pages.dashboard.freeAndOpenSource')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Elements */}
      <div className='fixed top-20 left-10 opacity-20 dark:opacity-10'>
        <div className='w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse'></div>
      </div>
      <div className='fixed bottom-20 right-10 opacity-20 dark:opacity-10'>
        <div
          className='w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl animate-pulse'
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
    </div>
  )
}
