'use client'

import React, { memo, forwardRef, useCallback, useMemo } from 'react'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

import { cn } from '@/lib/utils'

// Generic memo wrapper for components with props comparison
export function createMemoizedComponent<T extends React.ComponentType<Record<string, unknown>>>(
  Component: T,
  compareProps?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>,
  ) => boolean,
): T {
  const MemoizedComponent = memo(Component, compareProps)
  MemoizedComponent.displayName = `Memoized(${Component.displayName || Component.name || 'Component'})`
  return MemoizedComponent as unknown as T
}

// Shallow comparison function for props
export const shallowCompare = <T extends Record<string, unknown>>(prevProps: T, nextProps: T): boolean => {
  const prevKeys = Object.keys(prevProps)
  const nextKeys = Object.keys(nextProps)

  if (prevKeys.length !== nextKeys.length) {
    return false
  }

  for (const key of prevKeys) {
    if (prevProps[key] !== nextProps[key]) {
      return false
    }
  }

  return true
}

// Deep comparison for complex objects (use sparingly)
export const deepCompare = <T extends Record<string, unknown>>(prevProps: T, nextProps: T): boolean => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

// Memoized Card component
interface MemoizedCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  loading?: boolean
  error?: string | null
  actions?: React.ReactNode
}

export const MemoizedCard = memo<MemoizedCardProps>(
  ({ title, description, children, className, loading = false, error = null, actions }) => {
    if (loading) {
      return (
        <Card className={cn('animate-pulse', className)}>
          <CardHeader>
            <div className='h-6 bg-gray-200 rounded w-1/3 mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              <div className='h-4 bg-gray-200 rounded w-4/6'></div>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (error) {
      return (
        <Card className={cn('border-red-200', className)}>
          <CardHeader>
            <CardTitle className='text-red-700'>Error</CardTitle>
            <CardDescription className='text-red-600'>{error}</CardDescription>
          </CardHeader>
        </Card>
      )
    }

    return (
      <Card className={className}>
        {(title || description || actions) && (
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
              </div>
              {actions}
            </div>
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prevProps.title === nextProps.title &&
      prevProps.description === nextProps.description &&
      prevProps.className === nextProps.className &&
      prevProps.loading === nextProps.loading &&
      prevProps.error === nextProps.error &&
      React.isValidElement(prevProps.children) === React.isValidElement(nextProps.children) &&
      prevProps.actions === nextProps.actions
    )
  },
)

MemoizedCard.displayName = 'MemoizedCard'

// Memoized Badge List
interface MemoizedBadgeListProps {
  items: Array<{
    id: string
    label: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    color?: string
  }>
  maxVisible?: number
  showCount?: boolean
  className?: string
}

export const MemoizedBadgeList = memo<MemoizedBadgeListProps>(
  ({ items, maxVisible = 5, showCount = true, className }) => {
    const visibleItems = useMemo(() => items.slice(0, maxVisible), [items, maxVisible])
    const remainingCount = useMemo(() => Math.max(0, items.length - maxVisible), [items.length, maxVisible])

    return (
      <div className={cn('flex flex-wrap gap-1', className)}>
        {visibleItems.map((item) => (
          <Badge
            key={item.id}
            variant={item.variant || 'secondary'}
            style={item.color ? { backgroundColor: item.color } : undefined}
            className='text-xs'
          >
            {item.label}
          </Badge>
        ))}
        {remainingCount > 0 && showCount && (
          <Badge variant='outline' className='text-xs'>
            +{remainingCount} more
          </Badge>
        )}
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Deep comparison for items array
    if (prevProps.items.length !== nextProps.items.length) return false

    for (let i = 0; i < prevProps.items.length; i++) {
      const prev = prevProps.items[i]
      const next = nextProps.items[i]

      if (
        prev.id !== next.id ||
        prev.label !== next.label ||
        prev.variant !== next.variant ||
        prev.color !== next.color
      ) {
        return false
      }
    }

    return (
      prevProps.maxVisible === nextProps.maxVisible &&
      prevProps.showCount === nextProps.showCount &&
      prevProps.className === nextProps.className
    )
  },
)

MemoizedBadgeList.displayName = 'MemoizedBadgeList'

// Memoized Table Row
interface MemoizedTableRowProps {
  id: string
  children: React.ReactNode
  onClick?: (id: string) => void
  selected?: boolean
  className?: string
  hover?: boolean
}

export const MemoizedTableRow = memo<MemoizedTableRowProps>(
  ({ id, children, onClick, selected = false, className, hover = true }) => {
    const handleClick = useCallback(() => {
      onClick?.(id)
    }, [id, onClick])

    return (
      <tr
        className={cn(
          'border-b transition-colors',
          hover && 'hover:bg-muted/50',
          selected && 'bg-muted',
          onClick && 'cursor-pointer',
          className,
        )}
        onClick={handleClick}
      >
        {children}
      </tr>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id &&
      prevProps.selected === nextProps.selected &&
      prevProps.className === nextProps.className &&
      prevProps.hover === nextProps.hover &&
      prevProps.onClick === nextProps.onClick &&
      React.Children.count(prevProps.children) === React.Children.count(nextProps.children)
    )
  },
)

MemoizedTableRow.displayName = 'MemoizedTableRow'

// Memoized List Item with complex data
interface ListItemData {
  id: string
  title: string
  description?: string
  metadata?: Record<string, unknown>
  actions?: Array<{
    id: string
    label: string
    onClick: () => void
    variant?: 'default' | 'destructive' | 'outline' | 'secondary'
  }>
}

interface MemoizedListItemProps {
  data: ListItemData
  selected?: boolean
  className?: string
  showActions?: boolean
  compact?: boolean
}

export const MemoizedListItem = memo<MemoizedListItemProps>(
  ({ data, selected = false, className, showActions = true, compact = false }) => {
    const { id: _id, title, description, metadata, actions = [] } = data

    return (
      <div
        className={cn(
          'p-4 border-b transition-colors hover:bg-muted/50',
          selected && 'bg-muted border-blue-200',
          compact && 'py-2',
          className,
        )}
      >
        <div className='flex items-start justify-between'>
          <div className='flex-1 min-w-0'>
            <h4 className={cn('font-medium truncate', compact ? 'text-sm' : 'text-base')}>{title}</h4>
            {description && !compact && (
              <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>{description}</p>
            )}
            {metadata && Object.keys(metadata).length > 0 && (
              <div className='flex flex-wrap gap-1 mt-2'>
                {Object.entries(metadata)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <Badge key={key} variant='outline' className='text-xs'>
                      {key}: {String(value)}
                    </Badge>
                  ))}
              </div>
            )}
          </div>

          {showActions && actions.length > 0 && (
            <div className='flex gap-1 ml-4'>
              {actions.slice(0, 2).map((action) => (
                <Button
                  key={action.id}
                  size='sm'
                  variant={action.variant || 'outline'}
                  onClick={action.onClick}
                  className='text-xs'
                >
                  {action.label}
                </Button>
              ))}
              {actions.length > 2 && (
                <Badge variant='secondary' className='text-xs'>
                  +{actions.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Deep comparison for data object
    const prevData = prevProps.data
    const nextData = nextProps.data

    if (
      prevData.id !== nextData.id ||
      prevData.title !== nextData.title ||
      prevData.description !== nextData.description
    ) {
      return false
    }

    // Compare metadata
    const prevMetadata = prevData.metadata || {}
    const nextMetadata = nextData.metadata || {}
    const prevMetaKeys = Object.keys(prevMetadata)
    const nextMetaKeys = Object.keys(nextMetadata)

    if (prevMetaKeys.length !== nextMetaKeys.length) return false

    for (const key of prevMetaKeys) {
      if (prevMetadata[key] !== nextMetadata[key]) return false
    }

    // Compare actions
    const prevActions = prevData.actions || []
    const nextActions = nextData.actions || []

    if (prevActions.length !== nextActions.length) return false

    for (let i = 0; i < prevActions.length; i++) {
      const prev = prevActions[i]
      const next = nextActions[i]

      if (
        prev.id !== next.id ||
        prev.label !== next.label ||
        prev.variant !== next.variant ||
        prev.onClick !== next.onClick
      ) {
        return false
      }
    }

    return (
      prevProps.selected === nextProps.selected &&
      prevProps.className === nextProps.className &&
      prevProps.showActions === nextProps.showActions &&
      prevProps.compact === nextProps.compact
    )
  },
)

MemoizedListItem.displayName = 'MemoizedListItem'

// Higher-order component for automatic memoization
export function withMemo<P extends object>(
  Component: React.ComponentType<P>,
  compareProps?: (prevProps: P, nextProps: P) => boolean,
) {
  const MemoizedComponent = memo(Component, compareProps)

  const ForwardedComponent = forwardRef<unknown, P>((props, ref) => <MemoizedComponent {...props} ref={ref as never} />)
  ForwardedComponent.displayName = `ForwardedMemoized(${Component.displayName || Component.name || 'Component'})`
  return ForwardedComponent
}

// Utility for creating memoized callbacks
export function useMemoizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps) as T
}

// Utility for creating memoized values with custom comparison
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList,
  compare?: (prev: T, next: T) => boolean,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(factory, deps)

  if (!compare) {
    return memoizedValue
  }

  // Custom comparison logic would need additional state tracking
  // This is a simplified version
  return memoizedValue
}

// Performance monitoring wrapper
export function withPerformanceTracking<P extends object>(Component: React.ComponentType<P>, componentName: string) {
  const TrackedComponent = forwardRef<unknown, P>((props, ref) => {
    const startTime = useMemo(() => performance.now(), [])

    React.useEffect(() => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      if (renderTime > 16) {
        // More than one frame (16ms)
        console.warn(`Component ${componentName} took ${renderTime.toFixed(2)}ms to render`)
      }
    })

    return <Component {...(props as P)} ref={ref as never} />
  })

  TrackedComponent.displayName = `PerformanceTracked(${componentName})`
  return TrackedComponent
}

const MemoWrappers = {
  MemoizedCard,
  MemoizedBadgeList,
  MemoizedTableRow,
  MemoizedListItem,
  createMemoizedComponent,
  withMemo,
  withPerformanceTracking,
  shallowCompare,
  deepCompare,
}

export default MemoWrappers
