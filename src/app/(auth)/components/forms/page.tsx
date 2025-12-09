'use client'

import dynamic from 'next/dynamic'

import { useState, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { Search, X, Code2, BookOpen } from 'lucide-react'

import { Input } from '@/components/core/input'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/core/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/core/alert'

import { useFormsDemoData } from '@/data/formsDemoData'

const ComponentDemo = dynamic(
  () => import('@/components/ui/ComponentDemo/ComponentDemo').then((mod) => mod.ComponentDemo),
  {
    loading: () => <ComponentDemoSkeleton />,
    ssr: false,
  },
)

const ComponentDemoSkeleton = () => (
  <div className='bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/50 rounded-2xl shadow-sm overflow-hidden animate-pulse'>
    <div className='p-6'>
      <div className='flex items-start justify-between mb-4'>
        <div className='space-y-3 flex-1'>
          <div className='flex items-center gap-3'>
            <div className='h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-32'></div>
            <div className='h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-16'></div>
          </div>
          <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20'></div>
        </div>
        <div className='h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded'></div>
      </div>
      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-2'></div>
      <div className='h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6 mb-6'></div>
      <div className='h-32 bg-neutral-200 dark:bg-neutral-700 rounded-xl'></div>
    </div>
    <div className='bg-neutral-100/50 dark:bg-neutral-700/30 p-6 border-t border-neutral-200/50 dark:border-neutral-600/30'>
      <div className='h-24 bg-neutral-200 dark:bg-neutral-600 rounded-lg'></div>
    </div>
  </div>
)

export default function FormsShowcasePage() {
  const { t } = useTranslation()
  const formsDemoData = useFormsDemoData()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filtreleme mantığı
  const filteredComponents = useMemo(() => {
    return formsDemoData.filter((component) => {
      const matchesSearch =
        !searchQuery ||
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, formsDemoData])

  // Kategoriler
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(formsDemoData.map((c) => c.category)))]
    return cats.map((cat) => ({
      value: cat,
      label: cat === 'all' ? t('common.allCategories') : cat,
      count: cat === 'all' ? formsDemoData.length : formsDemoData.filter((c) => c.category === cat).length,
    }))
  }, [t, formsDemoData])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all'

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100/50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950/80'>
      {/* Header */}
      <section className='bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <Code2 className='h-10 w-10' />
              <h1 className='text-4xl font-bold'>Forms System</h1>
            </div>
            <p className='text-xl text-primary-100 mb-6 max-w-3xl mx-auto'>{t('demo.forms.header.description')}</p>
            <div className='flex items-center justify-center gap-4 flex-wrap'>
              <Badge variant='secondary' className='bg-white/20 text-white border-white/30'>
                React Hook Form
              </Badge>
              <Badge variant='secondary' className='bg-white/20 text-white border-white/30'>
                Zod Validation
              </Badge>
              <Badge variant='secondary' className='bg-white/20 text-white border-white/30'>
                TypeScript
              </Badge>
              <Badge variant='secondary' className='bg-white/20 text-white border-white/30'>
                {formsDemoData.length} Components
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Info Alert */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Alert>
          <BookOpen className='h-4 w-4' />
          <AlertTitle>{t('demo.forms.info.title')}</AlertTitle>
          <AlertDescription>{t('demo.forms.info.description')}</AlertDescription>
        </Alert>
      </section>

      {/* Search and Filter Section */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8'>
        <Card className='bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border-neutral-200/80 dark:border-neutral-700/50 shadow-lg'>
          <CardContent className='p-6'>
            <div className='space-y-6'>
              {/* Search */}
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400' />
                <Input
                  placeholder={t('demo.forms.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-12 pr-4 py-3 text-base'
                />
                {searchQuery && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setSearchQuery('')}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>

              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className='w-full justify-start overflow-x-auto'>
                  {categories.map((category) => (
                    <TabsTrigger key={category.value} value={category.value} className='gap-2'>
                      {category.label}
                      <Badge variant='secondary' className='text-xs'>
                        {category.count}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
                    {t('demo.remaining.activeFilters')}
                  </span>
                  {searchQuery && (
                    <Badge variant='secondary' className='gap-1'>
                      {`"${searchQuery}"`}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setSearchQuery('')}
                        className='h-4 w-4 p-0 hover:bg-transparent'
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    </Badge>
                  )}
                  {selectedCategory !== 'all' && (
                    <Badge variant='secondary' className='gap-1'>
                      {selectedCategory}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setSelectedCategory('all')}
                        className='h-4 w-4 p-0 hover:bg-transparent'
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    </Badge>
                  )}
                  <Button variant='ghost' size='sm' onClick={clearFilters} className='text-xs'>
                    {t('demo.remaining.clearAll')}
                  </Button>
                </div>
              )}

              {/* Results Summary */}
              <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                <strong className='text-neutral-900 dark:text-neutral-100'>{filteredComponents.length}</strong>{' '}
                {t('demo.remaining.componentsShowing')}
                {filteredComponents.length !== formsDemoData.length && (
                  <span className='ml-1'>
                    ({formsDemoData.length} {t('demo.remaining.totalComponents')})
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Components Showcase */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        {filteredComponents.length > 0 ? (
          <div className='columns-1 gap-8 space-y-8'>
            {filteredComponents.map((component) => (
              <div key={component.id} id={`component-${component.id}`} className='w-full break-inside-avoid mb-8'>
                <ComponentDemo
                  title={component.title}
                  description={component.description}
                  category={component.category}
                  status={component.status as 'stable' | 'beta' | 'alpha' | 'deprecated'}
                  demoComponent={component.demoComponent}
                  code={component.code}
                  usageExamples={component.usageExamples as any}
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
            <Button variant='outline' onClick={clearFilters}>
              {t('common.clearFilters')}
            </Button>
          </div>
        )}
      </section>

      {/* Footer Stats */}
      {filteredComponents.length > 0 && (
        <section className='border-t border-neutral-200/50 dark:border-neutral-700/30 bg-neutral-50/50 dark:bg-neutral-900/50'>
          <div className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
              {categories
                .filter((cat) => cat.value !== 'all')
                .map((category) => (
                  <div key={category.value} className='space-y-2'>
                    <div className='text-2xl font-bold text-primary-600 dark:text-primary-400'>{category.count}</div>
                    <div className='text-sm text-neutral-600 dark:text-neutral-400'>{category.label}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
