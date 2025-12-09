import React, { useState } from 'react'

import { z } from 'zod'
import { useTranslation } from 'react-i18next'

// Import all forms components
import {
  Form,
  TextField,
  SelectField,
  TextareaField,
  CheckboxField,
  RadioField,
  SwitchField,
  DateField,
  SubmitButton,
  PasswordStrengthBar,
  PasswordRules,
} from '@/components/forms'

// Import core components for demos
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Badge } from '@/components/core/badge'
import { Alert, AlertDescription } from '@/components/core/alert'

// Forms demo data generator function
export const useFormsDemoData = () => {
  const { t } = useTranslation()

  // Sample data for select options
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

  // Forms demo data
  return [
    // Form Component
    {
      id: 'form',
      title: 'Form',
      description: t('demo.forms.descriptions.form'),
      category: t('demo.forms.categories.base'),
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
      category: t('demo.forms.categories.inputs'),
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
      category: t('demo.forms.categories.inputs'),
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
      category: t('demo.forms.categories.inputs'),
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
      category: t('demo.forms.categories.inputs'),
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
      category: t('demo.forms.categories.inputs'),
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
      category: t('demo.forms.categories.inputs'),
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
      category: t('demo.forms.categories.inputs'),
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
      category: t('demo.forms.categories.actions'),
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
      category: t('demo.forms.categories.helpers'),
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
      category: t('demo.forms.categories.helpers'),
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
      category: t('demo.forms.categories.examples'),
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
  ]
}
