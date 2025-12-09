'use client'

import Link from 'next/link'

import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { Layout, Type, MousePointerClick, MessageSquare, Layers, Box, Settings, Activity } from 'lucide-react'

import { Card, CardContent } from '@/components/core/card'

import { CATEGORIES, useComponentDemoData } from '@/data/componentDemoData'

// Map categories to Lucide icons for visual appeal
const CategoryIcons: Record<string, any> = {
  ui: Layout,
  layout: Layout,
  overlay: Layers,
  dataDisplay: Box,
  advanced: Settings,
  feedback: MessageSquare,
  navigation: MousePointerClick,
  formInput: Type, // Using Type for inputs/forms generic
  all: Layers, // Should not be shown usually, but fallback
}

export default function ComponentsLandingPage() {
  const { t } = useTranslation()
  const componentDemoData = useComponentDemoData()

  // Calculate counts for each category
  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.filter((cat) => cat !== 'all') // Don't show "All" as a specific category card typically
      .map((cat) => {
        const translatedCat = t(`demo.content.categories.${cat}`)
        const count = componentDemoData.filter((c) => c.category === translatedCat).length
        return {
          key: cat,
          label: translatedCat,
          count,
          icon: CategoryIcons[cat] || Activity,
        }
      })
  }, [t, componentDemoData])

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100/50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950/80'>
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4'>
            {t('pages.components.title') || 'Bileşenler'}
          </h1>
          <p className='text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
            {t('pages.components.description') || 'Projelerinizde kullanabileceğiniz kapsamlı UI bileşen kütüphanesi.'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {categoriesWithCounts.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.key} href={`/components/${category.key}`}>
                <Card className='h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-neutral-200/80 dark:border-neutral-700/50 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm group cursor-pointer'>
                  <CardContent className='p-6 flex flex-col items-center text-center space-y-4'>
                    <div className='p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors'>
                      <Icon className='w-8 h-8' />
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors'>
                        {category.label}
                      </h3>
                      <span className='inline-block mt-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-700/50 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400'>
                        {category.count} {t('demo.componentMap.components').toLowerCase()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
