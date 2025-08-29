'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Palette, Settings, Zap, Shield, LucideIcon } from 'lucide-react'

import { ServiceCard } from '@/components/corporate'

import { mockServices } from '@/lib/content'

const serviceIcons: { [key: string]: LucideIcon } = {
  'web-gelistirme': Code,
  'mobil-uygulama': Smartphone,
  'ui-ux-tasarim': Palette,
  'sistem-yonetimi': Settings,
  'performans-optimizasyonu': Zap,
  guvenlik: Shield,
}

export default function ServicesPage() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'>
              Hizmetlerimiz
            </h1>
            <p className='mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Modern teknolojiler ile dijital çözümler sunuyoruz. Her projeye özel yaklaşımlarla işletmenizin
              ihtiyaçlarına en uygun çözümleri geliştiriyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {mockServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  icon={serviceIcons[service.slug] || Code}
                  href={`/services/${service.slug}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-blue-600 dark:bg-blue-700'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center'
          >
            <h2 className='text-3xl font-bold text-white sm:text-4xl'>Projenizi Hayata Geçirelim</h2>
            <p className='mt-6 text-xl text-blue-100 max-w-2xl mx-auto'>
              Hangi hizmete ihtiyaç duyuyorsanız, uzman ekibimizle birlikte en iyi çözümü bulalım.
            </p>
            <div className='mt-10'>
              <button
                className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
                onClick={() => (window.location.href = '/contact')}
              >
                Ücretsiz Konsültasyon Alın
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-16 bg-gray-50 dark:bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
              Çalışma Sürecimiz
            </h2>
            <p className='mt-6 text-lg text-gray-600 dark:text-gray-300'>Başarılı projeler için izlediğimiz adımlar</p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {[
              {
                step: '01',
                title: 'Keşif',
                description: 'İhtiyaçlarınızı analiz eder, projenizin gereksinimlerini belirleriz.',
              },
              {
                step: '02',
                title: 'Planlama',
                description: 'Detaylı proje planı ve zaman çizelgesi oluştururuz.',
              },
              {
                step: '03',
                title: 'Geliştirme',
                description: 'Projenizi en güncel teknolojilerle hayata geçiririz.',
              },
              {
                step: '04',
                title: 'Teslimat',
                description: 'Test süreçlerini tamamlayıp projenizi teslim ederiz.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4'>
                  {item.step}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{item.title}</h3>
                <p className='text-gray-600 dark:text-gray-300'>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
