'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'

import { Button } from '@/components/core/button'

interface CTAProps {
  title?: string
  description?: string
  primaryAction?: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  showGitHub?: boolean
  gitHubUrl?: string
}

export default function CTA({
  title = 'Ready to get started?',
  description = 'Start building your next project today with our comprehensive Next.js boilerplate. Everything you need is already configured and ready to go.',
  primaryAction = { text: 'Get Started Now', href: '#contact' },
  secondaryAction = { text: 'View Documentation', href: '/docs' },
  showGitHub = true,
  gitHubUrl = 'https://github.com/zzafergok/starkon',
}: CTAProps) {
  return (
    <section className='py-24 bg-blue-600 dark:bg-blue-700'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mx-auto max-w-2xl text-center'
        >
          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>{title}</h2>
          <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100'>{description}</p>

          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              variant='secondary'
              className='px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-100'
              onClick={() => {
                if (primaryAction.href.startsWith('#')) {
                  const element = document.querySelector(primaryAction.href)
                  element?.scrollIntoView({ behavior: 'smooth' })
                } else {
                  window.location.href = primaryAction.href
                }
              }}
            >
              {primaryAction.text}
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>

            <Button
              size='lg'
              variant='outline'
              className='px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600'
              onClick={() => (window.location.href = secondaryAction.href)}
            >
              {secondaryAction.text}
            </Button>
          </div>

          {showGitHub && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mt-8 flex justify-center'
            >
              <a
                href={gitHubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors'
              >
                <Github className='h-5 w-5' />
                <span>View on GitHub</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
