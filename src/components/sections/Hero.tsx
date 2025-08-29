'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { Button } from '@/components/core/button'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export default function Hero({
  title = 'Build Amazing Products',
  subtitle = 'Fast. Reliable. Scalable.',
  description = 'Create production-ready web applications with our comprehensive Next.js boilerplate. Everything you need to launch your project quickly and efficiently.',
  primaryCTA = { text: 'Get Started', href: '#contact' },
  secondaryCTA = { text: 'Learn More', href: '#features' },
  backgroundImage,
}: HeroProps) {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 sm:py-32'>
      {backgroundImage && (
        <div className='absolute inset-0 z-0'>
          <Image src={backgroundImage} alt='Hero background' fill className='object-cover opacity-20' priority />
        </div>
      )}

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'>{title}</h1>
            <p className='mt-6 text-xl font-semibold text-blue-600 dark:text-blue-400'>{subtitle}</p>
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>{description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'
          >
            <Button
              size='lg'
              className='px-8 py-3 text-lg'
              onClick={() => {
                const element = document.querySelector(primaryCTA.href)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {primaryCTA.text}
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='px-8 py-3 text-lg'
              onClick={() => {
                const element = document.querySelector(secondaryCTA.href)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {secondaryCTA.text}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-gray-800'></div>
    </section>
  )
}
