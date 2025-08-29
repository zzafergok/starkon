'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/core/button'
import { ServiceCard, BlogCard, TeamMember } from '@/components/corporate'
import { mockServices, mockBlogPosts, mockTeamMembers, mockCompanyInfo } from '@/lib/content'
import { ArrowRight, CheckCircle, Users, Award, Zap } from 'lucide-react'

export default function CorporateHomePage() {
  const featuredServices = mockServices.slice(0, 3)
  const latestBlogPosts = mockBlogPosts.slice(0, 2)
  const keyTeamMembers = mockTeamMembers.slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                {mockCompanyInfo.name}
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {mockCompanyInfo.description}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="px-8"
                  onClick={() => window.location.href = '/services'}
                >
                  Hizmetlerimiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8"
                  onClick={() => window.location.href = '/about'}
                >
                  Hakkımızda
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Başarı İstatistikleri</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Tamamlanan Projeler</span>
                        <span className="text-2xl font-bold">100+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mutlu Müşteriler</span>
                        <span className="text-2xl font-bold">50+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Yıllık Deneyim</span>
                        <span className="text-2xl font-bold">4+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Projelerinizde size değer katacak özelliklerimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Uzman Ekip',
                description: 'Alanında uzman, deneyimli ekibimizle her projede mükemmelliği hedefliyoruz.'
              },
              {
                icon: Award,
                title: 'Kaliteli Çözümler',
                description: 'İş süreçlerinizi optimize eden, sürdürülebilir teknoloji çözümleri sunuyoruz.'
              },
              {
                icon: Zap,
                title: 'Hızlı Teslimat',
                description: 'Belirlenen sürelerde projelerinizi eksiksiz şekilde teslim ediyoruz.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Hizmetlerimiz
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Sunduğumuz profesyonel hizmetlerle projelerinizi hayata geçirin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, index) => (
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
                  href={`/services/${service.slug}`}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/services'}
            >
              Tüm Hizmetleri Görüntüle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ekibimiz
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Projelerinizi hayata geçiren deneyimli ekibimizle tanışın
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {keyTeamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamMember
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                  social={member.social}
                  skills={member.skills}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/about'}
            >
              Tüm Ekibi Görüntüle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Son Blog Yazıları
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Teknoloji ve yazılım dünyasından güncel içerikler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {latestBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/blog'}
            >
              Tüm Yazıları Oku
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Projenizi Başlatalım
            </h2>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Fikirlerinizi hayata geçirmek için uzman ekibimizle iletişime geçin.
              Size özel çözümler geliştirerek hedeflerinize ulaşmanıza yardımcı olalım.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8"
                onClick={() => window.location.href = '/contact'}
              >
                Ücretsiz Danışmanlık
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8"
                onClick={() => window.location.href = '/gallery'}
              >
                Projelerimizi İncele
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}