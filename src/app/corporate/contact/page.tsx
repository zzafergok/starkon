'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Textarea } from '@/components/core/textarea'
import { Card } from '@/components/core/card'

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>
  title: string
  info: string
  link?: string
}

export default function ContactPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: t('corporate.contact.info.email.title'),
      info: 'info@starkon.com',
      link: 'mailto:info@starkon.com',
    },
    {
      icon: Phone,
      title: t('corporate.contact.info.phone.title'),
      info: '+90 (212) 123 45 67',
      link: 'tel:+902121234567',
    },
    {
      icon: MapPin,
      title: t('corporate.contact.info.address.title'),
      info: t('corporate.contact.info.address.value'),
    },
    {
      icon: Clock,
      title: t('corporate.contact.info.hours.title'),
      info: t('corporate.contact.info.hours.value'),
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Form submitted:', formData)

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'
            >
              {t('corporate.contact.hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
            >
              {t('corporate.contact.hero.description')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className='p-6 text-center h-full'>
                  <info.icon className='h-8 w-8 text-blue-600 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                    >
                      {info.info}
                    </a>
                  ) : (
                    <p className='text-gray-600 dark:text-gray-400'>{info.info}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className='p-8'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                  {t('corporate.contact.form.title')}
                </h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                        {t('corporate.contact.form.name.label')}
                      </label>
                      <Input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder={t('corporate.contact.form.name.placeholder')}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                      >
                        {t('corporate.contact.form.email.label')}
                      </label>
                      <Input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder={t('corporate.contact.form.email.placeholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                      {t('corporate.contact.form.subject.label')}
                    </label>
                    <Input
                      type='text'
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder={t('corporate.contact.form.subject.placeholder')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                    >
                      {t('corporate.contact.form.message.label')}
                    </label>
                    <Textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder={t('corporate.contact.form.message.placeholder')}
                      rows={6}
                    />
                  </div>

                  <Button type='submit' disabled={isSubmitting} className='w-full' size='lg'>
                    {isSubmitting ? (
                      t('corporate.contact.form.submitting')
                    ) : (
                      <>
                        <Send className='h-4 w-4 mr-2' />
                        {t('corporate.contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Map/Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className='p-8 h-full'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                  {t('corporate.contact.office.title')}
                </h2>

                <div className='space-y-6'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      {t('corporate.contact.office.main.title')}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400'>{t('corporate.contact.office.main.address')}</p>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      {t('corporate.contact.office.hours.title')}
                    </h3>
                    <div className='space-y-1 text-gray-600 dark:text-gray-400'>
                      <p>{t('corporate.contact.office.hours.weekdays')}</p>
                      <p>{t('corporate.contact.office.hours.saturday')}</p>
                      <p>{t('corporate.contact.office.hours.sunday')}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                      {t('corporate.contact.office.social.title')}
                    </h3>
                    <div className='space-y-2'>
                      <a href='#' className='block text-blue-600 hover:text-blue-700'>
                        LinkedIn: /company/starkon
                      </a>
                      <a href='#' className='block text-blue-600 hover:text-blue-700'>
                        Twitter: @starkon_dev
                      </a>
                      <a href='#' className='block text-blue-600 hover:text-blue-700'>
                        GitHub: /starkon
                      </a>
                    </div>
                  </div>

                  {/* Placeholder for map */}
                  <div className='bg-gray-100 dark:bg-gray-800 rounded-lg h-48 flex items-center justify-center'>
                    <p className='text-gray-500 dark:text-gray-400'>{t('corporate.contact.office.map.placeholder')}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
