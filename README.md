# 🌊 Starkon - Next.js Boilerplate & Starter Template

[![npm](https://img.shields.io/npm/v/starkon)](https://www.npmjs.com/package/starkon)
[![downloads](https://img.shields.io/npm/dm/starkon)](https://www.npmjs.com/package/starkon)
[![license](https://img.shields.io/github/license/zzafergok/starkon)](https://github.com/zzafergok/starkon/blob/main/LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

> 🚀 **Create production-ready Next.js applications in seconds, not hours**

**The complete Next.js 15 starter template with authentication, internationalization, UI components, and CLI scaffolding.**

## Quick Start

```bash
npx starkon my-awesome-app
cd my-awesome-app
npm install
npm run dev
```

Your Next.js app will be running at `http://localhost:3000` 🎉

## What is Starkon?

Starkon is a **comprehensive boilerplate and starter template** for Next.js applications that eliminates the tedious setup process. Instead of spending hours configuring tools and setting up authentication, internationalization, and UI components, Starkon gives you a production-ready foundation in seconds.

### ✨ Why Choose Starkon?

- 🚀 **Instant Setup** - One command, complete Next.js app ready
- 🔐 **Authentication Ready** - JWT-based auth system with session management
- 🌍 **Internationalization** - Built-in i18n support (English & Turkish)
- 🎨 **Modern UI System** - Radix UI + Tailwind CSS components
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Performance Optimized** - Next.js 15 with App Router
- 🛠️ **Developer Experience** - TypeScript, ESLint, Prettier pre-configured
- 📚 **Multiple Templates** - Choose from basic, standard, dashboard, or minimal

## 🎯 Template Options

Choose the perfect starting point for your project:

### 🏗️ **Standard Template** (Default)
Complete full-stack setup with all features included.
```bash
npx starkon my-app
# or explicitly
npx starkon my-app --template standard
```
**Includes:** Authentication, i18n, complete UI kit, dashboard layouts

### ⚡ **Basic Template**
Essential features without the complexity.
```bash
npx starkon my-app --template basic
```
**Includes:** Next.js 15, TypeScript, Tailwind CSS, ESLint

### 📊 **Dashboard Template**
Perfect for admin panels and data-heavy applications.
```bash
npx starkon my-app --template dashboard
```
**Includes:** Authentication, data tables, admin layouts, protected routes

### 🎯 **Minimal Template**
Bare minimum Next.js setup.
```bash
npx starkon my-app --template minimal
```
**Includes:** Next.js 15, TypeScript only

## 🏗️ Project Structure

```
starkon-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Protected route group
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── settings/      # User settings
│   │   │   └── layout.tsx     # Auth layout wrapper
│   │   ├── login/             # Authentication pages
│   │   ├── register/          
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── core/              # Base UI components (Button, Input, etc.)
│   │   ├── ui/                # Complex components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Core utilities
│   │   ├── services/          # API services & auth
│   │   ├── validations/       # Zod schemas
│   │   └── utils.ts           # Helper utilities
│   ├── hooks/                 # Custom React hooks
│   ├── providers/             # Context providers
│   └── locales/               # i18n translations
├── public/                    # Static assets
├── tailwind.config.mjs        # Tailwind configuration
└── next.config.mjs            # Next.js configuration
```

## 🚀 Features

### 🔐 **Authentication System**
- JWT-based authentication with automatic token refresh
- Session management with 5-minute buffer
- "Remember Me" functionality (3-day persistence)
- Protected routes with middleware
- Mock authentication for development

**Login Credentials (Development):**
- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `user123` 
- Demo: `demo@example.com` / `demo123`

### 🌍 **Internationalization**
- Built-in i18n with browser language detection
- English and Turkish support out of the box
- Easy to add new languages
- URL parameter and cookie persistence

### 🎨 **UI Component Library**
Built on **Radix UI** primitives with **Tailwind CSS**:
- **30+ Components:** Button, Input, Dialog, DataTable, and more
- **Dark/Light Theme:** Automatic theme switching
- **Responsive Design:** Mobile-first approach
- **Accessibility:** WCAG compliant components
- **Customizable:** Easy to extend and modify

### ⚡ **Developer Experience**
- **TypeScript:** Full type safety
- **ESLint & Prettier:** Code quality and formatting
- **Tailwind CSS:** Utility-first styling
- **Next.js 15:** Latest App Router features
- **React Query:** Data fetching and caching
- **Jest & Testing Library:** Testing setup ready

### 📱 **Production Ready**
- **Performance Optimized:** Bundle analysis with `npm run analyze`
- **SEO Friendly:** Meta tags and structured data
- **Error Handling:** Comprehensive error boundaries
- **Security:** XSS protection and secure headers

## 📋 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbo
npm run build            # Build for production
npm start               # Start production server

# Code Quality  
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
npm run prettier        # Format code
npm run prettier:check  # Check code formatting

# Testing
npm test               # Run Jest tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report

# Analysis
npm run analyze        # Analyze bundle size
```

## 🔧 Customization

### Environment Variables

Create a `.env.local` file in your project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development

# Authentication (optional)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### Adding New Components

Starkon follows a consistent component structure:

```bash
src/components/core/
├── my-component.tsx           # Component implementation
└── index.ts                   # Export
```

Use the built-in utilities:
```tsx
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "default-styles",
        outline: "outline-styles",
      },
    }
  }
)
```

### Theme Customization

Modify `tailwind.config.mjs` to customize colors, fonts, and spacing:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(var(--primary-50))',
          // ... your color palette
        }
      }
    }
  }
}
```

## 🌟 CLI Options

```bash
npx starkon [project-name] [options]

Options:
  -t, --template <type>     Template to use (basic|standard|dashboard|minimal)
  --skip-git               Skip git repository initialization  
  --skip-update-check      Skip version update check
  --verbose                Show detailed output
  --config-set <key=value> Set configuration option
  --clear-cache            Clear template cache
```

Examples:
```bash
# Create with specific template
npx starkon my-dashboard --template dashboard

# Skip git initialization
npx starkon my-app --skip-git

# Set default template
npx starkon --config-set defaultTemplate=basic
```

## 📚 Documentation

- [Getting Started Guide](https://github.com/zzafergok/starkon/wiki/Getting-Started)
- [Authentication Setup](https://github.com/zzafergok/starkon/wiki/Authentication)
- [Component Documentation](https://github.com/zzafergok/starkon/wiki/Components)
- [Deployment Guide](https://github.com/zzafergok/starkon/wiki/Deployment)
- [Migration Guide](https://github.com/zzafergok/starkon/wiki/Migration)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```bash
docker build -t my-starkon-app .
docker run -p 3000:3000 my-starkon-app
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - The React framework for production
- **Radix UI** - Low-level UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching library

---

<div align="center">

**[Website](https://www.starkon.website) • [Documentation](https://github.com/zzafergok/starkon/wiki) • [Examples](https://github.com/zzafergok/starkon/tree/main/examples)**

Made with ❤️ by [Zafer Gök](https://github.com/zzafergok)

⭐ **If Starkon helped you build faster, give us a star!**

</div>