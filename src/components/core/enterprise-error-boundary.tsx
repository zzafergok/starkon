'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'

import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'

import { Button } from '@/components/core/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
}

interface EnterpriseErrorBoundaryProps {
  children: ReactNode
  fallbackLevel?: 'page' | 'component' | 'section'
  organizationId?: string
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void
  showErrorDetails?: boolean
  enableRetry?: boolean
}

export class EnterpriseErrorBoundary extends Component<EnterpriseErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0
  private readonly maxRetries = 3

  constructor(props: EnterpriseErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substring(2)}`
    return {
      hasError: true,
      error,
      errorId,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })

    this.props.onError?.(error, errorInfo, this.state.errorId)

    if (typeof window !== 'undefined') {
      console.group('🚨 Enterprise Error Boundary')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Organization:', this.props.organizationId)
      console.error('Error ID:', this.state.errorId)
      console.groupEnd()
    }
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: '',
      })
    }
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard'
    }
  }

  private renderFallbackUI() {
    const { fallbackLevel = 'component', showErrorDetails = false, enableRetry = true } = this.props
    const { error, errorInfo, errorId } = this.state

    const getFallbackContent = () => {
      switch (fallbackLevel) {
        case 'page':
          return {
            title: 'Sayfa Yüklenemedi',
            description:
              'Bu sayfada beklenmeyen bir hata oluştu. Ana sayfaya dönebilir veya sayfayı yenileyebilirsiniz.',
            actions: (
              <div className='flex gap-2'>
                <Button onClick={this.handleGoHome} variant='default'>
                  <Home className='h-4 w-4 mr-2' />
                  Ana Sayfaya Dön
                </Button>
                <Button onClick={this.handleReload} variant='outline'>
                  <RefreshCw className='h-4 w-4 mr-2' />
                  Sayfayı Yenile
                </Button>
              </div>
            ),
          }
        case 'section':
          return {
            title: 'Bölüm Yüklenemedi',
            description: 'Bu bölümde bir hata oluştu. Sayfayı yenileyerek tekrar deneyebilirsiniz.',
            actions:
              enableRetry && this.retryCount < this.maxRetries ? (
                <Button onClick={this.handleRetry} variant='outline' size='sm'>
                  <RefreshCw className='h-4 w-4 mr-2' />
                  Tekrar Dene ({this.maxRetries - this.retryCount} kalan)
                </Button>
              ) : (
                <Button onClick={this.handleReload} variant='outline' size='sm'>
                  <RefreshCw className='h-4 w-4 mr-2' />
                  Sayfayı Yenile
                </Button>
              ),
          }
        default:
          return {
            title: 'Bileşen Hatası',
            description: 'Bu bileşende beklenmeyen bir hata oluştu.',
            actions:
              enableRetry && this.retryCount < this.maxRetries ? (
                <Button onClick={this.handleRetry} variant='ghost' size='sm'>
                  <RefreshCw className='h-4 w-4 mr-2' />
                  Tekrar Dene
                </Button>
              ) : null,
          }
      }
    }

    const content = getFallbackContent()

    return (
      <Card className={fallbackLevel === 'page' ? 'max-w-md mx-auto mt-20' : 'w-full'}>
        <CardHeader className='text-center pb-3'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20'>
            <AlertTriangle className='h-6 w-6 text-red-600 dark:text-red-400' />
          </div>
          <CardTitle className='text-lg font-semibold text-red-800 dark:text-red-200'>{content.title}</CardTitle>
        </CardHeader>
        <CardContent className='text-center space-y-4'>
          <p className='text-sm text-muted-foreground'>{content.description}</p>

          {content.actions}

          {showErrorDetails && error && (
            <details className='mt-4 text-left'>
              <summary className='cursor-pointer text-xs text-muted-foreground hover:text-foreground'>
                Teknik Detaylar (ID: {errorId})
              </summary>
              <pre className='mt-2 text-xs bg-muted p-2 rounded overflow-x-auto'>
                {error.toString()}
                {errorInfo?.componentStack}
              </pre>
            </details>
          )}

          <div className='pt-2 border-t'>
            <p className='text-xs text-muted-foreground'>
              Sorun devam ederse{' '}
              <button
                className='underline hover:no-underline'
                onClick={() => window.open('mailto:support@starkon.com')}
              >
                <Mail className='h-3 w-3 inline mr-1' />
                destek@starkon.com
              </button>{' '}
              adresinden iletişime geçin.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  render() {
    if (this.state.hasError) {
      return this.renderFallbackUI()
    }

    return this.props.children
  }
}

interface ErrorBoundaryWrapperProps {
  children: ReactNode
  level?: 'page' | 'component' | 'section'
  organizationId?: string
  showErrorDetails?: boolean
}

export function ErrorBoundaryWrapper({
  children,
  level = 'component',
  organizationId,
  showErrorDetails = process.env.NODE_ENV === 'development',
}: ErrorBoundaryWrapperProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo, errorId: string) => {
    // Error logging can be implemented here
    // For now, just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ErrorBoundary-${errorId}]`, { error, errorInfo, organizationId })
    }
  }

  return (
    <EnterpriseErrorBoundary
      fallbackLevel={level}
      organizationId={organizationId}
      onError={handleError}
      showErrorDetails={showErrorDetails}
      enableRetry={level !== 'page'}
    >
      {children}
    </EnterpriseErrorBoundary>
  )
}
