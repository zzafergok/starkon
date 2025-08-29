# 🌊 Starkon - Next.js Boilerplate & Template Generator

[![npm](https://img.shields.io/npm/v/starkon)](https://www.npmjs.com/package/starkon)
[![downloads](https://img.shields.io/npm/dm/starkon)](https://www.npmjs.com/package/starkon)
[![license](https://img.shields.io/github/license/zzafergok/starkon)](https://github.com/zzafergok/starkon/blob/main/LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

> 🚀 **Create production-ready Next.js applications in seconds, not hours**

**The most comprehensive Next.js 15 starter template with authentication, internationalization, corporate features, and an interactive CLI that lets you choose the perfect template.**

### ✨ Interactive Template Selection

```bash
npx starkon my-app
```

Choose from 3 optimized templates with arrow keys:

- 🏗️ **Next.js Boilerplate** - Full-stack with auth & i18n
- 🎯 **Landing Page** - Marketing-optimized single page
- 🏢 **Corporate** - Business website with CMS

## ⚡ Quick Start

### 🎯 Interactive CLI Menu

Simply run the command and choose your template:

```bash
npx starkon my-app
```

You'll see an interactive menu with 3 options:

- **❯ Next.js Boilerplate** - Full-featured with auth & i18n
- **Landing Page Template** - Single-page marketing site
- **Corporate Template** - Business website with CMS

Use **↑↓ arrow keys** to navigate and **Enter** to select.

### 🚀 Complete Setup

```bash
npx starkon my-awesome-app
# ↓ Interactive menu appears
# ↓ Select template with arrow keys
# ↓ Press Enter to confirm
cd my-awesome-app
npm install
npm run dev
```

Your Next.js app will be running at `http://localhost:3000` 🎉

### 🏃‍♂️ Skip Interactive Menu

You can also specify template directly:

```bash
npx starkon my-app --template corporate  # Business website
npx starkon my-app --template landing    # Marketing page
npx starkon my-app --template standard   # Full-stack app
```

## 🎯 Template Library

Choose the perfect starting point for your specific use case:

### 🏢 **Corporate Template** ⭐ _New_

Complete business website with content management system.

```bash
npx starkon company-website --template corporate
```

**Perfect for:**

- Corporate websites
- Agency portfolios
- Business landing pages
- Service companies

**Includes:**

- 📄 **Pages:** Home, About, Services, Blog, Gallery, Contact
- 🧩 **Components:** ServiceCard, TeamMember, BlogCard, GalleryItem
- 📝 **Content System:** Built-in content management with TypeScript interfaces
- 🎨 **Professional Design:** Clean, modern business aesthetic
- 📱 **Responsive:** Mobile-optimized layouts

**Excludes:** Authentication system, i18n complexity for cleaner corporate focus

### 🎯 **Landing Template** ⭐ _Popular_

Single-page marketing websites optimized for conversions.

```bash
npx starkon product-launch --template landing
```

**Perfect for:**

- Product launches
- SaaS marketing sites
- Portfolio websites
- Event pages

**Includes:**

- 🎨 **Sections:** Hero, Features, Testimonials, CTA, Contact
- ⚡ **Animations:** Smooth scroll-triggered animations with Framer Motion
- 📝 **Forms:** Contact forms with validation
- 🎯 **CTA Optimized:** Conversion-focused design patterns

**Excludes:** Authentication, i18n, dashboard components for faster loading

### 🏗️ **Next.js Boilerplate** (Full-Featured)

Complete full-stack setup with all enterprise features.

```bash
npx starkon enterprise-app --template standard
```

**Perfect for:**

- SaaS applications
- Admin dashboards
- Enterprise tools
- Multi-user platforms

**Includes:**

- 🔐 **Authentication:** JWT-based auth with session management
- 🌍 **i18n:** English/Turkish with easy language addition
- 📊 **Dashboard:** Admin panels and user management
- 🛡️ **Security:** Protected routes, XSS protection
- 🎨 **Complete UI Kit:** 30+ production-ready components

### ⚡ **Basic Template**

Essential Next.js setup without complexity.

```bash
npx starkon simple-app --template basic
```

**Perfect for:**

- Small projects
- Prototypes
- Learning Next.js
- Quick experiments

**Includes:** Next.js 15, TypeScript, Tailwind CSS, ESLint
**Excludes:** Authentication, i18n, complex UI components

### 📊 **Dashboard Template**

Admin dashboard optimized for data-heavy applications.

```bash
npx starkon admin-panel --template dashboard
```

**Perfect for:**

- Admin dashboards
- Analytics tools
- Data management
- Internal tools

**Includes:** Dashboard layout, data tables, charts integration
**Excludes:** Public marketing pages

### 🎯 **Minimal Template**

Bare-bones Next.js setup for maximum control.

```bash
npx starkon minimal-app --template minimal
```

**Perfect for:**

- Custom implementations
- Learning projects
- Starting from scratch

**Includes:** Next.js 15, TypeScript only
**Excludes:** Everything else - build your own way

## 🏗️ Architecture Overview

### Project Structure

```
starkon-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 🔐 Protected route group
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── settings/      # User settings
│   │   │   └── layout.tsx     # Auth layout wrapper
│   │   ├── (corporate)/       # 🏢 Corporate route group
│   │   │   ├── about/         # Company info
│   │   │   ├── services/      # Services catalog
│   │   │   ├── blog/          # Blog system
│   │   │   ├── gallery/       # Project gallery
│   │   │   └── layout.tsx     # Corporate layout
│   │   ├── (authentication)/ # Login/register flows
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── verify-email/
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── core/              # 🧩 Base UI (Button, Input, Card, etc.)
│   │   ├── corporate/         # 🏢 Business components
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── TeamMember.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   └── GalleryItem.tsx
│   │   ├── sections/          # 🎯 Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── ui/                # Complex components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Core utilities
│   │   ├── content.ts         # 📄 Content management system
│   │   ├── services/          # API services & auth
│   │   ├── validations/       # Zod schemas
│   │   └── utils.ts           # Helper utilities
│   ├── hooks/                 # Custom React hooks
│   ├── providers/             # Context providers
│   └── locales/               # 🌍 i18n translations
├── public/                    # Static assets
├── tailwind.config.mjs        # Tailwind configuration
└── next.config.mjs            # Next.js configuration
```

### Technology Stack

**Core Framework:**

- **Next.js 15** - App Router, Server Components, optimized performance
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first styling with custom design system

**UI & Design:**

- **Radix UI** - Accessible, unstyled component primitives
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icon library
- **CSS Variables** - Dynamic theming support

**State & Data:**

- **React Query** - Server state management and caching
- **Zustand** - Lightweight client state management
- **React Hook Form** - Performant forms with validation

**Development:**

- **ESLint** - Code linting with Next.js rules
- **Prettier** - Code formatting with Tailwind plugin
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing utilities

## 🔐 Authentication System

### Features

- **JWT Tokens** - Secure access and refresh token system
- **Auto-refresh** - Automatic token renewal with 5-minute buffer
- **Session Management** - Persistent login with "Remember Me"
- **Protected Routes** - Middleware-based route protection
- **Mock Development** - Built-in test users for development

### Development Users

```typescript
// Available test accounts
admin@example.com    / admin123     // Full admin access
user@example.com     / user123      // Standard user
demo@example.com     / demo123      // Demo account
```

### Usage

```tsx
import { useAuth } from '@/hooks/useAuth'

function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) return <LoginForm />

  return <h1>Welcome {user.name}!</h1>
}
```

## 🌍 Internationalization

### Built-in Language Support

- **English (en)** - Complete translations
- **Turkish (tr)** - Native language support
- **Browser Detection** - Automatic language detection
- **URL Persistence** - Language state in URL parameters

### Adding New Languages

```bash
# 1. Create translation file
src/locales/es/translation.json

# 2. Add to supported locales
src/lib/locale-utils.ts
```

### Usage

```tsx
import { useTranslation } from 'react-i18next'

function Component() {
  const { t } = useTranslation()
  return <h1>{t('welcome.title')}</h1>
}
```

## 🎨 UI Component System

### Core Components (30+)

```tsx
// Form Components
<Button variant="default | outline | ghost" size="sm | md | lg" />
<Input type="text | email | password" />
<Textarea placeholder="Enter text..." />
<Checkbox checked={true} />
<Switch enabled={true} />

// Layout Components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Data Display
<DataTable data={data} columns={columns} />
<Badge variant="default | secondary | outline" />
<Avatar src="/avatar.jpg" fallback="JD" />

// Navigation
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  </TabsList>
</Tabs>

// Feedback
<Alert variant="default | destructive">
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>
```

### Corporate Components

```tsx
// Service showcase
<ServiceCard
  title="Web Development"
  description="Custom web solutions"
  features={["React", "Next.js", "TypeScript"]}
  icon={Code}
  href="/services/web"
/>

// Team member display
<TeamMember
  name="John Doe"
  role="Lead Developer"
  bio="10+ years experience"
  image="/team/john.jpg"
  social={{ linkedin: "...", github: "..." }}
  skills={["React", "Node.js", "AWS"]}
/>

// Blog post cards
<BlogCard
  title="Getting Started with Next.js"
  excerpt="Learn the fundamentals..."
  author={{ name: "Jane Smith", avatar: "/authors/jane.jpg" }}
  category="Tutorial"
  readingTime="5 min read"
  publishedAt="2024-01-15"
/>
```

### Landing Page Sections

```tsx
// Hero section with CTA
<Hero
  title="Build Amazing Apps"
  subtitle="Next.js boilerplate for rapid development"
  primaryAction="Get Started"
  secondaryAction="View Demo"
/>

// Feature showcase
<Features
  title="Everything You Need"
  features={[
    { title: "Fast Setup", icon: Zap, description: "..." },
    { title: "TypeScript", icon: Shield, description: "..." }
  ]}
/>

// Social proof
<Testimonials
  title="What Developers Say"
  testimonials={[
    { name: "Developer", role: "CTO", content: "Amazing tool!" }
  ]}
/>
```

## 🛠️ Development Workflow

### Getting Started

```bash
# 1. Create project with interactive menu
npx starkon my-project
# ↓ Choose template from menu

# 2. Setup development
cd my-project
npm install

# 3. Start development server
npm run dev

# 4. Open browser
open http://localhost:3000
```

### Code Quality

```bash
# Linting and formatting
npm run lint              # ESLint check
npm run lint:fix          # Auto-fix ESLint errors
npm run prettier          # Format code
npm run prettier:check    # Check formatting

# Type checking
npm run type-check        # TypeScript validation

# Testing
npm test                  # Run test suite
npm run test:watch        # Watch mode testing
npm run test:coverage     # Coverage report
```

### Build and Deploy

```bash
# Production build
npm run build

# Analyze bundle size
npm run analyze           # Opens webpack-bundle-analyzer

# Start production server
npm run start
```

## 🌟 CLI Reference

### Basic Usage

```bash
# Interactive template selection
npx starkon <project-name>

# Or specify template directly
npx starkon <project-name> --template <template-type>
```

### Options

| Option                     | Description                        | Example                        |
| -------------------------- | ---------------------------------- | ------------------------------ |
| `--template <type>`        | Choose template type               | `--template corporate`         |
| `--skip-git`               | Skip git repository initialization | -                              |
| `--skip-update-check`      | Skip version update check          | -                              |
| `--verbose`                | Show detailed output               | -                              |
| `--config-set <key=value>` | Set user configuration             | `--config-set locale=en`       |
| `--config-get <key>`       | Get configuration value            | `--config-get defaultTemplate` |
| `--clear-cache`            | Clear template cache               | -                              |

### Main Template Types (Interactive Menu)

| Template    | Use Case                         | Interactive Selection     |
| ----------- | -------------------------------- | ------------------------- |
| `standard`  | Full-stack apps with auth + i18n | **Next.js Boilerplate**   |
| `landing`   | Marketing/product pages          | **Landing Page Template** |
| `corporate` | Business websites                | **Corporate Template**    |

### Additional Templates (Manual Selection)

| Template    | Use Case         | Command                                  |
| ----------- | ---------------- | ---------------------------------------- |
| `dashboard` | Admin panels     | `npx starkon admin --template dashboard` |
| `basic`     | Simple projects  | `npx starkon simple --template basic`    |
| `minimal`   | Bare-bones setup | `npx starkon minimal --template minimal` |

### Advanced Examples

```bash
# Interactive template selection (recommended)
npx starkon my-awesome-project

# Skip interactive menu with specific template
npx starkon acme-corp --template corporate --skip-git

# Landing page with verbose output
npx starkon product-launch --template landing --verbose

# Configuration management
npx starkon --config-set locale=en
npx starkon --config-get locale
npx starkon --clear-cache
```

## 📊 Feature Comparison

| Feature                  | Standard | Corporate | Landing | Dashboard | Basic  | Minimal |
| ------------------------ | -------- | --------- | ------- | --------- | ------ | ------- |
| **Core**                 |
| Next.js 15               | ✅       | ✅        | ✅      | ✅        | ✅     | ✅      |
| TypeScript               | ✅       | ✅        | ✅      | ✅        | ✅     | ✅      |
| Tailwind CSS             | ✅       | ✅        | ✅      | ✅        | ✅     | ❌      |
| **Authentication**       |
| JWT Auth System          | ✅       | ❌        | ❌      | ✅        | ❌     | ❌      |
| Protected Routes         | ✅       | ❌        | ❌      | ✅        | ❌     | ❌      |
| User Management          | ✅       | ❌        | ❌      | ✅        | ❌     | ❌      |
| **Internationalization** |
| i18n Support             | ✅       | ❌        | ❌      | ✅        | ❌     | ❌      |
| Multi-language           | ✅       | ❌        | ❌      | ✅        | ❌     | ❌      |
| **UI Components**        |
| Core UI Kit              | ✅       | ✅        | ✅      | ✅        | ✅     | ❌      |
| Corporate Components     | ❌       | ✅        | ❌      | ❌        | ❌     | ❌      |
| Landing Sections         | ❌       | ❌        | ✅      | ❌        | ❌     | ❌      |
| Dashboard Components     | ✅       | ❌        | ❌      | ✅        | ❌     | ❌      |
| **Pages & Routing**      |
| Public Pages             | ✅       | ❌        | ✅      | ❌        | ❌     | ❌      |
| Corporate Pages          | ❌       | ✅        | ❌      | ❌        | ❌     | ❌      |
| Auth Pages               | ✅       | ❌        | ❌      | ✅        | ❌     | ❌      |
| **Performance**          |
| Bundle Size              | Large    | Medium    | Small   | Medium    | Small  | Tiny    |
| Setup Time               | 2-3 min  | 1-2 min   | 1 min   | 2 min     | 30 sec | 15 sec  |

## 🚀 Deployment Guide

### 🟢 Vercel (Recommended)

Zero-configuration deployment for Next.js apps:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Features:**

- Automatic builds on git push
- Edge functions support
- Built-in analytics
- Custom domains

### 🟠 Netlify

Great for static and hybrid apps:

```bash
# Build for deployment
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

### 🔵 Docker

Containerized deployment:

```dockerfile
# Dockerfile included in template
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t my-starkon-app .
docker run -p 3000:3000 my-starkon-app
```

### ☁️ Other Platforms

- **Railway:** `railway deploy`
- **Render:** Connect GitHub repository
- **AWS Amplify:** Push to connected git branch
- **Google Cloud:** `gcloud app deploy`

## ⚙️ Configuration

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development

# Authentication (Standard template)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database (if using)
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### User Configuration

```bash
# Set default template
npx starkon --config-set defaultTemplate=corporate

# Set preferred package manager
npx starkon --config-set preferredPackageManager=pnpm

# Set default locale
npx starkon --config-set locale=en

# Disable telemetry
npx starkon --config-set telemetryEnabled=false
```

## 🧪 Testing

### Running Tests

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/core/button'

test('Button renders correctly', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})
```

## 🎨 Customization

### Theme System

```tsx
// Custom theme configuration
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(210 40% 98%)',
          // ... your brand colors
        },
      },
    },
  },
}
```

### Component Variants

```tsx
// Using class-variance-authority
import { cva } from 'class-variance-authority'

const buttonVariants = cva('base-styles', {
  variants: {
    variant: {
      default: 'bg-primary text-white',
      outline: 'border border-primary text-primary',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      lg: 'px-6 py-3 text-lg',
    },
  },
})
```

## 📋 Available Scripts

### Development

```bash
npm run dev              # Next.js development server (Turbo mode)
npm run build            # Production build
npm run start            # Production server
npm run analyze          # Bundle analyzer (set ANALYZE=true)
```

### Code Quality

```bash
npm run lint             # ESLint check
npm run type-check       # TypeScript validation
npm run prettier         # Code formatting
npm run prettier:check   # Check formatting only
```

### Testing

```bash
npm test                 # Jest test runner
npm run test:watch       # Watch mode testing
npm run test:coverage    # Generate coverage report
```

## 🔄 Migration Guide

### From Create Next App

```bash
# 1. Create Starkon project
npx starkon my-app --template basic

# 2. Copy your existing code
cp -r old-project/src/pages/* new-project/src/app/
cp -r old-project/components/* new-project/src/components/

# 3. Update imports
# Change: import { Button } from '../components/Button'
# To:     import { Button } from '@/components/core/button'
```

### From Other Boilerplates

1. **Extract your custom components** to `src/components/`
2. **Move API logic** to `src/lib/services/`
3. **Update styling** to use Tailwind classes
4. **Add TypeScript types** in `src/types/`

## 🤝 Contributing

We welcome contributions to make Starkon even better!

### Development Setup

```bash
# Clone repository
git clone https://github.com/zzafergok/starkon.git
cd starkon

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test
```

### Creating New Templates

```bash
# 1. Add template to index.js TEMPLATES object
# 2. Create template-specific components
# 3. Test template generation
# 4. Update README.md
# 5. Submit PR
```

### Guidelines

- **Code Quality:** Follow ESLint and Prettier rules
- **Testing:** Add tests for new features
- **Documentation:** Update README for new features
- **TypeScript:** Maintain full type safety

## 📈 Performance

### Bundle Analysis

```bash
# Analyze your build
ANALYZE=true npm run build

# Opens webpack-bundle-analyzer in browser
```

### Optimization Features

- **Automatic Code Splitting** - Route-based splitting
- **Image Optimization** - Next.js Image component
- **Font Optimization** - Google Fonts optimization
- **Static Generation** - ISG and SSG support
- **Edge Runtime** - Faster cold starts

## 🛠️ Troubleshooting

### Common Issues

**Build Errors:**

```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors:**

```bash
# Check types without building
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

**Authentication Issues:**

```bash
# Check token in browser storage
# DevTools -> Application -> Session Storage -> tokens

# Clear all auth data
localStorage.clear()
sessionStorage.clear()
```

### Getting Help

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/zzafergok/starkon/issues)
- 💬 **Questions:** [Discussions](https://github.com/zzafergok/starkon/discussions)
- 📧 **Contact:** [zafer@starkon.website](mailto:zafer@starkon.website)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

**Core Technologies:**

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Radix UI](https://www.radix-ui.com/)** - Low-level accessible UI primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Query](https://tanstack.com/query)** - Powerful data synchronization

**Inspiration:**

- **[shadcn/ui](https://ui.shadcn.com/)** - Component design patterns
- **[T3 Stack](https://create.t3.gg/)** - TypeScript-first development
- **[Vercel Templates](https://vercel.com/templates)** - Deployment optimization

---

<div align="center">

### 🌊 Ready to Build Something Amazing?

**[Get Started](https://github.com/zzafergok/starkon#quick-start) • [View Examples](https://starkon.website) • [Read Docs](https://github.com/zzafergok/starkon/wiki)**

Made with ❤️ by [Zafer Gök](https://github.com/zzafergok)

⭐ **If Starkon helped you ship faster, please give us a star on GitHub!**

</div>

---

## 📊 Stats

- 🎨 **30+ UI Components** ready to use
- 🔐 **Complete Auth System** with JWT tokens
- 🌍 **2 Languages** supported (English, Turkish)
- 📱 **3 Main Templates** + 3 specialized templates
- ⚡ **Interactive CLI** with arrow key navigation
- 🚀 **< 30 seconds** from CLI to running app
- 🛠️ **Production Ready** - no additional setup needed
