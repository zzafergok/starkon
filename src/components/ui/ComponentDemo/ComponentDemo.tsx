'use client'

import React, { useState } from 'react'

import { Copy, Check, ExternalLink } from 'lucide-react'

import { Badge } from '@/components/core/Badge/Badge'
import { Button } from '@/components/core/Button/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/Tabs/Tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/core/Dialog/Dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/Card/Card'

import { cn } from '@/lib/utils'

interface ComponentDemoProps {
  title: string
  description: string
  category: string
  status?: 'stable' | 'beta' | 'alpha' | 'deprecated'
  demoComponent: React.ReactNode
  code: string
  usageExamples?: Array<{
    title: string
    description: string
    code: string
    component?: React.ReactNode
  }>
  props?: Array<{
    name: string
    type: string
    description: string
    default?: string
    required?: boolean
  }>
}

export function ComponentDemo({
  title,
  description,
  category,
  status = 'stable',
  demoComponent,
  code,
  usageExamples = [],
  props = [],
}: ComponentDemoProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/50'
      case 'beta':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50'
      case 'alpha':
        return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800/50'
      case 'deprecated':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/50'
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-950/30 dark:text-neutral-300 dark:border-neutral-800/50'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Form & Input':
        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50',
      Navigasyon:
        'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800/50',
      'Geri Bildirim':
        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50',
      'Veri Gösterimi':
        'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800/50',
      Layout: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/30 dark:text-teal-300 dark:border-teal-800/50',
    }
    return (
      colors[category] ||
      'bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-950/30 dark:text-neutral-300 dark:border-neutral-800/50'
    )
  }

  return (
    <>
      {/* Ana Kart */}
      <Card className='group overflow-hidden border-neutral-200/80 dark:border-neutral-700/50 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm hover:shadow-xl hover:shadow-neutral-200/20 dark:hover:shadow-neutral-900/30 transition-all duration-500 hover:border-primary-200 dark:hover:border-primary-800/50'>
        <CardHeader className='pb-4 space-y-4'>
          {/* Üst Kısım - Başlık ve Aksiyon */}
          <div className='flex items-start justify-between gap-4'>
            <div className='space-y-3 flex-1 min-w-0'>
              {/* Başlık ve Status Badge */}
              <div className='flex items-start gap-3 flex-wrap'>
                <CardTitle className='text-xl font-semibold text-neutral-900 dark:text-neutral-50 leading-tight'>
                  {title}
                </CardTitle>
                <Badge className={cn('text-xs font-medium px-2.5 py-1 border shrink-0', getStatusColor(status))}>
                  {status}
                </Badge>
              </div>

              {/* Kategori Badge */}
              <div className='flex items-center gap-2'>
                <Badge className={cn('text-xs font-medium px-2.5 py-1 border', getCategoryColor(category))}>
                  {category}
                </Badge>
              </div>
            </div>

            {/* Genişlet Butonu */}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsFullscreen(true)}
              className='shrink-0 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-colors group-hover:opacity-100 opacity-70'
            >
              <ExternalLink className='h-4 w-4' />
            </Button>
          </div>

          {/* Açıklama */}
          <CardDescription className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Demo Alanı */}
          <div className='relative group/demo'>
            <div className='relative rounded-xl border border-neutral-200/80 dark:border-neutral-700/50 bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-800/50 dark:to-neutral-900/50 p-8 min-h-[140px] flex items-center justify-center overflow-hidden'>
              {/* Demo İçeriği */}
              <div className='relative z-10'>{demoComponent}</div>

              {/* Arka Plan Dekoratif Elementler */}
              <div className='absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover/demo:opacity-100 transition-opacity duration-500' />
              <div className='absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-500/20 opacity-0 group-hover/demo:opacity-100 transition-opacity duration-500 delay-100' />
              <div className='absolute bottom-6 left-6 w-1 h-1 rounded-full bg-accent-500/30 opacity-0 group-hover/demo:opacity-100 transition-opacity duration-500 delay-200' />
            </div>
          </div>

          {/* Tab İçerikleri */}
          <Tabs defaultValue='code' className='w-full'>
            <TabsList className='w-full justify-start bg-neutral-100/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50'>
              <TabsTrigger
                value='code'
                className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm font-medium'
              >
                Kod
              </TabsTrigger>
              {usageExamples.length > 0 && (
                <TabsTrigger
                  value='examples'
                  className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm font-medium'
                >
                  Örnekler ({usageExamples.length})
                </TabsTrigger>
              )}
              {props.length > 0 && (
                <TabsTrigger
                  value='props'
                  className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm font-medium'
                >
                  Props ({props.length})
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value='code' className='mt-6'>
              <div className='relative group'>
                <pre className='bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-xl p-6 overflow-x-auto text-sm leading-relaxed border border-neutral-700/50'>
                  <code>{code}</code>
                </pre>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => copyToClipboard(code, 'main')}
                  className='absolute top-3 right-3 hover:bg-neutral-800 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  {copiedCode === 'main' ? (
                    <Check className='h-4 w-4 text-emerald-400' />
                  ) : (
                    <Copy className='h-4 w-4 text-neutral-400' />
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Örnekler Tab */}
            {usageExamples.length > 0 && (
              <TabsContent value='examples' className='mt-6 space-y-8'>
                {usageExamples.map((example, index) => (
                  <div key={index} className='space-y-4'>
                    <div className='space-y-2'>
                      <h4 className='text-base font-semibold text-neutral-900 dark:text-neutral-50'>{example.title}</h4>
                      <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                        {example.description}
                      </p>
                    </div>

                    {example.component && (
                      <div className='rounded-xl border border-neutral-200/80 dark:border-neutral-700/50 bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-800/50 dark:to-neutral-900/50 p-6'>
                        {example.component}
                      </div>
                    )}

                    <div className='relative group'>
                      <pre className='bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-xl p-6 overflow-x-auto text-sm leading-relaxed border border-neutral-700/50'>
                        <code>{example.code}</code>
                      </pre>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => copyToClipboard(example.code, `example-${index}`)}
                        className='absolute top-3 right-3 hover:bg-neutral-800 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        {copiedCode === `example-${index}` ? (
                          <Check className='h-4 w-4 text-emerald-400' />
                        ) : (
                          <Copy className='h-4 w-4 text-neutral-400' />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            )}

            {/* Props Tab */}
            {props.length > 0 && (
              <TabsContent value='props' className='mt-6'>
                <div className='overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-700/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm'>
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                      <thead>
                        <tr className='border-b border-neutral-200/80 dark:border-neutral-700/50 bg-neutral-50/50 dark:bg-neutral-800/50'>
                          <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50'>Prop</th>
                          <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50'>Tip</th>
                          <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50'>
                            Açıklama
                          </th>
                          <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50'>
                            Varsayılan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.map((prop, index) => (
                          <tr
                            key={index}
                            className='border-b border-neutral-200/50 dark:border-neutral-700/30 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors'
                          >
                            <td className='p-4'>
                              <code className='font-mono text-xs bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded'>
                                {prop.name}
                              </code>
                              {prop.required && (
                                <span className='ml-2 text-xs text-red-500 dark:text-red-400 font-medium'>*</span>
                              )}
                            </td>
                            <td className='p-4'>
                              <code className='font-mono text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded'>
                                {prop.type}
                              </code>
                            </td>
                            <td className='p-4 text-neutral-700 dark:text-neutral-300 leading-relaxed'>
                              {prop.description}
                            </td>
                            <td className='p-4'>
                              {prop.default ? (
                                <code className='font-mono text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded'>
                                  {prop.default}
                                </code>
                              ) : (
                                <span className='text-neutral-400 dark:text-neutral-500 text-xs'>-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>

      {/* Modern Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent
          className={cn(
            'w-[95vw] h-[95vh] max-w-none p-0 gap-0 overflow-hidden',
            'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl',
            'border border-neutral-200/50 dark:border-neutral-700/50',
            'shadow-2xl shadow-neutral-900/10 dark:shadow-neutral-950/30',
          )}
        >
          {/* Modal Header */}
          <DialogHeader className='p-6 pb-4 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm'>
            <div className='flex items-start justify-between gap-6'>
              <div className='space-y-3 flex-1 min-w-0'>
                <div className='flex items-center gap-3 flex-wrap'>
                  <DialogTitle className='text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight'>
                    {title}
                  </DialogTitle>
                  <div className='flex items-center gap-2'>
                    <Badge className={cn('text-xs font-medium px-2.5 py-1 border', getCategoryColor(category))}>
                      {category}
                    </Badge>
                    <Badge className={cn('text-xs font-medium px-2.5 py-1 border', getStatusColor(status))}>
                      {status}
                    </Badge>
                  </div>
                </div>
                <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>{description}</p>
              </div>
            </div>
          </DialogHeader>

          {/* Modal İçerik Alanı */}
          <div className='flex-1 overflow-y-auto p-6 space-y-8'>
            {/* Büyük Demo Alanı */}
            <div className='relative'>
              <div className='relative rounded-2xl border border-neutral-200/80 dark:border-neutral-700/50 bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-800/50 dark:to-neutral-900/50 p-12 min-h-[280px] flex items-center justify-center overflow-hidden'>
                <div className='relative z-10 scale-110'>{demoComponent}</div>
              </div>
            </div>
            {/* Gelişmiş Tab Sistemi */}
            <Tabs defaultValue='code' className='w-full'>
              <TabsList className='w-full justify-start bg-neutral-100/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 p-1'>
                <TabsTrigger
                  value='code'
                  className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm font-medium px-6 py-2'
                >
                  Kod Örneği
                </TabsTrigger>
                {usageExamples.length > 0 && (
                  <TabsTrigger
                    value='examples'
                    className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm font-medium px-6 py-2'
                  >
                    Kullanım Örnekleri ({usageExamples.length})
                  </TabsTrigger>
                )}
                {props.length > 0 && (
                  <TabsTrigger
                    value='props'
                    className='data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm font-medium px-6 py-2'
                  >
                    API Referansı ({props.length})
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value='code' className='mt-8'>
                <div className='relative group'>
                  <pre className='bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-2xl p-8 overflow-x-auto text-sm leading-relaxed border border-neutral-700/50 font-mono'>
                    <code>{code}</code>
                  </pre>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => copyToClipboard(code, 'fullscreen-main')}
                    className='absolute top-4 right-4 hover:bg-neutral-800 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    {copiedCode === 'fullscreen-main' ? (
                      <Check className='h-4 w-4 text-emerald-400' />
                    ) : (
                      <Copy className='h-4 w-4 text-neutral-400' />
                    )}
                  </Button>
                </div>
              </TabsContent>

              {usageExamples.length > 0 && (
                <TabsContent value='examples' className='mt-8 space-y-10'>
                  {usageExamples.map((example, index) => (
                    <div key={index} className='space-y-6'>
                      <div className='space-y-2'>
                        <h4 className='text-lg font-semibold text-neutral-900 dark:text-neutral-50'>{example.title}</h4>
                        <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed'>{example.description}</p>
                      </div>

                      {example.component && (
                        <div className='rounded-2xl border border-neutral-200/80 dark:border-neutral-700/50 bg-gradient-to-br from-white to-neutral-50/50 dark:from-neutral-800/50 dark:to-neutral-900/50 p-8'>
                          {example.component}
                        </div>
                      )}

                      <div className='relative group'>
                        <pre className='bg-neutral-900 dark:bg-neutral-950 text-neutral-100 rounded-2xl p-8 overflow-x-auto text-sm leading-relaxed border border-neutral-700/50 font-mono'>
                          <code>{example.code}</code>
                        </pre>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => copyToClipboard(example.code, `fullscreen-example-${index}`)}
                          className='absolute top-4 right-4 hover:bg-neutral-800 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          {copiedCode === `fullscreen-example-${index}` ? (
                            <Check className='h-4 w-4 text-emerald-400' />
                          ) : (
                            <Copy className='h-4 w-4 text-neutral-400' />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              )}

              {props.length > 0 && (
                <TabsContent value='props' className='mt-8'>
                  <div className='overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-700/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm'>
                    <div className='overflow-x-auto'>
                      <table className='w-full'>
                        <thead>
                          <tr className='border-b border-neutral-200/80 dark:border-neutral-700/50 bg-neutral-50/50 dark:bg-neutral-800/50'>
                            <th className='text-left p-6 font-semibold text-neutral-900 dark:text-neutral-50'>
                              Property
                            </th>
                            <th className='text-left p-6 font-semibold text-neutral-900 dark:text-neutral-50'>Type</th>
                            <th className='text-left p-6 font-semibold text-neutral-900 dark:text-neutral-50'>
                              Description
                            </th>
                            <th className='text-left p-6 font-semibold text-neutral-900 dark:text-neutral-50'>
                              Default
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.map((prop, index) => (
                            <tr
                              key={index}
                              className='border-b border-neutral-200/50 dark:border-neutral-700/30 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors'
                            >
                              <td className='p-6'>
                                <code className='font-mono text-sm bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-lg'>
                                  {prop.name}
                                </code>
                                {prop.required && (
                                  <span className='ml-2 text-sm text-red-500 dark:text-red-400 font-medium'>*</span>
                                )}
                              </td>
                              <td className='p-6'>
                                <code className='font-mono text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg'>
                                  {prop.type}
                                </code>
                              </td>
                              <td className='p-6 text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-md'>
                                {prop.description}
                              </td>
                              <td className='p-6'>
                                {prop.default ? (
                                  <code className='font-mono text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg'>
                                    {prop.default}
                                  </code>
                                ) : (
                                  <span className='text-neutral-400 dark:text-neutral-500'>-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
