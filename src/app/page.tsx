import { Button } from '@/components/core/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Badge } from '@/components/core/badge'
import { Zap, Shield, Code, Users, Activity, Settings } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <Badge className='mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
            Welcome to Starkon
          </Badge>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>Next.js Enterprise Boilerplate</h1>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            A comprehensive starter template with authentication, UI components, and everything you need to build modern
            web applications.
          </p>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Users className='h-5 w-5 mr-2' />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                Complete auth system with JWT tokens, protected routes, and user management.
              </p>
              <div className='flex gap-2'>
                <Link href='/login'>
                  <Button variant='outline' size='sm'>
                    Login
                  </Button>
                </Link>
                <Link href='/register'>
                  <Button variant='outline' size='sm'>
                    Register
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Code className='h-5 w-5 mr-2' />
                Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                50+ pre-built components with Radix UI and Tailwind CSS styling.
              </p>
              <Link href='/components'>
                <Button variant='outline' size='sm'>
                  View Components
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Activity className='h-5 w-5 mr-2' />
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                Admin dashboard with user management, analytics, and settings.
              </p>
              <Link href='/dashboard'>
                <Button variant='outline' size='sm'>
                  Go to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='text-center p-6'>
            <Zap className='h-12 w-12 text-blue-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>Next.js 15</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>Latest features and optimizations</p>
          </div>

          <div className='text-center p-6'>
            <Shield className='h-12 w-12 text-green-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>TypeScript</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>Fully typed for better development</p>
          </div>

          <div className='text-center p-6'>
            <Code className='h-12 w-12 text-purple-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>UI Components</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>Radix UI with custom styling</p>
          </div>

          <div className='text-center p-6'>
            <Settings className='h-12 w-12 text-orange-600 mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>Ready to Deploy</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>Vercel, Netlify, Docker support</p>
          </div>
        </div>

        {/* Getting Started */}
        <div className='mt-16 text-center'>
          <Card className='max-w-2xl mx-auto'>
            <CardContent className='p-8'>
              <h3 className='text-2xl font-bold mb-4'>Get Started</h3>
              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                Create a new project with Starkon CLI or explore the demo features.
              </p>
              <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6'>
                <code className='text-sm'>npx create-starkon-template my-app</code>
              </div>
              <div className='flex gap-4 justify-center'>
                <Link href='/components'>
                  <Button>Explore Components</Button>
                </Link>
                <Link href='/dashboard'>
                  <Button variant='outline'>View Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
