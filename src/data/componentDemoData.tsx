import React from 'react'

import { useTranslation } from 'react-i18next'
import { AlertCircle, AlertTriangle, Edit, Heart, Info, Plus, Search, Settings, Star, Trash2 } from 'lucide-react'

// Import all core components
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/core/dialog'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/core/dropdown'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/core/alert-dialog'
import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Slider } from '@/components/core/slider'
import { Switch } from '@/components/core/switch'
import { Progress } from '@/components/core/progress'
import { Checkbox } from '@/components/core/checkbox'
import { Textarea } from '@/components/core/textarea'
import { Accordion } from '@/components/core/accordion'
import { Separator } from '@/components/core/separator'
import { DataTable } from '@/components/core/data-table'
import { DatePicker } from '@/components/core/date-picker'
import { ScrollArea } from '@/components/core/scroll-area'
import { RichTextEditor } from '@/components/core/rich-text-editor'
import { MonthYearPicker } from '@/components/core/month-year-picker'
import { ModernDatePicker } from '@/components/core/modern-date-picker'
import { TooltipComponent, TooltipProvider } from '@/components/core/tooltip'
import { Alert, AlertTitle, AlertDescription } from '@/components/core/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/core/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/core/popover'
import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/core/loading-spinner'
import { DataGrid, createSelectionColumn, createActionsColumn } from '@/components/core/data-grid'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/core/card'
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard } from '@/components/core/skeleton'

// Component demo data generator function
export const useComponentDemoData = () => {
  const { t } = useTranslation()

  // Sample data for tables
  const sampleUsers = [
    { id: '1', name: t('demo.sampleData.users.ahmet'), email: 'ahmet@example.com', role: 'Admin', status: 'active' },
    { id: '2', name: t('demo.sampleData.users.ayse'), email: 'ayse@example.com', role: 'User', status: 'active' },
    { id: '3', name: t('demo.sampleData.users.mehmet'), email: 'mehmet@example.com', role: 'User', status: 'inactive' },
    { id: '4', name: t('demo.sampleData.users.fatma'), email: 'fatma@example.com', role: 'Editor', status: 'active' },
    { id: '5', name: t('demo.sampleData.users.ali'), email: 'ali@example.com', role: 'User', status: 'pending' },
  ]

  const tableColumns: Array<import('@/components/core/data-grid').DataGridColumn<Record<string, any>>> = [
    createSelectionColumn(),
    {
      accessorKey: 'name',
      header: t('demo.tableHeaders.fullName'),
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
      header: t('demo.tableHeaders.email'),
    },
    {
      accessorKey: 'role',
      header: t('demo.tableHeaders.role'),
      cell: ({ row }: { row: any }) => (
        <Badge variant={row.original.role === 'Admin' ? 'destructive' : 'secondary'}>{row.original.role}</Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: t('demo.tableHeaders.status'),
      cell: ({ row }: { row: any }) => (
        <Badge
          variant={
            row.original.status === 'active'
              ? 'default'
              : row.original.status === 'inactive'
                ? 'destructive'
                : 'outline'
          }
        >
          {row.original.status === 'active'
            ? t('demo.sampleData.status.active')
            : row.original.status === 'inactive'
              ? t('demo.sampleData.status.inactive')
              : t('demo.sampleData.status.pending')}
        </Badge>
      ),
    },
    createActionsColumn([
      {
        label: t('demo.tableHeaders.edit'),
        icon: <Edit className='w-4 h-4 mr-2' />,
        onClick: (row) => console.log(t('demo.tableHeaders.edit'), row.name),
        variant: 'outline',
      },
      {
        label: t('demo.tableHeaders.delete'),
        icon: <Trash2 className='w-4 h-4 mr-2' />,
        onClick: (row) => console.log(t('demo.tableHeaders.delete'), row.name),
        variant: 'destructive',
      },
    ]),
  ]

  // Component demo data
  return [
    // Accordion Component
    {
      id: 'accordion',
      title: 'Accordion',
      description: t('demo.descriptions.accordion'),
      category: t('demo.content.categories.layout'),
      status: 'stable',
      demoComponent: (
        <div className='w-full'>
          <Accordion.Root
            defaultValue={['item-1']}
            className='border rounded-lg border-neutral-200 dark:border-neutral-700'
          >
            <Accordion.Item value='item-1'>
              <Accordion.Trigger>{t('demo.content.accordion.personalInfo')}</Accordion.Trigger>
              <Accordion.Content>
                <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                  {t('demo.content.accordion.personalInfoDesc')}
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value='item-2'>
              <Accordion.Trigger>{t('demo.content.accordion.securitySettings')}</Accordion.Trigger>
              <Accordion.Content>
                <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                  {t('demo.content.accordion.securitySettingsDesc')}
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value='item-3'>
              <Accordion.Trigger>{t('demo.remaining.missing.accordion.notificationPreferences')}</Accordion.Trigger>
              <Accordion.Content>
                <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                  {t('demo.remaining.labels.notificationPreferences')}
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
        <Accordion.Trigger>{t('demo.remaining.labels.personalInfo')}</Accordion.Trigger>
        <Accordion.Content>
          <p>{t('demo.remaining.labels.personalInfoDesc')}</p>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>{t('demo.remaining.labels.securitySettings')}</Accordion.Trigger>
        <Accordion.Content>
          <p>{t('demo.remaining.labels.securitySettingsDesc')}</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}`,
      usageExamples: [
        {
          title: 'Multiple Accordion',
          description: t('demo.remaining.descriptions.multipleAccordion'),
          code: `<Accordion.Root type="multiple" defaultValue={['item-1', 'item-2']}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>{t('demo.remaining.labels.section1')}</Accordion.Trigger>
    <Accordion.Content>{t('demo.remaining.labels.content1')}</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>{t('demo.remaining.labels.section2')}</Accordion.Trigger>
    <Accordion.Content>{t('demo.remaining.labels.content2')}</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`,
          component: (
            <Accordion.Root
              type='multiple'
              defaultValue={['item-1']}
              className='border rounded-lg border-neutral-200 dark:border-neutral-700 w-full'
            >
              <Accordion.Item value='item-1'>
                <Accordion.Trigger>{t('demo.remaining.labels.openSection')}</Accordion.Trigger>
                <Accordion.Content>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    {t('demo.remaining.labels.defaultOpenSection')}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='item-2'>
                <Accordion.Trigger>{t('demo.remaining.labels.otherSection')}</Accordion.Trigger>
                <Accordion.Content>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    {t('demo.remaining.labels.canAlsoOpenThisSection')}
                  </p>
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
          description: t('demo.properties.singleMultipleMode'),
          default: 'single',
        },
        {
          name: 'defaultValue',
          type: 'string[]',
          description: t('demo.properties.defaultOpenValues'),
        },
        {
          name: 'value',
          type: 'string[]',
          description: t('demo.properties.controlledOpenValues'),
        },
        {
          name: 'onValueChange',
          type: '(value: string[]) => void',
          description: t('demo.properties.valueChangeCallback'),
        },
        {
          name: 'collapsible',
          type: 'boolean',
          description: t('demo.remaining.descriptions.lastItemClosable'),
          default: 'true',
        },
      ],
    },

    // Alert Component
    {
      id: 'alert',
      title: 'Alert',
      description: t('demo.descriptions.alert'),
      category: t('demo.content.categories.feedback'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full'>
          <Alert>
            <Info className='h-4 w-4' />
            <AlertTitle>{t('demo.content.alerts.information')}</AlertTitle>
            <AlertDescription>{t('demo.content.alerts.informationMsg')}</AlertDescription>
          </Alert>

          <Alert variant='warning'>
            <AlertTriangle className='h-4 w-4' />
            <AlertTitle>{t('demo.content.alerts.warning')}</AlertTitle>
            <AlertDescription>{t('demo.content.alerts.warningMsg')}</AlertDescription>
          </Alert>

          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>{t('demo.content.alerts.error')}</AlertTitle>
            <AlertDescription>{t('demo.content.alerts.errorMsg')}</AlertDescription>
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
        <AlertDescription>{t('demo.remaining.labels.informationMessage')}</AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t('demo.remaining.labels.warning')}</AlertTitle>
        <AlertDescription>Dikkat edilmesi gereken bir durum var.</AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('demo.remaining.missing.badge.error')}</AlertTitle>
        <AlertDescription>{t('demo.remaining.labels.operationFailed')}</AlertDescription>
      </Alert>
    </div>
  )
}`,
      props: [
        {
          name: 'variant',
          type: "'default' | 'destructive' | 'warning' | 'info'",
          description: t('demo.properties.alertVariant'),
          default: 'default',
        },
      ],
    },

    // Alert Dialog Component
    {
      id: 'alert-dialog',
      title: 'Alert Dialog',
      description: t('demo.remaining.descriptions.criticalOperations'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>{t('demo.remaining.labels.deleteAccount')}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('demo.remaining.labels.confirmDeleteAccount')}</AlertDialogTitle>
              <AlertDialogDescription>{t('demo.remaining.labels.deleteWarningMessage')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('demo.remaining.labels.cancel')}</AlertDialogCancel>
              <AlertDialogAction>{t('demo.remaining.alertDialog.confirmDelete')}</AlertDialogAction>
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
        <Button variant="destructive">{t('demo.remaining.labels.deleteAccount')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('demo.remaining.missing.alertDialog.confirmDelete')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('demo.remaining.alertDialog.deleteWarningMessage')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('demo.remaining.alertDialog.cancel')}</AlertDialogCancel>
          <AlertDialogAction>{t('demo.remaining.alertDialog.confirmDelete')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: t('demo.properties.dialogOpen'),
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: t('demo.properties.dialogOpenChangeCallback'),
        },
      ],
    },

    // Avatar Component
    {
      id: 'avatar',
      title: 'Avatar',
      description: t('demo.remaining.descriptions.avatarComponent'),
      category: t('demo.content.categories.dataDisplay'),
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
            <AvatarFallback className='bg-secondary'>{t('demo.remaining.labels.avatarFallback')}</AvatarFallback>
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
          description: t('demo.remaining.descriptions.avatarGroup'),
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
          description: t('demo.remaining.descriptions.avatarImageUrl'),
        },
        {
          name: 'alt',
          type: 'string',
          description: t('demo.remaining.avatar.altText'),
        },
      ],
    },

    // Badge Component
    {
      id: 'badge',
      title: 'Badge',
      description: t('demo.remaining.descriptions.badgeComponent'),
      category: t('demo.content.categories.dataDisplay'),
      status: 'stable',
      demoComponent: (
        <div className='flex items-center gap-2 flex-wrap'>
          <Badge variant='default'>{t('demo.remaining.badgeVariants.default')}</Badge>
          <Badge variant='secondary'>{t('demo.remaining.badgeVariants.secondary')}</Badge>
          <Badge variant='destructive'>{t('demo.remaining.badgeVariants.destructive')}</Badge>
          <Badge variant='outline'>{t('demo.remaining.badgeVariants.outline')}</Badge>
          <Badge size='sm'>{t('demo.remaining.labels.small')}</Badge>
          <Badge size='lg'>{t('demo.remaining.labels.large')}</Badge>
        </div>
      ),
      code: `import { Badge } from '@/components/core/badge'

function Example() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="default">{t('demo.remaining.badgeVariants.default')}</Badge>
      <Badge variant="secondary">{t('demo.remaining.badgeVariants.secondary')}</Badge>
      <Badge variant="destructive">{t('demo.remaining.badgeVariants.destructive')}</Badge>
      <Badge variant="outline">{t('demo.remaining.badgeVariants.outline')}</Badge>
      <Badge size="sm">{t('demo.remaining.labels.small')}</Badge>
      <Badge size="lg">{t('demo.remaining.labels.large')}</Badge>
    </div>
  )
}`,
      usageExamples: [
        {
          title: "Durum Badge'leri",
          description: t('demo.remaining.descriptions.badgeExamples'),
          code: `<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Badge variant="default">{t('demo.remaining.missing.badge.active')}</Badge>
    <span>{t('demo.remaining.labels.userOnline')}</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge variant="destructive">{t('demo.remaining.missing.badge.error')}</Badge>
    <span>{t('demo.remaining.missing.badge.connectionError')}</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge variant="secondary">{t('demo.remaining.missing.badge.pending')}</Badge>
    <span>{t('demo.remaining.missing.badge.awaitingApproval')}</span>
  </div>
</div>`,
          component: (
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Badge variant='default'>{t('demo.remaining.missing.badge.active')}</Badge>
                <span className='text-sm'>{t('demo.remaining.missing.badge.userOnline')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='destructive'>{t('demo.remaining.missing.badge.error')}</Badge>
                <span className='text-sm'>{t('demo.remaining.missing.badge.connectionError')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='secondary'>{t('demo.remaining.missing.badge.pending')}</Badge>
                <span className='text-sm'>{t('demo.remaining.missing.badge.awaitingApproval')}</span>
              </div>
            </div>
          ),
        },
      ],
      props: [
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'destructive' | 'outline'",
          description: t('demo.remaining.descriptions.badgeVariant'),
          default: 'default',
        },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          description: t('demo.remaining.badge.sizeDescription'),
          default: 'default',
        },
      ],
    },

    // Button Component
    {
      id: 'button',
      title: 'Button',
      description: t('demo.remaining.descriptions.buttonComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='grid grid-cols-2 gap-4 max-w-lg'>
          <Button variant='default'>{t('demo.remaining.buttonVariants.primary')}</Button>
          <Button variant='secondary'>{t('demo.remaining.buttonVariants.secondary')}</Button>
          <Button variant='outline'>{t('demo.remaining.buttonVariants.outline')}</Button>
          <Button variant='ghost'>{t('demo.remaining.buttonVariants.ghost')}</Button>
          <Button variant='destructive'>{t('demo.remaining.buttonVariants.delete')}</Button>
          <Button disabled>{t('demo.remaining.buttonVariants.disabled')}</Button>
          <Button size='sm'>{t('demo.remaining.missing.buttons.small')}</Button>
          <Button size='lg'>{t('demo.remaining.missing.buttons.large')}</Button>
          <Button size='icon'>
            <Heart className='h-4 w-4' />
          </Button>
          <Button className='w-full'>{t('demo.remaining.missing.buttons.fullWidth')}</Button>
        </div>
      ),
      code: `import { Button } from '@/components/core/button'
import { Heart } from 'lucide-react'

function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="default">{t('demo.remaining.buttonVariants.primary')}</Button>
      <Button variant="secondary">{t('demo.remaining.buttonVariants.secondary')}</Button>
      <Button variant="outline">{t('demo.remaining.buttonVariants.outline')}</Button>
      <Button variant="ghost">{t('demo.remaining.buttonVariants.ghost')}</Button>
      <Button variant="destructive">{t('demo.remaining.buttonVariants.delete')}</Button>
      <Button disabled>{t('demo.remaining.buttonVariants.disabled')}</Button>
      <Button size="sm">{t('demo.remaining.missing.buttons.small')}</Button>
      <Button size="lg">{t('demo.remaining.missing.buttons.large')}</Button>
      <Button size="icon">
        <Heart className="h-4 w-4" />
      </Button>
      <Button className='w-full'>{t('demo.remaining.missing.buttons.fullWidth')}</Button>
    </div>
  )
}`,
      usageExamples: [
        {
          title: t('demo.remaining.labels.iconButtons'),
          description: t('demo.remaining.descriptions.iconButtonExamples'),
          code: `<div className="flex items-center gap-2">
  <Button>
    <Plus className="w-4 h-4 mr-2" />
    {t('demo.remaining.buttonActions.addNew')}
  </Button>
  <Button variant="outline">
    <Search className="w-4 h-4 mr-2" />
    {t('demo.remaining.buttonActions.search')}
  </Button>
  <Button variant="ghost">
    <Settings className="w-4 h-4 mr-2" />
    {t('demo.remaining.buttonActions.settings')}
  </Button>
</div>`,
          component: (
            <div className='flex items-center gap-2'>
              <Button>
                <Plus className='w-4 h-4 mr-2' />
                {t('demo.remaining.buttonActions.addNew')}
              </Button>
              <Button variant='outline'>
                <Search className='w-4 h-4 mr-2' />
                {t('demo.remaining.buttonActions.search')}
              </Button>
              <Button variant='ghost'>
                <Settings className='w-4 h-4 mr-2' />
                {t('demo.remaining.buttonActions.settings')}
              </Button>
            </div>
          ),
        },
      ],
      props: [
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
          description: t('demo.remaining.descriptions.buttonVariant'),
          default: 'default',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | 'icon'",
          description: t('demo.remaining.buttonSize'),
          default: 'md',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.remaining.descriptions.additionalCssClasses'),
          default: 'undefined',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.disableButton'),
          default: 'false',
        },
      ],
    },

    // Card Component
    {
      id: 'card',
      title: 'Card',
      description: t('demo.remaining.descriptions.cardComponent'),
      category: 'Layout',
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle>{t('demo.remaining.missing.cards.projectReport')}</CardTitle>
            <CardDescription>{t('demo.remaining.missing.cards.projectReportDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-sm text-neutral-600'>{t('demo.remaining.missing.cards.totalVisitors')}</span>
                <span className='font-medium'>12,547</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-neutral-600'>{t('demo.remaining.missing.cards.newUsers')}</span>
                <span className='font-medium'>1,432</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-neutral-600'>{t('demo.remaining.missing.cards.conversionRate')}</span>
                <span className='font-medium'>%3.2</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='ghost' size='sm'>
              {t('demo.remaining.cardActions.details')}
            </Button>
            <Button size='sm'>{t('demo.remaining.cardActions.getReport')}</Button>
          </CardFooter>
        </Card>
      ),
      code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/core/card'
import { Button } from '@/components/core/button'

function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t('demo.remaining.missing.cards.projectReport')}</CardTitle>
        <CardDescription>
          {t('demo.remaining.missing.cards.projectReportDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">{t('demo.remaining.missing.cards.totalVisitors')}</span>
            <span className="font-medium">12,547</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">{t('demo.remaining.missing.cards.newUsers')}</span>
            <span className="font-medium">1,432</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">{t('demo.remaining.cardActions.details')}</Button>
        <Button>{t('demo.remaining.cardActions.getReport')}</Button>
      </CardFooter>
    </Card>
  )
}`,
      usageExamples: [
        {
          title: 'Feature Card',
          description: t('demo.remaining.descriptions.featureCard'),
          code: `<Card className="text-center">
  <CardHeader>
    <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
      <Star className="w-6 h-6 text-primary-600" />
    </div>
    <CardTitle>{t('demo.remaining.missing.cards.premiumFeature')}</CardTitle>
    <CardDescription>
      {t('demo.remaining.missing.cards.premiumDesc')}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="text-sm space-y-1">
      <li>{t('demo.remaining.missing.cards.detailedAnalytics')}</li>
      <li>{t('demo.remaining.missing.cards.customReports')}</li>
      <li>{t('demo.remaining.missing.cards.apiAccess')}</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">{t('demo.remaining.missing.buttons.startNow')}</Button>
  </CardFooter>
</Card>`,
          component: (
            <Card className='text-center w-full max-w-sm'>
              <CardHeader>
                <div className='mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4'>
                  <Star className='w-6 h-6 text-primary-600 dark:text-primary-400' />
                </div>
                <CardTitle>{t('demo.remaining.missing.cards.premiumFeature')}</CardTitle>
                <CardDescription>{t('demo.remaining.missing.cards.premiumDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='text-sm space-y-1'>
                  <li>{t('demo.remaining.missing.cards.detailedAnalytics')}</li>
                  <li>{t('demo.remaining.missing.cards.customReports')}</li>
                  <li>{t('demo.remaining.missing.cards.apiAccess')}</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className='w-full'>{t('demo.remaining.missing.buttons.startNow')}</Button>
              </CardFooter>
            </Card>
          ),
        },
      ],
      props: [
        {
          name: 'variant',
          type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
          description: t('demo.remaining.descriptions.cardVariant'),
          default: 'default',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | 'xl'",
          description: t('demo.remaining.cardPaddingSize'),
          default: 'md',
        },
        {
          name: 'hover',
          type: "'none' | 'lift' | 'glow' | 'scale'",
          description: t('demo.remaining.descriptions.hoverEffectType'),
          default: 'none',
        },
      ],
    },

    // Checkbox Component
    {
      id: 'checkbox',
      title: 'Checkbox',
      description: t('demo.remaining.descriptions.checkboxComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms1' defaultChecked />
            <label htmlFor='terms1' className='text-sm font-medium'>
              {t('demo.remaining.missing.checkbox.selected')}
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms2' />
            <label htmlFor='terms2' className='text-sm font-medium'>
              {t('demo.remaining.missing.checkbox.notSelected')}
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms3' disabled />
            <label htmlFor='terms3' className='text-sm font-medium text-neutral-400'>
              {t('demo.remaining.missing.checkbox.disabled')}
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
        <label htmlFor="terms1">{t('demo.remaining.missing.checkbox.selected')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" />
        <label htmlFor="terms2">{t('demo.remaining.missing.checkbox.notSelected')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms3" disabled />
        <label htmlFor="terms3">{t('demo.remaining.missing.checkbox.disabled')}</label>
      </div>
    </div>
  )
}`,
      usageExamples: [
        {
          title: t('demo.remaining.formGroup'),
          description: t('demo.remaining.descriptions.checkboxFormGroup'),
          code: `<div className="space-y-2">
  <p className="font-medium">{t('demo.remaining.missing.checkbox.yourInterests')}</p>
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Checkbox id="frontend" />
      <label htmlFor="frontend">{t('demo.remaining.development.frontend')}</label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="backend" />
      <label htmlFor="backend">{t('demo.remaining.development.backend')}</label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="mobile" />
      <label htmlFor="mobile">{t('demo.remaining.development.mobile')}</label>
    </div>
  </div>
</div>`,
          component: (
            <div className='space-y-2'>
              <p className='font-medium'>{t('demo.remaining.missing.checkbox.yourInterests')}</p>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='frontend-demo' />
                  <label htmlFor='frontend-demo' className='text-sm'>
                    {t('demo.remaining.development.frontend')}
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='backend-demo' />
                  <label htmlFor='backend-demo' className='text-sm'>
                    {t('demo.remaining.development.backend')}
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='mobile-demo' />
                  <label htmlFor='mobile-demo' className='text-sm'>
                    {t('demo.remaining.development.mobile')}
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
          description: t('demo.remaining.descriptions.checkboxChecked'),
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: t('demo.remaining.descriptions.defaultCheckedState'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.checkboxDisabled'),
          default: 'false',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: t('demo.remaining.descriptions.selectionChangeCallback'),
        },
      ],
    },

    // Data Grid Component
    {
      id: 'data-grid',
      title: 'Data Grid',
      description: t('demo.remaining.descriptions.dataGridComponent'),
      category: t('demo.content.categories.dataDisplay'),
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
    header: t('demo.remaining.tableHeaders.fullName'),
  },
  {
    accessorKey: 'email',
    header: t('demo.remaining.tableHeaders.email'),
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
      label: t('demo.remaining.labels.edit'),
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
          description: t('demo.remaining.dataTable.dataDescription'),
        },
        {
          name: 'columns',
          type: 'DataGridColumn<T>[]',
          description: t('demo.remaining.descriptions.tableColumnDefinitions'),
        },
        {
          name: 'enablePagination',
          type: 'boolean',
          description: t('demo.remaining.descriptions.enablePagination'),
          default: 'true',
        },
        {
          name: 'enableRowSelection',
          type: 'boolean',
          description: t('demo.remaining.descriptions.enableRowSelection'),
          default: 'false',
        },
        {
          name: 'enableGlobalFilter',
          type: 'boolean',
          description: t('demo.remaining.descriptions.enableGlobalSearch'),
          default: 'true',
        },
        {
          name: 'enableExport',
          type: 'boolean',
          description: t('demo.remaining.descriptions.enableExport'),
          default: 'false',
        },
        {
          name: 'onRowClick',
          type: '(row: T, index: number) => void',
          description: t('demo.remaining.descriptions.rowClickEvent'),
        },
      ],
    },

    // Data Table Component (Simpler version)
    {
      id: 'data-table',
      title: 'Data Table',
      description: t('demo.remaining.descriptions.dataTableComponent'),
      category: t('demo.content.categories.dataDisplay'),
      status: 'stable',
      demoComponent: (
        <div className='w-full'>
          <DataTable
            columns={[
              {
                accessorKey: 'name',
                header: t('demo.remaining.labels.name'),
              },
              {
                accessorKey: 'email',
                header: t('demo.remaining.tableHeaders.email'),
              },
              {
                accessorKey: 'role',
                header: 'Rol',
                cell: ({ row }: { row: any }) => <Badge variant='outline'>{row.getValue('role')}</Badge>,
              },
            ]}
            data={sampleUsers.slice(0, 3)}
            searchKey='name'
            searchPlaceholder={t('demo.remaining.labels.searchByName')}
          />
        </div>
      ),
      code: `import { DataTable } from '@/components/core/data-table'

function Example() {
  const columns: Array<import('@/components/core/data-grid').DataGridColumn<Record<string, any>>> = [
    {
      accessorKey: 'name',
      header: t('demo.remaining.labels.name'),
    },
    {
      accessorKey: 'email',
      header: t('demo.remaining.tableHeaders.email'),
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
      searchPlaceholder={t('demo.remaining.labels.searchByName')}
    />
  )
}`,
      props: [
        {
          name: 'columns',
          type: 'ColumnDef<TData, TValue>[]',
          description: t('demo.remaining.descriptions.tableColumnDefinitions'),
        },
        {
          name: 'data',
          type: 'TData[]',
          description: t('demo.remaining.dataTable.dataDescription'),
        },
        {
          name: 'searchKey',
          type: 'string',
          description: t('demo.remaining.descriptions.searchColumnKey'),
        },
        {
          name: 'searchPlaceholder',
          type: 'string',
          description: t('demo.remaining.dataTable.searchPlaceholder'),
          default: t('demo.remaining.dataTable.searchDefault'),
        },
      ],
    },

    // Switch Component (existing from original file)
    {
      id: 'switch',
      title: 'Switch',
      description: t('demo.remaining.descriptions.switchComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4'>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-sm font-medium'>{t('demo.remaining.notifications')}</span>
            <Switch defaultChecked />
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-sm font-medium'>{t('demo.remaining.missing.switch.emailUpdates')}</span>
            <Switch />
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-sm font-medium text-neutral-400'>{t('demo.remaining.missing.switch.disabled')}</span>
            <Switch disabled />
          </div>
        </div>
      ),
      code: `import { Switch } from '@/components/core/switch'

function Example() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span>{t('demo.remaining.notifications')}</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>{t('demo.remaining.missing.switch.emailUpdates')}</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>{t('demo.remaining.missing.switch.disabled')}</span>
        <Switch disabled />
      </div>
    </div>
  )
}`,
      props: [
        {
          name: 'checked',
          type: 'boolean',
          description: t('demo.remaining.descriptions.switchChecked'),
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: t('demo.remaining.descriptions.defaultOpenState'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.switchDisabled'),
          default: 'false',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: t('demo.remaining.descriptions.statusChangeCallback'),
        },
      ],
    },

    // Select Component (existing from original file)
    {
      id: 'select',
      title: 'Select',
      description: t('demo.remaining.descriptions.selectComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-3 w-full max-w-sm'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={t('demo.remaining.labels.selectCountry')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='tr'>{t('demo.remaining.missing.select.turkey')}</SelectItem>
              <SelectItem value='us'>{t('demo.remaining.countries.america')}</SelectItem>
              <SelectItem value='de'>{t('demo.remaining.countries.germany')}</SelectItem>
              <SelectItem value='fr'>{t('demo.remaining.countries.france')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={t('demo.remaining.labels.selectCountry')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">{t('demo.remaining.missing.select.turkey')}</SelectItem>
        <SelectItem value="us">{t('demo.remaining.countries.america')}</SelectItem>
        <SelectItem value="de">{t('demo.remaining.countries.germany')}</SelectItem>
        <SelectItem value="fr">{t('demo.remaining.countries.france')}</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
      props: [
        {
          name: 'value',
          type: 'string',
          description: t('demo.remaining.descriptions.selectedValue'),
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: t('demo.remaining.descriptions.defaultSelectedValue'),
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: t('demo.remaining.descriptions.valueChangeCallback'),
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
      description: t('demo.remaining.descriptions.textareaComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <Textarea placeholder={t('demo.remaining.textarea.basicPlaceholder')} rows={3} />
          <Textarea placeholder={t('demo.remaining.labels.characterCounter')} maxLength={100} rows={3} />
        </div>
      ),
      code: `import { Textarea } from '@/components/core/textarea'

function Example() {
  return (
    <div className="space-y-4">
      <Textarea 
        placeholder={t('demo.remaining.textarea.basicPlaceholder')}
        rows={3}
      />
      <Textarea 
        placeholder={t('demo.remaining.labels.characterCounter')}
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
          description: t('demo.remaining.descriptions.maxCharacterCount'),
        },
        {
          name: 'showCount',
          type: 'boolean',
          description: t('demo.remaining.descriptions.showCharacterCounter'),
          default: 'false',
        },
        {
          name: 'autoResize',
          type: 'boolean',
          description: t('demo.remaining.descriptions.autoResize'),
          default: 'false',
        },
        {
          name: 'error',
          type: 'string',
          description: t('demo.remaining.missing.badge.error'),
        },
      ],
    },

    // Dialog Component
    {
      id: 'dialog',
      title: 'Dialog',
      description: t('demo.remaining.descriptions.dialogComponent'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>{t('demo.remaining.missing.buttons.openDialog')}</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{t('demo.remaining.missing.dialog.editProfile')}</DialogTitle>
              <DialogDescription>{t('demo.remaining.missing.dialog.editProfileDesc')}</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  {t('demo.remaining.dialogLabels.name')}
                </Label>
                <Input id='name' defaultValue={t('demo.remaining.labels.sampleName')} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  E-posta
                </Label>
                <Input id='username' defaultValue='ahmet@example.com' className='col-span-3' />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>{t('demo.remaining.dialogLabels.save')}</Button>
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
        <Button variant="outline">{t('demo.remaining.missing.buttons.openDialog')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('demo.remaining.missing.dialog.editProfile')}</DialogTitle>
          <DialogDescription>
            {t('demo.remaining.missing.dialog.editProfileDesc')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              İsim
            </Label>
            <Input id="name" defaultValue={t('demo.remaining.labels.sampleName')} className="col-span-3" />
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
        t('demo.remaining.descriptions.editUserProfile'),
        t('demo.remaining.descriptions.confirmationDialogs'),
        t('demo.remaining.descriptions.modalForms'),
        t('demo.remaining.descriptions.detailPopups'),
      ],
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: t('demo.remaining.descriptions.dialogOpenState'),
          default: 'false',
        },
        {
          name: 'onOpenChange',
          type: 'function',
          description: t('demo.remaining.descriptions.dialogStateChangeCallback'),
        },
      ],
    },

    // Dropdown Component
    {
      id: 'dropdown',
      title: 'Dropdown Menu',
      description: t('demo.remaining.descriptions.dropdownComponent'),
      category: 'Navigation',
      status: 'stable',
      demoComponent: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>{t('demo.remaining.missing.buttons.menu')}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>{t('demo.remaining.missing.dropdown.myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t('demo.remaining.profile')}</DropdownMenuItem>
            <DropdownMenuItem>{t('demo.remaining.buttonActions.settings')}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>{t('demo.remaining.notifications')}</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>{t('demo.remaining.missing.dropdown.emailUpdates')}</DropdownMenuCheckboxItem>
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
        <Button variant="outline">{t('demo.remaining.missing.buttons.menu')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('demo.remaining.missing.dropdown.myAccount')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profil</DropdownMenuItem>
        <DropdownMenuItem>{t('demo.remaining.buttonActions.settings')}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          {t('demo.remaining.notifications')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.userMenus'),
        t('demo.remaining.descriptions.actionMenus'),
        t('demo.remaining.descriptions.navigationDropdowns'),
        t('demo.remaining.descriptions.optionLists'),
      ],
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: t('demo.remaining.descriptions.menuOpenState'),
        },
        {
          name: 'onOpenChange',
          type: 'function',
          description: t('demo.remaining.descriptions.menuStateChangeCallback'),
        },
      ],
    },

    // Input Component
    {
      id: 'input',
      title: 'Input',
      description: t('demo.remaining.descriptions.inputComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <Input placeholder={t('demo.remaining.labels.basicInput')} />
          <Input type='email' placeholder={t('demo.remaining.labels.emailAddress')} />
          <Input type='password' placeholder={t('demo.remaining.labels.password')} />
          <Input disabled placeholder={t('demo.remaining.labels.disabledInput')} />
        </div>
      ),
      code: `import { Input } from '@/components/core/input'

function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder="${t('demo.remaining.labels.basicInput')}" />
      <Input type="email" placeholder="${t('demo.remaining.labels.emailAddress')}" />
      <Input type="password" placeholder="${t('demo.remaining.labels.password')}" />
      <Input disabled placeholder="${t('demo.remaining.labels.disabledInput')}" />
    </div>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.formFields'),
        t('demo.remaining.descriptions.getUserData'),
        t('demo.remaining.descriptions.searchBoxes'),
        t('demo.remaining.descriptions.loginRegisterForms'),
      ],
      props: [
        {
          name: 'type',
          type: 'string',
          description: t('demo.remaining.extraDescriptions.inputType'),
          default: 'text',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.remaining.placeholderText'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.inputDisabledState'),
          default: 'false',
        },
        {
          name: 'value',
          type: 'string',
          description: t('demo.remaining.descriptions.inputValue'),
        },
      ],
    },

    // Loading Components
    {
      id: 'loading',
      title: 'Loading',
      description: t('demo.remaining.descriptions.loadingComponent'),
      category: 'Feedback',
      status: 'stable',
      demoComponent: (
        <div className='grid grid-cols-3 gap-8 items-center justify-items-center'>
          <div className='text-center space-y-2'>
            <LoadingSpinner size='md' />
            <p className='text-sm text-neutral-500'>{t('demo.remaining.loadingTypes.spinner')}</p>
          </div>
          <div className='text-center space-y-2'>
            <LoadingDots />
            <p className='text-sm text-neutral-500'>{t('demo.remaining.loadingTypes.dots')}</p>
          </div>
          <div className='text-center space-y-2'>
            <LoadingPulse />
            <p className='text-sm text-neutral-500'>{t('demo.remaining.loadingTypes.pulse')}</p>
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
        t('demo.remaining.descriptions.showWhileDataLoading'),
        t('demo.remaining.descriptions.duringApiCalls'),
        t('demo.remaining.descriptions.buttonLoadingStates'),
        t('demo.remaining.descriptions.pageTransitions'),
      ],
      props: [
        {
          name: 'size',
          type: 'sm | md | lg',
          description: t('demo.remaining.loadingSize'),
          default: 'md',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.remaining.descriptions.additionalCssClasses'),
        },
      ],
    },

    // Progress Component
    {
      id: 'progress',
      title: 'Progress',
      description: t('demo.remaining.descriptions.progressComponent'),
      category: 'Feedback',
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>{t('demo.remaining.progress')}</span>
              <span>33%</span>
            </div>
            <Progress value={33} />
          </div>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>{t('demo.remaining.missing.loading.loading')}</span>
              <span>67%</span>
            </div>
            <Progress value={67} className='h-2' />
          </div>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>{t('demo.remaining.missing.loading.completed')}</span>
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
          <span>{t('demo.remaining.missing.loading.loading')}</span>
          <span>67%</span>
        </div>
        <Progress value={67} className="h-2" />
      </div>
    </div>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.fileUploadProgress'),
        t('demo.remaining.descriptions.formCompletionStatus'),
        t('demo.remaining.descriptions.taskProgress'),
        t('demo.remaining.descriptions.pageLoadingStatus'),
      ],
      props: [
        {
          name: 'value',
          type: 'number',
          description: t('demo.remaining.descriptions.progressValue'),
          default: '0',
        },
        {
          name: 'max',
          type: 'number',
          description: t('demo.remaining.descriptions.maximumValue'),
          default: '100',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.remaining.descriptions.additionalCssClasses'),
        },
      ],
    },

    // Skeleton Components
    {
      id: 'skeleton',
      title: 'Skeleton',
      description: t('demo.remaining.descriptions.skeletonComponent'),
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
        t('demo.remaining.descriptions.showPlaceholderWhileDataLoads'),
        t('demo.remaining.descriptions.improveUserExperience'),
        t('demo.remaining.descriptions.pageTransitions'),
        t('demo.remaining.descriptions.visualConsistencyWhileWaitingApi'),
      ],
      props: [
        {
          name: 'width',
          type: 'string | number',
          description: t('demo.remaining.descriptions.skeletonWidth'),
        },
        {
          name: 'height',
          type: 'string | number',
          description: t('demo.remaining.descriptions.skeletonHeight'),
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.remaining.descriptions.additionalCssClasses'),
        },
      ],
    },

    // Tabs Component
    {
      id: 'tabs',
      title: 'Tabs',
      description: t('demo.remaining.descriptions.tabsComponent'),
      category: 'Navigation',
      status: 'stable',
      demoComponent: (
        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='account'>{t('demo.remaining.account')}</TabsTrigger>
            <TabsTrigger value='password'>{t('demo.remaining.missing.tabs.password')}</TabsTrigger>
          </TabsList>
          <TabsContent value='account' className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>{t('demo.remaining.dialogLabels.name')}</Label>
              <Input id='name' defaultValue={t('demo.remaining.labels.sampleName')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='username'>{t('demo.remaining.missing.tabs.username')}</Label>
              <Input id='username' defaultValue='@ahmetyilmaz' />
            </div>
          </TabsContent>
          <TabsContent value='password' className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='current'>{t('demo.remaining.missing.tabs.currentPassword')}</Label>
              <Input id='current' type='password' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new'>{t('demo.remaining.missing.tabs.newPassword')}</Label>
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
        <TabsTrigger value="account">{t('demo.remaining.account')}</TabsTrigger>
        <TabsTrigger value="password">{t('demo.remaining.missing.tabs.password')}</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <Label htmlFor="name">İsim</Label>
          <Input id="name" defaultValue={t('demo.remaining.labels.sampleName')} />
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <Label htmlFor="current">{t('demo.remaining.missing.tabs.currentPassword')}</Label>
          <Input id="current" type="password" />
        </div>
      </TabsContent>
    </Tabs>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.settingsPages'),
        t('demo.remaining.descriptions.profileEditingForms'),
        t('demo.remaining.descriptions.separateDashboardSections'),
        t('demo.remaining.descriptions.categorizedContent'),
      ],
      props: [
        {
          name: 'defaultValue',
          type: 'string',
          description: t('demo.remaining.descriptions.defaultActiveTab'),
        },
        {
          name: 'value',
          type: 'string',
          description: t('demo.remaining.descriptions.controlledActiveTab'),
        },
        {
          name: 'onValueChange',
          type: 'function',
          description: t('demo.remaining.descriptions.tabChangeCallback'),
        },
      ],
    },

    // Slider Component
    {
      id: 'slider',
      title: 'Slider',
      description: t('demo.remaining.descriptions.sliderComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-6 w-full max-w-sm'>
          <div>
            <Label className='text-sm font-medium'>{t('demo.remaining.volumeLevel')}: 50</Label>
            <Slider defaultValue={[50]} max={100} step={1} className='mt-2' />
          </div>
          <div>
            <Label className='text-sm font-medium'>{t('demo.remaining.missing.slider.priceRange')}</Label>
            <Slider defaultValue={[200, 800]} max={1000} step={10} className='mt-2' />
          </div>
          <div>
            <Label className='text-sm font-medium'>{t('demo.remaining.quality')}: 8/10</Label>
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
        <Label className="text-sm font-medium">{t('demo.remaining.volumeLevel')}</Label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1} 
          className="mt-2" 
        />
      </div>
      <div>
        <Label className="text-sm font-medium">{t('demo.remaining.missing.slider.priceRangeLabel')}</Label>
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
        t('demo.remaining.descriptions.volumeBrightnessControls'),
        t('demo.remaining.descriptions.priceRangeSelection'),
        t('demo.remaining.descriptions.filteringOptions'),
        t('demo.remaining.descriptions.valueRangeDetermination'),
      ],
      props: [
        {
          name: 'defaultValue',
          type: 'number[]',
          description: t('demo.remaining.descriptions.defaultValues'),
        },
        {
          name: 'value',
          type: 'number[]',
          description: t('demo.remaining.descriptions.controlledValues'),
        },
        {
          name: 'max',
          type: 'number',
          description: t('demo.remaining.descriptions.maximumValue'),
          default: '100',
        },
        {
          name: 'min',
          type: 'number',
          description: t('demo.remaining.descriptions.minimumValue'),
          default: '0',
        },
        {
          name: 'step',
          type: 'number',
          description: t('demo.remaining.descriptions.incrementAmount'),
          default: '1',
        },
      ],
    },

    // Separator Component
    {
      id: 'separator',
      title: 'Separator',
      description: t('demo.remaining.descriptions.separatorComponent'),
      category: 'Layout',
      status: 'stable',
      demoComponent: (
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium'>{t('demo.remaining.missing.separator.section1')}</h4>
            <p className='text-sm text-neutral-500 mt-1'>{t('demo.remaining.missing.separator.exampleContent1')}</p>
          </div>
          <Separator />
          <div>
            <h4 className='text-sm font-medium'>{t('demo.remaining.missing.separator.section2')}</h4>
            <p className='text-sm text-neutral-500 mt-1'>{t('demo.remaining.missing.separator.exampleContent2')}</p>
          </div>
          <Separator orientation='vertical' className='h-20' />
          <div className='flex items-center gap-4'>
            <span>{t('demo.remaining.left')}</span>
            <Separator orientation='vertical' className='h-6' />
            <span>{t('demo.remaining.missing.separator.right')}</span>
          </div>
        </div>
      ),
      code: `import { Separator } from '@/components/core/separator'

function Example() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium">{t('demo.remaining.missing.separator.section1')}</h4>
        <p className="text-sm text-neutral-500">{t('demo.remaining.missing.separator.exampleContent1')}</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">{t('demo.remaining.missing.separator.section2')}</h4>
        <p className="text-sm text-neutral-500">{t('demo.remaining.missing.separator.exampleContent2')}</p>
      </div>
      <div className="flex items-center gap-4">
        <span>Sol</span>
        <Separator orientation="vertical" className="h-6" />
        <span>{t('demo.remaining.missing.separator.right')}</span>
      </div>
    </div>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.separateContentSections'),
        t('demo.remaining.descriptions.groupMenuItems'),
        t('demo.remaining.descriptions.cardSectionSeparations'),
        t('demo.remaining.descriptions.organizeFormFields'),
      ],
      props: [
        {
          name: 'orientation',
          type: 'horizontal | vertical',
          description: t('demo.remaining.descriptions.separatorDirection'),
          default: 'horizontal',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.remaining.descriptions.additionalCssClasses'),
        },
      ],
    },

    // Popover Component
    {
      id: 'popover',
      title: 'Popover',
      description: t('demo.remaining.descriptions.popoverComponent'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <div className='flex gap-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>{t('demo.remaining.missing.popover.openPopover')}</Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='grid gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium leading-none'>Boyutlar</h4>
                  <p className='text-sm text-neutral-500'>{t('demo.remaining.missing.popover.adjustDimensions')}</p>
                </div>
                <div className='grid gap-2'>
                  <div className='grid grid-cols-3 items-center gap-4'>
                    <Label htmlFor='width'>{t('demo.remaining.missing.popover.width')}</Label>
                    <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
                  </div>
                  <div className='grid grid-cols-3 items-center gap-4'>
                    <Label htmlFor='height'>{t('demo.remaining.missing.popover.height')}</Label>
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
        <Button variant="outline">{t('demo.remaining.missing.popover.openPopover')}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Boyutlar</h4>
            <p className="text-sm text-neutral-500">
              {t('demo.remaining.missing.popover.adjustDimensions')}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">{t('demo.remaining.missing.popover.width')}</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.quickSettingsMenus'),
        t('demo.remaining.descriptions.showAdditionalInfo'),
        t('demo.remaining.descriptions.formHelperContent'),
        t('demo.remaining.descriptions.contextMenus'),
      ],
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: t('demo.remaining.descriptions.popoverOpenState'),
        },
        {
          name: 'onOpenChange',
          type: 'function',
          description: t('demo.remaining.descriptions.popoverStateChangeCallback'),
        },
      ],
    },

    // Tooltip Component
    {
      id: 'tooltip',
      title: 'Tooltip',
      description: t('demo.remaining.descriptions.tooltipComponent'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <TooltipProvider>
          <div className='flex gap-4 items-center'>
            <TooltipComponent content={t('demo.remaining.tooltips.example')}>
              <Button variant='outline'>Hover Me</Button>
            </TooltipComponent>
            <TooltipComponent content={t('demo.remaining.tooltips.rightSide')} side='right'>
              <Button variant='outline'>Right Tooltip</Button>
            </TooltipComponent>
            <TooltipComponent content={t('demo.remaining.tooltips.bottomSide')} side='bottom'>
              <Button variant='outline'>Bottom Tooltip</Button>
            </TooltipComponent>
            <TooltipComponent content={t('demo.remaining.tooltips.disabled')} disabled>
              <Button variant='outline'>{t('demo.remaining.buttonVariants.disabled')}</Button>
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
        <TooltipComponent content={t('demo.remaining.tooltips.example')}>
          <Button variant="outline">Hover Me</Button>
        </TooltipComponent>
        
        <TooltipComponent content={t('demo.remaining.tooltips.rightSide')} side="right">
          <Button variant="outline">Right Tooltip</Button>
        </TooltipComponent>
        
        <TooltipComponent content={t('demo.remaining.tooltips.bottomSide')} side="bottom">
          <Button variant="outline">Bottom Tooltip</Button>
        </TooltipComponent>
        
        <TooltipComponent content={t('demo.remaining.tooltips.disabled')} disabled>
          <Button variant="outline">{t('demo.remaining.buttonVariants.disabled')}</Button>
        </TooltipComponent>
      </div>
    </TooltipProvider>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.buttonExplanations'),
        t('demo.remaining.descriptions.formFieldHelpTexts'),
        t('demo.remaining.descriptions.abbreviatedTextExplanations'),
        t('demo.remaining.descriptions.explainIconMeanings'),
      ],
      props: [
        {
          name: 'content',
          type: 'ReactNode',
          description: t('demo.remaining.descriptions.tooltipContent'),
        },
        {
          name: 'side',
          type: 'top | right | bottom | left',
          description: t('demo.remaining.tooltipPosition'),
          default: 'top',
        },
        {
          name: 'align',
          type: 'start | center | end',
          description: t('demo.remaining.descriptions.tooltipAlignment'),
          default: 'center',
        },
        {
          name: 'delayDuration',
          type: 'number',
          description: t('demo.remaining.descriptions.tooltipDisplayDelay'),
          default: '300',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.tooltipDisabledState'),
          default: 'false',
        },
      ],
    },

    // Scroll Area Component
    {
      id: 'scroll-area',
      title: 'Scroll Area',
      description: t('demo.remaining.descriptions.scrollAreaComponent'),
      category: 'Layout',
      status: 'stable',
      demoComponent: (
        <div className='space-y-4'>
          <ScrollArea className='h-32 w-48 rounded-md border p-4'>
            <div className='space-y-2'>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className='text-sm'>
                  {t('demo.remaining.listItem')} {i + 1}
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
            {t('demo.remaining.listItem')} {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.longListDisplays'),
        t('demo.remaining.descriptions.limitedHeightContent'),
        t('demo.remaining.descriptions.chatMessageHistory'),
        t('demo.remaining.descriptions.navigationMenus'),
      ],
      props: [
        {
          name: 'className',
          type: 'string',
          description: t('demo.remaining.descriptions.additionalCssClasses'),
        },
      ],
    },

    // Rich Text Editor Component
    {
      id: 'rich-text-editor',
      title: 'Rich Text Editor',
      description: t('demo.remaining.descriptions.richTextComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='w-full max-w-2xl'>
          <RichTextEditor
            placeholder={t('demo.remaining.labels.richTextPlaceholder')}
            value={t('demo.remaining.labels.richTextExample')}
            onChange={(content) => console.log(content)}
          />
        </div>
      ),
      code: `import { RichTextEditor } from '@/components/core/rich-text-editor'

function Example() {
  return (
    <RichTextEditor
      placeholder={t('demo.remaining.labels.richTextPlaceholder')}
      value={t('demo.remaining.labels.richTextExample')}
      onChange={(content) => console.log(content)}
    />
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.blogPosts'),
        t('demo.remaining.descriptions.productDescriptions'),
        t('demo.remaining.descriptions.emailEditors'),
        t('demo.remaining.descriptions.richContentInComments'),
      ],
      props: [
        {
          name: 'value',
          type: 'string',
          description: t('demo.remaining.descriptions.controlledContentValue'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.remaining.descriptions.contentChangeCallback'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.remaining.placeholderText'),
        },
      ],
    },

    // Modern Date Picker Component
    {
      id: 'modern-date-picker',
      title: 'Modern Date Picker',
      description: t('demo.remaining.descriptions.modernDatePickerComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div>
            <Label>{t('demo.remaining.missing.datePicker.birthDate')}</Label>
            <ModernDatePicker
              placeholder={t('demo.remaining.labels.selectDate')}
              onChange={(date) => console.log(date)}
            />
          </div>
        </div>
      ),
      code: `import { ModernDatePicker } from '@/components/core/modern-date-picker'
import { Label } from '@/components/core/label'

function Example() {
  return (
    <div className="space-y-2">
      <Label>{t('demo.remaining.missing.datePicker.birthDate')}</Label>
      <ModernDatePicker 
        placeholder={t('demo.remaining.labels.selectDate')}
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.birthdateSelection'),
        t('demo.remaining.descriptions.eventDateDetermination'),
        t('demo.remaining.descriptions.reportDateRange'),
        t('demo.remaining.descriptions.reservationDateSelection'),
      ],
      props: [
        {
          name: 'value',
          type: 'Date',
          description: t('demo.remaining.descriptions.selectedDate'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.remaining.descriptions.dateChangeCallback'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.remaining.placeholderText'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.disabledState'),
          default: 'false',
        },
      ],
    },

    // Month Year Picker Component
    {
      id: 'month-year-picker',
      title: 'Month Year Picker',
      description: t('demo.remaining.descriptions.monthYearPickerComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div>
            <Label>{t('demo.remaining.dates.graduationDate')}</Label>
            <MonthYearPicker
              placeholder={t('demo.remaining.labels.selectMonthYear')}
              onChange={(date) => console.log(date)}
            />
          </div>
        </div>
      ),
      code: `import { MonthYearPicker } from '@/components/core/month-year-picker'
import { Label } from '@/components/core/label'

function Example() {
  return (
    <div className="space-y-2">
      <Label>{t('demo.remaining.dates.graduationDate')}</Label>
      <MonthYearPicker 
        placeholder={t('demo.remaining.labels.selectMonthYear')} 
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.graduationDate'),
        t('demo.remaining.descriptions.workExperienceDates'),
        t('demo.remaining.descriptions.creditCardExpirationDate'),
        t('demo.remaining.descriptions.reportPeriodSelection'),
      ],
      props: [
        {
          name: 'value',
          type: 'Date',
          description: t('demo.remaining.descriptions.selectedMonthYear'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.remaining.descriptions.dateChangeCallback'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.remaining.placeholderText'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.disabledState'),
          default: 'false',
        },
      ],
    },

    // Date Range Picker Component
    {
      id: 'date-range-picker',
      title: 'Date Range Picker',
      description: t('demo.remaining.descriptions.dateRangePickerComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div className='flex flex-col space-y-2'>
            <Label>{t('demo.remaining.dates.holidayDates')}</Label>
            <DatePicker
              mode='range'
              enablePresets={true}
              placeholder={t('demo.remaining.labels.selectDateRange')}
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
      <Label>{t('demo.remaining.dates.holidayDates')}</Label>
      <RangePicker 
        placeholder={{ from: t('demo.remaining.labels.start'), to: t('demo.remaining.labels.end') }}
        onChange={(range) => console.log(range)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.vacationDateRangeSelection'),
        t('demo.remaining.descriptions.reportPeriodDetermination'),
        t('demo.remaining.descriptions.reservationDateRange'),
        t('demo.remaining.descriptions.projectTimelinePlanning'),
      ],
      props: [
        {
          name: 'value',
          type: 'DateRange',
          description: t('demo.remaining.descriptions.selectedDateRange'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.remaining.descriptions.dateRangeChangeCallback'),
        },
        {
          name: 'placeholder',
          type: 'object',
          description: 'Placeholder metinleri ({ from: string, to: string })',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.disabledState'),
          default: 'false',
        },
      ],
    },

    // Single Date Picker Component
    {
      id: 'single-date-picker',
      title: 'Single Date Picker',
      description: t('demo.remaining.descriptions.datePickerComponent'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div className='flex flex-col space-y-2'>
            <Label>{t('demo.remaining.dates.appointmentDate')}</Label>
            <DatePicker
              mode='single'
              placeholder={t('demo.remaining.labels.selectDate')}
              onChange={(date: any) => console.log(date)}
            />
          </div>
        </div>
      ),
      code: `import { createSingleDatePicker } from '@/components/core/date-picker'
import { Label } from '@/components/core/label'

function Example() {
  const SinglePicker = createSingleDatePicker()
  
  return (
    <div className="space-y-2">
      <Label>{t('demo.remaining.dates.appointmentDate')}</Label>
      <SinglePicker 
        placeholder={t('demo.remaining.labels.selectDate')}
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.remaining.descriptions.appointmentDateSelection'),
        t('demo.remaining.descriptions.deadlineDetermination'),
        t('demo.remaining.descriptions.eventDateSelection'),
        t('demo.remaining.descriptions.birthdateInput'),
      ],
      props: [
        {
          name: 'value',
          type: 'Date',
          description: t('demo.remaining.descriptions.selectedDate'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.remaining.descriptions.dateChangeCallback'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.remaining.placeholderText'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.remaining.descriptions.disabledState'),
          default: 'false',
        },
      ],
    },
  ]
}
