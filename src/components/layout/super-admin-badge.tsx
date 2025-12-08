'use client'

import { Crown, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/core/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/core/tooltip'

import { cn } from '@/lib/utils'

interface SuperAdminBadgeProps {
  variant?: 'default' | 'minimal' | 'icon-only'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showTooltip?: boolean
}

export function SuperAdminBadge({
  variant = 'default',
  size = 'md',
  className,
  showTooltip = true,
}: SuperAdminBadgeProps) {
  const { t } = useTranslation()

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }

  const getBadgeContent = () => {
    switch (variant) {
      case 'icon-only':
        return (
          <div
            className={cn(
              'flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg',
              size === 'sm' && 'w-6 h-6',
              size === 'md' && 'w-8 h-8',
              size === 'lg' && 'w-10 h-10',
            )}
          >
            <Crown className={iconSizes[size]} />
          </div>
        )

      case 'minimal':
        return (
          <Badge
            variant='outline'
            className={cn(
              'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400 flex items-center gap-1',
              sizeClasses[size],
              className,
            )}
          >
            <Crown className={iconSizes[size]} />
            SUPER
          </Badge>
        )

      default:
        return (
          <Badge
            className={cn(
              'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg border-0 flex items-center gap-1.5',
              sizeClasses[size],
              className,
            )}
          >
            <Crown className={iconSizes[size]} />
            SUPER ADMIN
            <Shield className={iconSizes[size]} />
          </Badge>
        )
    }
  }

  const badgeContent = getBadgeContent()

  if (!showTooltip) {
    return badgeContent
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badgeContent}</TooltipTrigger>
        <TooltipContent>
          <div className='text-center'>
            <p className='font-semibold'>{t('roles.superAdmin')}</p>
            <p className='text-xs text-muted-foreground mt-1'>{t('superAdmin.badge.description')}</p>
            <div className='mt-2 text-xs'>
              <div className='flex items-center gap-1 text-amber-600'>
                <Crown className='w-3 h-3' />
                <span>{t('superAdmin.badge.privileges')}</span>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
