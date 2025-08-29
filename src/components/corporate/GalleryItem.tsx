'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ZoomIn, ExternalLink } from 'lucide-react'
import { Button } from '@/components/core/button'

interface GalleryItemProps {
  title: string
  description?: string
  image: string
  category?: string
  projectUrl?: string
  className?: string
}

export default function GalleryItem({
  title,
  description,
  image,
  category,
  projectUrl,
  className = '',
}: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative'>
        <Image
          src={image}
          alt={title}
          width={400}
          height={256}
          className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110'
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className='absolute inset-0 bg-black/60 flex items-center justify-center'
        >
          <div className='text-center text-white p-4'>
            {category && (
              <span className='inline-block px-3 py-1 bg-blue-600 text-xs font-medium rounded-full mb-2'>
                {category}
              </span>
            )}

            <h3 className='text-xl font-semibold mb-2'>{title}</h3>

            {description && <p className='text-sm text-gray-200 mb-4 line-clamp-2'>{description}</p>}

            <div className='flex gap-2 justify-center'>
              <Button
                size='sm'
                variant='secondary'
                className='bg-white/20 backdrop-blur-sm hover:bg-white/30'
                onClick={() => {
                  // Zoom functionality could be implemented here
                  console.log('Zoom image:', title)
                }}
              >
                <ZoomIn className='h-4 w-4 mr-1' />
                Yakınlaştır
              </Button>

              {projectUrl && (
                <Button
                  size='sm'
                  variant='secondary'
                  className='bg-white/20 backdrop-blur-sm hover:bg-white/30'
                  onClick={() => window.open(projectUrl, '_blank')}
                >
                  <ExternalLink className='h-4 w-4 mr-1' />
                  Projeyi Gör
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
