'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Sparkles, Home, Info, Mail, Menu, X, ChevronRight, Sun, Moon } from 'lucide-react'

import { Button } from '@/components/core/button'
import { useTheme } from '@/hooks/useTheme'

import { cn } from '@/lib/utils'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

export function PublicNavbar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation: NavigationItem[] = [
    {
      name: 'Ana Sayfa',
      href: '/',
      icon: Home,
      description: 'Ana sayfa',
    },
    {
      name: 'Hakkımızda',
      href: '/about',
      icon: Info,
      description: 'Hakkımızda',
    },
    {
      name: 'İletişim',
      href: '/contact',
      icon: Mail,
      description: 'Bizimle iletişime geçin',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset !important'
    }

    return () => {
      document.body.style.overflow = 'unset !important'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  if (!mounted) {
    return (
      <header className='sticky top-0 z-50 w-full border-b bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-primary-500 via-blue-500 to-accent-500 rounded-xl flex items-center justify-center'>
                <Sparkles className='h-5 w-5 text-white' />
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-primary-600 via-blue-500 to-accent-600 dark:from-primary-400 dark:via-blue-300 dark:to-accent-400 bg-clip-text text-transparent'>
                Stark
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse'></div>
              <div className='w-20 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse'></div>
              <div className='w-20 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse'></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b transition-all duration-300',
          isScrolled
            ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg border-neutral-200/50 dark:border-neutral-700/50'
            : 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-neutral-200 dark:border-neutral-700',
        )}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <Link href='/' className='flex items-center space-x-3 group'>
              <div className='relative w-10 h-10 bg-gradient-to-br from-primary-500 via-blue-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-primary-glow'>
                <Sparkles className='h-5 w-5 text-white' />
                <div className='absolute inset-0 bg-gradient-to-br from-primary-400/30 to-accent-400/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              <div className='hidden sm:block'>
                <span className='text-2xl font-bold bg-gradient-to-r from-primary-600 via-blue-500 to-accent-600 dark:from-primary-400 dark:via-blue-300 dark:to-accent-400 bg-clip-text text-transparent'>
                  Stark
                </span>
              </div>
            </Link>

            <nav className='hidden md:flex items-center space-x-2'>
              {navigation.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group',
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400',
                    )}
                  >
                    {isActive && (
                      <div className='absolute inset-0 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 rounded-xl border border-primary-200 dark:border-primary-700/50' />
                    )}
                    <div className='relative flex items-center space-x-2'>
                      <item.icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          isActive
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500',
                        )}
                      />
                      <span>{item.name}</span>
                    </div>
                    {!isActive && (
                      <div className='absolute inset-0 bg-gradient-to-r from-neutral-50/0 via-neutral-50/50 to-neutral-50/0 dark:from-neutral-800/0 dark:via-neutral-800/50 dark:to-neutral-800/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className='flex items-center space-x-3'>
              {mounted && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={toggleTheme}
                  className='h-9 w-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                >
                  {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
                </Button>
              )}

              <div className='hidden md:flex items-center space-x-2'>
                <Link href='/login'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                  >
                    Giriş Yap
                  </Button>
                </Link>
                <Link href='/register'>
                  <Button
                    size='sm'
                    className='bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300'
                  >
                    Kayıt Ol
                  </Button>
                </Link>
              </div>

              <Button
                variant='ghost'
                size='sm'
                className='md:hidden h-9 w-9 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                onClick={toggleMobileMenu}
                aria-label='Toggle menu'
              >
                {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50 md:hidden'>
          <div className='fixed inset-0 bg-black/20 backdrop-blur-sm' onClick={closeMobileMenu} />

          <div className='fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-neutral-900 shadow-2xl border-l border-neutral-200 dark:border-neutral-700'>
            <div className='flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-gradient-to-br from-primary-500 via-blue-500 to-accent-500 rounded-lg flex items-center justify-center'>
                  <Sparkles className='h-4 w-4 text-white' />
                </div>
                <h2 className='text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent'>
                  Stark
                </h2>
              </div>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={closeMobileMenu}>
                <X className='h-4 w-4' />
              </Button>
            </div>

            <div className='p-6'>
              <nav className='space-y-2'>
                {navigation.map((item) => {
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group',
                        isActive
                          ? 'bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700/50'
                          : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
                      )}
                      onClick={closeMobileMenu}
                    >
                      <item.icon
                        className={cn(
                          'h-5 w-5 transition-colors',
                          isActive
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500',
                        )}
                      />
                      <div className='flex-1'>
                        <span className='block font-medium'>{item.name}</span>
                        {item.description && (
                          <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-0.5'>{item.description}</p>
                        )}
                      </div>
                      <ChevronRight className='h-4 w-4 text-neutral-400 group-hover:text-primary-500 transition-colors' />
                    </Link>
                  )
                })}
              </nav>

              {mounted && (
                <div className='mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700'>
                  <Button
                    variant='ghost'
                    onClick={toggleTheme}
                    className='w-full justify-start text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                  >
                    {theme === 'dark' ? <Sun className='h-4 w-4 mr-3' /> : <Moon className='h-4 w-4 mr-3' />}
                    {theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
                  </Button>
                </div>
              )}

              <div className='mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3'>
                <Link href='/login' onClick={closeMobileMenu}>
                  <Button
                    variant='outline'
                    className='w-full border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200'
                  >
                    Giriş Yap
                  </Button>
                </Link>
                <Link href='/register' onClick={closeMobileMenu}>
                  <Button className='w-full bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white'>
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
