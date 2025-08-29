'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'
import { ArrowRight, LucideIcon } from 'lucide-react'

import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'

interface ServiceCardProps {
  title: string
  description: string
  features?: string[]
  icon?: LucideIcon
  href?: string
  image?: string
  className?: string
}

export default function ServiceCard({
  title,
  description,
  features = [],
  icon: Icon,
  href = '#',
  image,
  className = '',
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='p-6'>
          {image ? (
            <div className='mb-4 rounded-lg overflow-hidden'>
              <Image src={image} alt={title} width={400} height={192} className='w-full h-48 object-cover' />
            </div>
          ) : Icon ? (
            <div className='mb-4'>
              <div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Icon className='h-6 w-6 text-white' />
              </div>
            </div>
          ) : null}

          <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>{title}</h3>

          <p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>{description}</p>

          {features.length > 0 && (
            <ul className='space-y-2 mb-6'>
              {features.map((feature, index) => (
                <li key={index} className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                  <div className='w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 flex-shrink-0' />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <Button
            variant='outline'
            className='w-full group'
            onClick={() => {
              if (href.startsWith('#')) {
                const element = document.querySelector(href)
                element?.scrollIntoView({ behavior: 'smooth' })
              } else {
                window.location.href = href
              }
            }}
          >
            Daha Fazla Bilgi
            <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
