'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { BlogCard } from '@/components/corporate'
import { Button } from '@/components/core/button'

import { mockBlogPosts, getFeaturedBlogPosts } from '@/lib/content'

export default function BlogPage() {
  const { t } = useTranslation()
  const allPosts = mockBlogPosts
  const featuredPosts = getFeaturedBlogPosts()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Get unique categories
  const categories = Array.from(new Set(allPosts.map((post) => post.category)))

  // Filter posts
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              {t('corporate.blog.title')}
            </h1>
            <p className='mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              {t('corporate.blog.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className='py-16 bg-gray-50 dark:bg-gray-800'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-12'
            >
              <div className='flex items-center gap-3 mb-8'>
                <Badge className='bg-blue-600 text-white'>{t('corporate.blog.featured.badge')}</Badge>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  {t('corporate.blog.featured.title')}
                </h2>
              </div>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className='py-8 border-b border-gray-200 dark:border-gray-700'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            <div className='flex-1 max-w-md'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  type='text'
                  placeholder={t('corporate.blog.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Filter className='h-4 w-4 text-gray-400' />
              <div className='flex gap-2'>
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setSelectedCategory('')}
                >
                  {t('corporate.blog.filter.all')}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='mb-12'
          >
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              {t('corporate.blog.allPosts.title')}
            </h2>
            <p className='text-gray-600 dark:text-gray-400'>
              {t('corporate.blog.allPosts.results', { count: filteredPosts.length })}
            </p>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-12'>
              <p className='text-lg text-gray-600 dark:text-gray-400'>{t('corporate.blog.noResults')}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-16 bg-blue-600 dark:bg-blue-700'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center'
          >
            <h2 className='text-3xl font-bold text-white sm:text-4xl'>{t('corporate.blog.newsletter.title')}</h2>
            <p className='mt-6 text-xl text-blue-100 max-w-2xl mx-auto'>{t('corporate.blog.newsletter.description')}</p>
            <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
              <Input type='email' placeholder={t('corporate.blog.newsletter.placeholder')} className='flex-1' />
              <Button className='bg-white text-blue-600 hover:bg-gray-100'>
                {t('corporate.blog.newsletter.button')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
