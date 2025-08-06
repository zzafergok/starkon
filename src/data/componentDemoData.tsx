/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

// Import all core components
import { Accordion } from '@/components/core/accordion'
import { Alert, AlertTitle, AlertDescription } from '@/components/core/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/core/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/core/avatar'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/core/card'
import { Checkbox } from '@/components/core/checkbox'

import { DataGrid, createSelectionColumn, createActionsColumn } from '@/components/core/data-grid'
import { DataTable } from '@/components/core/data-table'
import { DatePicker } from '@/components/core/date-picker'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/core/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/core/dropdown'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/core/loading-spinner'
import { ModernDatePicker } from '@/components/core/modern-date-picker'
import { MonthYearPicker } from '@/components/core/month-year-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/core/popover'
import { Progress } from '@/components/core/progress'
import { RichTextEditor } from '@/components/core/rich-text-editor'
import { ScrollArea } from '@/components/core/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'
import { Separator } from '@/components/core/separator'
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard } from '@/components/core/skeleton'
import { Slider } from '@/components/core/slider'
import { Switch } from '@/components/core/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs'
import { Textarea } from '@/components/core/textarea'
import { TooltipComponent, TooltipProvider } from '@/components/core/tooltip'

// Icons
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  Check,
  ChevronDown,
  Copy,
  Edit,
  Eye,
  Heart,
  Home,
  Info,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  User,
  X,
} from 'lucide-react'

// Sample data for tables
const sampleUsers = [
  { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Ayşe Kaya', email: 'ayse@example.com', role: 'User', status: 'active' },
  { id: '3', name: 'Mehmet Demir', email: 'mehmet@example.com', role: 'User', status: 'inactive' },
  { id: '4', name: 'Fatma Özkan', email: 'fatma@example.com', role: 'Editor', status: 'active' },
  { id: '5', name: 'Ali Şen', email: 'ali@example.com', role: 'User', status: 'pending' },
]

const tableColumns: Array<import('@/components/core/data-grid').DataGridColumn<Record<string, any>>> = [
  createSelectionColumn(),
  {
    accessorKey: 'name',
    header: 'Ad Soyad',
    cell: ({ row }: { row: any }) => (
      <div className='flex items-center space-x-2'>
        <Avatar className='h-8 w-8'>
          <AvatarFallback>
            {row.original.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <span className='font-medium'>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'E-posta',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }: { row: any }) => (
      <Badge variant={row.original.role === 'Admin' ? 'destructive' : 'secondary'}>{row.original.role}</Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Durum',
    cell: ({ row }: { row: any }) => (
      <Badge
        variant={
          row.original.status === 'active' ? 'default' : row.original.status === 'inactive' ? 'destructive' : 'outline'
        }
      >
        {row.original.status === 'active' ? 'Aktif' : row.original.status === 'inactive' ? 'Pasif' : 'Beklemede'}
      </Badge>
    ),
  },
  createActionsColumn([
    {
      label: 'Düzenle',
      icon: <Edit className='w-4 h-4 mr-2' />,
      onClick: (row) => console.log('Düzenle:', row.name),
      variant: 'outline',
    },
    {
      label: 'Sil',
      icon: <Trash2 className='w-4 h-4 mr-2' />,
      onClick: (row) => console.log('Sil:', row.name),
      variant: 'destructive',
    },
  ]),
]

// Component demo data
export const componentDemoData = [
  // Accordion Component
  {
    id: 'accordion',
    title: 'Accordion',
    description:
      'Genişletilebilir içerik bölümleri için kullanılan accordion bileşeni. Framer Motion animasyonları ile gelişmiş kullanıcı deneyimi sunar.',
    category: 'Layout',
    status: 'stable',
    demoComponent: (
      <div className='w-full'>
        <Accordion.Root
          defaultValue={['item-1']}
          className='border rounded-lg border-neutral-200 dark:border-neutral-700'
        >
          <Accordion.Item value='item-1'>
            <Accordion.Trigger>Kişisel Bilgiler</Accordion.Trigger>
            <Accordion.Content>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Ad, soyad, e-posta ve telefon bilgilerinizi bu bölümde güncelleyebilirsiniz. Değişiklikler anında
                kaydedilir.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value='item-2'>
            <Accordion.Trigger>Güvenlik Ayarları</Accordion.Trigger>
            <Accordion.Content>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                Şifre değiştirme, iki faktörlü kimlik doğrulama ve güvenlik soruları ayarlarınız.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value='item-3'>
            <Accordion.Trigger>Bildirim Tercihleri</Accordion.Trigger>
            <Accordion.Content>
              <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                E-posta, SMS ve uygulama bildirimleri için tercihlerinizi belirleyin.
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    ),
    code: `import { Accordion } from '@/components/core/accordion'

function Example() {
  return (
    <Accordion.Root defaultValue={['item-1']}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Kişisel Bilgiler</Accordion.Trigger>
        <Accordion.Content>
          <p>Ad, soyad, e-posta ve telefon bilgilerinizi buradan güncelleyebilirsiniz.</p>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Güvenlik Ayarları</Accordion.Trigger>
        <Accordion.Content>
          <p>Şifre değiştirme ve iki faktörlü kimlik doğrulama ayarları.</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}`,
    usageExamples: [
      {
        title: 'Multiple Accordion',
        description: 'Aynı anda birden fazla bölümün açılabildiği accordion',
        code: `<Accordion.Root type="multiple" defaultValue={['item-1', 'item-2']}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Bölüm 1</Accordion.Trigger>
    <Accordion.Content>İçerik 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Bölüm 2</Accordion.Trigger>
    <Accordion.Content>İçerik 2</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`,
        component: (
          <Accordion.Root
            type='multiple'
            defaultValue={['item-1']}
            className='border rounded-lg border-neutral-200 dark:border-neutral-700 w-full'
          >
            <Accordion.Item value='item-1'>
              <Accordion.Trigger>Açık Bölüm</Accordion.Trigger>
              <Accordion.Content>
                <p className='text-sm text-neutral-600 dark:text-neutral-400'>Bu bölüm varsayılan olarak açık.</p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value='item-2'>
              <Accordion.Trigger>Diğer Bölüm</Accordion.Trigger>
              <Accordion.Content>
                <p className='text-sm text-neutral-600 dark:text-neutral-400'>Bu bölümü de açabilirsiniz.</p>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        ),
      },
    ],
    props: [
      {
        name: 'type',
        type: "'single' | 'multiple'",
        description: 'Tek veya çoklu açılabilir mod',
        default: 'single',
      },
      {
        name: 'defaultValue',
        type: 'string[]',
        description: 'Varsayılan açık olan item değerleri',
      },
      {
        name: 'value',
        type: 'string[]',
        description: 'Controlled mod için açık olan item değerleri',
      },
      {
        name: 'onValueChange',
        type: '(value: string[]) => void',
        description: 'Değer değişikliği callback fonksiyonu',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        description: "Son kalan item'ın da kapatılabilir olup olmadığı",
        default: 'true',
      },
    ],
  },

  // Alert Component
  {
    id: 'alert',
    title: 'Alert',
    description:
      'Kullanıcılara önemli mesajları iletmek için kullanılan alert bileşeni. Farklı türlerde uyarılar gösterebilir.',
    category: 'Geri Bildirim',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full'>
        <Alert>
          <Info className='h-4 w-4' />
          <AlertTitle>Bilgilendirme</AlertTitle>
          <AlertDescription>Bu bir bilgilendirme mesajıdır. Önemli detayları içerir.</AlertDescription>
        </Alert>

        <Alert variant='warning'>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>Uyarı</AlertTitle>
          <AlertDescription>Dikkat edilmesi gereken bir durum var.</AlertDescription>
        </Alert>

        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Hata</AlertTitle>
          <AlertDescription>İşlem gerçekleştirilemedi. Lütfen tekrar deneyin.</AlertDescription>
        </Alert>
      </div>
    ),
    code: `import { Alert, AlertTitle, AlertDescription } from '@/components/core/alert'
import { Info, AlertTriangle, AlertCircle } from 'lucide-react'

function Example() {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Bilgilendirme</AlertTitle>
        <AlertDescription>Bu bir bilgilendirme mesajıdır.</AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Uyarı</AlertTitle>
        <AlertDescription>Dikkat edilmesi gereken bir durum var.</AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Hata</AlertTitle>
        <AlertDescription>İşlem gerçekleştirilemedi.</AlertDescription>
      </Alert>
    </div>
  )
}`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'warning' | 'info'",
        description: 'Alert görünüm varyantı',
        default: 'default',
      },
    ],
  },

  // Alert Dialog Component
  {
    id: 'alert-dialog',
    title: 'Alert Dialog',
    description: 'Kritik işlemler için onay alınan modal dialog bileşeni. Kullanıcı etkileşimi gerektirir.',
    category: 'Overlay',
    status: 'stable',
    demoComponent: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive'>Hesabı Sil</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hesabınızı silmek istediğinizden emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction>Evet, Sil</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/core/alert-dialog'

function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Hesabı Sil</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hesabınızı silmek istediğinizden emin misiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecektir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction>Evet, Sil</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Dialog açık mı (controlled)',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Dialog açık durumu değiştiğinde çağırılan fonksiyon',
      },
    ],
  },

  // Avatar Component
  {
    id: 'avatar',
    title: 'Avatar',
    description:
      'Kullanıcı profil resimleri ve avatarları için kullanılan bileşen. Fallback ve farklı boyut seçenekleri sunar.',
    category: 'Veri Gösterimi',
    status: 'stable',
    demoComponent: (
      <div className='flex items-center space-x-4'>
        <Avatar className='h-16 w-16'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className='h-12 w-12'>
          <AvatarFallback>AY</AvatarFallback>
        </Avatar>
        <Avatar className='h-10 w-10'>
          <AvatarFallback className='bg-primary text-primary-foreground'>MD</AvatarFallback>
        </Avatar>
        <Avatar className='h-8 w-8'>
          <AvatarFallback className='bg-secondary'>FÖ</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `import { Avatar, AvatarImage, AvatarFallback } from '@/components/core/avatar'

function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback>AY</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary text-primary-foreground">MD</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
    usageExamples: [
      {
        title: 'Avatar Grubu',
        description: 'Birden fazla kullanıcıyı temsil eden avatar grubu',
        code: `<div className="flex -space-x-2">
  <Avatar className="h-10 w-10 border-2 border-white">
    <AvatarFallback>AY</AvatarFallback>
  </Avatar>
  <Avatar className="h-10 w-10 border-2 border-white">
    <AvatarFallback>MD</AvatarFallback>
  </Avatar>
  <Avatar className="h-10 w-10 border-2 border-white">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>`,
        component: (
          <div className='flex -space-x-2'>
            <Avatar className='h-10 w-10 border-2 border-white dark:border-neutral-800'>
              <AvatarFallback>AY</AvatarFallback>
            </Avatar>
            <Avatar className='h-10 w-10 border-2 border-white dark:border-neutral-800'>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className='h-10 w-10 border-2 border-white dark:border-neutral-800'>
              <AvatarFallback className='bg-neutral-200 dark:bg-neutral-700'>+3</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
    ],
    props: [
      {
        name: 'src',
        type: 'string',
        description: "Avatar resmi URL'i (AvatarImage için)",
      },
      {
        name: 'alt',
        type: 'string',
        description: 'Avatar resmi alternatif metni',
      },
    ],
  },

  // Badge Component
  {
    id: 'badge',
    title: 'Badge',
    description: 'Durum ve etiketleme için kullanılan badge bileşeni. Farklı varyant ve boyut seçenekleri sunar.',
    category: 'Veri Gösterimi',
    status: 'stable',
    demoComponent: (
      <div className='flex items-center gap-2 flex-wrap'>
        <Badge variant='default'>Default</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='destructive'>Destructive</Badge>
        <Badge variant='outline'>Outline</Badge>
        <Badge size='sm'>Küçük</Badge>
        <Badge size='lg'>Büyük</Badge>
      </div>
    ),
    code: `import { Badge } from '@/components/core/badge'

function Example() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge size="sm">Küçük</Badge>
      <Badge size="lg">Büyük</Badge>
    </div>
  )
}`,
    usageExamples: [
      {
        title: "Durum Badge'leri",
        description: 'Farklı durumları temsil eden badge örnekleri',
        code: `<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Badge variant="default">Aktif</Badge>
    <span>Kullanıcı çevrimiçi</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge variant="destructive">Hata</Badge>
    <span>Bağlantı hatası</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge variant="secondary">Beklemede</Badge>
    <span>Onay bekleniyor</span>
  </div>
</div>`,
        component: (
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Badge variant='default'>Aktif</Badge>
              <span className='text-sm'>Kullanıcı çevrimiçi</span>
            </div>
            <div className='flex items-center gap-2'>
              <Badge variant='destructive'>Hata</Badge>
              <span className='text-sm'>Bağlantı hatası</span>
            </div>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary'>Beklemede</Badge>
              <span className='text-sm'>Onay bekleniyor</span>
            </div>
          </div>
        ),
      },
    ],
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

  // Button Component
  {
    id: 'button',
    title: 'Button',
    description: 'Farklı varyant ve boyutlarda etkileşimli buton bileşeni. Loading durumu ve icon desteği sunar.',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='grid grid-cols-2 gap-4 max-w-lg'>
        <Button variant='default'>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='destructive'>Delete</Button>
        <Button disabled>Disabled</Button>
        <Button size='sm'>Küçük</Button>
        <Button size='lg'>Büyük</Button>
        <Button size='icon'>
          <Heart className='h-4 w-4' />
        </Button>
        <Button className='w-full'>Tam Genişlik</Button>
      </div>
    ),
    code: `import { Button } from '@/components/core/button'
import { Heart } from 'lucide-react'

function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button disabled>Disabled</Button>
      <Button size="sm">Küçük</Button>
      <Button size="lg">Büyük</Button>
      <Button size="icon">
        <Heart className="h-4 w-4" />
      </Button>
      <Button className='w-full'>Tam Genişlik</Button>
    </div>
  )
}`,
    usageExamples: [
      {
        title: "Icon'lu Butonlar",
        description: 'Icon ile birlikte kullanılan buton örnekleri',
        code: `<div className="flex items-center gap-2">
  <Button>
    <Plus className="w-4 h-4 mr-2" />
    Yeni Ekle
  </Button>
  <Button variant="outline">
    <Search className="w-4 h-4 mr-2" />
    Ara
  </Button>
  <Button variant="ghost">
    <Settings className="w-4 h-4 mr-2" />
    Ayarlar
  </Button>
</div>`,
        component: (
          <div className='flex items-center gap-2'>
            <Button>
              <Plus className='w-4 h-4 mr-2' />
              Yeni Ekle
            </Button>
            <Button variant='outline'>
              <Search className='w-4 h-4 mr-2' />
              Ara
            </Button>
            <Button variant='ghost'>
              <Settings className='w-4 h-4 mr-2' />
              Ayarlar
            </Button>
          </div>
        ),
      },
    ],
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
        name: 'className',
        type: 'string',
        description: 'Ek CSS sınıfları (w-full ile tam genişlik)',
        default: 'undefined',
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
    description:
      'İçerik gruplamak ve organize etmek için kullanılan kart bileşeni. Header, content ve footer bölümleri destekler.',
    category: 'Layout',
    status: 'stable',
    demoComponent: (
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Proje Raporu</CardTitle>
          <CardDescription>Son hafta performans özeti ve analytics verileri.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm text-neutral-600'>Toplam Ziyaretçi</span>
              <span className='font-medium'>12,547</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-neutral-600'>Yeni Kullanıcı</span>
              <span className='font-medium'>1,432</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-neutral-600'>Dönüşüm Oranı</span>
              <span className='font-medium'>%3.2</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='ghost' size='sm'>
            Detaylar
          </Button>
          <Button size='sm'>Rapor Al</Button>
        </CardFooter>
      </Card>
    ),
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/core/card'
import { Button } from '@/components/core/button'

function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Proje Raporu</CardTitle>
        <CardDescription>
          Son hafta performans özeti ve analytics verileri.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">Toplam Ziyaretçi</span>
            <span className="font-medium">12,547</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">Yeni Kullanıcı</span>
            <span className="font-medium">1,432</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Detaylar</Button>
        <Button>Rapor Al</Button>
      </CardFooter>
    </Card>
  )
}`,
    usageExamples: [
      {
        title: 'Feature Card',
        description: 'Özellik tanıtımı için kullanılan kart örneği',
        code: `<Card className="text-center">
  <CardHeader>
    <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
      <Star className="w-6 h-6 text-primary-600" />
    </div>
    <CardTitle>Premium Özellik</CardTitle>
    <CardDescription>
      Gelişmiş analytics ve raporlama araçları
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="text-sm space-y-1">
      <li>• Detaylı analytics</li>
      <li>• Özel raporlar</li>
      <li>• API erişimi</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Şimdi Başla</Button>
  </CardFooter>
</Card>`,
        component: (
          <Card className='text-center w-full max-w-sm'>
            <CardHeader>
              <div className='mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4'>
                <Star className='w-6 h-6 text-primary-600 dark:text-primary-400' />
              </div>
              <CardTitle>Premium Özellik</CardTitle>
              <CardDescription>Gelişmiş analytics ve raporlama araçları</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='text-sm space-y-1'>
                <li>• Detaylı analytics</li>
                <li>• Özel raporlar</li>
                <li>• API erişimi</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className='w-full'>Şimdi Başla</Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
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

  // Checkbox Component
  {
    id: 'checkbox',
    title: 'Checkbox',
    description:
      'Seçim yapma işlemleri için kullanılan onay kutusu bileşeni. Controlled ve uncontrolled modları destekler.',
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
    <div className="flex items-center space-x-2">
      <Checkbox id="mobile" />
      <label htmlFor="mobile">Mobile Development</label>
    </div>
  </div>
</div>`,
        component: (
          <div className='space-y-2'>
            <p className='font-medium'>İlgi Alanlarınız:</p>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='frontend-demo' />
                <label htmlFor='frontend-demo' className='text-sm'>
                  Frontend Development
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='backend-demo' />
                <label htmlFor='backend-demo' className='text-sm'>
                  Backend Development
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='mobile-demo' />
                <label htmlFor='mobile-demo' className='text-sm'>
                  Mobile Development
                </label>
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

  // Data Grid Component
  {
    id: 'data-grid',
    title: 'Data Grid',
    description:
      'Gelişmiş tablo bileşeni. Sıralama, filtreleme, sayfalama, satır seçimi ve dışa aktarma özelliklerine sahiptir.',
    category: 'Veri Gösterimi',
    status: 'stable',
    demoComponent: (
      <div className='w-full'>
        <DataGrid
          data={sampleUsers}
          columns={tableColumns}
          enableRowSelection={true}
          enablePagination={true}
          enableGlobalFilter={true}
          enableColumnFilters={true}
          enableExport={true}
          pageSize={3}
          striped={true}
          hover={true}
          onRowClick={(row) => console.log('Row clicked:', row)}
          onExport={(format, data) => console.log(`Export ${format}:`, data)}
        />
      </div>
    ),
    code: `import { DataGrid, createSelectionColumn, createActionsColumn } from '@/components/core/data-grid'

const columns: Array<import('@/components/core/data-grid').DataGridColumn<Record<string, any>>> = [
  createSelectionColumn(),
  {
    accessorKey: 'name',
    header: 'Ad Soyad',
  },
  {
    accessorKey: 'email',
    header: 'E-posta',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }: { row: any }) => (
      <Badge variant={row.original.role === 'Admin' ? 'destructive' : 'secondary'}>
        {row.original.role}
      </Badge>
    ),
  },
  createActionsColumn([
    {
      label: 'Düzenle',
      icon: <Edit className="w-4 h-4" />,
      onClick: (row) => console.log('Edit:', row.name),
    },
  ]),
]

function Example() {
  return (
    <DataGrid
      data={sampleUsers}
      columns={columns}
      enableRowSelection={true}
      enablePagination={true}
      enableGlobalFilter={true}
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  )
}`,
    props: [
      {
        name: 'data',
        type: 'T[]',
        description: 'Tablo verisi',
      },
      {
        name: 'columns',
        type: 'DataGridColumn<T>[]',
        description: 'Tablo sütun tanımları',
      },
      {
        name: 'enablePagination',
        type: 'boolean',
        description: 'Sayfalama özelliğini etkinleştir',
        default: 'true',
      },
      {
        name: 'enableRowSelection',
        type: 'boolean',
        description: 'Satır seçimi özelliğini etkinleştir',
        default: 'false',
      },
      {
        name: 'enableGlobalFilter',
        type: 'boolean',
        description: 'Global arama özelliğini etkinleştir',
        default: 'true',
      },
      {
        name: 'enableExport',
        type: 'boolean',
        description: 'Dışa aktarma özelliğini etkinleştir',
        default: 'false',
      },
      {
        name: 'onRowClick',
        type: '(row: T, index: number) => void',
        description: 'Satır tıklama olayı',
      },
    ],
  },

  // Data Table Component (Simpler version)
  {
    id: 'data-table',
    title: 'Data Table',
    description: 'Basit ve hızlı tablo bileşeni. Temel sıralama ve filtreleme özelliklerine sahiptir.',
    category: 'Veri Gösterimi',
    status: 'stable',
    demoComponent: (
      <div className='w-full'>
        <DataTable
          columns={[
            {
              accessorKey: 'name',
              header: 'İsim',
            },
            {
              accessorKey: 'email',
              header: 'E-posta',
            },
            {
              accessorKey: 'role',
              header: 'Rol',
              cell: ({ row }: { row: any }) => <Badge variant='outline'>{row.getValue('role')}</Badge>,
            },
          ]}
          data={sampleUsers.slice(0, 3)}
          searchKey='name'
          searchPlaceholder='İsme göre ara...'
        />
      </div>
    ),
    code: `import { DataTable } from '@/components/core/data-table'

function Example() {
  const columns: Array<import('@/components/core/data-grid').DataGridColumn<Record<string, any>>> = [
    {
      accessorKey: 'name',
      header: 'İsim',
    },
    {
      accessorKey: 'email',
      header: 'E-posta',
    },
    {
      accessorKey: 'role',
      header: 'Rol',
      cell: ({ row }: { row: any }) => (
        <Badge variant="outline">
          {row.getValue('role')}
        </Badge>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="İsme göre ara..."
    />
  )
}`,
    props: [
      {
        name: 'columns',
        type: 'ColumnDef<TData, TValue>[]',
        description: 'Tablo sütun tanımları',
      },
      {
        name: 'data',
        type: 'TData[]',
        description: 'Tablo verisi',
      },
      {
        name: 'searchKey',
        type: 'string',
        description: 'Arama yapılacak sütun anahtarı',
      },
      {
        name: 'searchPlaceholder',
        type: 'string',
        description: 'Arama input placeholder metni',
        default: 'Ara...',
      },
    ],
  },

  // Switch Component (existing from original file)
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

  // Select Component (existing from original file)
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

  // Textarea Component (existing from original file)
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

  // Dialog Component
  {
    id: 'dialog',
    title: 'Dialog',
    description: 'Modal diyalog penceresi bileşeni',
    category: 'Overlay',
    status: 'stable',
    demoComponent: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Dialog Aç</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Profil Düzenle</DialogTitle>
            <DialogDescription>Profil bilgilerinizi buradan güncelleyebilirsiniz.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                İsim
              </Label>
              <Input id='name' defaultValue='Ahmet Yılmaz' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                E-posta
              </Label>
              <Input id='username' defaultValue='ahmet@example.com' className='col-span-3' />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Kaydet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/core/dialog'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dialog Aç</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profil Düzenle</DialogTitle>
          <DialogDescription>
            Profil bilgilerinizi buradan güncelleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              İsim
            </Label>
            <Input id="name" defaultValue="Ahmet Yılmaz" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    usageExamples: [
      'Kullanıcı profilini düzenlemek için',
      'Onay diyalogları oluşturmak için',
      'Form içeriklerini modal içinde göstermek için',
      'Detay bilgileri popup olarak göstermek için',
    ],
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Dialog açık/kapalı durumu',
        default: 'false',
      },
      {
        name: 'onOpenChange',
        type: 'function',
        description: 'Dialog durumu değiştiğinde çalışacak fonksiyon',
      },
    ],
  },

  // Dropdown Component
  {
    id: 'dropdown',
    title: 'Dropdown Menu',
    description: 'Açılır menü bileşeni',
    category: 'Navigation',
    status: 'stable',
    demoComponent: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>Menü</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profil</DropdownMenuItem>
          <DropdownMenuItem>Ayarlar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Bildirimler</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>E-posta güncellemeleri</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/core/dropdown'
import { Button } from '@/components/core/button'

function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menü</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profil</DropdownMenuItem>
        <DropdownMenuItem>Ayarlar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Bildirimler
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    usageExamples: [
      'Kullanıcı menüsü oluşturmak için',
      'Eylem menüleri için',
      "Navigasyon dropdown'ları için",
      'Seçenek listesi göstermek için',
    ],
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Menü açık/kapalı durumu',
      },
      {
        name: 'onOpenChange',
        type: 'function',
        description: 'Menü durumu değiştiğinde çalışacak fonksiyon',
      },
    ],
  },

  // Input Component
  {
    id: 'input',
    title: 'Input',
    description: 'Metin girişi bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <Input placeholder='Temel input...' />
        <Input type='email' placeholder='E-posta adresi...' />
        <Input type='password' placeholder='Şifre...' />
        <Input disabled placeholder='Devre dışı input' />
      </div>
    ),
    code: `import { Input } from '@/components/core/input'

function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder="Temel input..." />
      <Input type="email" placeholder="E-posta adresi..." />
      <Input type="password" placeholder="Şifre..." />
      <Input disabled placeholder="Devre dışı input" />
    </div>
  )
}`,
    usageExamples: [
      'Form alanları oluşturmak için',
      'Kullanıcı verisi almak için',
      'Arama kutularında',
      'Login/register formlarında',
    ],
    props: [
      {
        name: 'type',
        type: 'string',
        description: 'Input tipi (text, email, password, vb.)',
        default: 'text',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder metni',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Input devre dışı durumu',
        default: 'false',
      },
      {
        name: 'value',
        type: 'string',
        description: 'Input değeri',
      },
    ],
  },

  // Loading Components
  {
    id: 'loading',
    title: 'Loading',
    description: 'Yükleme animasyon bileşenleri',
    category: 'Feedback',
    status: 'stable',
    demoComponent: (
      <div className='grid grid-cols-3 gap-8 items-center justify-items-center'>
        <div className='text-center space-y-2'>
          <LoadingSpinner size='md' />
          <p className='text-sm text-neutral-500'>Spinner</p>
        </div>
        <div className='text-center space-y-2'>
          <LoadingDots />
          <p className='text-sm text-neutral-500'>Dots</p>
        </div>
        <div className='text-center space-y-2'>
          <LoadingPulse />
          <p className='text-sm text-neutral-500'>Pulse</p>
        </div>
      </div>
    ),
    code: `import { 
  LoadingSpinner, 
  LoadingDots, 
  LoadingPulse 
} from '@/components/core/loading-spinner'

function Example() {
  return (
    <div className="flex items-center gap-8">
      <LoadingSpinner size="md" />
      <LoadingDots />
      <LoadingPulse />
    </div>
  )
}`,
    usageExamples: [
      'Veri yüklenirken göstermek için',
      'API çağrıları sırasında',
      'Buton loading durumları için',
      'Sayfa geçişlerinde',
    ],
    props: [
      {
        name: 'size',
        type: 'sm | md | lg',
        description: 'Loading boyutu',
        default: 'md',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Ek CSS sınıfları',
      },
    ],
  },

  // Progress Component
  {
    id: 'progress',
    title: 'Progress',
    description: 'İlerleme çubuğu bileşeni',
    category: 'Feedback',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <div>
          <div className='flex justify-between text-sm mb-1'>
            <span>İlerleme</span>
            <span>33%</span>
          </div>
          <Progress value={33} />
        </div>
        <div>
          <div className='flex justify-between text-sm mb-1'>
            <span>Yükleme</span>
            <span>67%</span>
          </div>
          <Progress value={67} className='h-2' />
        </div>
        <div>
          <div className='flex justify-between text-sm mb-1'>
            <span>Tamamlandı</span>
            <span>100%</span>
          </div>
          <Progress value={100} />
        </div>
      </div>
    ),
    code: `import { Progress } from '@/components/core/progress'

function Example() {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>İlerleme</span>
          <span>33%</span>
        </div>
        <Progress value={33} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Yükleme</span>
          <span>67%</span>
        </div>
        <Progress value={67} className="h-2" />
      </div>
    </div>
  )
}`,
    usageExamples: [
      'Dosya yükleme ilerlemesi için',
      'Form tamamlama durumu için',
      'Görev ilerlemesi göstermek için',
      'Sayfa yükleme durumu için',
    ],
    props: [
      {
        name: 'value',
        type: 'number',
        description: 'İlerleme değeri (0-100)',
        default: '0',
      },
      {
        name: 'max',
        type: 'number',
        description: 'Maksimum değer',
        default: '100',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Ek CSS sınıfları',
      },
    ],
  },

  // Skeleton Components
  {
    id: 'skeleton',
    title: 'Skeleton',
    description: 'Yükleme iskelet bileşenleri',
    category: 'Feedback',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <SkeletonAvatar />
          <div className='space-y-2'>
            <SkeletonText width='200px' />
            <SkeletonText width='150px' />
          </div>
        </div>
        <SkeletonCard />
        <div className='flex gap-2'>
          <SkeletonButton />
          <SkeletonButton />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-4/5' />
          <Skeleton className='h-4 w-3/5' />
        </div>
      </div>
    ),
    code: `import { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonCard 
} from '@/components/core/skeleton'

function Example() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonAvatar />
        <div className="space-y-2">
          <SkeletonText width="200px" />
          <SkeletonText width="150px" />
        </div>
      </div>
      <SkeletonCard />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}`,
    usageExamples: [
      'Veri yüklenirken placeholder göstermek için',
      'Kullanıcı deneyimini iyileştirmek için',
      'Sayfa geçişlerinde',
      'API beklerken görsel tutarlılık için',
    ],
    props: [
      {
        name: 'width',
        type: 'string | number',
        description: 'Skeleton genişliği',
      },
      {
        name: 'height',
        type: 'string | number',
        description: 'Skeleton yüksekliği',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Ek CSS sınıfları',
      },
    ],
  },

  // Tabs Component
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Sekme navigasyon bileşeni',
    category: 'Navigation',
    status: 'stable',
    demoComponent: (
      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>Hesap</TabsTrigger>
          <TabsTrigger value='password'>Şifre</TabsTrigger>
        </TabsList>
        <TabsContent value='account' className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>İsim</Label>
            <Input id='name' defaultValue='Ahmet Yılmaz' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='username'>Kullanıcı Adı</Label>
            <Input id='username' defaultValue='@ahmetyilmaz' />
          </div>
        </TabsContent>
        <TabsContent value='password' className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='current'>Mevcut Şifre</Label>
            <Input id='current' type='password' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='new'>Yeni Şifre</Label>
            <Input id='new' type='password' />
          </div>
        </TabsContent>
      </Tabs>
    ),
    code: `import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/core/tabs'
import { Label } from '@/components/core/label'
import { Input } from '@/components/core/input'

function Example() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Hesap</TabsTrigger>
        <TabsTrigger value="password">Şifre</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <Label htmlFor="name">İsim</Label>
          <Input id="name" defaultValue="Ahmet Yılmaz" />
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <Label htmlFor="current">Mevcut Şifre</Label>
          <Input id="current" type="password" />
        </div>
      </TabsContent>
    </Tabs>
  )
}`,
    usageExamples: [
      'Ayar sayfaları için',
      'Profil düzenleme formları için',
      'Dashboard bölümlerini ayırmak için',
      'Kategorilere ayrılmış içerik için',
    ],
    props: [
      {
        name: 'defaultValue',
        type: 'string',
        description: 'Varsayılan aktif sekme',
      },
      {
        name: 'value',
        type: 'string',
        description: 'Kontrollü aktif sekme',
      },
      {
        name: 'onValueChange',
        type: 'function',
        description: 'Sekme değiştiğinde çalışacak fonksiyon',
      },
    ],
  },

  // Slider Component
  {
    id: 'slider',
    title: 'Slider',
    description: 'Değer seçici kaydırıcı bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-6 w-full max-w-sm'>
        <div>
          <Label className='text-sm font-medium'>Ses Seviyesi: 50</Label>
          <Slider defaultValue={[50]} max={100} step={1} className='mt-2' />
        </div>
        <div>
          <Label className='text-sm font-medium'>Fiyat Aralığı: 200₺ - 800₺</Label>
          <Slider defaultValue={[200, 800]} max={1000} step={10} className='mt-2' />
        </div>
        <div>
          <Label className='text-sm font-medium'>Kalite: 8/10</Label>
          <Slider defaultValue={[8]} max={10} step={1} className='mt-2' />
        </div>
      </div>
    ),
    code: `import { Slider } from '@/components/core/slider'
import { Label } from '@/components/core/label'

function Example() {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">Ses Seviyesi</Label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1} 
          className="mt-2" 
        />
      </div>
      <div>
        <Label className="text-sm font-medium">Fiyat Aralığı</Label>
        <Slider 
          defaultValue={[200, 800]} 
          max={1000} 
          step={10} 
          className="mt-2" 
        />
      </div>
    </div>
  )
}`,
    usageExamples: [
      'Ses/parlaklık kontrolleri için',
      'Fiyat aralığı seçimi için',
      'Filtreleme seçenekleri için',
      'Değer aralığı belirlemek için',
    ],
    props: [
      {
        name: 'defaultValue',
        type: 'number[]',
        description: 'Varsayılan değer(ler)',
      },
      {
        name: 'value',
        type: 'number[]',
        description: 'Kontrollü değer(ler)',
      },
      {
        name: 'max',
        type: 'number',
        description: 'Maksimum değer',
        default: '100',
      },
      {
        name: 'min',
        type: 'number',
        description: 'Minimum değer',
        default: '0',
      },
      {
        name: 'step',
        type: 'number',
        description: 'Artış miktarı',
        default: '1',
      },
    ],
  },

  // Separator Component
  {
    id: 'separator',
    title: 'Separator',
    description: 'Ayırıcı çizgi bileşeni',
    category: 'Layout',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4'>
        <div>
          <h4 className='text-sm font-medium'>Bölüm 1</h4>
          <p className='text-sm text-neutral-500 mt-1'>Bu bir örnek içeriktir.</p>
        </div>
        <Separator />
        <div>
          <h4 className='text-sm font-medium'>Bölüm 2</h4>
          <p className='text-sm text-neutral-500 mt-1'>Bu başka bir örnek içeriktir.</p>
        </div>
        <Separator orientation='vertical' className='h-20' />
        <div className='flex items-center gap-4'>
          <span>Sol</span>
          <Separator orientation='vertical' className='h-6' />
          <span>Sağ</span>
        </div>
      </div>
    ),
    code: `import { Separator } from '@/components/core/separator'

function Example() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium">Bölüm 1</h4>
        <p className="text-sm text-neutral-500">Bu bir örnek içeriktir.</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Bölüm 2</h4>
        <p className="text-sm text-neutral-500">Bu başka bir örnek içeriktir.</p>
      </div>
      <div className="flex items-center gap-4">
        <span>Sol</span>
        <Separator orientation="vertical" className="h-6" />
        <span>Sağ</span>
      </div>
    </div>
  )
}`,
    usageExamples: [
      'İçerik bölümlerini ayırmak için',
      'Menü öğelerini gruplamak için',
      'Card içinde bölüm ayrımları için',
      'Form alanlarını organize etmek için',
    ],
    props: [
      {
        name: 'orientation',
        type: 'horizontal | vertical',
        description: 'Ayırıcı yönü',
        default: 'horizontal',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Ek CSS sınıfları',
      },
    ],
  },

  // Popover Component
  {
    id: 'popover',
    title: 'Popover',
    description: 'Açılır içerik kutusu bileşeni',
    category: 'Overlay',
    status: 'stable',
    demoComponent: (
      <div className='flex gap-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline'>Popover Aç</Button>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Boyutlar</h4>
                <p className='text-sm text-neutral-500'>Bileşen boyutlarını ayarlayın.</p>
              </div>
              <div className='grid gap-2'>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <Label htmlFor='width'>Genişlik</Label>
                  <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <Label htmlFor='height'>Yükseklik</Label>
                  <Input id='height' defaultValue='25px' className='col-span-2 h-8' />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    ),
    code: `import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/core/popover'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'

function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Popover Aç</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Boyutlar</h4>
            <p className="text-sm text-neutral-500">
              Bileşen boyutlarını ayarlayın.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Genişlik</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
    usageExamples: [
      'Hızlı ayar menüleri için',
      'Ek bilgi göstermek için',
      'Form yardımcı içerikler için',
      'Kontekst menüleri oluşturmak için',
    ],
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Popover açık/kapalı durumu',
      },
      {
        name: 'onOpenChange',
        type: 'function',
        description: 'Popover durumu değiştiğinde çalışacak fonksiyon',
      },
    ],
  },

  // Tooltip Component
  {
    id: 'tooltip',
    title: 'Tooltip',
    description: 'Bilgi ipucu bileşeni',
    category: 'Overlay',
    status: 'stable',
    demoComponent: (
      <TooltipProvider>
        <div className='flex gap-4 items-center'>
          <TooltipComponent content='Bu bir tooltip örneğidir'>
            <Button variant='outline'>Hover Me</Button>
          </TooltipComponent>
          <TooltipComponent content='Bu tooltip sağda görünür' side='right'>
            <Button variant='outline'>Right Tooltip</Button>
          </TooltipComponent>
          <TooltipComponent content='Bu tooltip altta görünür' side='bottom'>
            <Button variant='outline'>Bottom Tooltip</Button>
          </TooltipComponent>
          <TooltipComponent content='Devre dışı tooltip' disabled>
            <Button variant='outline'>Disabled</Button>
          </TooltipComponent>
        </div>
      </TooltipProvider>
    ),
    code: `import { TooltipComponent, TooltipProvider } from '@/components/core/tooltip'
import { Button } from '@/components/core/button'

function Example() {
  return (
    <TooltipProvider>
      <div className="flex gap-4 items-center">
        <TooltipComponent content="Bu bir tooltip örneğidir">
          <Button variant="outline">Hover Me</Button>
        </TooltipComponent>
        
        <TooltipComponent content="Bu tooltip sağda görünür" side="right">
          <Button variant="outline">Right Tooltip</Button>
        </TooltipComponent>
        
        <TooltipComponent content="Bu tooltip altta görünür" side="bottom">
          <Button variant="outline">Bottom Tooltip</Button>
        </TooltipComponent>
        
        <TooltipComponent content="Devre dışı tooltip" disabled>
          <Button variant="outline">Disabled</Button>
        </TooltipComponent>
      </div>
    </TooltipProvider>
  )
}`,
    usageExamples: [
      'Buton açıklamaları için',
      'Form alanı yardım metinleri için',
      'Kısaltılmış metin açıklamaları için',
      'İkon anlamlarını açıklamak için',
    ],
    props: [
      {
        name: 'content',
        type: 'ReactNode',
        description: 'Tooltip içeriği',
      },
      {
        name: 'side',
        type: 'top | right | bottom | left',
        description: 'Tooltip konumu',
        default: 'top',
      },
      {
        name: 'align',
        type: 'start | center | end',
        description: 'Tooltip hizalaması',
        default: 'center',
      },
      {
        name: 'delayDuration',
        type: 'number',
        description: 'Tooltip gösterim gecikmesi (ms)',
        default: '300',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Tooltip devre dışı durumu',
        default: 'false',
      },
    ],
  },

  // Scroll Area Component
  {
    id: 'scroll-area',
    title: 'Scroll Area',
    description: 'Özel kaydırma çubuğu bileşeni',
    category: 'Layout',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4'>
        <ScrollArea className='h-32 w-48 rounded-md border p-4'>
          <div className='space-y-2'>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className='text-sm'>
                Liste öğesi {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    ),
    code: `import { ScrollArea } from '@/components/core/scroll-area'

function Example() {
  return (
    <ScrollArea className="h-32 w-48 rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="text-sm">
            Liste öğesi {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
    usageExamples: [
      'Uzun liste gösterimleri için',
      'Sınırlı yükseklikte içerik için',
      'Chat mesaj geçmişi için',
      'Navigasyon menüleri için',
    ],
    props: [
      {
        name: 'className',
        type: 'string',
        description: 'Ek CSS sınıfları',
      },
    ],
  },

  // Rich Text Editor Component
  {
    id: 'rich-text-editor',
    title: 'Rich Text Editor',
    description: 'Zengin metin düzenleyici bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='w-full max-w-2xl'>
        <RichTextEditor
          placeholder='Zengin metin içeriği yazın...'
          value='<p>Bu bir <strong>zengin metin</strong> örneğidir. <em>Italik</em> ve <u>altı çizili</u> metinler yazabilirsiniz.</p>'
          onChange={(content) => console.log(content)}
        />
      </div>
    ),
    code: `import { RichTextEditor } from '@/components/core/rich-text-editor'

function Example() {
  return (
    <RichTextEditor
      placeholder="Zengin metin içeriği yazın..."
      value="<p>Bu bir <strong>zengin metin</strong> örneğidir.</p>"
      onChange={(content) => console.log(content)}
    />
  )
}`,
    usageExamples: [
      'Blog yazıları için',
      'Ürün açıklamaları için',
      'Email editörleri için',
      'Yorumlarda zengin içerik için',
    ],
    props: [
      {
        name: 'value',
        type: 'string',
        description: 'Kontrollü içerik değeri',
      },
      {
        name: 'onChange',
        type: 'function',
        description: 'İçerik değiştiğinde çalışacak fonksiyon',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder metni',
      },
    ],
  },

  // Modern Date Picker Component
  {
    id: 'modern-date-picker',
    title: 'Modern Date Picker',
    description: 'Modern tarih seçici bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <div>
          <Label>Doğum Tarihi</Label>
          <ModernDatePicker placeholder='Tarih seçin...' onChange={(date) => console.log(date)} />
        </div>
      </div>
    ),
    code: `import { ModernDatePicker } from '@/components/core/modern-date-picker'
import { Label } from '@/components/core/label'

function Example() {
  return (
    <div className="space-y-2">
      <Label>Doğum Tarihi</Label>
      <ModernDatePicker 
        placeholder="Tarih seçin..." 
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
    usageExamples: [
      'Doğum tarihi seçimi için',
      'Etkinlik tarihi belirleme için',
      'Rapor tarih aralığı için',
      'Rezervasyon tarih seçimi için',
    ],
    props: [
      {
        name: 'value',
        type: 'Date',
        description: 'Seçili tarih',
      },
      {
        name: 'onChange',
        type: 'function',
        description: 'Tarih değiştiğinde çalışacak fonksiyon',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder metni',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Devre dışı durumu',
        default: 'false',
      },
    ],
  },

  // Month Year Picker Component
  {
    id: 'month-year-picker',
    title: 'Month Year Picker',
    description: 'Ay-yıl seçici bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <div>
          <Label>Mezuniyet Tarihi</Label>
          <MonthYearPicker placeholder='Ay/Yıl seçin...' onChange={(date) => console.log(date)} />
        </div>
      </div>
    ),
    code: `import { MonthYearPicker } from '@/components/core/month-year-picker'
import { Label } from '@/components/core/label'

function Example() {
  return (
    <div className="space-y-2">
      <Label>Mezuniyet Tarihi</Label>
      <MonthYearPicker 
        placeholder="Ay/Yıl seçin..." 
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
    usageExamples: [
      'Mezuniyet tarihi için',
      'İş deneyimi tarihleri için',
      'Kredi kartı son kullanma tarihi için',
      'Rapor periyodu seçimi için',
    ],
    props: [
      {
        name: 'value',
        type: 'Date',
        description: 'Seçili ay/yıl',
      },
      {
        name: 'onChange',
        type: 'function',
        description: 'Tarih değiştiğinde çalışacak fonksiyon',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder metni',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Devre dışı durumu',
        default: 'false',
      },
    ],
  },

  // Date Range Picker Component
  {
    id: 'date-range-picker',
    title: 'Date Range Picker',
    description: 'Tarih aralığı seçici bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <div className='flex flex-col space-y-2'>
          <Label>Tatil Tarihleri</Label>
          <DatePicker
            mode='range'
            enablePresets={true}
            placeholder='Tarih aralığı seçin...'
            onChange={(range: any) => console.log(range)}
          />
        </div>
      </div>
    ),
    code: `import { createDateRangePicker } from '@/components/core/date-picker'
import { Label } from '@/components/core/label'

function Example() {
  const RangePicker = createDateRangePicker()
  
  return (
    <div className="space-y-2">
      <Label>Tatil Tarihleri</Label>
      <RangePicker 
        placeholder={{ from: 'Başlangıç', to: 'Bitiş' }}
        onChange={(range) => console.log(range)}
      />
    </div>
  )
}`,
    usageExamples: [
      'Tatil tarih aralığı seçimi için',
      'Rapor periyodu belirleme için',
      'Rezervasyon tarih aralığı için',
      'Proje süre planlaması için',
    ],
    props: [
      {
        name: 'value',
        type: 'DateRange',
        description: 'Seçili tarih aralığı',
      },
      {
        name: 'onChange',
        type: 'function',
        description: 'Tarih aralığı değiştiğinde çalışacak fonksiyon',
      },
      {
        name: 'placeholder',
        type: 'object',
        description: 'Placeholder metinleri ({ from: string, to: string })',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Devre dışı durumu',
        default: 'false',
      },
    ],
  },

  // Single Date Picker Component
  {
    id: 'single-date-picker',
    title: 'Single Date Picker',
    description: 'Tekil tarih seçici bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: (
      <div className='space-y-4 w-full max-w-sm'>
        <div className='flex flex-col space-y-2'>
          <Label>Randevu Tarihi</Label>
          <DatePicker mode='single' placeholder='Tarih seçin...' onChange={(date: any) => console.log(date)} />
        </div>
      </div>
    ),
    code: `import { createSingleDatePicker } from '@/components/core/date-picker'
import { Label } from '@/components/core/label'

function Example() {
  const SinglePicker = createSingleDatePicker()
  
  return (
    <div className="space-y-2">
      <Label>Randevu Tarihi</Label>
      <SinglePicker 
        placeholder="Tarih seçin..."
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
    usageExamples: [
      'Randevu tarihi seçimi için',
      'Son teslim tarihi belirleme için',
      'Etkinlik tarihi seçimi için',
      'Doğum tarihi girişi için',
    ],
    props: [
      {
        name: 'value',
        type: 'Date',
        description: 'Seçili tarih',
      },
      {
        name: 'onChange',
        type: 'function',
        description: 'Tarih değiştiğinde çalışacak fonksiyon',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder metni',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Devre dışı durumu',
        default: 'false',
      },
    ],
  },
]
