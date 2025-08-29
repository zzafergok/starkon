'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Code,
  Palette,
  Users,
  Check,
  Star,
  ChevronDown,
  Play,
  Github,
} from 'lucide-react'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { Badge } from '@/components/core/badge'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for performance with Next.js 15, React 18, and modern build tools.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Built-in security best practices, JWT authentication, and data validation.',
    color: 'from-green-400 to-blue-500',
  },
  {
    icon: Palette,
    title: 'Beautiful UI',
    description: 'Radix UI components with Tailwind CSS and dark mode support.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: Code,
    title: 'Developer Experience',
    description: 'TypeScript, ESLint, Prettier, and hot reload for smooth development.',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Rocket,
    title: 'Production Ready',
    description: 'Deployment-ready configuration for Vercel, Netlify, and Docker.',
    color: 'from-red-400 to-orange-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'User management, role-based access, and team workspace features.',
    color: 'from-indigo-400 to-purple-500',
  },
]

const stats = [
  { number: '50+', label: 'Components', icon: Palette },
  { number: '100%', label: 'TypeScript', icon: Code },
  { number: '10k+', label: 'Downloads', icon: Zap },
  { number: '5⭐', label: 'Rating', icon: Star },
]

const testimonials = [
  {
    content:
      'This boilerplate saved us months of development time. The authentication system and components are production-ready.',
    author: { name: 'Sarah Chen', role: 'CTO', company: 'TechStart Inc.' },
    rating: 5,
  },
  {
    content:
      'Amazing developer experience. TypeScript setup and component library make building features incredibly fast.',
    author: { name: 'Michael Rodriguez', role: 'Full Stack Developer', company: 'Digital Solutions' },
    rating: 5,
  },
  {
    content: "The best Next.js starter I've used. Clean code, excellent documentation, everything just works!",
    author: { name: 'Emily Johnson', role: 'Product Manager', company: 'InnovateLab' },
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for personal projects and learning',
    features: ['Basic Components', 'Authentication', 'Dark Mode', 'TypeScript Support'],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Everything you need for professional projects',
    features: [
      'All Starter Features',
      'Advanced Components',
      'Template Library',
      'Premium Support',
      'Commercial License',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$199',
    description: 'For teams and large-scale applications',
    features: ['All Pro Features', 'Custom Development', 'Priority Support', 'Team Training', 'White Label License'],
    popular: false,
  },
]

export default function LandingPage() {
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
                🚀 Version 2.0 Now Available
              </Badge>

              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight'>
                <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  Build Amazing
                </span>
                <br />
                <span className='text-gray-900 dark:text-white'>Products Fast</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'
            >
              The most comprehensive Next.js boilerplate with authentication, beautiful UI components, and everything
              you need to launch your SaaS product in days, not months.
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
                Get Started Now
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='px-8 py-4 text-lg'
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Github className='h-5 w-5 mr-2' />
                View on GitHub
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto'
            >
              {stats.map((stat, _index) => (
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
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>Everything You Need to Build</h2>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Pre-built components, authentication, database integration, and deployment ready configuration.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
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
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>Simple, Transparent Pricing</h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>Choose the plan that's right for your project</p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {pricingPlans.map((plan, index) => (
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
                      <Badge className='bg-blue-500 text-white px-4 py-1'>Most Popular</Badge>
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
                      {plan.price === 'Free' ? 'Get Started' : 'Purchase Now'}
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
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>What Developers Are Saying</h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>
              Join thousands of developers who trust Starkon for their projects
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
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
            <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>Frequently Asked Questions</h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>Everything you need to know about Starkon</p>
          </motion.div>

          <div className='space-y-6'>
            {[
              {
                question: "What's included in the boilerplate?",
                answer:
                  'Authentication system, 50+ UI components, dashboard templates, database integration, and deployment configuration.',
              },
              {
                question: 'Can I use this for commercial projects?',
                answer:
                  'Yes! All paid plans include commercial licenses. The free version is for personal and open-source projects.',
              },
              {
                question: 'Do you provide support?',
                answer:
                  'Pro and Enterprise plans include email support. Enterprise customers get priority support and custom development assistance.',
              },
              {
                question: 'How often do you update the boilerplate?',
                answer: 'We release updates monthly with new components, bug fixes, and latest Next.js features.',
              },
            ].map((faq, index) => (
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

            <h2 className='text-4xl sm:text-5xl font-bold mb-6'>Ready to Build Something Amazing?</h2>

            <p className='text-xl mb-8 text-blue-100'>
              Join thousands of developers who have already shipped products with Starkon. Start building your next
              project today.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300'
                onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Rocket className='h-5 w-5 mr-2' />
                Start Building Now
              </Button>

              <Button
                variant='outline'
                size='lg'
                className='px-8 py-4 text-lg border-white text-white hover:bg-white/10'
                onClick={() => window.open('https://github.com/zzafergok/starkon', '_blank')}
              >
                <Github className='h-5 w-5 mr-2' />
                View Source Code
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
