'use client'

import { Hero, Features, Testimonials, CTA, ContactForm } from '@/components/sections'

export default function LandingPage() {
  return (
    <main className='min-h-screen'>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <ContactForm />
    </main>
  )
}
