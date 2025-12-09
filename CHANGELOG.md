# Changelog

## [0.3.0](///compare/v0.2.0...v0.3.0) (2025-12-09)

### Features

* Implement forgot and reset password features with dedicated components, hooks, and schemas. 3b15112

## [0.2.0](///compare/v0.1.0...v0.2.0) (2025-12-08)

### Features

* Configure library build with tsup, DTS generation, module exports, and updated peer dependencies. c8b7226

## [0.1.0](///compare/v0.0.46...v0.1.0) (2025-12-08)

### Features

* add custom conventional changelog types and sections with Turkish translations. 2dc9d6d
* add Suspense with a loading spinner fallback to the home page 0c12e8d
* Add Turbopack configuration, update JSX transform to `react-jsx`, and refine TypeScript includes while removing ESLint build ignore. 18fa21c
* Add warning and info variants to the Alert component. 226dd95
* bump version to 0.0.49 d1827e9
* bump version to 0.0.50 634e08e
* enhance i18n support for blog and contact pages with new translations 21b1149
* Include internal documentation and mock user data markdown in package files. 6c58994
* Introduce new UI components, enhanced form fields, authentication flows, and profile management features. 6ed366c
* reorganize imports and enhance component structure across multiple files 2efb00b
* update default template and enhance template selection for better user experience 0386e22

### Bug Fixes

* Improve project cleanup by excluding unnecessary files from generated projects and update package version to 0.0.52. 664f358

## [0.2.0](///compare/v0.1.0...v0.2.0) (2025-12-08)

### Features

* add custom conventional changelog types and sections with Turkish translations. 2dc9d6d

## [0.1.0](///compare/v0.0.46...v0.1.0) (2025-12-08)

### Features

* add Suspense with a loading spinner fallback to the home page 0c12e8d
* Add Turbopack configuration, update JSX transform to `react-jsx`, and refine TypeScript includes while removing ESLint build ignore. 18fa21c
* Add warning and info variants to the Alert component. 226dd95
* bump version to 0.0.49 d1827e9
* bump version to 0.0.50 634e08e
* enhance i18n support for blog and contact pages with new translations 21b1149
* Include internal documentation and mock user data markdown in package files. 6c58994
* Introduce new UI components, enhanced form fields, authentication flows, and profile management features. 6ed366c
* reorganize imports and enhance component structure across multiple files 2efb00b
* update default template and enhance template selection for better user experience 0386e22

### Bug Fixes

* Improve project cleanup by excluding unnecessary files from generated projects and update package version to 0.0.52. 664f358

## [0.0.53](///compare/v0.1.1...v0.0.53) (2025-12-08)

## [0.1.0](///compare/v0.0.46...v0.1.0) (2025-12-08)

### Features

* add Suspense with a loading spinner fallback to the home page 0c12e8d
* Add Turbopack configuration, update JSX transform to `react-jsx`, and refine TypeScript includes while removing ESLint build ignore. 18fa21c
* Add warning and info variants to the Alert component. 226dd95
* bump version to 0.0.49 d1827e9
* bump version to 0.0.50 634e08e
* enhance i18n support for blog and contact pages with new translations 21b1149
* Include internal documentation and mock user data markdown in package files. 6c58994
* Introduce new UI components, enhanced form fields, authentication flows, and profile management features. 6ed366c
* reorganize imports and enhance component structure across multiple files 2efb00b
* update default template and enhance template selection for better user experience 0386e22

### Bug Fixes

* Improve project cleanup by excluding unnecessary files from generated projects and update package version to 0.0.52. 664f358

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.52] - 2025-12-08

### Fixed

- **Project Cleanup** - Improved file exclusion in generated projects
  - Excluded `docs/` directory from generated projects
  - Excluded `MOCK_USERS.md` and `tsup.config.ts` from generated projects
  - Ensured cleaner project initialization

## [0.0.51] - 2025-12-08

### Changed

- **Documentation Organization** - Reorganized project documentation
  - Moved internal documentation (`TEMPLATE_RESEARCH.md`, `TEMPLATE_ROADMAP.md`, `NPM_PUBLISH.md`) to `docs/` directory
  - Updated `.gitignore` to exclude `docs/` directory
  - Started tracking `CLI_USAGE_GUIDE.md` (removed from .gitignore)

## [0.0.14] - 2025-08-29

### Added

- **Corporate Website Template** - Complete business website solution
  - ServiceCard, TeamMember, BlogCard, GalleryItem components
  - Corporate route group with About, Services, Blog, Gallery pages
  - Built-in content management system with TypeScript interfaces
  - Professional business-focused design system
- **Landing Page Template Enhancements** - Marketing-optimized components
  - Hero, Features, Testimonials, CTA, ContactForm sections
  - Scroll-triggered animations with Framer Motion
  - Conversion-focused design patterns
- **CLI Usage Guide** - Comprehensive documentation (CLI_USAGE_GUIDE.md)
- **Enhanced README.md** - Complete feature comparison and usage examples

### Fixed

- **TypeScript Icon Component Errors** - Fixed JSX element type issues
  - Changed `React.ElementType` to `LucideIcon` for proper typing
  - Added proper imports for `LucideIcon` from 'lucide-react'
- **Next.js Image Optimization** - Replaced all img elements with Next.js Image
  - Added proper width/height attributes for optimization
  - Improved performance with automatic image optimization
  - Fixed ESLint warnings about slower LCP and higher bandwidth

### Changed

- **Template Exclusion System** - Updated corporate template excludeFiles
  - Excludes authentication and i18n complexity for cleaner corporate sites
  - Maintains core UI components while removing auth-specific features
- **CLI Template Options** - Added corporate template to available templates
  - Users can now create corporate websites with `--template corporate`
  - Updated help documentation with new template descriptions

### Performance

- **Bundle Size Optimization** - Corporate and landing templates are lighter
  - Removed unnecessary authentication systems from corporate sites
  - Excluded complex i18n setup for faster loading
  - Image optimization with Next.js Image component

## [0.0.13] - 2025-08-29

### Added

- **Landing Page Template** - Single-page marketing website template
  - Hero section with CTA optimization
  - Features showcase with icon grid
  - Testimonials section for social proof
  - Contact form with validation
  - Smooth scroll animations with Framer Motion

### Fixed

- **Template Exclusion Logic** - Improved file filtering for different templates
  - Landing template excludes authentication and i18n systems
  - Better separation of concerns for specialized templates

## [0.0.12] - 2025-08-29

### Added

- **Enhanced Template System** - Multiple template types support
- **Improved CLI Interface** - Better user experience and error handling
- **Version Management** - Automatic version checking and updates

## [0.0.11] - 2025-08-29

### Fixed

- **CLI Script Functionality** - Template generation and file copying
- **Package Manager Detection** - Auto-detection for npm, yarn, pnpm

## [0.0.10] - 2025-08-29

### Changed

- **Project Structure** - Reorganized components and templates
- **Build System** - Improved build configuration and optimization

## [0.0.9] - 2025-08-29

### Added

- **Translation System Improvements** - Enhanced i18n integration
- **Component Library Expansion** - Additional UI components

## [0.0.8] - 2024-12-06

### Added

- High-performance centralized logging system with StarkonLogger class
- Enterprise-grade graceful shutdown manager with cleanup tasks
- Thread-safe global state management with StateManager
- Enhanced security measures and input validation
- Comprehensive Turkish character normalization
- Dynamic import error handling with retry mechanisms
- Template caching system with 24-hour TTL
- Plugin architecture with hook-based extensions
- Package manager auto-detection (npm, yarn, pnpm)
- Multiple template types (basic, standard, dashboard, minimal)
- Internationalization support (Turkish, English)
- Configuration management system
- System requirements validation
- Fetch API polyfill for Node.js compatibility

### Fixed

- StarkonError class hoisting issues
- Version parsing regex security vulnerabilities (ReDoS protection)
- Process.exit race conditions with graceful shutdown
- Global state concurrent access issues
- Dynamic import failures with comprehensive fallbacks
- Unicode normalization for Turkish characters

### Security

- Input validation and sanitization
- Path traversal protection
- Command injection prevention
- ReDoS attack protection
- Reserved name validation

### Performance

- Pre-bound logging methods for zero allocation
- Mutex-like locking for state management
- Template caching for faster initialization
- Optimized string operations
- Reduced function creation overhead

## [0.0.7] - 2024-11-28

### Added

- Initial CLI implementation
- Basic template scaffolding
- Next.js 15 support with App Router
- TypeScript configuration
- Tailwind CSS integration

### Changed

- Updated package name from create-starkon to starkon
- Improved CLI interface and help messages

## [0.0.6] - 2024-11-20

### Added

- Authentication system implementation
- Radix UI component library
- Theme switching functionality
- Form validation with Zod

## [0.0.5] - 2024-11-15

### Added

- Project structure initialization
- Basic component library
- Configuration files

## [0.0.4] - 2024-11-10

### Added

- Initial project setup
- Package.json configuration
- Basic CLI structure

## [0.0.3] - 2024-11-05

### Added

- Core dependencies
- Development environment setup

## [0.0.2] - 2024-11-01

### Added

- Initial repository structure
- Basic documentation

## [0.0.1] - 2024-10-28

### Added

- Project initialization
- Initial commit structure
