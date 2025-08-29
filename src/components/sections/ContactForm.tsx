'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Textarea } from '@/components/core/textarea'
import { Label } from '@/components/core/label'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

interface ContactInfo {
  email?: string
  phone?: string
  address?: string
}

interface ContactFormProps {
  title?: string
  subtitle?: string
  contactInfo?: ContactInfo
}

export default function ContactForm({
  title = "Get in touch",
  subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  contactInfo = {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, City, State 12345"
  }
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <section id="contact" className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-green-900 dark:text-green-100">
                Message sent successfully!
              </h3>
              <p className="mt-2 text-green-700 dark:text-green-300">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-xl lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {contactInfo.email}
                    </span>
                  </div>
                )}
                
                {contactInfo.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {contactInfo.phone}
                    </span>
                  </div>
                )}
                
                {contactInfo.address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {contactInfo.address}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}