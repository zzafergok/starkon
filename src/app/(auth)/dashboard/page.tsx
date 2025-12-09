'use client'

import { Link } from '@/components/core/link'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Zap, Cpu, Star, Copy, Code2, Check, Rocket, Shield, Layout, Terminal, ChevronRight } from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Avatar, AvatarFallback } from '@/components/core/avatar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/core/card'

import { useAuth } from '@/hooks/useAuth'

import { logAuthDebug } from '@/utils/authDebug'

import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(null), 2000)
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

  const features = [
    {
      icon: Layout,
      title: t('pages.dashboard.features.components'),
      desc: t('pages.dashboard.features.componentsDesc'),
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-100 dark:border-blue-800/30',
    },
    {
      icon: Zap,
      title: t('pages.dashboard.features.readyToUse'),
      desc: t('pages.dashboard.features.readyToUseDesc'),
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-100 dark:border-amber-800/30',
    },
    {
      icon: Code2,
      title: t('pages.dashboard.features.typescript'),
      desc: t('pages.dashboard.features.typescriptDesc'),
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-100 dark:border-blue-800/30',
    },
    {
      icon: Cpu,
      title: t('pages.dashboard.features.performance'),
      desc: t('pages.dashboard.features.performanceDesc'),
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-100 dark:border-emerald-800/30',
    },
  ]

  return (
    <div className='w-full p-4 lg:p-8 space-y-8 animate-fade-in'>
      {/* Hero Section */}
      <section className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-2xl'>
        <div className='absolute inset-0 bg-[url("/grid.svg")] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20'></div>
        <div className='relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8'>
          <div className='space-y-6 max-w-2xl'>
            <div className='space-y-4'>
              <Badge
                variant='secondary'
                className='bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20 backdrop-blur-sm'
              >
                <Rocket className='w-3 h-3 mr-2' />
                {t('pages.dashboard.boilerplateProject')}
              </Badge>
              <h1 className='text-4xl lg:text-5xl font-bold tracking-tight'>{t('pages.dashboard.welcomeToStarkon')}</h1>
              <p className='text-lg text-neutral-400 leading-relaxed max-w-xl'>
                {t('pages.dashboard.boilerplateDescription')}
              </p>
            </div>

            <div className='flex flex-wrap gap-4'>
              <Button
                onClick={() => router.push('/components')}
                variant='default'
                size='lg'
                className='bg-white text-neutral-900 hover:bg-neutral-100'
              >
                <Layout className='w-4 h-4 mr-2' />
                {t('pages.dashboard.viewComponents')}
              </Button>
              <Link
                href='https://github.com/zzafergok/starkon'
                target='_blank'
                variant='outline'
                size='lg'
                className='border-neutral-700 hover:bg-neutral-800 text-white'
              >
                <Star className='w-4 h-4 mr-2' />
                {t('pages.dashboard.starOnGithub')}
              </Link>
            </div>
          </div>

          {/* User Card */}
          <div className='w-full lg:w-auto min-w-[300px]'>
            <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors'>
              <div className='flex items-center gap-4 mb-4'>
                <Avatar className='h-12 w-12 border-2 border-blue-500/50'>
                  <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg'>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-bold text-lg leading-none'>{user.name || t('pages.dashboard.defaultUser')}</h3>
                  <span className='text-sm text-neutral-400 capitalize'>{user.role}</span>
                </div>
              </div>
              <div className='bg-neutral-900/50 rounded-lg p-3 text-xs font-mono text-neutral-400 border border-white/5 truncate'>
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className='bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-lg hover:-translate-y-1'
          >
            <CardContent className='p-6'>
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 border ${feature.borderColor}`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className='font-bold text-lg mb-2'>{feature.title}</h3>
              <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal'>
                {feature.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Unified CLI & Next Steps Section */}
      <Card className='bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 overflow-hidden'>
        <CardHeader className='border-b border-neutral-100 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50 pb-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-neutral-900 rounded-lg'>
              <Terminal className='w-5 h-5 text-white' />
            </div>
            <div>
              <CardTitle>{t('pages.dashboard.cli.title')}</CardTitle>
              <CardDescription>{t('pages.dashboard.cli.description')}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-0'>
          <div className='grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800'>
            {/* Left Column: Installation Guide */}
            <div className='lg:col-span-2 p-6 lg:p-8 space-y-8'>
              {/* Preferred Method */}
              <div className='space-y-4'>
                <h4 className='font-medium text-sm text-neutral-500 uppercase tracking-wider flex items-center gap-2'>
                  <Zap className='w-4 h-4' />
                  {t('pages.dashboard.cli.installation.global')}
                </h4>
                <div className='group relative bg-neutral-950 rounded-xl p-4 font-mono text-sm border border-neutral-800 shadow-xl'>
                  <div className='flex items-center justify-between'>
                    <div className='flex gap-2 text-neutral-300'>
                      <span className='text-purple-400 select-none'>$</span>
                      <span>npx starkon my-app</span>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-neutral-400 hover:text-white hover:bg-white/10'
                      onClick={() => copyToClipboard('npx starkon my-app')}
                    >
                      {copiedCommand === 'npx starkon my-app' ? (
                        <Check className='w-4 h-4 text-green-500' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Interactive Menu Visualization */}
              <div className='space-y-4'>
                <h4 className='font-medium text-sm text-neutral-500 uppercase tracking-wider'>
                  {t('pages.dashboard.cli.interactive.title')}
                </h4>
                <div className='rounded-xl bg-[#1e1e1e] border border-neutral-800 p-4 font-mono text-sm shadow-inner'>
                  <div className='flex gap-2 mb-4 border-b border-neutral-800 pb-2'>
                    <div className='w-2.5 h-2.5 rounded-full bg-red-500/80'></div>
                    <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/80'></div>
                    <div className='w-2.5 h-2.5 rounded-full bg-green-500/80'></div>
                  </div>
                  <div className='space-y-1 text-neutral-300'>
                    <div className='flex gap-2 items-center'>
                      <span className='font-bold text-white'>{t('pages.dashboard.cli.interactive.prompt')}</span>
                    </div>
                    <div className='mt-2 space-y-1 pl-2'>
                      <div className='flex gap-2 text-cyan-400 font-bold'>
                        <span>❯</span>
                        <span>{t('pages.dashboard.cli.interactive.options.standard')}</span>
                      </div>
                      <div className='flex gap-2 text-neutral-500 pl-4'>
                        <span>{t('pages.dashboard.cli.interactive.options.landing')}</span>
                      </div>
                      <div className='flex gap-2 text-neutral-500 pl-4'>
                        <span>{t('pages.dashboard.cli.interactive.options.corporate')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Next Steps */}
            <div className='lg:col-span-1 bg-neutral-50/50 dark:bg-neutral-900/30 p-6 lg:p-8 flex flex-col justify-between'>
              <div>
                <h4 className='font-bold text-lg text-orange-600 dark:text-orange-500 flex items-center gap-2 mb-8'>
                  <Shield className='w-5 h-5' />
                  {t('pages.dashboard.cli.nextSteps.title')}
                </h4>
                <div className='relative space-y-8'>
                  {[1, 2, 3].map((step, idx) => (
                    <div key={idx} className='relative flex gap-4'>
                      {idx !== 2 && (
                        <div className='absolute left-3.5 top-7 bottom-[-32px] w-0.5 bg-neutral-200 dark:bg-neutral-800' />
                      )}
                      <div className='relative z-10 flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-600/20'>
                        {step}
                      </div>
                      <div className='pt-0.5'>
                        <h5 className='font-semibold text-sm text-neutral-900 dark:text-white'>
                          {t(`pages.dashboard.cli.nextSteps.step${step}`)}
                        </h5>
                        {step === 1 && (
                          <code className='text-xs text-neutral-500 mt-1 block font-mono bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 w-fit'>
                            cd my-app
                          </code>
                        )}
                        {step === 2 && (
                          <code className='text-xs text-neutral-500 mt-1 block font-mono bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 w-fit'>
                            npm run dev
                          </code>
                        )}
                        {step === 3 && (
                          <code className='text-xs text-neutral-500 mt-1 block font-mono bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 w-fit'>
                            http://localhost:3000
                          </code>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800'>
                <Button
                  onClick={() => router.push('/components')}
                  className='w-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 font-semibold h-11'
                >
                  {t('pages.dashboard.viewComponents')}
                  <ChevronRight className='w-4 h-4 ml-2' />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
