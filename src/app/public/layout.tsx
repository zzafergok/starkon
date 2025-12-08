'use client'

import React from 'react'

import { LandingFooter } from './components/landing-footer'
import { LandingNavbar } from './components/landing-navbar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <LandingNavbar />
      <main className='flex-1 pt-16'>{children}</main>
      <LandingFooter />
    </div>
  )
}
