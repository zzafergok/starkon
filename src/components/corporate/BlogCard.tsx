'use client'

import { Card, CardContent } from '@/components/core/card'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BlogPost {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  readingTime: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  image?: string
  featured?: boolean
}

interface BlogCardProps extends BlogPost {
  className?: string
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  publishedAt,
  readingTime,
  author,
  category,
  image,
  featured = false,
  className = '',
}: BlogCardProps) {
  const handleReadMore = () => {
    window.location.href = `/blog/${slug}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card
        className={`h-full hover:shadow-lg transition-shadow duration-300 ${featured ? 'ring-2 ring-blue-600' : ''}`}
      >
        <CardContent className='p-0'>
          {image && (
            <div className='relative'>
              <Image src={image} alt={title} width={400} height={192} className='w-full h-48 object-cover rounded-t-lg' />
              {featured && <Badge className='absolute top-3 left-3 bg-blue-600'>Öne Çıkan</Badge>}
            </div>
          )}

          <div className='p-6'>
            <div className='flex items-center gap-2 mb-3'>
              <Badge variant='secondary' className='text-xs'>
                {category}
              </Badge>
            </div>

            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 transition-colors'>
              {title}
            </h3>

            <p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed'>{excerpt}</p>

            <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4'>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  {new Date(publishedAt).toLocaleDateString('tr-TR')}
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='h-4 w-4' />
                  {readingTime}
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                {author.avatar ? (
                  <Image src={author.avatar} alt={author.name} width={32} height={32} className='w-8 h-8 rounded-full' />
                ) : (
                  <div className='w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center'>
                    <User className='h-4 w-4 text-gray-600 dark:text-gray-300' />
                  </div>
                )}
                <span className='text-sm text-gray-600 dark:text-gray-400'>{author.name}</span>
              </div>

              <Button variant='outline' size='sm' className='group' onClick={handleReadMore}>
                Devamını Oku
                <ArrowRight className='ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
