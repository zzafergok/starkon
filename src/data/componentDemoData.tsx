import React from 'react'

import { useTranslation } from 'react-i18next'
import {
  X,
  Edit,
  Info,
  Plus,
  Star,
  Heart,
  Trash2,
  Search,
  Target,
  Settings,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react'

import { z } from 'zod'
import {
  Form,
  TextField,
  DateField,
  RadioField,
  SelectField,
  SwitchField,
  SubmitButton,
  TextareaField,
  PasswordRules,
  CheckboxField,
  PasswordStrengthBar,
} from '@/components/forms'

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
import { Stepper } from '@/components/core/stepper'
import { Calendar } from '@/components/core/calendar'
import { Progress } from '@/components/core/progress'
import { Checkbox } from '@/components/core/checkbox'
import { Textarea } from '@/components/core/textarea'
import { Accordion } from '@/components/core/accordion'
import { Separator } from '@/components/core/separator'
import { FormError } from '@/components/core/form-error'
import { DataTable } from '@/components/core/data-table'
import { DatePicker } from '@/components/core/date-picker'
import { ScrollArea } from '@/components/core/scroll-area'
import { Collapsible } from '@/components/core/collapsible'
import { NumberInput } from '@/components/core/number-input'
import { PasswordInput } from '@/components/core/password-input'
import { RichTextEditor } from '@/components/core/rich-text-editor'
import { ThemeSwitcher } from '@/components/ui/theme/theme-switcher'
import { MonthYearPicker } from '@/components/core/month-year-picker'
import { ModernDatePicker } from '@/components/core/modern-date-picker'
import { PomodoroTimer } from '@/components/ui/pomodoro/pomodoro-timer'
import { DynamicBreadcrumb } from '@/components/core/dynamic-breadcrumb'
import { EnhancedDataTable } from '@/components/core/enhanced-data-table'
import { ModernDrawer, useDrawer } from '@/components/core/modern-drawer'
import { PomodoroButton } from '@/components/ui/pomodoro/pomodoro-button'
import { TooltipComponent, TooltipProvider } from '@/components/core/tooltip'
import { Alert, AlertTitle, AlertDescription } from '@/components/core/alert'
import { LanguageSwitcher } from '@/components/ui/language/language-switcher'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/core/avatar'
import { EnhancedSearchFilters } from '@/components/core/enhanced-search-filters'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/core/popover'
import { EnterpriseErrorBoundary } from '@/components/core/enterprise-error-boundary'
import { EnhancedPaginationControls } from '@/components/core/enhanced-pagination-controls'
import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/core/loading-spinner'
import { DataGrid, createSelectionColumn, createActionsColumn } from '@/components/core/data-grid'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/core/card'
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard } from '@/components/core/skeleton'
import { AccessibleRegion, SkipLink, AccessibleList, VisuallyHidden } from '@/components/core/accessibility-enhancer'

// Categories definition
export const CATEGORIES = [
  'all',
  'layout',
  'forms',
  'formInput',
  'dataDisplay',
  'overlay',
  'feedback',
  'navigation',
  'ui',
  'advanced',
] as const

export type Category = (typeof CATEGORIES)[number]

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

  // Sample data for forms
  const roleOptions = [
    { value: 'admin', label: t('demo.forms.roles.admin') },
    { value: 'editor', label: t('demo.forms.roles.editor') },
    { value: 'user', label: t('demo.forms.roles.user') },
  ]

  const countryOptions = [
    { value: 'tr', label: t('demo.forms.countries.turkey') },
    { value: 'us', label: t('demo.forms.countries.usa') },
    { value: 'uk', label: t('demo.forms.countries.uk') },
    { value: 'de', label: t('demo.forms.countries.germany') },
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
      title: t('demo.accordion.title'),
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
              <Accordion.Trigger>{t('demo.content.accordion.notificationPreferences')}</Accordion.Trigger>
              <Accordion.Content>
                <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                  {t('demo.content.accordion.notificationDesc')}
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
        <Accordion.Trigger>{t('demo.content.accordion.personalInfo')}</Accordion.Trigger>
        <Accordion.Content>
          <p>{t('demo.content.accordion.personalInfoDesc')}</p>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>{t('demo.content.accordion.securitySettings')}</Accordion.Trigger>
        <Accordion.Content>
          <p>{t('demo.content.accordion.securitySettingsDesc')}</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}`,
      usageExamples: [
        {
          title: t('demo.accordion.usage.multiple'),
          description: t('demo.accordion.usage.multipleDesc'),
          code: `<Accordion.Root type="multiple" defaultValue={['item-1', 'item-2']}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>{t('demo.accordion.section1')}</Accordion.Trigger>
    <Accordion.Content>{t('demo.accordion.content1')}</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>{t('demo.accordion.section2')}</Accordion.Trigger>
    <Accordion.Content>{t('demo.accordion.content2')}</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`,
          component: (
            <Accordion.Root
              type='multiple'
              defaultValue={['item-1']}
              className='border rounded-lg border-neutral-200 dark:border-neutral-700 w-full'
            >
              <Accordion.Item value='item-1'>
                <Accordion.Trigger>{t('demo.accordion.openSection')}</Accordion.Trigger>
                <Accordion.Content>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    {t('demo.accordion.defaultOpenSection')}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value='item-2'>
                <Accordion.Trigger>{t('demo.accordion.otherSection')}</Accordion.Trigger>
                <Accordion.Content>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    {t('demo.accordion.canAlsoOpenThisSection')}
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
          description: t('demo.accordion.props.collapsible'),
          default: 'true',
        },
      ],
    },

    // Alert Component
    {
      id: 'alert',
      title: t('demo.alert.title'),
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
        <AlertDescription>{t('demo.content.alerts.informationMsg')}</AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{t('demo.content.alerts.warning')}</AlertTitle>
        <AlertDescription>Dikkat edilmesi gereken bir durum var.</AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('demo.content.alerts.error')}</AlertTitle>
        <AlertDescription>{t('demo.content.alerts.errorMsg')}</AlertDescription>
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
      title: t('demo.alertDialog.title'),
      description: t('demo.descriptions.alertDialog'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>{t('demo.alertDialog.deleteAccount')}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('demo.alertDialog.confirmDelete')}</AlertDialogTitle>
              <AlertDialogDescription>{t('demo.alertDialog.deleteWarning')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('demo.alertDialog.cancel')}</AlertDialogCancel>
              <AlertDialogAction>{t('demo.alertDialog.confirmAction')}</AlertDialogAction>
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
        <Button variant="destructive">{t('demo.alertDialog.deleteAccount')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('demo.alertDialog.confirmDelete')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('demo.alertDialog.deleteWarning')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('demo.alertDialog.cancel')}</AlertDialogCancel>
          <AlertDialogAction>{t('demo.alertDialog.confirmAction')}</AlertDialogAction>
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

    // Form Component
    {
      id: 'form',
      title: 'Form',
      description: t('demo.forms.descriptions.form'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.basicForm')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                name: z.string().min(2, t('demo.forms.validation.nameMin')),
                email: z.string().email(t('demo.forms.validation.emailInvalid')),
              })}
              defaultValues={{ name: '', email: '' }}
              onSubmit={(data) => {
                console.log('Form submitted:', data)
                alert(JSON.stringify(data, null, 2))
              }}
              className='space-y-4'
            >
              <TextField name='name' label={t('demo.forms.labels.name')} required />
              <TextField name='email' label={t('demo.forms.labels.email')} type='email' required />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { z } from 'zod'
import { Form, TextField, SubmitButton } from '@/components/forms'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

function BasicForm() {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data)
  }

  return (
    <Form
      schema={schema}
      defaultValues={{ name: '', email: '' }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <TextField name="name" label="Name" required />
      <TextField name="email" label="Email" type="email" required />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}`,
      usageExamples: [
        {
          title: t('demo.forms.examples.complexForm'),
          description: t('demo.forms.descriptions.complexForm'),
          code: `const schema = z.object({
  user: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
  }),
  settings: z.object({
    notifications: z.boolean(),
    newsletter: z.boolean(),
  }),
})

<Form schema={schema} defaultValues={...} onSubmit={handleSubmit}>
  <TextField name="user.firstName" label="First Name" />
  <TextField name="user.lastName" label="Last Name" />
  <TextField name="user.email" label="Email" type="email" />
  <CheckboxField name="settings.notifications" label="Enable Notifications" />
  <CheckboxField name="settings.newsletter" label="Subscribe to Newsletter" />
  <SubmitButton>Save Settings</SubmitButton>
</Form>`,
        },
      ],
      props: [
        {
          name: 'schema',
          type: 'ZodSchema',
          description: t('demo.forms.props.schema'),
          required: true,
        },
        {
          name: 'defaultValues',
          type: 'object',
          description: t('demo.forms.props.defaultValues'),
          required: true,
        },
        {
          name: 'onSubmit',
          type: '(data: T) => void | Promise<void>',
          description: t('demo.forms.props.onSubmit'),
          required: true,
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.forms.props.className'),
        },
      ],
    },

    // TextField Component
    {
      id: 'text-field',
      title: 'TextField',
      description: t('demo.forms.descriptions.textField'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.textInputs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                text: z.string().min(1),
                email: z.string().email(),
                password: z.string().min(8),
                number: z.number().min(0).max(100),
                url: z.string().url(),
                tel: z.string(),
              })}
              defaultValues={{
                text: '',
                email: '',
                password: '',
                number: 0,
                url: '',
                tel: '',
              }}
              onSubmit={(data) => console.log(data)}
              className='space-y-4'
            >
              <TextField
                name='text'
                label={t('demo.forms.labels.text')}
                placeholder={t('demo.forms.placeholders.enterText')}
              />
              <TextField
                name='email'
                label={t('demo.forms.labels.email')}
                type='email'
                placeholder='user@example.com'
              />
              <TextField
                name='password'
                label={t('demo.forms.labels.password')}
                type='password'
                isPassword
                showPasswordToggle
                showPasswordStrength
              />
              <TextField
                name='number'
                label={t('demo.forms.labels.number')}
                type='number'
                min={0}
                max={100}
                showNumberButtons
              />
              <TextField name='url' label={t('demo.forms.labels.url')} type='url' placeholder='https://example.com' />
              <TextField name='tel' label={t('demo.forms.labels.phone')} type='tel' placeholder='+90 555 123 4567' />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { TextField } from '@/components/forms'

// Text input
<TextField name="text" label="Text" placeholder="Enter text" />

// Email input
<TextField name="email" label="Email" type="email" />

// Password input with strength indicator
<TextField
  name="password"
  label="Password"
  type="password"
  isPassword
  showPasswordToggle
  showPasswordStrength
/>

// Number input with +/- buttons
<TextField
  name="number"
  label="Number"
  type="number"
  min={0}
  max={100}
  showNumberButtons
/>

// URL input
<TextField name="url" label="URL" type="url" />

// Phone input
<TextField name="tel" label="Phone" type="tel" />`,
      usageExamples: [
        {
          title: t('demo.forms.examples.passwordWithRules'),
          description: t('demo.forms.descriptions.passwordRules'),
          code: `<TextField
  name="password"
  label="Password"
  type="password"
  isPassword
  showPasswordToggle
  showPasswordStrength
  customPasswordRules={[
    { id: 'length', label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { id: 'lowercase', label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
    { id: 'number', label: 'One number', test: (p) => /[0-9]/.test(p) },
    { id: 'special', label: 'One special character', test: (p) => /[!@#$%^&*]/.test(p) },
  ]}
/>`,
        },
      ],
      props: [
        {
          name: 'name',
          type: 'string',
          description: t('demo.forms.props.name'),
          required: true,
        },
        {
          name: 'label',
          type: 'string',
          description: t('demo.forms.props.label'),
          required: true,
        },
        {
          name: 'type',
          type: "'text' | 'email' | 'password' | 'url' | 'tel' | 'number' | 'search' | 'date' | 'time'",
          description: t('demo.forms.props.inputType'),
          default: 'text',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.forms.props.placeholder'),
        },
        {
          name: 'required',
          type: 'boolean',
          description: t('demo.forms.props.required'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.forms.props.disabled'),
          default: 'false',
        },
        {
          name: 'isPassword',
          type: 'boolean',
          description: t('demo.forms.props.isPassword'),
          default: 'false',
        },
        {
          name: 'showPasswordToggle',
          type: 'boolean',
          description: t('demo.forms.props.showPasswordToggle'),
          default: 'true',
        },
        {
          name: 'showPasswordStrength',
          type: 'boolean',
          description: t('demo.forms.props.showPasswordStrength'),
          default: 'false',
        },
        {
          name: 'showNumberButtons',
          type: 'boolean',
          description: t('demo.forms.props.showNumberButtons'),
          default: 'true',
        },
        {
          name: 'min',
          type: 'number',
          description: t('demo.forms.props.min'),
        },
        {
          name: 'max',
          type: 'number',
          description: t('demo.forms.props.max'),
        },
      ],
    },

    // SelectField Component
    {
      id: 'select-field',
      title: 'SelectField',
      description: t('demo.forms.descriptions.selectField'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.selectInputs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                role: z.string().min(1, t('demo.forms.validation.roleRequired')),
                country: z.string().min(1, t('demo.forms.validation.countryRequired')),
              })}
              defaultValues={{ role: '', country: '' }}
              onSubmit={(data) => console.log(data)}
              className='space-y-4'
            >
              <SelectField name='role' label={t('demo.forms.labels.role')} options={roleOptions} required />
              <SelectField
                name='country'
                label={t('demo.forms.labels.country')}
                options={countryOptions}
                placeholder={t('demo.forms.placeholders.selectCountry')}
                required
              />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { SelectField } from '@/components/forms'

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'user', label: 'User' },
]

<SelectField
  name="role"
  label="Role"
  options={roleOptions}
  placeholder="Select a role"
  required
/>`,
      props: [
        {
          name: 'name',
          type: 'string',
          description: t('demo.forms.props.name'),
          required: true,
        },
        {
          name: 'label',
          type: 'string',
          description: t('demo.forms.props.label'),
          required: true,
        },
        {
          name: 'options',
          type: '{ value: string; label: string }[]',
          description: t('demo.forms.props.options'),
          required: true,
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.forms.props.placeholder'),
        },
        {
          name: 'required',
          type: 'boolean',
          description: t('demo.forms.props.required'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.forms.props.disabled'),
          default: 'false',
        },
      ],
    },

    // TextareaField Component
    {
      id: 'textarea-field',
      title: 'TextareaField',
      description: t('demo.forms.descriptions.textareaField'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.textareaInput')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                description: z.string().min(10, t('demo.forms.validation.descriptionMin')),
                bio: z.string().max(500, t('demo.forms.validation.bioMax')),
              })}
              defaultValues={{ description: '', bio: '' }}
              onSubmit={(data) => console.log(data)}
              className='space-y-4'
            >
              <TextareaField
                name='description'
                label={t('demo.forms.labels.description')}
                placeholder={t('demo.forms.placeholders.enterDescription')}
                rows={3}
                required
              />
              <TextareaField
                name='bio'
                label={t('demo.forms.labels.bio')}
                placeholder={t('demo.forms.placeholders.enterBio')}
                rows={5}
                maxLength={500}
              />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { TextareaField } from '@/components/forms'

<TextareaField
  name="description"
  label="Description"
  placeholder="Enter description"
  rows={3}
  required
/>

<TextareaField
  name="bio"
  label="Bio"
  placeholder="Tell us about yourself"
  rows={5}
  maxLength={500}
/>`,
      props: [
        {
          name: 'name',
          type: 'string',
          description: t('demo.forms.props.name'),
          required: true,
        },
        {
          name: 'label',
          type: 'string',
          description: t('demo.forms.props.label'),
          required: true,
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.forms.props.placeholder'),
        },
        {
          name: 'rows',
          type: 'number',
          description: t('demo.forms.props.rows'),
          default: '3',
        },
        {
          name: 'maxLength',
          type: 'number',
          description: t('demo.forms.props.maxLength'),
        },
        {
          name: 'required',
          type: 'boolean',
          description: t('demo.forms.props.required'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.forms.props.disabled'),
          default: 'false',
        },
      ],
    },

    // CheckboxField Component
    {
      id: 'checkbox-field',
      title: 'CheckboxField',
      description: t('demo.forms.descriptions.checkboxField'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.checkboxInputs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                terms: z.boolean().refine((val) => val === true, {
                  message: t('demo.forms.validation.termsRequired'),
                }),
                newsletter: z.boolean(),
                notifications: z.boolean(),
              })}
              defaultValues={{ terms: false, newsletter: false, notifications: true }}
              onSubmit={(data) => console.log(data)}
              className='space-y-4'
            >
              <CheckboxField name='terms' label={t('demo.forms.labels.acceptTerms')} required />
              <CheckboxField name='newsletter' label={t('demo.forms.labels.subscribeNewsletter')} />
              <CheckboxField name='notifications' label={t('demo.forms.labels.enableNotifications')} />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { CheckboxField } from '@/components/forms'

<CheckboxField
  name="terms"
  label="I accept the terms and conditions"
  required
/>

<CheckboxField
  name="newsletter"
  label="Subscribe to newsletter"
/>

<CheckboxField
  name="notifications"
  label="Enable notifications"
/>`,
      props: [
        {
          name: 'name',
          type: 'string',
          description: t('demo.forms.props.name'),
          required: true,
        },
        {
          name: 'label',
          type: 'string',
          description: t('demo.forms.props.label'),
          required: true,
        },
        {
          name: 'required',
          type: 'boolean',
          description: t('demo.forms.props.required'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.forms.props.disabled'),
          default: 'false',
        },
      ],
    },

    // RadioField Component
    {
      id: 'radio-field',
      title: 'RadioField',
      description: t('demo.forms.descriptions.radioField'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.radioInputs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                plan: z.string().min(1, t('demo.forms.validation.planRequired')),
                theme: z.string().min(1, t('demo.forms.validation.themeRequired')),
              })}
              defaultValues={{ plan: '', theme: '' }}
              onSubmit={(data) => console.log(data)}
              className='space-y-4'
            >
              <RadioField
                name='plan'
                label={t('demo.forms.labels.selectPlan')}
                options={[
                  { value: 'free', label: t('demo.forms.plans.free') },
                  { value: 'pro', label: t('demo.forms.plans.pro') },
                  { value: 'enterprise', label: t('demo.forms.plans.enterprise') },
                ]}
                required
              />
              <RadioField
                name='theme'
                label={t('demo.forms.labels.selectTheme')}
                options={[
                  { value: 'light', label: t('demo.forms.themes.light') },
                  { value: 'dark', label: t('demo.forms.themes.dark') },
                  { value: 'system', label: t('demo.forms.themes.system') },
                ]}
                required
              />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { RadioField } from '@/components/forms'

<RadioField
  name="plan"
  label="Select Plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ]}
  required
/>`,
      props: [
        {
          name: 'name',
          type: 'string',
          description: t('demo.forms.props.name'),
          required: true,
        },
        {
          name: 'label',
          type: 'string',
          description: t('demo.forms.props.label'),
          required: true,
        },
        {
          name: 'options',
          type: '{ value: string; label: string }[]',
          description: t('demo.forms.props.radioOptions'),
          required: true,
        },
        {
          name: 'required',
          type: 'boolean',
          description: t('demo.forms.props.required'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.forms.props.disabled'),
          default: 'false',
        },
      ],
    },

    // SwitchField Component
    {
      id: 'switch-field',
      title: 'SwitchField',
      description: t('demo.forms.descriptions.switchField'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.switchInputs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                emailNotifications: z.boolean(),
                pushNotifications: z.boolean(),
                marketingEmails: z.boolean(),
              })}
              defaultValues={{
                emailNotifications: true,
                pushNotifications: false,
                marketingEmails: false,
              }}
              onSubmit={(data) => console.log(data)}
              className='space-y-4'
            >
              <SwitchField name='emailNotifications' label={t('demo.forms.labels.emailNotifications')} />
              <SwitchField name='pushNotifications' label={t('demo.forms.labels.pushNotifications')} />
              <SwitchField name='marketingEmails' label={t('demo.forms.labels.marketingEmails')} />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { SwitchField } from '@/components/forms'

<SwitchField
  name="emailNotifications"
  label="Email Notifications"
/>

<SwitchField
  name="pushNotifications"
  label="Push Notifications"
/>`,
      props: [
        {
          name: 'name',
          type: 'string',
          description: t('demo.forms.props.name'),
          required: true,
        },
        {
          name: 'label',
          type: 'string',
          description: t('demo.forms.props.label'),
          required: true,
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.forms.props.disabled'),
          default: 'false',
        },
      ],
    },

    // DateField Component
    {
      id: 'date-field',
      title: 'DateField',
      description: t('demo.forms.descriptions.dateField'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.dateInputs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                birthDate: z.date({
                  required_error: t('demo.forms.validation.birthDateRequired'),
                }),
                startDate: z.date().optional(),
              })}
              defaultValues={{
                birthDate: undefined,
                startDate: undefined,
              }}
              onSubmit={(data) => console.log(data)}
              className='space-y-4'
            >
              <DateField name='birthDate' label={t('demo.forms.labels.birthDate')} required />
              <DateField name='startDate' label={t('demo.forms.labels.startDate')} />
              <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { DateField } from '@/components/forms'

<DateField
  name="birthDate"
  label="Birth Date"
  required
/>

<DateField
  name="startDate"
  label="Start Date"
/>`,
      props: [
        {
          name: 'name',
          type: 'string',
          description: t('demo.forms.props.name'),
          required: true,
        },
        {
          name: 'label',
          type: 'string',
          description: t('demo.forms.props.label'),
          required: true,
        },
        {
          name: 'required',
          type: 'boolean',
          description: t('demo.forms.props.required'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.forms.props.disabled'),
          default: 'false',
        },
      ],
    },

    // SubmitButton Component
    {
      id: 'submit-button',
      title: 'SubmitButton',
      description: t('demo.forms.descriptions.submitButton'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.submitButtons')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                email: z.string().email(),
              })}
              defaultValues={{ email: '' }}
              onSubmit={async (data) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 2000))
                console.log(data)
              }}
              className='space-y-4'
            >
              <TextField name='email' label={t('demo.forms.labels.email')} type='email' required />
              <div className='space-y-2'>
                <SubmitButton className='w-full'>{t('demo.forms.actions.submit')}</SubmitButton>
                <SubmitButton variant='outline' className='w-full'>
                  {t('demo.forms.actions.saveAsDraft')}
                </SubmitButton>
                <SubmitButton variant='destructive' className='w-full'>
                  {t('demo.forms.actions.delete')}
                </SubmitButton>
              </div>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { SubmitButton } from '@/components/forms'

// Default submit button
<SubmitButton>Submit</SubmitButton>

// With variant
<SubmitButton variant="outline">Save as Draft</SubmitButton>

// Full width
<SubmitButton className="w-full">Submit</SubmitButton>

// The button automatically shows loading state during form submission`,
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: t('demo.forms.props.buttonText'),
          required: true,
        },
        {
          name: 'variant',
          type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
          description: t('demo.forms.props.buttonVariant'),
          default: 'default',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.forms.props.className'),
        },
      ],
    },

    // PasswordStrengthBar Component
    {
      id: 'password-strength-bar',
      title: 'PasswordStrengthBar',
      description: t('demo.forms.descriptions.passwordStrengthBar'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.passwordStrength')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[
                { password: '', strength: 'weak' as const, percentage: 0 },
                { password: 'weak', strength: 'weak' as const, percentage: 25 },
                { password: 'medium123', strength: 'medium' as const, percentage: 50 },
                { password: 'Strong123!', strength: 'strong' as const, percentage: 75 },
                { password: 'VeryStrong123!@#', strength: 'very-strong' as const, percentage: 100 },
              ].map((item, index) => (
                <div key={index} className='space-y-2'>
                  <div className='text-sm font-medium'>
                    {item.password === '' ? t('demo.forms.labels.empty') : `"${item.password}"`}
                  </div>
                  <PasswordStrengthBar strength={item.strength} percentage={item.percentage} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
      code: `import { PasswordStrengthBar } from '@/components/forms'

function PasswordField() {
  const [password, setPassword] = useState('')

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrengthBar password={password} />
    </div>
  )
}`,
      props: [
        {
          name: 'password',
          type: 'string',
          description: t('demo.forms.props.passwordValue'),
          required: true,
        },
      ],
    },

    // PasswordRules Component
    {
      id: 'password-rules',
      title: 'PasswordRules',
      description: t('demo.forms.descriptions.passwordRules'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.passwordRules')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Alert>
                <AlertDescription>{t('demo.forms.descriptions.passwordRulesDemo')}</AlertDescription>
              </Alert>
              {['', 'weak', 'Medium1', 'Strong123!'].map((password, index) => (
                <div key={index} className='space-y-2'>
                  <div className='text-sm font-medium'>
                    {password === '' ? t('demo.forms.labels.empty') : `"${password}"`}
                  </div>
                  <PasswordRules
                    rules={[
                      { id: 'length', label: t('demo.forms.rules.minLength'), passed: password.length >= 8 },
                      { id: 'uppercase', label: t('demo.forms.rules.uppercase'), passed: /[A-Z]/.test(password) },
                      { id: 'lowercase', label: t('demo.forms.rules.lowercase'), passed: /[a-z]/.test(password) },
                      { id: 'number', label: t('demo.forms.rules.number'), passed: /[0-9]/.test(password) },
                      { id: 'special', label: t('demo.forms.rules.special'), passed: /[!@#$%^&*]/.test(password) },
                    ]}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
      code: `import { PasswordRules } from '@/components/forms'

const rules = [
  { id: 'length', label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character', test: (p) => /[!@#$%^&*]/.test(p) },
]

<PasswordRules password={password} rules={rules} />`,
      props: [
        {
          name: 'password',
          type: 'string',
          description: t('demo.forms.props.passwordValue'),
          required: true,
        },
        {
          name: 'rules',
          type: 'PasswordRule[]',
          description: t('demo.forms.props.passwordRules'),
          required: true,
        },
      ],
    },

    // Complete Form Example
    {
      id: 'complete-form-example',
      title: t('demo.forms.examples.completeForm'),
      description: t('demo.forms.descriptions.completeFormExample'),
      category: t('demo.content.categories.forms'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-2xl'>
          <CardHeader>
            <CardTitle>{t('demo.forms.examples.userRegistration')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              schema={z.object({
                firstName: z.string().min(2, t('demo.forms.validation.firstNameMin')),
                lastName: z.string().min(2, t('demo.forms.validation.lastNameMin')),
                email: z.string().email(t('demo.forms.validation.emailInvalid')),
                password: z.string().min(8, t('demo.forms.validation.passwordMin')),
                country: z.string().min(1, t('demo.forms.validation.countryRequired')),
                role: z.string().min(1, t('demo.forms.validation.roleRequired')),
                bio: z.string().max(500, t('demo.forms.validation.bioMax')).optional(),
                terms: z.boolean().refine((val) => val === true, {
                  message: t('demo.forms.validation.termsRequired'),
                }),
                newsletter: z.boolean(),
              })}
              defaultValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                country: '',
                role: '',
                bio: '',
                terms: false,
                newsletter: false,
              }}
              onSubmit={(data) => {
                console.log('Registration data:', data)
                alert(JSON.stringify(data, null, 2))
              }}
              className='space-y-6'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <TextField name='firstName' label={t('demo.forms.labels.firstName')} required />
                <TextField name='lastName' label={t('demo.forms.labels.lastName')} required />
              </div>

              <TextField name='email' label={t('demo.forms.labels.email')} type='email' required />

              <TextField
                name='password'
                label={t('demo.forms.labels.password')}
                type='password'
                isPassword
                showPasswordToggle
                showPasswordStrength
                required
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <SelectField name='country' label={t('demo.forms.labels.country')} options={countryOptions} required />
                <SelectField name='role' label={t('demo.forms.labels.role')} options={roleOptions} required />
              </div>

              <TextareaField
                name='bio'
                label={t('demo.forms.labels.bio')}
                placeholder={t('demo.forms.placeholders.enterBio')}
                rows={4}
                maxLength={500}
              />

              <div className='space-y-3 border-t pt-4'>
                <CheckboxField name='terms' label={t('demo.forms.labels.acceptTerms')} required />
                <CheckboxField name='newsletter' label={t('demo.forms.labels.subscribeNewsletter')} />
              </div>

              <SubmitButton className='w-full'>{t('demo.forms.actions.register')}</SubmitButton>
            </Form>
          </CardContent>
        </Card>
      ),
      code: `import { z } from 'zod'
import {
  Form,
  TextField,
  SelectField,
  TextareaField,
  CheckboxField,
  SubmitButton,
} from '@/components/forms'

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  country: z.string().min(1, 'Please select a country'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  newsletter: z.boolean(),
})

function RegistrationForm() {
  const handleSubmit = (data) => {
    console.log('Registration data:', data)
    // Handle registration
  }

  return (
    <Form
      schema={registrationSchema}
      defaultValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        role: '',
        bio: '',
        terms: false,
        newsletter: false,
      }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField name="firstName" label="First Name" required />
        <TextField name="lastName" label="Last Name" required />
      </div>

      <TextField name="email" label="Email" type="email" required />

      <TextField
        name="password"
        label="Password"
        type="password"
        isPassword
        showPasswordToggle
        showPasswordStrength
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField name="country" label="Country" options={countryOptions} required />
        <SelectField name="role" label="Role" options={roleOptions} required />
      </div>

      <TextareaField
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself"
        rows={4}
        maxLength={500}
      />

      <div className="space-y-3">
        <CheckboxField name="terms" label="I accept the terms and conditions" required />
        <CheckboxField name="newsletter" label="Subscribe to newsletter" />
      </div>

      <SubmitButton className="w-full">Register</SubmitButton>
    </Form>
  )
}`,
    },

    // Avatar Component
    {
      id: 'avatar',
      title: t('demo.avatar.title'),
      description: t('demo.descriptions.avatar'),
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
            <AvatarFallback className='bg-secondary'>{t('demo.avatar.fallback')}</AvatarFallback>
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
          title: t('demo.avatar.usage.group'),
          description: t('demo.avatar.usage.groupDesc'),
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
          description: t('demo.avatar.props.src'),
        },
        {
          name: 'alt',
          type: 'string',
          description: t('demo.avatar.props.alt'),
        },
      ],
    },

    // Badge Component
    {
      id: 'badge',
      title: t('demo.badge.title'),
      description: t('demo.descriptions.badge'),
      category: t('demo.content.categories.dataDisplay'),
      status: 'stable',
      demoComponent: (
        <div className='flex items-center gap-2 flex-wrap'>
          <Badge variant='default'>{t('demo.badge.variants.default')}</Badge>
          <Badge variant='secondary'>{t('demo.badge.variants.secondary')}</Badge>
          <Badge variant='destructive'>{t('demo.badge.variants.destructive')}</Badge>
          <Badge variant='outline'>{t('demo.badge.variants.outline')}</Badge>
          <Badge size='sm'>{t('demo.badge.sizes.small')}</Badge>
          <Badge size='lg'>{t('demo.badge.sizes.large')}</Badge>
        </div>
      ),
      code: `import { Badge } from '@/components/core/badge'

function Example() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="default">{t('demo.badge.variants.default')}</Badge>
      <Badge variant="secondary">{t('demo.badge.variants.secondary')}</Badge>
      <Badge variant="destructive">{t('demo.badge.variants.destructive')}</Badge>
      <Badge variant="outline">{t('demo.badge.variants.outline')}</Badge>
      <Badge size="sm">{t('demo.badge.sizes.small')}</Badge>
      <Badge size="lg">{t('demo.badge.sizes.large')}</Badge>
    </div>
  )
}`,
      usageExamples: [
        {
          title: t('demo.badge.usage.status'),
          description: t('demo.badge.usage.statusDesc'),
          code: `<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Badge variant="default">{t('demo.badge.status.active')}</Badge>
    <span>{t('demo.badge.status.userOnline')}</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge variant="destructive">{t('demo.badge.status.error')}</Badge>
    <span>{t('demo.badge.status.connectionError')}</span>
  </div>
  <div className="flex items-center gap-2">
    <Badge variant="secondary">{t('demo.badge.status.pending')}</Badge>
    <span>{t('demo.badge.status.awaitingApproval')}</span>
  </div>
</div>`,
          component: (
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Badge variant='default'>{t('demo.badge.status.active')}</Badge>
                <span className='text-sm'>{t('demo.badge.status.userOnline')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='destructive'>{t('demo.badge.status.error')}</Badge>
                <span className='text-sm'>{t('demo.badge.status.connectionError')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='secondary'>{t('demo.badge.status.pending')}</Badge>
                <span className='text-sm'>{t('demo.badge.status.awaitingApproval')}</span>
              </div>
            </div>
          ),
        },
      ],
      props: [
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'destructive' | 'outline'",
          description: t('demo.badge.props.variant'),
          default: 'default',
        },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          description: t('demo.badge.props.size'),
          default: 'default',
        },
      ],
    },

    // Button Component
    {
      id: 'button',
      title: t('demo.button.title'),
      description: t('demo.descriptions.button'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='grid grid-cols-2 gap-4 max-w-lg'>
          <Button variant='default'>{t('demo.button.variants.primary')}</Button>
          <Button variant='secondary'>{t('demo.button.variants.secondary')}</Button>
          <Button variant='outline'>{t('demo.button.variants.outline')}</Button>
          <Button variant='ghost'>{t('demo.button.variants.ghost')}</Button>
          <Button variant='destructive'>{t('demo.button.variants.delete')}</Button>
          <Button disabled>{t('demo.button.variants.disabled')}</Button>
          <Button size='sm'>{t('demo.button.sizes.small')}</Button>
          <Button size='lg'>{t('demo.button.sizes.large')}</Button>
          <Button size='icon'>
            <Heart className='h-4 w-4' />
          </Button>
          <Button className='w-full'>{t('demo.button.sizes.fullWidth')}</Button>
        </div>
      ),
      code: `import { Button } from '@/components/core/button'
import { Heart } from 'lucide-react'

function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="default">{t('demo.button.variants.primary')}</Button>
      <Button variant="secondary">{t('demo.button.variants.secondary')}</Button>
      <Button variant="outline">{t('demo.button.variants.outline')}</Button>
      <Button variant="ghost">{t('demo.button.variants.ghost')}</Button>
      <Button variant="destructive">{t('demo.button.variants.delete')}</Button>
      <Button disabled>{t('demo.button.variants.disabled')}</Button>
      <Button size="sm">{t('demo.button.sizes.small')}</Button>
      <Button size="lg">{t('demo.button.sizes.large')}</Button>
      <Button size="icon">
        <Heart className="h-4 w-4" />
      </Button>
      <Button className='w-full'>{t('demo.button.sizes.fullWidth')}</Button>
    </div>
  )
}`,
      usageExamples: [
        {
          title: t('demo.button.usage.iconButtons'),
          description: t('demo.button.usage.iconButtonExamples'),
          code: `<div className="flex items-center gap-2">
  <Button>
    <Plus className="w-4 h-4 mr-2" />
    {t('demo.button.actions.addNew')}
  </Button>
  <Button variant="outline">
    <Search className="w-4 h-4 mr-2" />
    {t('demo.button.actions.search')}
  </Button>
  <Button variant="ghost">
    <Settings className="w-4 h-4 mr-2" />
    {t('demo.button.actions.settings')}
  </Button>
</div>`,
          component: (
            <div className='flex items-center gap-2'>
              <Button>
                <Plus className='w-4 h-4 mr-2' />
                {t('demo.button.actions.addNew')}
              </Button>
              <Button variant='outline'>
                <Search className='w-4 h-4 mr-2' />
                {t('demo.button.actions.search')}
              </Button>
              <Button variant='ghost'>
                <Settings className='w-4 h-4 mr-2' />
                {t('demo.button.actions.settings')}
              </Button>
            </div>
          ),
        },
      ],
      props: [
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
          description: t('demo.button.props.variant'),
          default: 'default',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | 'icon'",
          description: t('demo.button.props.size'),
          default: 'md',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.button.props.className'),
          default: 'undefined',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.button.props.disabled'),
          default: 'false',
        },
      ],
    },

    // Card Component
    {
      id: 'card',
      title: t('demo.card.title'),
      description: t('demo.descriptions.card'),
      category: t('demo.content.categories.layout'),
      status: 'stable',
      demoComponent: (
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle>{t('demo.card.content.projectReport')}</CardTitle>
            <CardDescription>{t('demo.card.content.projectReportDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-sm text-neutral-600'>{t('demo.card.content.totalVisitors')}</span>
                <span className='font-medium'>12,547</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-neutral-600'>{t('demo.card.content.newUsers')}</span>
                <span className='font-medium'>1,432</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-neutral-600'>{t('demo.card.content.conversionRate')}</span>
                <span className='font-medium'>%3.2</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='ghost' size='sm'>
              {t('demo.card.actions.details')}
            </Button>
            <Button size='sm'>{t('demo.card.actions.getReport')}</Button>
          </CardFooter>
        </Card>
      ),
      code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/core/card'
import { Button } from '@/components/core/button'

function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t('demo.card.content.projectReport')}</CardTitle>
        <CardDescription>
          {t('demo.card.content.projectReportDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">{t('demo.card.content.totalVisitors')}</span>
            <span className="font-medium">12,547</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-neutral-600">{t('demo.card.content.newUsers')}</span>
            <span className="font-medium">1,432</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">{t('demo.card.actions.details')}</Button>
        <Button>{t('demo.card.actions.getReport')}</Button>
      </CardFooter>
    </Card>
  )
}`,
      usageExamples: [
        {
          title: t('demo.card.usage.feature'),
          description: t('demo.card.usage.featureDesc'),
          code: `<Card className="text-center">
  <CardHeader>
    <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
      <Star className="w-6 h-6 text-primary-600" />
    </div>
    <CardTitle>{t('demo.card.content.premiumFeature')}</CardTitle>
    <CardDescription>
      {t('demo.card.content.premiumDesc')}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="text-sm space-y-1">
      <li>{t('demo.card.content.detailedAnalytics')}</li>
      <li>{t('demo.card.content.customReports')}</li>
      <li>{t('demo.card.content.apiAccess')}</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">{t('demo.button.actions.startNow')}</Button>
  </CardFooter>
</Card>`,
          component: (
            <Card className='text-center w-full max-w-sm'>
              <CardHeader>
                <div className='mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4'>
                  <Star className='w-6 h-6 text-primary-600 dark:text-primary-400' />
                </div>
                <CardTitle>{t('demo.card.content.premiumFeature')}</CardTitle>
                <CardDescription>{t('demo.card.content.premiumDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='text-sm space-y-1'>
                  <li>{t('demo.card.content.detailedAnalytics')}</li>
                  <li>{t('demo.card.content.customReports')}</li>
                  <li>{t('demo.card.content.apiAccess')}</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className='w-full'>{t('demo.button.actions.startNow')}</Button>
              </CardFooter>
            </Card>
          ),
        },
      ],
      props: [
        {
          name: 'variant',
          type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
          description: t('demo.card.props.variant'),
          default: 'default',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg' | 'xl'",
          description: t('demo.card.props.size'),
          default: 'md',
        },
        {
          name: 'hover',
          type: "'none' | 'lift' | 'glow' | 'scale'",
          description: t('demo.card.props.hover'),
          default: 'none',
        },
      ],
    },

    // Checkbox Component
    {
      id: 'checkbox',
      title: t('demo.checkbox.title'),
      description: t('demo.descriptions.checkbox'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms1' defaultChecked />
            <label htmlFor='terms1' className='text-sm font-medium'>
              {t('demo.checkbox.status.selected')}
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms2' />
            <label htmlFor='terms2' className='text-sm font-medium'>
              {t('demo.checkbox.status.notSelected')}
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='terms3' disabled />
            <label htmlFor='terms3' className='text-sm font-medium text-neutral-400'>
              {t('demo.checkbox.status.disabled')}
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
        <label htmlFor="terms1">{t('demo.checkbox.status.selected')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" />
        <label htmlFor="terms2">{t('demo.checkbox.status.notSelected')}</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms3" disabled />
        <label htmlFor="terms3">{t('demo.checkbox.status.disabled')}</label>
      </div>
    </div>
  )
}`,
      usageExamples: [
        {
          title: t('demo.checkbox.usage.formGroup'),
          description: t('demo.checkbox.usage.formGroupDesc'),
          code: `<div className="space-y-2">
  <p className="font-medium">{t('demo.checkbox.labels.yourInterests')}</p>
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Checkbox id="frontend" />
      <label htmlFor="frontend">{t('demo.checkbox.options.frontend')}</label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="backend" />
      <label htmlFor="backend">{t('demo.checkbox.options.backend')}</label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="mobile" />
      <label htmlFor="mobile">{t('demo.checkbox.options.mobile')}</label>
    </div>
  </div>
</div>`,
          component: (
            <div className='space-y-2'>
              <p className='font-medium'>{t('demo.checkbox.labels.yourInterests')}</p>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='frontend-demo' />
                  <label htmlFor='frontend-demo' className='text-sm'>
                    {t('demo.checkbox.options.frontend')}
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='backend-demo' />
                  <label htmlFor='backend-demo' className='text-sm'>
                    {t('demo.checkbox.options.backend')}
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='mobile-demo' />
                  <label htmlFor='mobile-demo' className='text-sm'>
                    {t('demo.checkbox.options.mobile')}
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
          description: t('demo.checkbox.props.checked'),
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: t('demo.checkbox.props.defaultChecked'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.checkbox.props.disabled'),
          default: 'false',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: t('demo.checkbox.props.onCheckedChange'),
        },
      ],
    },

    // Data Grid Component
    {
      id: 'data-grid',
      title: t('demo.dataGrid.title'),
      description: t('demo.descriptions.dataGrid'),
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
    header: t('demo.dataGrid.headers.fullName'),
  },
  {
    accessorKey: 'email',
    header: t('demo.dataGrid.headers.email'),
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
      label: t('demo.dataGrid.actions.edit'),
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
          description: t('demo.dataGrid.props.data'),
        },
        {
          name: 'columns',
          type: 'DataGridColumn<T>[]',
          description: t('demo.dataGrid.props.columns'),
        },
        {
          name: 'enablePagination',
          type: 'boolean',
          description: t('demo.dataGrid.props.enablePagination'),
          default: 'true',
        },
        {
          name: 'enableRowSelection',
          type: 'boolean',
          description: t('demo.dataGrid.props.enableRowSelection'),
          default: 'false',
        },
        {
          name: 'enableGlobalFilter',
          type: 'boolean',
          description: t('demo.dataGrid.props.enableGlobalFilter'),
          default: 'true',
        },
        {
          name: 'enableExport',
          type: 'boolean',
          description: t('demo.dataGrid.props.enableExport'),
          default: 'false',
        },
        {
          name: 'onRowClick',
          type: '(row: T, index: number) => void',
          description: t('demo.dataGrid.props.onRowClick'),
        },
      ],
    },

    // Data Table Component (Simpler version)
    {
      id: 'data-table',
      title: t('demo.dataTable.title'),
      description: t('demo.descriptions.dataTable'),
      category: t('demo.content.categories.dataDisplay'),
      status: 'stable',
      demoComponent: (
        <div className='w-full'>
          <DataTable
            columns={[
              {
                accessorKey: 'name',
                header: t('demo.dataTable.headers.name'),
              },
              {
                accessorKey: 'email',
                header: t('demo.dataTable.headers.email'),
              },
              {
                accessorKey: 'role',
                header: 'Rol',
                cell: ({ row }: { row: any }) => <Badge variant='outline'>{row.getValue('role')}</Badge>,
              },
            ]}
            data={sampleUsers.slice(0, 3)}
            searchKey='name'
            searchPlaceholder={t('demo.dataTable.searchPlaceholder')}
          />
        </div>
      ),
      code: `import { DataTable } from '@/components/core/data-table'

function Example() {
  const columns: Array<import('@/components/core/data-grid').DataGridColumn<Record<string, any>>> = [
    {
      accessorKey: 'name',
      header: t('demo.dataTable.headers.name'),
    },
    {
      accessorKey: 'email',
      header: t('demo.dataTable.headers.email'),
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
      searchPlaceholder={t('demo.dataTable.searchPlaceholder')}
    />
  )
}`,
      props: [
        {
          name: 'columns',
          type: 'ColumnDef<TData, TValue>[]',
          description: t('demo.dataTable.props.columns'),
        },
        {
          name: 'data',
          type: 'TData[]',
          description: t('demo.dataTable.props.data'),
        },
        {
          name: 'searchKey',
          type: 'string',
          description: t('demo.dataTable.props.searchKey'),
        },
        {
          name: 'searchPlaceholder',
          type: 'string',
          description: t('demo.dataTable.props.searchPlaceholder'),
          default: t('demo.dataTable.defaults.search'),
        },
      ],
    },

    // Switch Component (existing from original file)
    {
      id: 'switch',
      title: t('demo.switch.title'),
      description: t('demo.descriptions.switch'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4'>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-sm font-medium'>{t('demo.switch.labels.notifications')}</span>
            <Switch defaultChecked />
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-sm font-medium'>{t('demo.switch.labels.emailUpdates')}</span>
            <Switch />
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-sm font-medium text-neutral-400'>{t('demo.switch.status.disabled')}</span>
            <Switch disabled />
          </div>
        </div>
      ),
      code: `import { Switch } from '@/components/core/switch'

function Example() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span>{t('demo.switch.labels.notifications')}</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>{t('demo.switch.labels.emailUpdates')}</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>{t('demo.switch.labels.disabled')}</span>
        <Switch disabled />
      </div>
    </div>
  )
}`,
      props: [
        {
          name: 'checked',
          type: 'boolean',
          description: t('demo.switch.props.checked'),
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: t('demo.switch.props.defaultChecked'),
          default: 'false',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.switch.props.disabled'),
          default: 'false',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: t('demo.switch.props.onCheckedChange'),
        },
      ],
    },

    // Select Component (existing from original file)
    {
      id: 'select',
      title: t('demo.select.title'),
      description: t('demo.descriptions.select'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-3 w-full max-w-sm'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={t('demo.select.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='tr'>{t('demo.select.options.turkey')}</SelectItem>
              <SelectItem value='us'>{t('demo.select.options.usa')}</SelectItem>
              <SelectItem value='de'>{t('demo.select.options.germany')}</SelectItem>
              <SelectItem value='fr'>{t('demo.select.options.france')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={t('demo.select.placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">{t('demo.select.options.turkey')}</SelectItem>
        <SelectItem value="us">{t('demo.select.options.usa')}</SelectItem>
        <SelectItem value="de">{t('demo.select.options.germany')}</SelectItem>
        <SelectItem value="fr">{t('demo.select.options.france')}</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
      props: [
        {
          name: 'value',
          type: 'string',
          description: t('demo.select.props.selectedValue'),
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: t('demo.select.props.defaultSelectedValue'),
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: t('demo.select.props.onValueChange'),
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
      title: t('demo.textarea.title'),
      description: t('demo.descriptions.textarea'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <Textarea placeholder={t('demo.textarea.placeholders.basic')} rows={3} />
          <Textarea placeholder={t('demo.textarea.placeholders.counter')} maxLength={100} rows={3} />
        </div>
      ),
      code: `import { Textarea } from '@/components/core/textarea'

function Example() {
  return (
    <div className="space-y-4">
      <Textarea 
        placeholder={t('demo.textarea.placeholders.basic')}
        rows={3}
      />
      <Textarea 
        placeholder={t('demo.textarea.placeholders.counter')}
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
          description: t('demo.textarea.props.maxLength'),
        },
        {
          name: 'showCount',
          type: 'boolean',
          description: t('demo.textarea.props.showCount'),
          default: 'false',
        },
        {
          name: 'autoResize',
          type: 'boolean',
          description: t('demo.textarea.props.autoResize'),
          default: 'false',
        },
        {
          name: 'error',
          type: 'string',
          description: t('demo.common.props.error'),
        },
      ],
    },

    // Dialog Component
    {
      id: 'dialog',
      title: t('demo.dialog.title'),
      description: t('demo.descriptions.dialog'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>{t('demo.dialog.trigger')}</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{t('demo.dialog.editProfile.title')}</DialogTitle>
              <DialogDescription>{t('demo.dialog.editProfile.description')}</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  {t('demo.dialog.form.name')}
                </Label>
                <Input id='name' defaultValue={t('demo.dialog.form.sampleName')} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  {t('demo.dialog.form.email')}
                </Label>
                <Input id='username' defaultValue='ahmet@example.com' className='col-span-3' />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>{t('demo.dialog.actions.save')}</Button>
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
        <Button variant="outline">{t('demo.dialog.trigger')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('demo.dialog.editProfile.title')}</DialogTitle>
          <DialogDescription>
            {t('demo.dialog.editProfile.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {t('demo.dialog.form.name')}
            </Label>
            <Input id="name" defaultValue={t('demo.dialog.form.sampleName')} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{t('demo.dialog.actions.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
      usageExamples: [
        t('demo.dialog.usage.userProfile'),
        t('demo.dialog.usage.confirmation'),
        t('demo.dialog.usage.forms'),
        t('demo.dialog.usage.details'),
      ],
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: t('demo.dialog.props.open'),
          default: 'false',
        },
        {
          name: 'onOpenChange',
          type: 'function',
          description: t('demo.dialog.props.onOpenChange'),
        },
      ],
    },

    // Dropdown Component
    {
      id: 'dropdown',
      title: t('demo.dropdownMenu.title'),
      description: t('demo.descriptions.dropdownMenu'),
      category: t('demo.content.categories.navigation'),
      status: 'stable',
      demoComponent: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>{t('demo.dropdownMenu.trigger')}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>{t('demo.dropdownMenu.labels.myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t('demo.dropdownMenu.items.profile')}</DropdownMenuItem>
            <DropdownMenuItem>{t('demo.dropdownMenu.items.settings')}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>{t('demo.dropdownMenu.items.notifications')}</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>{t('demo.dropdownMenu.items.emailUpdates')}</DropdownMenuCheckboxItem>
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
        <Button variant="outline">{t('demo.dropdownMenu.trigger')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('demo.dropdownMenu.labels.myAccount')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('demo.dropdownMenu.items.profile')}</DropdownMenuItem>
        <DropdownMenuItem>{t('demo.dropdownMenu.items.settings')}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          {t('demo.dropdownMenu.items.notifications')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
      usageExamples: [
        t('demo.dropdownMenu.usage.userMenus'),
        t('demo.dropdownMenu.usage.actions'),
        t('demo.dropdownMenu.usage.navigation'),
        t('demo.dropdownMenu.usage.options'),
      ],
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: t('demo.dropdownMenu.props.open'),
        },
        {
          name: 'onOpenChange',
          type: 'function',
          description: t('demo.dropdownMenu.props.onOpenChange'),
        },
      ],
    },

    // Input Component
    {
      id: 'input',
      title: t('demo.input.title'),
      description: t('demo.descriptions.input'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <Input placeholder={t('demo.input.placeholders.basic')} />
          <Input type='email' placeholder={t('demo.input.placeholders.email')} />
          <Input type='password' placeholder={t('demo.input.placeholders.password')} />
          <Input disabled placeholder={t('demo.input.placeholders.disabled')} />
        </div>
      ),
      code: `import { Input } from '@/components/core/input'

function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder={t('demo.input.placeholders.basic')} />
      <Input type="email" placeholder={t('demo.input.placeholders.email')} />
      <Input type="password" placeholder={t('demo.input.placeholders.password')} />
      <Input disabled placeholder={t('demo.input.placeholders.disabled')} />
    </div>
  )
}`,
      usageExamples: [
        t('demo.input.usage.forms'),
        t('demo.input.usage.userForData'),
        t('demo.input.usage.search'),
        t('demo.input.usage.auth'),
      ],
      props: [
        {
          name: 'type',
          type: 'string',
          description: t('demo.input.props.type'),
          default: 'text',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.input.props.placeholder'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.input.props.disabled'),
          default: 'false',
        },
        {
          name: 'value',
          type: 'string',
          description: t('demo.input.props.value'),
        },
      ],
    },

    // Loading Components
    {
      id: 'loading',
      title: t('demo.loading.title'),
      description: t('demo.descriptions.loading'),
      category: t('demo.content.categories.feedback'),
      status: 'stable',
      demoComponent: (
        <div className='grid grid-cols-3 gap-8 items-center justify-items-center'>
          <div className='text-center space-y-2'>
            <LoadingSpinner size='md' />
            <p className='text-sm text-neutral-500'>{t('demo.loading.types.spinner')}</p>
          </div>
          <div className='text-center space-y-2'>
            <LoadingDots />
            <p className='text-sm text-neutral-500'>{t('demo.loading.types.dots')}</p>
          </div>
          <div className='text-center space-y-2'>
            <LoadingPulse />
            <p className='text-sm text-neutral-500'>{t('demo.loading.types.pulse')}</p>
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
        t('demo.loading.usage.dataLoading'),
        t('demo.loading.usage.apiCalls'),
        t('demo.loading.usage.buttonStates'),
        t('demo.loading.usage.transitions'),
      ],
      props: [
        {
          name: 'size',
          type: 'sm | md | lg',
          description: t('demo.loading.props.size'),
          default: 'md',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.common.props.className'),
        },
      ],
    },

    // Progress Component
    {
      id: 'progress',
      title: t('demo.progress.title'),
      description: t('demo.descriptions.progress'),
      category: t('demo.content.categories.feedback'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>{t('demo.progress.labels.default')}</span>
              <span>33%</span>
            </div>
            <Progress value={33} />
          </div>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>{t('demo.progress.labels.loading')}</span>
              <span>67%</span>
            </div>
            <Progress value={67} className='h-2' />
          </div>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>{t('demo.progress.labels.completed')}</span>
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
          <span>{t('demo.progress.labels.default')}</span>
          <span>33%</span>
        </div>
        <Progress value={33} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>{t('demo.progress.labels.loading')}</span>
          <span>67%</span>
        </div>
        <Progress value={67} className="h-2" />
      </div>
    </div>
  )
}`,
      usageExamples: [
        t('demo.progress.usage.upload'),
        t('demo.progress.usage.form'),
        t('demo.progress.usage.task'),
        t('demo.progress.usage.page'),
      ],
      props: [
        {
          name: 'value',
          type: 'number',
          description: t('demo.progress.props.value'),
          default: '0',
        },
        {
          name: 'max',
          type: 'number',
          description: t('demo.progress.props.max'),
          default: '100',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.common.props.className'),
        },
      ],
    },

    // Skeleton Components
    {
      id: 'skeleton',
      title: t('demo.skeleton.title'),
      description: t('demo.descriptions.skeleton'),
      category: t('demo.content.categories.feedback'),
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
        t('demo.skeleton.usage.placeholder'),
        t('demo.skeleton.usage.ux'),
        t('demo.skeleton.usage.transitions'),
        t('demo.skeleton.usage.api'),
      ],
      props: [
        {
          name: 'width',
          type: 'string | number',
          description: t('demo.skeleton.props.width'),
        },
        {
          name: 'height',
          type: 'string | number',
          description: t('demo.skeleton.props.height'),
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.common.props.className'),
        },
      ],
    },

    // Tabs Component
    {
      id: 'tabs',
      title: t('demo.tabs.title'),
      description: t('demo.descriptions.tabs'),
      category: t('demo.content.categories.navigation'),
      status: 'stable',
      demoComponent: (
        <Tabs defaultValue='account' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='account'>{t('demo.tabs.labels.account')}</TabsTrigger>
            <TabsTrigger value='password'>{t('demo.tabs.labels.password')}</TabsTrigger>
          </TabsList>
          <TabsContent value='account' className='space-y-4 p-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>{t('demo.tabs.labels.name')}</Label>
              <Input id='name' defaultValue={t('demo.tabs.labels.sampleName')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='username'>{t('demo.tabs.labels.username')}</Label>
              <Input id='username' defaultValue='@ahmetyilmaz' />
            </div>
          </TabsContent>
          <TabsContent value='password' className='space-y-4 p-6'>
            <div className='space-y-2'>
              <Label htmlFor='current'>{t('demo.tabs.labels.currentPassword')}</Label>
              <Input id='current' type='password' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new'>{t('demo.tabs.labels.newPassword')}</Label>
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
        <TabsTrigger value="account">{t('demo.tabs.labels.account')}</TabsTrigger>
        <TabsTrigger value="password">{t('demo.tabs.labels.password')}</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <Label htmlFor="name">{t('demo.tabs.labels.name')}</Label>
          <Input id="name" defaultValue={t('demo.tabs.labels.sampleName')} />
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <Label htmlFor="current">{t('demo.tabs.labels.currentPassword')}</Label>
          <Input id="current" type="password" />
        </div>
      </TabsContent>
    </Tabs>
  )
}`,
      usageExamples: [
        t('demo.tabs.usage.settings'),
        t('demo.tabs.usage.profile'),
        t('demo.tabs.usage.dashboard'),
        t('demo.tabs.usage.content'),
      ],
      props: [
        {
          name: 'defaultValue',
          type: 'string',
          description: t('demo.tabs.props.defaultValue'),
        },
        {
          name: 'value',
          type: 'string',
          description: t('demo.tabs.props.value'),
        },
        {
          name: 'onValueChange',
          type: 'function',
          description: t('demo.tabs.props.onValueChange'),
        },
      ],
    },

    // Slider Component
    {
      id: 'slider',
      title: t('demo.slider.title'),
      description: t('demo.descriptions.slider'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-6 w-full max-w-sm'>
          <div>
            <Label className='text-sm font-medium'>{t('demo.slider.labels.volume')}: 50</Label>
            <Slider defaultValue={[50]} max={100} step={1} className='mt-2' />
          </div>
          <div>
            <Label className='text-sm font-medium'>{t('demo.slider.labels.priceRange')}</Label>
            <Slider defaultValue={[200, 800]} max={1000} step={10} className='mt-2' />
          </div>
          <div>
            <Label className='text-sm font-medium'>{t('demo.slider.labels.quality')}: 8/10</Label>
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
        <Label className="text-sm font-medium">{t('demo.slider.labels.volume')}</Label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1} 
          className="mt-2" 
        />
      </div>
      <div>
        <Label className="text-sm font-medium">{t('demo.slider.labels.priceRange')}</Label>
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
        t('demo.slider.usage.volume'),
        t('demo.slider.usage.price'),
        t('demo.slider.usage.filter'),
        t('demo.slider.usage.range'),
      ],
      props: [
        {
          name: 'defaultValue',
          type: 'number[]',
          description: t('demo.slider.props.defaultValue'),
        },
        {
          name: 'value',
          type: 'number[]',
          description: t('demo.slider.props.value'),
        },
        {
          name: 'max',
          type: 'number',
          description: t('demo.slider.props.max'),
          default: '100',
        },
        {
          name: 'min',
          type: 'number',
          description: t('demo.slider.props.min'),
          default: '0',
        },
        {
          name: 'step',
          type: 'number',
          description: t('demo.slider.props.step'),
          default: '1',
        },
      ],
    },

    // Separator Component
    {
      id: 'separator',
      title: t('demo.separator.title'),
      description: t('demo.descriptions.separator'),
      category: t('demo.content.categories.layout'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium'>{t('demo.separator.example.section1')}</h4>
            <p className='text-sm text-neutral-500 mt-1'>{t('demo.separator.example.content1')}</p>
          </div>
          <Separator />
          <div>
            <h4 className='text-sm font-medium'>{t('demo.separator.example.section2')}</h4>
            <p className='text-sm text-neutral-500 mt-1'>{t('demo.separator.example.content2')}</p>
          </div>
          <Separator orientation='vertical' className='h-20' />
          <div className='flex items-center gap-4'>
            <span>{t('demo.separator.example.left')}</span>
            <Separator orientation='vertical' className='h-6' />
            <span>{t('demo.separator.example.right')}</span>
          </div>
        </div>
      ),
      code: `import { Separator } from '@/components/core/separator'

function Example() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium">{t('demo.separator.example.section1')}</h4>
        <p className="text-sm text-neutral-500">{t('demo.separator.example.content1')}</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">{t('demo.separator.example.section2')}</h4>
        <p className="text-sm text-neutral-500">{t('demo.separator.example.content2')}</p>
      </div>
      <div className="flex items-center gap-4">
        <span>{t('demo.separator.example.left')}</span>
        <Separator orientation="vertical" className="h-6" />
        <span>{t('demo.separator.example.right')}</span>
      </div>
    </div>
  )
}`,
      usageExamples: [
        t('demo.separator.usage.content'),
        t('demo.separator.usage.menu'),
        t('demo.separator.usage.card'),
        t('demo.separator.usage.form'),
      ],
      props: [
        {
          name: 'orientation',
          type: 'horizontal | vertical',
          description: t('demo.separator.props.orientation'),
          default: 'horizontal',
        },
        {
          name: 'className',
          type: 'string',
          description: t('demo.common.props.className'),
        },
      ],
    },

    // Popover Component
    {
      id: 'popover',
      title: t('demo.popover.title'),
      description: t('demo.descriptions.popover'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <div className='flex gap-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>{t('demo.popover.trigger')}</Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
              <div className='grid gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium leading-none'>{t('demo.popover.example.dimensions')}</h4>
                  <p className='text-sm text-neutral-500'>{t('demo.popover.example.description')}</p>
                </div>
                <div className='grid gap-2'>
                  <div className='grid grid-cols-3 items-center gap-4'>
                    <Label htmlFor='width'>{t('demo.popover.example.width')}</Label>
                    <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
                  </div>
                  <div className='grid grid-cols-3 items-center gap-4'>
                    <Label htmlFor='height'>{t('demo.popover.example.height')}</Label>
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
        <Button variant="outline">{t('demo.popover.trigger')}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{t('demo.popover.example.dimensions')}</h4>
            <p className="text-sm text-neutral-500">
              {t('demo.popover.example.description')}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">{t('demo.popover.example.width')}</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
      usageExamples: [
        t('demo.popover.usage.settings'),
        t('demo.popover.usage.info'),
        t('demo.popover.usage.help'),
        t('demo.popover.usage.menu'),
      ],
      props: [
        {
          name: 'open',
          type: 'boolean',
          description: t('demo.popover.props.open'),
        },
        {
          name: 'onOpenChange',
          type: 'function',
          description: t('demo.popover.props.onOpenChange'),
        },
      ],
    },

    // Tooltip Component
    {
      id: 'tooltip',
      title: t('demo.tooltip.title'),
      description: t('demo.descriptions.tooltip'),
      category: t('demo.content.categories.overlay'),
      status: 'stable',
      demoComponent: (
        <TooltipProvider>
          <div className='flex gap-4 items-center'>
            <TooltipComponent content={t('demo.tooltip.example.standard')}>
              <Button variant='outline'>{t('demo.tooltip.example.hover')}</Button>
            </TooltipComponent>
            <TooltipComponent content={t('demo.tooltip.example.right')} side='right'>
              <Button variant='outline'>{t('demo.tooltip.example.rightBtn')}</Button>
            </TooltipComponent>
            <TooltipComponent content={t('demo.tooltip.example.bottom')} side='bottom'>
              <Button variant='outline'>{t('demo.tooltip.example.bottomBtn')}</Button>
            </TooltipComponent>
            <TooltipComponent content={t('demo.tooltip.example.disabled')} disabled>
              <Button variant='outline'>{t('demo.tooltip.example.disabledBtn')}</Button>
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
        <TooltipComponent content={t('demo.tooltip.example.standard')}>
          <Button variant="outline">{t('demo.tooltip.example.hover')}</Button>
        </TooltipComponent>
        
        <TooltipComponent content={t('demo.tooltip.example.right')} side="right">
          <Button variant="outline">{t('demo.tooltip.example.rightBtn')}</Button>
        </TooltipComponent>
        
        <TooltipComponent content={t('demo.tooltip.example.bottom')} side="bottom">
          <Button variant="outline">{t('demo.tooltip.example.bottomBtn')}</Button>
        </TooltipComponent>
        
        <TooltipComponent content={t('demo.tooltip.example.disabled')} disabled>
          <Button variant="outline">{t('demo.tooltip.example.disabledBtn')}</Button>
        </TooltipComponent>
      </div>
    </TooltipProvider>
  )
}`,
      usageExamples: [
        t('demo.tooltip.usage.buttons'),
        t('demo.tooltip.usage.forms'),
        t('demo.tooltip.usage.abbreviations'),
        t('demo.tooltip.usage.icons'),
      ],
      props: [
        {
          name: 'content',
          type: 'ReactNode',
          description: t('demo.tooltip.props.content'),
        },
        {
          name: 'side',
          type: 'top | right | bottom | left',
          description: t('demo.tooltip.props.side'),
          default: 'top',
        },
        {
          name: 'align',
          type: 'start | center | end',
          description: t('demo.tooltip.props.align'),
          default: 'center',
        },
        {
          name: 'delayDuration',
          type: 'number',
          description: t('demo.tooltip.props.delay'),
          default: '300',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.tooltip.props.disabled'),
          default: 'false',
        },
      ],
    },

    // Scroll Area Component
    {
      id: 'scroll-area',
      title: t('demo.scrollArea.title'),
      description: t('demo.descriptions.scrollArea'),
      category: t('demo.content.categories.layout'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4'>
          <ScrollArea className='h-32 w-48 rounded-md border p-4'>
            <div className='space-y-2'>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className='text-sm'>
                  {t('demo.scrollArea.listItem')} {i + 1}
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
            {t('demo.scrollArea.listItem')} {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
      usageExamples: [
        t('demo.scrollArea.usage.lists'),
        t('demo.scrollArea.usage.content'),
        t('demo.scrollArea.usage.chat'),
        t('demo.scrollArea.usage.menu'),
      ],
      props: [
        {
          name: 'className',
          type: 'string',
          description: t('demo.common.props.className'),
        },
      ],
    },

    // Rich Text Editor Component
    {
      id: 'rich-text-editor',
      title: t('demo.richTextEditor.title'),
      description: t('demo.descriptions.richTextEditor'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='w-full max-w-2xl'>
          <RichTextEditor
            placeholder={t('demo.richTextEditor.placeholder')}
            value={t('demo.richTextEditor.exampleValue')}
            onChange={(content) => console.log(content)}
          />
        </div>
      ),
      code: `import { RichTextEditor } from '@/components/core/rich-text-editor'

function Example() {
  return (
    <RichTextEditor
      placeholder={t('demo.richTextEditor.placeholder')}
      value={t('demo.richTextEditor.exampleValue')}
      onChange={(content) => console.log(content)}
    />
  )
}`,
      usageExamples: [
        t('demo.richTextEditor.usage.blog'),
        t('demo.richTextEditor.usage.product'),
        t('demo.richTextEditor.usage.email'),
        t('demo.richTextEditor.usage.comments'),
      ],
      props: [
        {
          name: 'value',
          type: 'string',
          description: t('demo.richTextEditor.props.value'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.richTextEditor.props.onChange'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.richTextEditor.props.placeholder'),
        },
      ],
    },

    // Modern Date Picker Component
    {
      id: 'modern-date-picker',
      title: t('demo.modernDatePicker.title'),
      description: t('demo.descriptions.modernDatePicker'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div>
            <Label>{t('demo.modernDatePicker.labels.birthDate')}</Label>
            <ModernDatePicker
              placeholder={t('demo.modernDatePicker.placeholder')}
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
      <Label>{t('demo.modernDatePicker.labels.birthDate')}</Label>
      <ModernDatePicker 
        placeholder={t('demo.modernDatePicker.placeholder')}
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.modernDatePicker.usage.birthDate'),
        t('demo.modernDatePicker.usage.event'),
        t('demo.modernDatePicker.usage.report'),
        t('demo.modernDatePicker.usage.reservation'),
      ],
      props: [
        {
          name: 'value',
          type: 'Date',
          description: t('demo.modernDatePicker.props.value'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.modernDatePicker.props.onChange'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.modernDatePicker.props.placeholder'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.modernDatePicker.props.disabled'),
          default: 'false',
        },
      ],
    },

    // Month Year Picker Component
    {
      id: 'month-year-picker',
      title: t('demo.monthYearPicker.title'),
      description: t('demo.descriptions.monthYearPicker'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div>
            <Label>{t('demo.monthYearPicker.labels.graduationDate')}</Label>
            <MonthYearPicker
              placeholder={t('demo.monthYearPicker.placeholder')}
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
      <Label>{t('demo.monthYearPicker.labels.graduationDate')}</Label>
      <MonthYearPicker 
        placeholder={t('demo.monthYearPicker.placeholder')} 
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.monthYearPicker.usage.graduation'),
        t('demo.monthYearPicker.usage.work'),
        t('demo.monthYearPicker.usage.creditCard'),
        t('demo.monthYearPicker.usage.report'),
      ],
      props: [
        {
          name: 'value',
          type: 'Date',
          description: t('demo.monthYearPicker.props.value'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.monthYearPicker.props.onChange'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.monthYearPicker.props.placeholder'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.monthYearPicker.props.disabled'),
          default: 'false',
        },
      ],
    },

    // Date Range Picker Component
    {
      id: 'date-range-picker',
      title: t('demo.dateRangePicker.title'),
      description: t('demo.descriptions.dateRangePicker'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div className='flex flex-col space-y-2'>
            <Label>{t('demo.dateRangePicker.labels.holidayDates')}</Label>
            <DatePicker
              mode='range'
              enablePresets={true}
              placeholder={t('demo.dateRangePicker.placeholder')}
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
      <Label>{t('demo.dateRangePicker.labels.holidayDates')}</Label>
      <RangePicker 
        placeholder={{ from: t('demo.dateRangePicker.labels.start'), to: t('demo.dateRangePicker.labels.end') }}
        onChange={(range) => console.log(range)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.dateRangePicker.usage.vacation'),
        t('demo.dateRangePicker.usage.report'),
        t('demo.dateRangePicker.usage.reservation'),
        t('demo.dateRangePicker.usage.project'),
      ],
      props: [
        {
          name: 'value',
          type: 'DateRange',
          description: t('demo.dateRangePicker.props.value'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.dateRangePicker.props.onChange'),
        },
        {
          name: 'placeholder',
          type: 'object',
          description: 'Placeholder texts ({ from: string, to: string })',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.dateRangePicker.props.disabled'),
          default: 'false',
        },
      ],
    },

    // Single Date Picker Component
    {
      id: 'single-date-picker',
      title: t('demo.singleDatePicker.title'),
      description: t('demo.descriptions.singleDatePicker'),
      category: t('demo.content.categories.formInput'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-4 w-full max-w-sm'>
          <div className='flex flex-col space-y-2'>
            <Label>{t('demo.singleDatePicker.labels.appointmentDate')}</Label>
            <DatePicker
              mode='single'
              placeholder={t('demo.singleDatePicker.placeholder')}
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
      <Label>{t('demo.singleDatePicker.labels.appointmentDate')}</Label>
      <SinglePicker 
        placeholder={t('demo.singleDatePicker.placeholder')}
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}`,
      usageExamples: [
        t('demo.singleDatePicker.usage.appointment'),
        t('demo.singleDatePicker.usage.deadline'),
        t('demo.singleDatePicker.usage.event'),
        t('demo.singleDatePicker.usage.birthdate'),
      ],
      props: [
        {
          name: 'value',
          type: 'Date',
          description: t('demo.singleDatePicker.props.value'),
        },
        {
          name: 'onChange',
          type: 'function',
          description: t('demo.singleDatePicker.props.onChange'),
        },
        {
          name: 'placeholder',
          type: 'string',
          description: t('demo.singleDatePicker.props.placeholder'),
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: t('demo.singleDatePicker.props.disabled'),
          default: 'false',
        },
      ],
    },

    // Modern Drawer
    {
      id: 'modern-drawer',
      title: t('demo.modernDrawer.title'),
      description: t('demo.modernDrawer.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (() => {
        const { open, openDrawer, setOpen } = useDrawer()
        return (
          <div>
            <Button onClick={openDrawer}>{t('demo.modernDrawer.openButton')}</Button>
            <ModernDrawer
              open={open}
              onOpenChange={setOpen}
              title={t('demo.modernDrawer.drawerTitle')}
              placement='right'
              size='md'
            >
              <p>{t('demo.modernDrawer.content')}</p>
            </ModernDrawer>
          </div>
        )
      })(),
      code: `import { ModernDrawer, useDrawer } from '@/components/core/modern-drawer'

const { open, openDrawer, setOpen } = useDrawer()

<Button onClick={openDrawer}>Open</Button>
<ModernDrawer open={open} onOpenChange={setOpen} title="Title">
  Content
</ModernDrawer>`,
      props: [
        { name: 'open', type: 'boolean', description: t('demo.modernDrawer.props.open'), required: true },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: t('demo.modernDrawer.props.onOpenChange'),
          required: true,
        },
        {
          name: 'placement',
          type: "'right' | 'left' | 'top' | 'bottom'",
          description: t('demo.modernDrawer.props.placement'),
          default: 'right',
        },
      ],
    },

    // Password Input
    {
      id: 'password-input',
      title: t('demo.passwordInput.title'),
      description: t('demo.passwordInput.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='max-w-sm space-y-4'>
          <div>
            <Label>{t('demo.passwordInput.label')}</Label>
            <PasswordInput placeholder={t('demo.passwordInput.placeholder')} />
          </div>
        </div>
      ),
      code: `import { PasswordInput } from '@/components/core/password-input'

<PasswordInput placeholder="Enter password" showToggle={true} />`,
      props: [
        { name: 'showToggle', type: 'boolean', description: t('demo.passwordInput.props.showToggle'), default: 'true' },
      ],
    },

    // Number Input
    {
      id: 'number-input',
      title: t('demo.numberInput.title'),
      description: t('demo.numberInput.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (() => {
        const [value, setValue] = React.useState(0)
        return (
          <div className='max-w-sm'>
            <Label>{t('demo.numberInput.label')}</Label>
            <NumberInput value={value} onChange={(v) => setValue(v || 0)} min={0} max={100} />
          </div>
        )
      })(),
      code: `import { NumberInput } from '@/components/core/number-input'

const [value, setValue] = useState(0)

<NumberInput value={value} onChange={setValue} min={0} max={100} />`,
      props: [
        { name: 'value', type: 'number', description: t('demo.numberInput.props.value') },
        {
          name: 'onChange',
          type: '(value: number | undefined) => void',
          description: t('demo.numberInput.props.onChange'),
        },
        { name: 'min', type: 'number', description: t('demo.numberInput.props.min') },
        { name: 'max', type: 'number', description: t('demo.numberInput.props.max') },
      ],
    },

    // Calendar
    {
      id: 'calendar',
      title: t('demo.calendar.title'),
      description: t('demo.calendar.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='flex justify-center'>
          <Calendar mode='single' />
        </div>
      ),
      code: `import { Calendar } from '@/components/core/calendar'

<Calendar mode="single" selected={date} onSelect={setDate} />`,
      props: [{ name: 'mode', type: "'single' | 'multiple' | 'range'", description: t('demo.calendar.props.mode') }],
    },

    // Collapsible
    {
      id: 'collapsible',
      title: t('demo.collapsible.title'),
      description: t('demo.collapsible.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (() => {
        const [isOpen, setIsOpen] = React.useState(false)
        return (
          <div className='space-y-2'>
            <Button onClick={() => setIsOpen(!isOpen)} variant='outline'>
              {isOpen ? t('demo.collapsible.hideContent') : t('demo.collapsible.showContent')}
            </Button>
            {isOpen && (
              <div className='p-4 border rounded'>
                <p>{t('demo.collapsible.content')}</p>
              </div>
            )}
          </div>
        )
      })(),
      code: `import { Collapsible } from '@/components/core/collapsible'

const [isOpen, setIsOpen] = useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  Content
</Collapsible>`,
      props: [{ name: 'open', type: 'boolean', description: t('demo.collapsible.props.open') }],
    },

    // Form Error
    {
      id: 'form-error',
      title: t('demo.formError.title'),
      description: t('demo.formError.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='max-w-sm space-y-4'>
          <div>
            <Label>{t('demo.formError.label')}</Label>
            <Input type='email' className='border-red-500' />
            <p className='text-sm text-red-500 mt-1'>{t('demo.formError.message')}</p>
          </div>
        </div>
      ),
      code: `import { FormError } from '@/components/core/form-error'

<FormError>Error message here</FormError>`,
      props: [{ name: 'children', type: 'React.ReactNode', description: t('demo.formError.props.children') }],
    },

    // Stepper
    {
      id: 'stepper',
      title: t('demo.stepper.title'),
      description: t('demo.stepper.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='w-full max-w-2xl'>
          <div className='flex items-center justify-between'>
            {[t('demo.stepper.step1'), t('demo.stepper.step2'), t('demo.stepper.step3')].map((step, index) => (
              <div key={index} className='flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${index === 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  {index + 1}
                </div>
                {index < 2 && <div className='w-16 h-0.5 bg-gray-200 mx-2' />}
              </div>
            ))}
          </div>
        </div>
      ),
      code: `import { Stepper } from '@/components/core/stepper'

<Stepper currentStep={1} totalSteps={3} />`,
      props: [{ name: 'currentStep', type: 'number', description: t('demo.stepper.props.currentStep') }],
    },

    // Dynamic Breadcrumb
    {
      id: 'dynamic-breadcrumb',
      title: t('demo.dynamicBreadcrumb.title'),
      description: t('demo.dynamicBreadcrumb.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='flex items-center gap-2 text-sm'>
          <span className='text-primary cursor-pointer'>{t('demo.dynamicBreadcrumb.home')}</span>
          <span>/</span>
          <span className='text-primary cursor-pointer'>{t('demo.dynamicBreadcrumb.products')}</span>
          <span>/</span>
          <span className='text-muted-foreground'>{t('demo.dynamicBreadcrumb.current')}</span>
        </div>
      ),
      code: `import { DynamicBreadcrumb } from '@/components/core/dynamic-breadcrumb'

<DynamicBreadcrumb />`,
      props: [],
    },

    // Enhanced Data Table
    {
      id: 'enhanced-data-table',
      title: t('demo.enhancedDataTable.title'),
      description: t('demo.enhancedDataTable.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='w-full border rounded overflow-hidden'>
          <table className='w-full text-sm'>
            <thead className='bg-muted'>
              <tr>
                <th className='p-2 text-left font-medium'>{t('demo.enhancedDataTable.headers.name')}</th>
                <th className='p-2 text-left font-medium'>{t('demo.enhancedDataTable.headers.email')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-t'>
                <td className='p-2'>{t('demo.sampleData.users.ahmet')}</td>
                <td className='p-2'>ahmet@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      code: `import { EnhancedDataTable } from '@/components/core/enhanced-data-table'

<EnhancedDataTable data={data} columns={columns} />`,
      props: [{ name: 'data', type: 'Array<any>', description: t('demo.enhancedDataTable.props.data') }],
    },

    // Accessibility Enhancer
    {
      id: 'accessibility-enhancer',
      title: t('demo.accessibilityEnhancer.title'),
      description: t('demo.accessibilityEnhancer.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-2'>
          <div className='p-3 border rounded bg-muted/50'>
            <p className='text-sm'>{t('demo.accessibilityEnhancer.content')}</p>
          </div>
          <a href='#main' className='text-primary text-sm underline'>
            {t('demo.accessibilityEnhancer.skipLink')}
          </a>
        </div>
      ),
      code: `import { AccessibleRegion } from '@/components/core/accessibility-enhancer'

<AccessibleRegion label="Main">Content</AccessibleRegion>`,
      props: [{ name: 'label', type: 'string', description: t('demo.accessibilityEnhancer.props.label') }],
    },

    // Enhanced Pagination
    {
      id: 'enhanced-pagination',
      title: t('demo.enhancedPagination.title'),
      description: t('demo.enhancedPagination.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' disabled>
            {t('demo.enhancedPagination.prev')}
          </Button>
          <div className='flex gap-1'>
            {[1, 2, 3].map((p) => (
              <Button key={p} variant={p === 1 ? 'default' : 'outline'} size='sm' className='w-8'>
                {p}
              </Button>
            ))}
          </div>
          <Button variant='outline' size='sm'>
            {t('demo.enhancedPagination.next')}
          </Button>
        </div>
      ),
      code: `import { EnhancedPaginationControls } from '@/components/core/enhanced-pagination-controls'

<EnhancedPaginationControls page={1} total={10} />`,
      props: [{ name: 'page', type: 'number', description: t('demo.enhancedPagination.props.page') }],
    },

    // Enhanced Search Filters
    {
      id: 'enhanced-search-filters',
      title: t('demo.enhancedSearchFilters.title'),
      description: t('demo.enhancedSearchFilters.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='space-y-3 max-w-sm'>
          <Input placeholder={t('demo.enhancedSearchFilters.placeholder')} />
          <div className='flex flex-wrap gap-2'>
            <Badge variant='secondary'>{t('demo.enhancedSearchFilters.filters.category')}</Badge>
            <Badge variant='secondary'>{t('demo.enhancedSearchFilters.filters.price')}</Badge>
          </div>
        </div>
      ),
      code: `import { EnhancedSearchFilters } from '@/components/core/enhanced-search-filters'

<EnhancedSearchFilters onFilterChange={handleFilter} />`,
      props: [
        { name: 'onFilterChange', type: 'function', description: t('demo.enhancedSearchFilters.props.onFilterChange') },
      ],
    },

    // Enterprise Error Boundary
    {
      id: 'enterprise-error-boundary',
      title: t('demo.enterpriseErrorBoundary.title'),
      description: t('demo.enterpriseErrorBoundary.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='p-4 border rounded bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'>
          <p className='text-sm text-green-700 dark:text-green-400'>{t('demo.enterpriseErrorBoundary.content')}</p>
        </div>
      ),
      code: `import { EnterpriseErrorBoundary } from '@/components/core/enterprise-error-boundary'

<EnterpriseErrorBoundary>
  <YourComponent />
</EnterpriseErrorBoundary>`,
      props: [
        { name: 'children', type: 'React.ReactNode', description: t('demo.enterpriseErrorBoundary.props.children') },
      ],
    },

    // Label Advanced
    {
      id: 'label-advanced',
      title: t('demo.labelAdvanced.title'),
      description: t('demo.labelAdvanced.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <div className='max-w-sm space-y-3'>
          <div>
            <Label htmlFor='fullname'>
              {t('demo.labelAdvanced.label')} <span className='text-red-500'>*</span>
            </Label>
            <Input id='fullname' placeholder={t('demo.labelAdvanced.placeholder')} />
          </div>
        </div>
      ),
      code: `import { Label } from '@/components/core/label'

<Label htmlFor="name">
  Name <span className="text-red-500">*</span>
</Label>`,
      props: [{ name: 'htmlFor', type: 'string', description: t('demo.labelAdvanced.props.htmlFor') }],
    },

    // Command Menu
    {
      id: 'command-menu',
      title: t('demo.commandMenu.title'),
      description: t('demo.commandMenu.description'),
      category: t('demo.content.categories.advanced'),
      status: 'beta',
      demoComponent: (
        <div className='text-center p-6 border rounded bg-muted/30'>
          <p className='text-sm mb-3'>{t('demo.commandMenu.pressToOpen')}</p>
          <Button variant='outline' size='sm'>
            {t('demo.commandMenu.openButton')}
          </Button>
        </div>
      ),
      code: `import { CommandMenu } from '@/components/core/command-menu'

<CommandMenu commands={commands} />`,
      props: [{ name: 'commands', type: 'Array<Command>', description: t('demo.commandMenu.props.commands') }],
    },

    // Accessible List
    {
      id: 'accessible-list',
      title: t('demo.accessibleList.title'),
      description: t('demo.accessibleList.description'),
      category: t('demo.content.categories.advanced'),
      status: 'stable',
      demoComponent: (
        <ul className='list-disc list-inside space-y-1 text-sm'>
          <li>{t('demo.accessibleList.items.1')}</li>
          <li>{t('demo.accessibleList.items.2')}</li>
          <li>{t('demo.accessibleList.items.3')}</li>
        </ul>
      ),
      code: `import { AccessibleList } from '@/components/core/accessibility-enhancer'

<AccessibleList items={['Item 1', 'Item 2']} />`,
      props: [{ name: 'items', type: 'string[]', description: t('demo.accessibleList.props.items') }],
    },

    // Theme Switcher
    {
      id: 'theme-switcher',
      title: t('demo.themeSwitcher.title'),
      description: t('demo.themeSwitcher.description'),
      category: t('demo.content.categories.ui'),
      status: 'stable',
      demoComponent: (
        <div className='flex gap-4 items-center'>
          <ThemeSwitcher variant='toggle' />
          <ThemeSwitcher variant='button' showLabel />
        </div>
      ),
      code: `import { ThemeSwitcher } from '@/components/ui/theme/theme-switcher'

// Toggle variant (default)
<ThemeSwitcher variant="toggle" />

// Button variant with label
<ThemeSwitcher variant="button" showLabel />`,
      props: [
        {
          name: 'variant',
          type: "'button' | 'toggle'",
          description: t('demo.themeSwitcher.props.variant'),
          default: 'toggle',
        },
        { name: 'showLabel', type: 'boolean', description: t('demo.themeSwitcher.props.showLabel'), default: 'false' },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          description: t('demo.themeSwitcher.props.size'),
          default: 'default',
        },
      ],
    },

    // Language Switcher
    {
      id: 'language-switcher',
      title: t('demo.languageSwitcher.title'),
      description: t('demo.languageSwitcher.description'),
      category: t('demo.content.categories.ui'),
      status: 'stable',
      demoComponent: (
        <div className='flex gap-4 items-center'>
          <LanguageSwitcher variant='toggle' />
          <LanguageSwitcher variant='button' showLabel />
        </div>
      ),
      code: `import { LanguageSwitcher } from '@/components/ui/language/language-switcher'

// Toggle variant (default)
<LanguageSwitcher variant="toggle" />

// Button variant with label
<LanguageSwitcher variant="button" showLabel />`,
      props: [
        {
          name: 'variant',
          type: "'button' | 'toggle'",
          description: t('demo.languageSwitcher.props.variant'),
          default: 'toggle',
        },
        {
          name: 'showLabel',
          type: 'boolean',
          description: t('demo.languageSwitcher.props.showLabel'),
          default: 'false',
        },
        {
          name: 'size',
          type: "'sm' | 'default' | 'lg'",
          description: t('demo.languageSwitcher.props.size'),
          default: 'default',
        },
      ],
    },

    // Pomodoro Timer
    {
      id: 'pomodoro-timer',
      title: t('demo.pomodoroTimer.title'),
      description: t('demo.pomodoroTimer.description'),
      category: t('demo.content.categories.ui'),
      status: 'stable',
      demoComponent: (
        <div className='w-80 mx-auto border rounded-lg shadow-lg overflow-hidden'>
          <div className='relative bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-200 dark:border-red-800'>
            <div className='p-4 space-y-4'>
              {/* Header */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='p-1.5 rounded-lg bg-red-500 text-white'>
                    <Target className='w-4 h-4' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold'>{t('demo.pomodoroTimer.focus')}</h3>
                    <div className='text-xs text-muted-foreground'>{t('demo.pomodoroTimer.session')}</div>
                  </div>
                </div>
                <Button variant='ghost' size='sm' className='w-8 h-8 p-0'>
                  <X className='w-4 h-4' />
                </Button>
              </div>

              {/* Timer Display */}
              <div className='text-center space-y-3'>
                <div className='text-4xl font-mono font-bold'>25:00</div>
                <div className='w-full bg-muted rounded-full h-2'>
                  <div className='h-full rounded-full bg-red-500 w-0' />
                </div>
              </div>

              {/* Controls */}
              <div className='flex items-center justify-center gap-2'>
                <PomodoroButton type='focus' />
                <PomodoroButton type='break' />
              </div>
            </div>
          </div>
          <p className='text-xs text-muted-foreground p-3 bg-muted/30 text-center'>
            {t('demo.pomodoroTimer.helperText')}
          </p>
        </div>
      ),
      code: `import { PomodoroTimer } from '@/components/ui/pomodoro/pomodoro-timer'
import { PomodoroButton } from '@/components/ui/pomodoro/pomodoro-button'

// Start buttons
<PomodoroButton type="focus" />
<PomodoroButton type="break" />

// Timer automatically appears when started
<PomodoroTimer />`,
      props: [
        { name: 'className', type: 'string', description: t('demo.pomodoroTimer.props.className') },
        { name: 'type', type: "'focus' | 'break'", description: t('demo.pomodoroTimer.props.type'), required: true },
      ],
    },
  ]
}
