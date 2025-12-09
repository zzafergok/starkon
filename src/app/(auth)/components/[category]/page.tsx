'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useState, useMemo, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Search, X, ChevronUp, ArrowLeft, Rows3, Columns2 } from 'lucide-react'

import { Input } from '@/components/core/input'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { ComponentDemo } from '@/components/ui/ComponentDemo/ComponentDemo'
import { EnhancedPaginationControls } from '@/components/core/enhanced-pagination-controls'

import { CATEGORIES, useComponentDemoData } from '@/data/componentDemoData'

import { cn } from '@/lib/utils'

export default function CategoryComponentsPage() {
  const params = useParams()
  const { t } = useTranslation()
  const categoryParam = params.category as string
  const componentDemoData = useComponentDemoData()

  // Validate category
  const isValidCategory = CATEGORIES.includes(categoryParam as any)

  // If invalid category, you might want to redirect or show 404.
  // For now we'll handle it gracefully or let the filter return empty.

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'single' | 'double'>('double')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Filtreleme mantığı
  const filteredComponents = useMemo(() => {
    return componentDemoData.filter((component) => {
      // 1. Category Filter (Strict from URL)
      // categoryParam is the key (e.g., 'layout'). We match strictly against the logic used in data.
      // The data has translated category names. We need to match key -> translated.
      const categoryTranslated = t(`demo.content.categories.${categoryParam}`)
      const matchesCategory = component.category === categoryTranslated

      // 2. Search Filter
      const matchesSearch =
        !searchQuery ||
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())

      // 3. Status Filter
      const matchesStatus = selectedStatus === 'all' || component.status === selectedStatus

      return matchesCategory && matchesSearch && matchesStatus
    })
  }, [searchQuery, categoryParam, selectedStatus, componentDemoData, t])

  const paginatedComponents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredComponents.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredComponents, currentPage, itemsPerPage])

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedStatus, itemsPerPage])

  const statuses = useMemo(() => {
    // Only get statuses relative to this category to avoid showing irrelevant filter options?
    // Or keep global statuses. Let's keep global for consistency or filter based on current data subset?
    // Let's filter based on the *current category's* data to be smarter.
    const currentCategoryData = componentDemoData.filter(
      (c) => c.category === t(`demo.content.categories.${categoryParam}`),
    )
    const stats = ['all', ...Array.from(new Set(currentCategoryData.map((c) => c.status)))]
    return stats.map((status) => ({
      value: status,
      label: status === 'all' ? t('demo.filters.allStatuses') : status,
      count:
        status === 'all' ? currentCategoryData.length : currentCategoryData.filter((c) => c.status === status).length,
    }))
  }, [componentDemoData, t, categoryParam])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedStatus('all')
  }

  const hasActiveFilters = searchQuery || selectedStatus !== 'all'

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setShowScrollTop(scrollTop > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const categoryLabel = t(`demo.content.categories.${categoryParam}`)

  if (!isValidCategory) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-2xl font-bold mb-4'>{t('common.categoryNotFound')}</h1>
        <Link href='/components'>
          <Button>{t('common.backToCategories')}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <section className='sticky top-0 z-40'>
        <div className='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          <div className='mb-6 flex items-center gap-4'>
            <Link href='/components'>
              <Button
                variant='ghost'
                size='sm'
                className='-ml-3 gap-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              >
                <ArrowLeft className='h-4 w-4' />
                {t('common.backToCategories')}
              </Button>
            </Link>
          </div>

          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight'>
                {categoryLabel}
              </h1>
              <p className='text-neutral-500 dark:text-neutral-400 mt-1'>
                {filteredComponents.length} {t('demo.stats.total')} {t('demo.componentMap.components').toLowerCase()}
              </p>
            </div>

            {/* Layout Toggle Buttons */}
            <div className='flex items-center gap-2'>
              <Button
                variant={viewMode === 'single' ? 'default' : 'outline'}
                size='icon'
                onClick={() => setViewMode('single')}
                className='transition-all duration-200'
                aria-label='Tek sütun görünümü'
              >
                <Rows3 className='h-4 w-4' />
              </Button>
              <Button
                variant={viewMode === 'double' ? 'default' : 'outline'}
                size='icon'
                onClick={() => setViewMode('double')}
                className='transition-all duration-200'
                aria-label='İki sütun görünümü'
              >
                <Columns2 className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <Card className='bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border-neutral-200/80 dark:border-neutral-700/50 shadow-lg shadow-neutral-900/5 dark:shadow-neutral-950/20'>
            <CardContent className='p-6'>
              <div className='w-full flex flex-col xl:flex-row gap-6 items-start xl:items-center'>
                {/* Search */}
                <div className='flex-1 w-full relative group'>
                  <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors' />
                  <Input
                    placeholder={t('pages.components.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-12 pr-4 py-3 text-base bg-white/70 dark:bg-neutral-700/70 border-neutral-200/80 dark:border-neutral-600/80 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-200'
                  />
                  {searchQuery && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setSearchQuery('')}
                      className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-600'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  )}
                </div>

                {/* Status Filter */}
                <div className='flex items-center gap-2 flex-wrap shrink-0'>
                  {statuses.map((status) => {
                    const isSelected = selectedStatus === status.value
                    return (
                      <button
                        key={status.value}
                        onClick={() => setSelectedStatus(status.value)}
                        className={cn(
                          'flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border outline-none focus:outline-none',
                          isSelected
                            ? 'bg-primary-600 border-primary-600 text-white shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_0_0_4px_rgba(234,88,12,0.5)] dark:shadow-[0_0_0_2px_rgba(0,0,0,1),0_0_0_4px_rgba(234,88,12,1)]' // Double ring effect for active
                            : 'bg-transparent border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600',
                        )}
                      >
                        <span>{status.label}</span>
                        <span
                          className={cn(
                            'flex items-center justify-center px-2 h-5 min-w-[1.25rem] text-xs font-bold rounded shadow-sm',
                            isSelected
                              ? 'bg-white text-primary-600' // High contrast: White badge on Orange button
                              : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
                          )}
                        >
                          {status.count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Components Showcase */}
      <section className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        {filteredComponents.length > 0 ? (
          <div className='space-y-8'>
            <div
              key={viewMode}
              className={cn(
                'gap-8 space-y-8 transition-all duration-700 ease-in-out',
                viewMode === 'single' ? 'columns-1' : 'columns-1 lg:columns-2',
              )}
            >
              {paginatedComponents.map((component, index) => (
                <div
                  key={component.id}
                  id={`component-${component.id}`}
                  className='w-full scroll-mt-24 break-inside-avoid mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500'
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'backwards',
                  }}
                >
                  <ComponentDemo
                    title={component.title}
                    description={component.description}
                    category={component.category}
                    status={component.status as 'stable' | 'beta' | 'alpha' | 'deprecated'}
                    demoComponent={component.demoComponent}
                    code={component.code}
                    usageExamples={(() => {
                      if (!component.usageExamples || !Array.isArray(component.usageExamples)) return undefined
                      if (component.usageExamples.length > 0 && typeof component.usageExamples[0] === 'string') {
                        return (component.usageExamples as string[]).map((example, index) => ({
                          title: t('demo.componentDemo.example', { index: index + 1 }),
                          description: t('demo.componentDemo.usageExample'),
                          code: example,
                        }))
                      }
                      return component.usageExamples as Array<{
                        title: string
                        description: string
                        code: string
                        component?: React.ReactNode
                      }>
                    })()}
                    props={component.props?.map((prop, index) => ({
                      ...prop,
                      key: prop.name || `prop-${index}`,
                      description: prop.description || '',
                      required: false,
                    }))}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className='mt-12'>
              <EnhancedPaginationControls
                pagination={{
                  current: currentPage,
                  pageSize: itemsPerPage,
                  total: filteredComponents.length,
                  totalPages: Math.ceil(filteredComponents.length / itemsPerPage),
                }}
                onPageChange={setCurrentPage}
                pageSizeOptions={[5, 10, 20]}
                onPageSizeChange={setItemsPerPage}
              />
            </div>
          </div>
        ) : (
          /* No Results State */
          <div className='text-center py-20'>
            <div className='text-neutral-400 dark:text-neutral-500 mb-6'>
              <Search className='h-20 w-20 mx-auto opacity-50' />
            </div>
            <h3 className='text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3'>
              {t('common.noComponentsFound')}
            </h3>
            <p className='text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto leading-relaxed'>
              {t('common.changeSearchCriteria')}
            </p>
            <div className='space-y-4'>
              <Button
                variant='outline'
                onClick={clearFilters}
                className='bg-white/70 dark:bg-neutral-800/70 border-neutral-200/80 dark:border-neutral-600/80'
              >
                {t('common.clearFilters')}
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Scroll to Top Button */}
      <div
        className={cn(
          'fixed bottom-8 right-8 z-50 transition-all duration-300',
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none',
        )}
      >
        <Button
          onClick={scrollToTop}
          size='lg'
          className='h-12 w-12 rounded-full p-0 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm'
          aria-label={t('demo.actions.backToTop')}
        >
          <ChevronUp className='h-6 w-6' />
        </Button>
      </div>
    </div>
  )
}
