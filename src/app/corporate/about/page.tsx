'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Building, Users, Calendar, MapPin } from 'lucide-react'

import { TeamMember } from '@/components/corporate'
import { Card, CardContent } from '@/components/core/card'

import { mockCompanyInfo, mockTeamMembers } from '@/lib/content'

export default function AboutPage() {
  const { t } = useTranslation()

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
              {t('corporate.about.title')}
            </h1>
            <p className='mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              {t('corporate.about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {[
              { icon: Calendar, label: t('corporate.about.stats.founded'), value: mockCompanyInfo.founded },
              { icon: Users, label: t('corporate.about.stats.employees'), value: mockCompanyInfo.employees },
              { icon: MapPin, label: t('corporate.about.stats.location'), value: mockCompanyInfo.location },
              { icon: Building, label: t('corporate.about.stats.projects'), value: '100+' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className='p-6 text-center'>
                      <Icon className='h-8 w-8 text-blue-600 mx-auto mb-4' />
                      <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>{stat.value}</div>
                      <div className='text-gray-600 dark:text-gray-400'>{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-16 bg-gray-50 dark:bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className='h-full'>
                <CardContent className='p-8'>
                  <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
                    {t('corporate.about.mission.title')}
                  </h2>
                  <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {t('corporate.about.mission.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className='h-full'>
                <CardContent className='p-8'>
                  <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
                    {t('corporate.about.vision.title')}
                  </h2>
                  <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {t('corporate.about.vision.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
              {t('corporate.about.team.title')}
            </h2>
            <p className='mt-6 text-lg text-gray-600 dark:text-gray-300'>{t('corporate.about.team.description')}</p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {mockTeamMembers.map((member, index) => (
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
        </div>
      </section>
    </div>
  )
}
