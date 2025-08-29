'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'
import { Linkedin, Mail, Github } from 'lucide-react'

import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'

interface SocialLinks {
  linkedin?: string
  email?: string
  github?: string
  twitter?: string
}

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  image?: string
  social?: SocialLinks
  skills?: string[]
  className?: string
}

export default function TeamMember({
  name,
  role,
  bio,
  image,
  social = {},
  skills = [],
  className = '',
}: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='p-6 text-center'>
          <div className='mb-6'>
            {image ? (
              <Image
                src={image}
                alt={name}
                width={96}
                height={96}
                className='w-24 h-24 rounded-full mx-auto object-cover'
              />
            ) : (
              <div className='w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto flex items-center justify-center'>
                <span className='text-2xl font-medium text-gray-600 dark:text-gray-300'>
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
            )}
          </div>

          <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-1'>{name}</h3>

          <p className='text-blue-600 dark:text-blue-400 font-medium mb-4'>{role}</p>

          <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4'>{bio}</p>

          {skills.length > 0 && (
            <div className='mb-6'>
              <div className='flex flex-wrap gap-2 justify-center'>
                {skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full'
                  >
                    {skill}
                  </span>
                ))}
                {skills.length > 3 && (
                  <span className='px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full'>
                    +{skills.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {Object.keys(social).length > 0 && (
            <div className='flex justify-center space-x-3'>
              {social.linkedin && (
                <Button
                  size='sm'
                  variant='outline'
                  className='p-2'
                  onClick={() => window.open(social.linkedin, '_blank')}
                >
                  <Linkedin className='h-4 w-4' />
                </Button>
              )}

              {social.email && (
                <Button
                  size='sm'
                  variant='outline'
                  className='p-2'
                  onClick={() => (window.location.href = `mailto:${social.email}`)}
                >
                  <Mail className='h-4 w-4' />
                </Button>
              )}

              {social.github && (
                <Button
                  size='sm'
                  variant='outline'
                  className='p-2'
                  onClick={() => window.open(social.github, '_blank')}
                >
                  <Github className='h-4 w-4' />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
