'use client'

import React, { useState } from 'react'

import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface AnimatedAvatarProps {
  name?: string
  email?: string
  online?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeConfig = {
  sm: { container: 'w-10 h-10', text: 'text-sm', icon: 'w-4 h-4' },
  md: { container: 'w-16 h-16', text: 'text-lg', icon: 'w-6 h-6' },
  lg: { container: 'w-24 h-24', text: 'text-2xl', icon: 'w-8 h-8' },
  xl: { container: 'w-32 h-32', text: 'text-3xl', icon: 'w-10 h-10' },
}

export function AnimatedAvatar({ name = '', email = '', size = 'xl', online = true, className }: AnimatedAvatarProps) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (text: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
    ]

    const hash = text.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    return colors[Math.abs(hash) % colors.length]
  }

  const config = sizeConfig[size]
  const initials = getInitials(name || email)
  const avatarColor = getAvatarColor(name || email)

  return (
    <div className={cn('relative group', className)}>
      {/* Main Avatar */}
      <div
        className={cn(
          config.container,
          avatarColor,
          'relative rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 overflow-hidden',
          'hover:shadow-xl hover:scale-105',
          isHovered && 'scale-105 shadow-xl',
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Rings */}
        <div className='absolute inset-0 rounded-full border-2 border-white/20 animate-pulse' />
        <div className='absolute inset-0 rounded-full border border-white/10 animate-ping opacity-30' />

        {/* Avatar Content */}
        <div className={cn('relative z-10 font-semibold', config.text)}>
          {initials || <User className={config.icon} />}
        </div>

        {/* Floating Animation Elements */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-100' />
          <div className='absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/30 rounded-full animate-bounce delay-300' />
          <div className='absolute top-1/2 left-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-bounce delay-500' />
        </div>
      </div>

      {/* Online Status Indicator */}
      {online && (
        <div className='absolute -bottom-1 -right-1 group'>
          <div className='w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-sm animate-pulse' />
          <div className='absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-50' />
        </div>
      )}

      {/* Floating Status Text */}
      {isHovered && (
        <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap animate-in fade-in duration-200'>
          {online ? t('animatedAvatar.online') : t('animatedAvatar.offline')}
        </div>
      )}
    </div>
  )
}
