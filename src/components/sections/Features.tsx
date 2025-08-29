'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield, Globe, Code, Smartphone } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    title: 'Next.js 15 Ready',
    description:
      'Built with the latest Next.js features including App Router, Server Components, and optimized performance.',
    icon: Code,
  },
  {
    title: 'TypeScript First',
    description: 'Full type safety out of the box. Catch errors early and improve development experience.',
    icon: Shield,
  },
  {
    title: 'Authentication Built-in',
    description: 'Complete JWT-based authentication system with session management and automatic token refresh.',
    icon: CheckCircle,
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized for performance with automatic code splitting, image optimization, and caching.',
    icon: Zap,
  },
  {
    title: 'Responsive Design',
    description: 'Mobile-first approach with beautiful responsive components that work on all devices.',
    icon: Smartphone,
  },
  {
    title: 'International Ready',
    description: 'Built-in i18n support with multiple languages and easy localization management.',
    icon: Globe,
  },
]

export default function Features({
  title = 'Everything you need',
  subtitle = 'All the tools and components to build modern web applications',
  features = defaultFeatures,
}: FeaturesProps) {
  return (
    <section id='features' className='py-24 bg-white dark:bg-gray-900'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>{title}</h2>
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>{subtitle}</p>
          </motion.div>
        </div>

        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex flex-col'
                >
                  <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white'>
                    <div className='h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600'>
                      <Icon className='h-6 w-6 text-white' aria-hidden='true' />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300'>
                    <p className='flex-auto'>{feature.description}</p>
                  </dd>
                </motion.div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
