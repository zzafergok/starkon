# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
