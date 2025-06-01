'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Grid, List } from 'lucide-react'
import { Input } from '@/components/core/Input/Input'
import { Button } from '@/components/core/Button/Button'
import { Card, CardContent } from '@/components/core/Card/Card'
import { cn } from '@/lib/utils'
import { componentDemoData } from '@/data/componentDemoData'

const ComponentDemo = dynamic(
  () => import('@/components/ui/ComponentDemo/ComponentDemo').then((mod) => mod.ComponentDemo),
  {
    loading: () => <ComponentDemoSkeleton />,
    ssr: false,
  },
)

const ComponentDemoSkeleton = () => (
  <div className='bg-white dark:bg-neutral-800 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden animate-pulse'>
    <div className='p-6'>
      <div className='h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-4'></div>
      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-2'></div>
      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6 mb-4'></div>
      <div className='h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2'></div>
    </div>
    <div className='bg-neutral-100 dark:bg-neutral-700 p-6 border-t border-neutral-200 dark:border-neutral-600'>
      <div className='h-40 bg-neutral-200 dark:bg-neutral-600 rounded'></div>
    </div>
  </div>
)

export default function ComponentsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredComponents = componentDemoData.filter((component) => {
    const matchesSearch =
      component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(componentDemoData.map((c) => c.category)))]

  return (
    <div className='min-h-screen bg-white dark:bg-neutral-900'>
      {/* Search and Filter Section */}
      <section className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <Card className='bg-white dark:bg-neutral-800 backdrop-blur-sm border-neutral-200 dark:border-neutral-700 shadow-lg'>
          <CardContent className='p-6'>
            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              <div className='flex-1 w-full relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400' />
                <Input
                  placeholder={t('pages.components.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 pr-4 py-3 text-base bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400'
                />
              </div>

              <div className='flex items-center gap-2'>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='appearance-none bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-neutral-900 dark:text-neutral-100 cursor-pointer'
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                  }}
                >
                  <option value='all'>{t('common.allCategories')}</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <div className='flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg'>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 transition-all duration-200',
                      viewMode === 'grid'
                        ? 'bg-primary-500 text-white dark:bg-primary-500'
                        : 'hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-300',
                    )}
                    aria-label={t('common.viewMode')}
                  >
                    <Grid className='h-4 w-4' />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 transition-all duration-200',
                      viewMode === 'list'
                        ? 'bg-primary-500 text-white dark:bg-primary-500'
                        : 'hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-300',
                    )}
                    aria-label={t('common.viewMode')}
                  >
                    <List className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Components Showcase */}
      <section className='max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100'>
            {t('pages.components.count', { count: filteredComponents.length })}
          </h2>
        </div>

        <div className={cn('grid gap-8', viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1')}>
          {filteredComponents.map((component) => (
            <ComponentDemo
              key={component.id}
              title={component.title}
              description={component.description}
              category={component.category}
              status={component.status as 'stable' | 'beta' | 'alpha' | 'deprecated'}
              demoComponent={component.demoComponent}
              code={component.code}
              usageExamples={component.usageExamples}
              props={component.props?.map((prop) => ({
                ...prop,
                description: prop.description || '',
                required: false,
              }))}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredComponents.length === 0 && (
          <div className='text-center py-16'>
            <div className='text-neutral-500 dark:text-neutral-400 mb-4'>
              <Search className='h-16 w-16 mx-auto opacity-50' />
            </div>
            <h3 className='text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2'>
              {t('common.noComponentsFound')}
            </h3>
            <p className='text-neutral-600 dark:text-neutral-300 mb-4'>{t('common.changeSearchCriteria')}</p>
            <Button
              variant='outline'
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className='border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'
            >
              {t('common.clearFilters')}
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
