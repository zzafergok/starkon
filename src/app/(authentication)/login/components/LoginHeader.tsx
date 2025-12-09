'use client'

import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/core/button'
import { ThemeSwitcher } from '@/components/ui/theme/theme-switcher'
import { LanguageSwitcher } from '@/components/ui/language/language-switcher'

/**
 * Login page header with navigation and theme/language switchers
 */
export function LoginHeader() {
  const { t } = useTranslation()

  return (
    <div className='flex justify-between items-center'>
      <Link href='/'>
        <Button variant='ghost' size='sm' className='text-muted-foreground hover:text-primary gap-2 pl-0'>
          <ArrowLeft className='h-4 w-4' />
          {t('homepage.returnToHome') || 'Ana Sayfa'}
        </Button>
      </Link>

      <div className='flex items-center space-x-2'>
        <LanguageSwitcher variant='button' showLabel className='bg-card shadow-theme-sm border border-border' />
        <ThemeSwitcher variant='button' showLabel />
      </div>
    </div>
  )
}
