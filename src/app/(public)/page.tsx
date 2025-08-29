'use client'

import React from 'react'
import { Hero, Features, Testimonials, CTA } from '@/components/sections'

export default function LandingPage() {
  return (
    <div className='min-h-screen'>
      <section id='hero'>
        <Hero
          title='Build Amazing Products Fast'
          subtitle='Enterprise-Ready Next.js Boilerplate'
          description='Create production-ready web applications with our comprehensive Next.js boilerplate. Everything you need to launch your project quickly and efficiently.'
          primaryCTA={{ text: 'Get Started', href: '#contact' }}
          secondaryCTA={{ text: 'Learn More', href: '#features' }}
        />
      </section>
      
      <section id='features'>
        <Features />
      </section>
      
      <section id='testimonials'>
        <Testimonials />
      </section>
      
      <section id='contact'>
        <CTA />
      </section>
    </div>
  )
}