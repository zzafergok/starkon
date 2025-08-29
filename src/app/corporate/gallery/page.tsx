'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'
import { Grid, List } from 'lucide-react'

import { Button } from '@/components/core/button'
import { GalleryItem } from '@/components/corporate'

import { mockGalleryItems, getGalleryItemsByCategory } from '@/lib/content'

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get unique categories
  const categories = Array.from(new Set(mockGalleryItems.map((item) => item.category)))

  // Filter items
  const filteredItems = selectedCategory ? getGalleryItemsByCategory(selectedCategory) : mockGalleryItems

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'>
              Projelerimiz
            </h1>
            <p className='mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Şu ana kadar tamamladığımız projelerin galeri görünümü. Her projede modern teknolojiler ve yaratıcı
              çözümler kullandık.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and View Controls */}
      <section className='py-8 border-b border-gray-200 dark:border-gray-700'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            {/* Category Filter */}
            <div className='flex flex-wrap gap-2'>
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size='sm'
                onClick={() => setSelectedCategory('')}
              >
                Tümü ({mockGalleryItems.length})
              </Button>
              {categories.map((category) => {
                const count = getGalleryItemsByCategory(category).length
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category} ({count})
                  </Button>
                )
              })}
            </div>

            {/* View Mode Toggle */}
            <div className='flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg'>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setViewMode('grid')}
                className='p-2'
              >
                <Grid className='h-4 w-4' />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size='sm'
                onClick={() => setViewMode('list')}
                className='p-2'
              >
                <List className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Items */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {filteredItems.length > 0 ? (
            <div
              className={`grid gap-8 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'
              }`}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GalleryItem
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    category={item.category}
                    projectUrl={item.projectUrl}
                    className={viewMode === 'list' ? 'md:flex md:items-center' : ''}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-12'>
              <p className='text-lg text-gray-600 dark:text-gray-400'>Seçilen kategoride proje bulunamadı.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gray-50 dark:bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center'
          >
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl'>
              Siz de Projenizi Hayata Geçirin
            </h2>
            <p className='mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              Galerimizde gördüğünüz projeler gibi size özel çözümler geliştirmek için bizimle iletişime geçin.
            </p>
            <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' onClick={() => (window.location.href = '/contact')} className='px-8'>
                Proje Teklifi Alın
              </Button>
              <Button variant='outline' size='lg' onClick={() => (window.location.href = '/services')} className='px-8'>
                Hizmetlerimizi İnceleyin
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
