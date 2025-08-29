'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Zap,
  Code,
  Star,
  Play,
  Users,
  Check,
  Shield,
  Rocket,
  Github,
  Palette,
  Sparkles,
  ChevronDown,
} from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'

export default function LandingPage() {
  const { t } = useTranslation()

  const localizedFeatures = [
    {
      icon: Zap,
      title: t('landing.features.fast.title'),
      description: t('landing.features.fast.description'),
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: t('landing.features.secure.title'),
      description: t('landing.features.secure.description'),
      color: 'from-green-400 to-blue-500',
    },
    {
      icon: Palette,
      title: t('landing.features.ui.title'),
      description: t('landing.features.ui.description'),
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Code,
      title: t('landing.features.developer.title'),
      description: t('landing.features.developer.description'),
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Rocket,
      title: t('landing.features.production.title'),
      description: t('landing.features.production.description'),
      color: 'from-red-400 to-orange-500',
    },
    {
      icon: Users,
      title: t('landing.features.team.title'),
      description: t('landing.features.team.description'),
      color: 'from-indigo-400 to-purple-500',
    },
  ]

  const localizedStats = [
    { number: '50+', label: t('landing.stats.components'), icon: Palette },
    { number: '100%', label: t('landing.stats.typescript'), icon: Code },
    { number: '10k+', label: t('landing.stats.downloads'), icon: Zap },
    { number: '5⭐', label: t('landing.stats.rating'), icon: Star },
  ]

  const localizedPricingPlans = [
    {
      name: t('landing.pricing.starter.name'),
      price: t('landing.pricing.starter.price'),
      description: t('landing.pricing.starter.description'),
      features: [
        t('landing.pricing.starter.features.components'),
        t('landing.pricing.starter.features.auth'),
        t('landing.pricing.starter.features.darkMode'),
        t('landing.pricing.starter.features.typescript'),
      ],
      popular: false,
    },
    {
      name: t('landing.pricing.pro.name'),
      price: t('landing.pricing.pro.price'),
      description: t('landing.pricing.pro.description'),
      features: [
        t('landing.pricing.pro.features.starter'),
        t('landing.pricing.pro.features.advanced'),
        t('landing.pricing.pro.features.templates'),
        t('landing.pricing.pro.features.support'),
        t('landing.pricing.pro.features.license'),
      ],
      popular: true,
    },
    {
      name: t('landing.pricing.enterprise.name'),
      price: t('landing.pricing.enterprise.price'),
      description: t('landing.pricing.enterprise.description'),
      features: [
        t('landing.pricing.enterprise.features.pro'),
        t('landing.pricing.enterprise.features.custom'),
        t('landing.pricing.enterprise.features.priority'),
        t('landing.pricing.enterprise.features.training'),
        t('landing.pricing.enterprise.features.whiteLabel'),
      ],
      popular: false,
    },
  ]

  const localizedTestimonials = [
    {
      content: t('landing.testimonials.testimonial1.content'),
      author: {
        name: t('landing.testimonials.testimonial1.author'),
        role: t('landing.testimonials.testimonial1.role'),
        company: t('landing.testimonials.testimonial1.company'),
      },
      rating: 5,
    },
    {
      content: t('landing.testimonials.testimonial2.content'),
      author: {
        name: t('landing.testimonials.testimonial2.author'),
        role: t('landing.testimonials.testimonial2.role'),
        company: t('landing.testimonials.testimonial2.company'),
      },
      rating: 5,
    },
    {
      content: t('landing.testimonials.testimonial3.content'),
      author: {
        name: t('landing.testimonials.testimonial3.author'),
        role: t('landing.testimonials.testimonial3.role'),
        company: t('landing.testimonials.testimonial3.company'),
      },
      rating: 5,
    },
  ]

  const localizedFaqs = [
    {
      question: t('landing.faq.question1'),
      answer: t('landing.faq.answer1'),
    },
    {
      question: t('landing.faq.question2'),
      answer: t('landing.faq.answer2'),
    },
    {
      question: t('landing.faq.question3'),
      answer: t('landing.faq.answer3'),
    },
    {
      question: t('landing.faq.question4'),
      answer: t('landing.faq.answer4'),
    },
  ]

  return (
    <div className='min-h-screen overflow-hidden'>
      {/* Hero Section */}
      <section
        id='hero'
        className='relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20'
      >
        {/* Animated Background */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl'
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl'
          />
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className='mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                🚀 {t('landing.hero.badge')}
              </Badge>

              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight'>
                <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  {t('landing.hero.title1')}
                </span>
                <br />
                <span className='text-gray-900 dark:text-white'>{t('landing.hero.title2')}</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'
            >
              {t('landing.hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'
            >
              <Button
                size='lg'
                className='px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300'
                onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className='h-5 w-5 mr-2' />
                {t('landing.hero.getStarted')}
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='px-8 py-4 text-lg'
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Github className='h-5 w-5 mr-2' />
                {t('landing.hero.viewGithub')}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto'
            >
              {localizedStats.map((stat, _index) => (
                <motion.div key={stat.label} whileHover={{ scale: 1.05 }} className='text-center'>
                  <stat.icon className='h-8 w-8 text-blue-600 mx-auto mb-2' />
                  <div className='text-3xl font-bold text-gray-900 dark:text-white mb-1'>{stat.number}</div>
                  <div className='text-sm text-gray-600 dark:text-gray-400'>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
        >
          <ChevronDown className='h-6 w-6 text-gray-400' />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-24 bg-white dark:bg-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('landing.features.sectionTitle')}
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              {t('landing.features.sectionDescription')}
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {localizedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className='h-full group hover:shadow-xl transition-all duration-300'>
                  <CardContent className='p-8'>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className='h-8 w-8 text-white' />
                    </div>
                    <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>{feature.title}</h3>
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id='pricing' className='py-24 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('landing.pricing.sectionTitle')}
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>{t('landing.pricing.sectionDescription')}</p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {localizedPricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className={`relative h-full ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}>
                  {plan.popular && (
                    <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                      <Badge className='bg-blue-500 text-white px-4 py-1'>{t('landing.pricing.mostPopular')}</Badge>
                    </div>
                  )}

                  <CardContent className='p-8 text-center'>
                    <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                    <div className='text-4xl font-bold mb-2'>
                      {plan.price}
                      {plan.price !== 'Free' && <span className='text-lg text-gray-500'>/once</span>}
                    </div>
                    <p className='text-gray-600 dark:text-gray-400 mb-6'>{plan.description}</p>

                    <ul className='space-y-3 mb-8'>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className='flex items-center'>
                          <Check className='h-5 w-5 text-green-500 mr-3' />
                          <span className='text-sm'>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.price === t('landing.pricing.starter.price')
                        ? t('landing.pricing.getStarted')
                        : t('landing.pricing.purchaseNow')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id='testimonials' className='py-24 bg-white dark:bg-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {t('landing.testimonials.sectionTitle')}
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>{t('landing.testimonials.sectionDescription')}</p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {localizedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className='h-full'>
                  <CardContent className='p-8'>
                    <div className='flex mb-4'>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className='h-5 w-5 text-yellow-400 fill-current' />
                      ))}
                    </div>

                    <blockquote className='text-gray-700 dark:text-gray-300 mb-6 italic'>
                      "{testimonial.content}"
                    </blockquote>

                    <div className='flex items-center'>
                      <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                        {testimonial.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className='font-semibold text-gray-900 dark:text-white'>{testimonial.author.name}</div>
                        <div className='text-sm text-gray-600 dark:text-gray-400'>
                          {testimonial.author.role} at {testimonial.author.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id='faq' className='py-24 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>{t('landing.faq.sectionTitle')}</h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>{t('landing.faq.sectionDescription')}</p>
          </motion.div>

          <div className='space-y-6'>
            {localizedFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-lg font-semibold mb-3 text-gray-900 dark:text-white'>{faq.question}</h3>
                    <p className='text-gray-600 dark:text-gray-300'>{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id='contact'
        className='py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-black/20' />

        <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className='h-16 w-16 mx-auto mb-6 text-yellow-300' />

            <h2 className='text-4xl sm:text-5xl font-bold mb-6'>{t('landing.cta.title')}</h2>

            <p className='text-xl mb-8 text-blue-100'>{t('landing.cta.description')}</p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300'
                onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Rocket className='h-5 w-5 mr-2' />
                {t('landing.cta.startBuilding')}
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='px-8 py-4 text-lg border-white text-white hover:bg-white/10'
                onClick={() => window.open('https://github.com/zzafergok/starkon', '_blank')}
              >
                <Github className='h-5 w-5 mr-2' />
                {t('landing.cta.viewSource')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full'
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className='absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full'
        />
      </section>
    </div>
  )
}
