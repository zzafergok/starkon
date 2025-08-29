'use client'

import Image from 'next/image'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Testimonial {
  content: string
  author: {
    name: string
    role: string
    company: string
    image?: string
  }
  rating: number
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    content:
      'This boilerplate saved us months of development time. The authentication system and UI components are production-ready out of the box.',
    author: {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'TechStart Inc.',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    rating: 5,
  },
  {
    content:
      'Amazing developer experience. The TypeScript setup and component library make building features incredibly fast and reliable.',
    author: {
      name: 'Michael Rodriguez',
      role: 'Full Stack Developer',
      company: 'Digital Solutions',
      image:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    rating: 5,
  },
  {
    content:
      "The best Next.js starter I've used. Clean code, excellent documentation, and everything just works. Highly recommended!",
    author: {
      name: 'Emily Johnson',
      role: 'Product Manager',
      company: 'InnovateLab',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex gap-1'>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

export default function Testimonials({
  title = 'What people are saying',
  subtitle = "Don't just take our word for it. Here's what developers and teams are saying about our boilerplate.",
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  return (
    <section className='py-24 bg-gray-50 dark:bg-gray-800'>
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

        <div className='mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700'
              >
                <div className='mb-4'>
                  <StarRating rating={testimonial.rating} />
                </div>

                <blockquote className='text-gray-900 dark:text-white'>
                  <p>"{testimonial.content}"</p>
                </blockquote>

                <figcaption className='mt-6 flex items-center gap-x-4'>
                  {testimonial.author.image ? (
                    <Image
                      className='h-10 w-10 rounded-full bg-gray-50'
                      src={testimonial.author.image}
                      alt={testimonial.author.name}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className='h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center'>
                      <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        {testimonial.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className='font-semibold text-gray-900 dark:text-white'>{testimonial.author.name}</div>
                    <div className='text-gray-600 dark:text-gray-400'>
                      {testimonial.author.role} at {testimonial.author.company}
                    </div>
                  </div>
                </figcaption>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
