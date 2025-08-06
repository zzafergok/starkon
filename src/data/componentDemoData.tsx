/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Checkbox } from '@/components/core/checkbox'
import { Switch } from '@/components/core/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'
import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/core/loading-spinner'
import { Textarea } from '@/components/core/textarea'
import { Input } from '@/components/core/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/core/card'

// Simplified demo data structure
export const componentDemoData = [
  // Checkbox Component
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Seçim yapma işlemleri için kullanılan onay kutusu bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-3'>
        <div className='flex items-center space-x-2'>
          <Checkbox id='terms1' defaultChecked />
          <label htmlFor='terms1' className='text-sm font-medium'>
            Seçili Checkbox
          </label>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox id='terms2' />
          <label htmlFor='terms2' className='text-sm font-medium'>
            Seçili Değil
          </label>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox id='terms3' disabled />
          <label htmlFor='terms3' className='text-sm font-medium text-neutral-400'>
            Devre Dışı
          </label>
        </div>
      </div>
    ),
    code: `import { Checkbox } from '@/components/core/checkbox'

function Example() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms1" defaultChecked />
        <label htmlFor="terms1">Seçili Checkbox</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" />
        <label htmlFor="terms2">Seçili Değil</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms3" disabled />
        <label htmlFor="terms3">Devre Dışı</label>
      </div>
    </div>
  )
}`,
    usageExamples: [
      {
        title: 'Form Group',
        description: 'Form içinde checkbox grubu kullanımı',
        code: `<div className="space-y-2">
  <p className="font-medium">İlgi Alanlarınız:</p>
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Checkbox id="frontend" />
      <label htmlFor="frontend">Frontend Development</label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="backend" />
      <label htmlFor="backend">Backend Development</label>
    </div>
  </div>
</div>`,
        component: (
          <div className='space-y-2'>
            <p className='font-medium'>İlgi Alanlarınız:</p>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='frontend-demo' />
                <label htmlFor='frontend-demo'>Frontend Development</label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='backend-demo' />
                <label htmlFor='backend-demo'>Backend Development</label>
              </div>
            </div>
          </div>
        ),
      },
    ],
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Checkbox seçili mi (controlled)',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'Varsayılan seçili durumu (uncontrolled)',
        default: 'false',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Checkbox devre dışı mı',
        default: 'false',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        description: 'Seçim durumu değiştiğinde çağırılan fonksiyon',
      },
    ],
  },

  // Switch Component
  {
    id: 'switch',
    title: 'Switch',
    description: 'Açma/kapama işlemleri için kullanılan toggle switch bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <span className='text-sm font-medium'>Bildirimler</span>
          <Switch defaultChecked />
        </div>
        <div className='flex items-center justify-between gap-4'>
          <span className='text-sm font-medium'>Email Güncellemeleri</span>
          <Switch />
        </div>
        <div className='flex items-center justify-between gap-4'>
          <span className='text-sm font-medium text-neutral-400'>Devre Dışı</span>
          <Switch disabled />
        </div>
      </div>
    ),
    code: `import { Switch } from '@/components/core/switch'

function Example() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span>Bildirimler</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Email Güncellemeleri</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Devre Dışı</span>
        <Switch disabled />
      </div>
    </div>
  )
}`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Switch açık mı (controlled)',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'Varsayılan açık durumu (uncontrolled)',
        default: 'false',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Switch devre dışı mı',
        default: 'false',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        description: 'Durum değiştiğinde çağırılan fonksiyon',
      },
    ],
  },

  // Select Component
  {
    id: 'select',
    title: 'Select',
    description: 'Seçenekler arasından seçim yapmak için kullanılan dropdown bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-3 w-full max-w-sm'>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Ülke seçin' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='tr'>Türkiye</SelectItem>
            <SelectItem value='us'>Amerika</SelectItem>
            <SelectItem value='de'>Almanya</SelectItem>
            <SelectItem value='fr'>Fransa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
    code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Ülke seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">Türkiye</SelectItem>
        <SelectItem value="us">Amerika</SelectItem>
        <SelectItem value="de">Almanya</SelectItem>
        <SelectItem value="fr">Fransa</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
    props: [
      {
        name: 'value',
        type: 'string',
        description: 'Seçili değer (controlled)',
      },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'Varsayılan seçili değer (uncontrolled)',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Değer değiştiğinde çağırılan fonksiyon',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
      },
    ],
  },

  // Loading Components
  {
    id: 'loading-spinner',
    title: 'Loading Spinner',
    description: 'Çeşitli stillerde yükleme animasyonları',
    category: 'Geri Bildirim',
    status: 'stable',
    demoComponent: (
      <div className='flex items-center space-x-6'>
        <div className='text-center space-y-2'>
          <LoadingSpinner size='lg' />
          <p className='text-xs text-neutral-500'>Spinner</p>
        </div>
        <div className='text-center space-y-2'>
          <LoadingDots size='lg' />
          <p className='text-xs text-neutral-500'>Dots</p>
        </div>
        <div className='text-center space-y-2'>
          <LoadingPulse size='lg' />
          <p className='text-xs text-neutral-500'>Pulse</p>
        </div>
      </div>
    ),
    code: `import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/core/loading-spinner'

function Example() {
  return (
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-neutral-500 mt-2">Spinner</p>
      </div>
      <div className="text-center">
        <LoadingDots size="lg" />
        <p className="text-xs text-neutral-500 mt-2">Dots</p>
      </div>
      <div className="text-center">
        <LoadingPulse size="lg" />
        <p className="text-xs text-neutral-500 mt-2">Pulse</p>
      </div>
    </div>
  )
}`,
    props: [
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        description: 'Spinner boyutu',
        default: 'md',
      },
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'white' | 'accent'",
        description: 'Spinner renk varyantı',
        default: 'default',
      },
      {
        name: 'text',
        type: 'string',
        description: 'Spinner ile birlikte gösterilecek metin',
      },
    ],
  },

  // Button Component
  {
    id: 'button',
    title: 'Button',
    description: 'Farklı varyant ve boyutlarda etkileşimli buton bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='grid grid-cols-2 gap-4'>
        <Button variant='default'>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
      </div>
    ),
    code: `import { Button } from '@/components/core/button'

function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  )
}`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
        description: 'Buton görünüm varyantı',
        default: 'default',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'icon'",
        description: 'Buton boyutu',
        default: 'md',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        description: 'Butonu tam genişlik yapar',
        default: 'false',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Butonu devre dışı bırakır',
        default: 'false',
      },
    ],
  },

  // Card Component
  {
    id: 'card',
    title: 'Card',
    description: 'İçerik gruplamak ve organize etmek için kullanılan kart bileşeni',
    category: 'Layout',
    status: 'stable',
    demoComponent: (
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Kart Başlığı</CardTitle>
          <CardDescription>Bu bir örnek kart açıklamasıdır.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm'>Kart içeriği burada yer alır. Metin, resim, buton ve diğer bileşenler eklenebilir.</p>
        </CardContent>
        <div className='flex justify-between items-center p-6 pt-0'>
          <Button variant='ghost' size='sm'>
            İptal
          </Button>
          <Button size='sm'>Kaydet</Button>
        </div>
      </Card>
    ),
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/core/card'
import { Button } from '@/components/core/button'

function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Kart Başlığı</CardTitle>
        <CardDescription>
          Bu bir örnek kart açıklamasıdır.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Kart içeriği burada yer alır. Metin, resim, buton ve 
          diğer bileşenler eklenebilir.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">İptal</Button>
        <Button>Kaydet</Button>
      </CardFooter>
    </Card>
  )
}`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
        description: 'Kart görünüm varyantı',
        default: 'default',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        description: 'Kart padding boyutu',
        default: 'md',
      },
      {
        name: 'hover',
        type: "'none' | 'lift' | 'glow' | 'scale'",
        description: 'Hover efekti türü',
        default: 'none',
      },
    ],
  },

  // Input Component
  {
    id: 'input',
    title: 'Input',
    description: 'Metin girişi için kullanılan temel input bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <Input placeholder='Temel input...' />
        <Input placeholder='Error durumu...' variant='error' />
        <Input placeholder='Success durumu...' variant='success' />
        <Input placeholder='Devre dışı...' disabled />
      </div>
    ),
    code: `import { Input } from '@/components/core/input'

function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder="Temel input..." />
      <Input placeholder="Error durumu..." variant="error" />
      <Input placeholder="Success durumu..." variant="success" />
      <Input placeholder="Devre dışı..." disabled />
    </div>
  )
}`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'error' | 'success'",
        description: 'Input görünüm varyantı',
        default: 'default',
      },
      {
        name: 'inputSize',
        type: "'default' | 'sm' | 'lg'",
        description: 'Input boyutu',
        default: 'default',
      },
      {
        name: 'startIcon',
        type: 'React.ReactNode',
        description: 'Input başında gösterilecek icon',
      },
      {
        name: 'endIcon',
        type: 'React.ReactNode',
        description: 'Input sonunda gösterilecek icon',
      },
    ],
  },

  // Textarea Component
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'Çok satırlı metin girişi bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <Textarea placeholder='Temel textarea...' rows={3} />
        <Textarea placeholder='Karakter sayacı ile...' maxLength={100} rows={3} />
      </div>
    ),
    code: `import { Textarea } from '@/components/core/textarea'

function Example() {
  return (
    <div className="space-y-4">
      <Textarea 
        placeholder="Temel textarea..."
        rows={3}
      />
      <Textarea 
        placeholder="Karakter sayacı ile..."
        maxLength={100}
        showCount={true}
        rows={3}
      />
    </div>
  )
}`,
    props: [
      {
        name: 'maxLength',
        type: 'number',
        description: 'Maksimum karakter sayısı',
      },
      {
        name: 'showCount',
        type: 'boolean',
        description: 'Karakter sayacını göster',
        default: 'false',
      },
      {
        name: 'autoResize',
        type: 'boolean',
        description: 'İçerik boyutuna göre otomatik yeniden boyutlandır',
        default: 'false',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Hata durumu',
      },
    ],
  },

  // Badge Component
  {
    id: 'badge',
    title: 'Badge',
    description: 'Durum ve etiketleme için kullanılan badge bileşeni',
    category: 'Veri Gösterimi',
    status: 'stable',
    demoComponent: (
      <div className='flex items-center gap-2 flex-wrap'>
        <Badge variant='default'>Default</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='destructive'>Destructive</Badge>
        <Badge variant='outline'>Outline</Badge>
      </div>
    ),
    code: `import { Badge } from '@/components/core/badge'

function Example() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'destructive' | 'outline'",
        description: 'Badge görünüm varyantı',
        default: 'default',
      },
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg'",
        description: 'Badge boyutu',
        default: 'default',
      },
    ],
  },
]
