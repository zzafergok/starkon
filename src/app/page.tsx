'use client'

import Link from 'next/link'

import { Zap, Shield, Code, Users, Activity, Settings } from 'lucide-react'

import { useLocale } from '@/hooks/useLocale'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

import { Suspense } from 'react'

import { LoadingSpinner } from '@/components/core/loading-spinner'

function HomeContent() {
  const { t, isMounted } = useLocale()

  if (!isMounted) {
    return null
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <Badge className='mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
            {t('homepage.welcome')}
          </Badge>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>{t('homepage.title')}</h1>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>{t('homepage.description')}</p>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Users className='h-5 w-5 mr-2' />
                {t('homepage.authentication.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>{t('homepage.authentication.description')}</p>
              <div className='flex gap-2'>
                <Link href='/login'>
                  <Button variant='outline' size='sm'>
                    {t('homepage.authentication.loginButton')}
                  </Button>
                </Link>
                <Link href='/register'>
                  <Button variant='outline' size='sm'>
                    {t('homepage.authentication.registerButton')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Code className='h-5 w-5 mr-2' />
                {t('homepage.components.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>{t('homepage.components.description')}</p>
              <Link href='/components'>
                <Button variant='outline' size='sm'>
                  {t('homepage.components.viewButton')}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Activity className='h-5 w-5 mr-2' />
                {t('homepage.dashboard.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>{t('homepage.dashboard.description')}</p>
              <Link href='/dashboard'>
                <Button variant='outline' size='sm'>
                  {t('homepage.dashboard.goButton')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='text-center p-6'>
            <Zap className='h-12 w-12 text-blue-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>{t('homepage.features.nextjs.title')}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{t('homepage.features.nextjs.description')}</p>
          </div>

          <div className='text-center p-6'>
            <Shield className='h-12 w-12 text-green-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>{t('homepage.features.typescript.title')}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{t('homepage.features.typescript.description')}</p>
          </div>

          <div className='text-center p-6'>
            <Code className='h-12 w-12 text-purple-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>{t('homepage.features.components.title')}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{t('homepage.features.components.description')}</p>
          </div>

          <div className='text-center p-6'>
            <Settings className='h-12 w-12 text-orange-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>{t('homepage.features.deploy.title')}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>{t('homepage.features.deploy.description')}</p>
          </div>
        </div>

        {/* Getting Started */}
        <div className='mt-16 text-center'>
          <Card className='max-w-2xl mx-auto'>
            <CardContent className='p-8'>
              <h3 className='text-2xl font-bold mb-4'>{t('homepage.getStarted.title')}</h3>
              <p className='text-gray-600 dark:text-gray-300 mb-6'>{t('homepage.getStarted.description')}</p>
              <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6'>
                <code className='text-sm'>{t('homepage.getStarted.cliCommand')}</code>
              </div>
              <div className='flex gap-4 justify-center'>
                <Link href='/components'>
                  <Button>{t('homepage.getStarted.exploreButton')}</Button>
                </Link>
                <Link href='/dashboard'>
                  <Button variant='outline'>{t('homepage.getStarted.dashboardButton')}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-full items-center justify-center'>
          <LoadingSpinner size='lg' />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}
