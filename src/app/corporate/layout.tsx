import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/core/button'

function CorporateNavbar() {
  return (
    <nav className='bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='text-2xl font-bold text-blue-600'>
              Starkon
            </Link>
          </div>
          <div className='flex items-center space-x-8'>
            <Link href='/' className='text-gray-900 dark:text-white hover:text-blue-600'>
              Ana Sayfa
            </Link>
            <Link href='/corporate/about' className='text-gray-900 dark:text-white hover:text-blue-600'>
              Hakkımızda
            </Link>
            <Link href='/corporate/services' className='text-gray-900 dark:text-white hover:text-blue-600'>
              Hizmetler
            </Link>
            <Link href='/corporate/blog' className='text-gray-900 dark:text-white hover:text-blue-600'>
              Blog
            </Link>
            <Link href='/corporate/gallery' className='text-gray-900 dark:text-white hover:text-blue-600'>
              Galeri
            </Link>
            <Button>
              <Link href='/corporate/contact'>İletişim</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function CorporateFooter() {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>Starkon</h3>
            <p className='text-gray-300'>Modern web teknolojileri ile güçlü çözümler geliştiriyoruz.</p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Hızlı Linkler</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/corporate/about' className='text-gray-300 hover:text-white'>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href='/corporate/services' className='text-gray-300 hover:text-white'>
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href='/corporate/blog' className='text-gray-300 hover:text-white'>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>İletişim</h4>
            <ul className='space-y-2 text-gray-300'>
              <li>info@starkon.com</li>
              <li>+90 (212) 123 45 67</li>
              <li>İstanbul, Türkiye</li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Sosyal Medya</h4>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-300 hover:text-white'>
                Twitter
              </a>
              <a href='#' className='text-gray-300 hover:text-white'>
                LinkedIn
              </a>
              <a href='#' className='text-gray-300 hover:text-white'>
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-300'>
          <p>&copy; 2024 Starkon. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <CorporateNavbar />
      <main className='flex-1'>{children}</main>
      <CorporateFooter />
    </div>
  )
}
