'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'
type BadgeSize = 'default' | 'sm' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  borderColor?: string
  backgroundColor?: string
  textColor?: string
}

// Predefined theme colors to avoid inline styles when possible
const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    borderWidth: '0',
  },
  secondary: {
    backgroundColor: 'hsl(var(--secondary))',
    color: 'hsl(var(--secondary-foreground))',
    borderWidth: '0',
  },
  destructive: {
    backgroundColor: 'hsl(var(--destructive))',
    color: 'hsl(var(--destructive-foreground))',
    borderWidth: '0',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'hsl(var(--foreground))',
    borderColor: 'hsl(var(--border))',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
}

const sizeStyles: Record<BadgeSize, string> = {
  default: 'px-2.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

function Badge({
  className,
  variant = 'default',
  size = 'default',
  borderColor,
  backgroundColor,
  textColor,
  style,
  ...props
}: BadgeProps) {
  // Build complete inline style object to avoid any CSS conflicts
  const combinedStyle: React.CSSProperties = {
    // Base variant styles
    ...variantStyles[variant],
    // Custom overrides
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && {
      borderColor,
      borderWidth: '1px',
      borderStyle: 'solid',
    }),
    // Merge any additional styles
    ...style,
  }

  return (
    <span
      className={cn(
        // Base classes without any border, background, or color classes
        'inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-ring/50 focus:ring-inset rounded-full',
        // Size classes
        sizeStyles[size],
        // Hover effects without color specifications
        'hover:opacity-80',
        className,
      )}
      style={combinedStyle}
      {...props}
    />
  )
}

export { Badge }
