#!/usr/bin/env node

import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'
import { program } from 'commander'
import prompts from 'prompts'
import ora from 'ora'

// Centralized high-performance logging system
class StarkonLogger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production'
    this.logLevel = process.env.LOG_LEVEL || (this.isDevelopment ? 'debug' : 'info')
    this.levels = { debug: 0, info: 1, warn: 2, error: 3, fatal: 4 }
    this.currentLevel = this.levels[this.logLevel] || 1
    this.correlationId = null

    // Performance: Pre-bind methods to avoid function creation overhead
    this.debug = this._createLogMethod('debug').bind(this)
    this.info = this._createLogMethod('info').bind(this)
    this.warn = this._createLogMethod('warn').bind(this)
    this.error = this._createLogMethod('error').bind(this)
    this.fatal = this._createLogMethod('fatal').bind(this)
  }

  setCorrelationId(id) {
    this.correlationId = id || Math.random().toString(36).substring(7)
    return this.correlationId
  }

  _shouldLog(level) {
    return this.levels[level] >= this.currentLevel
  }

  _formatMessage(level, module, message, context = {}) {
    const timestamp = new Date().toISOString()

    if (this.isDevelopment) {
      // Pretty format for development
      const prefix = this._getColoredPrefix(level)
      const moduleStr = module ? `[${module}]` : ''
      const contextStr = Object.keys(context).length > 0 ? ` ${JSON.stringify(context)}` : ''
      return `${prefix} ${timestamp.substring(11, 23)} ${moduleStr} ${message}${contextStr}`
    } else {
      // Structured JSON for production
      return JSON.stringify({
        level,
        time: timestamp,
        module,
        correlationId: this.correlationId,
        message,
        ...context,
      })
    }
  }

  _getColoredPrefix(level) {
    // Avoid chalk dependency for performance, use ANSI codes directly
    const colors = {
      debug: '\x1b[36m[DEBUG]\x1b[0m', // Cyan
      info: '\x1b[32m[INFO]\x1b[0m', // Green
      warn: '\x1b[33m[WARN]\x1b[0m', // Yellow
      error: '\x1b[31m[ERROR]\x1b[0m', // Red
      fatal: '\x1b[35m[FATAL]\x1b[0m', // Magenta
    }
    return colors[level] || '[LOG]'
  }

  _createLogMethod(level) {
    return (messageOrContext, message, context = {}) => {
      if (!this._shouldLog(level)) return

      let finalMessage, finalContext, moduleName

      if (typeof messageOrContext === 'string') {
        finalMessage = messageOrContext
        finalContext = typeof message === 'object' ? message : context
        moduleName = typeof message === 'string' ? message : undefined
      } else if (typeof messageOrContext === 'object' && messageOrContext !== null) {
        finalMessage = message || 'Log message'
        finalContext = messageOrContext
        moduleName = messageOrContext.module
      } else {
        finalMessage = String(messageOrContext)
        finalContext = context
      }

      const formatted = this._formatMessage(level, moduleName, finalMessage, finalContext)

      // Use appropriate console method
      const consoleMethod =
        level === 'error' || level === 'fatal' ? console.error : level === 'warn' ? console.warn : console.log
      consoleMethod(formatted)
    }
  }

  // Create module-specific logger
  createModuleLogger(moduleName) {
    return {
      debug: (msg, ctx) => this.debug({ module: moduleName, ...ctx }, msg),
      info: (msg, ctx) => this.info({ module: moduleName, ...ctx }, msg),
      warn: (msg, ctx) => this.warn({ module: moduleName, ...ctx }, msg),
      error: (msg, ctx) => this.error({ module: moduleName, ...ctx }, msg),
      fatal: (msg, ctx) => this.fatal({ module: moduleName, ...ctx }, msg),
    }
  }

  // Legacy console compatibility for gradual migration
  overrideConsole() {
    const originalConsole = { ...console }

    console.log = (...args) => {
      if (args.length === 1 && typeof args[0] === 'string') {
        this.info(args[0])
      } else {
        this.info({ data: args }, 'Console log')
      }
    }

    console.error = (...args) => {
      if (args[0] instanceof Error) {
        this.error({ error: args[0].message, stack: args[0].stack }, args[0].message)
      } else {
        this.error({ data: args }, 'Console error')
      }
    }

    console.warn = (...args) => {
      this.warn({ data: args }, 'Console warning')
    }

    return originalConsole
  }
}

// Global logger instance
const logger = new StarkonLogger()
logger.setCorrelationId() // Set initial correlation ID

// ES modules için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Thread-safe global state management
class StateManager {
  constructor() {
    this._configCache = null
    this._localesCache = new Map()
    this._configLock = false
    this._localeLocks = new Set()
  }

  async getConfig() {
    // Simple mutex-like locking
    while (this._configLock) {
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    return this._configCache
  }

  async setConfig(config) {
    this._configLock = true
    try {
      this._configCache = config
    } finally {
      this._configLock = false
    }
  }

  async getLocale(key) {
    // Avoid concurrent access to same locale
    while (this._localeLocks.has(key)) {
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    return this._localesCache.get(key)
  }

  async setLocale(key, value) {
    this._localeLocks.add(key)
    try {
      this._localesCache.set(key, value)
    } finally {
      this._localeLocks.delete(key)
    }
  }

  hasLocale(key) {
    return this._localesCache.has(key)
  }

  clearAll() {
    this._configCache = null
    this._localesCache.clear()
    this._localeLocks.clear()
  }
}

const stateManager = new StateManager()
const shutdownLog = logger.createModuleLogger('shutdown')

// Graceful shutdown manager
class ShutdownManager {
  constructor() {
    this.isShuttingDown = false
    this.cleanupTasks = []
    this.exitTimeout = null

    // Add state manager cleanup task
    this.addCleanupTask(async () => {
      stateManager.clearAll()
    }, 'State Manager cleanup')

    // Signal handlers
    process.on('SIGTERM', this.gracefulShutdown.bind(this))
    process.on('SIGINT', this.gracefulShutdown.bind(this))
    process.on('uncaughtException', this.handleCriticalError.bind(this))
    process.on('unhandledRejection', this.handleCriticalError.bind(this))
  }

  addCleanupTask(task, description = 'Unknown task') {
    this.cleanupTasks.push({ task, description })
  }

  async gracefulShutdown(signal) {
    if (this.isShuttingDown) return

    this.isShuttingDown = true
    shutdownLog.warn(`Graceful shutdown initiated by ${signal} signal`, { signal })

    // 10 saniye timeout - zorunlu çıkış
    this.exitTimeout = setTimeout(() => {
      shutdownLog.error('Shutdown timeout - forcing exit', { timeoutMs: 5000 })
      process.exit(1)
    }, 10000)

    try {
      // Cleanup tasks'leri çalıştır
      for (const { task, description } of this.cleanupTasks) {
        try {
          shutdownLog.info(`Cleaning up: ${description}`, { task: description })
          await task()
        } catch (error) {
          shutdownLog.error(`Cleanup error: ${description}`, {
            task: description,
            error: error.message,
            stack: error.stack,
          })
        }
      }

      shutdownLog.info('Graceful shutdown completed successfully')
      clearTimeout(this.exitTimeout)
      process.exit(0)
    } catch (error) {
      shutdownLog.fatal('Critical error during shutdown', { error: error.message, stack: error.stack })
      clearTimeout(this.exitTimeout)
      process.exit(1)
    }
  }

  handleCriticalError(error) {
    shutdownLog.fatal('Critical error caught', { error: error.message, stack: error.stack })
    if (!this.isShuttingDown) {
      this.gracefulShutdown('CRITICAL_ERROR')
    }
  }

  safeExit(code = 0) {
    if (this.isShuttingDown) {
      return // Zaten shutdown sürecinde
    }

    // Normal exit için cleanup tasks varsa çalıştır
    if (this.cleanupTasks.length > 0) {
      this.gracefulShutdown('MANUAL_EXIT')
        .then(() => {
          process.exit(code)
        })
        .catch(() => {
          process.exit(1)
        })
    } else {
      process.exit(code)
    }
  }
}

const shutdownManager = new ShutdownManager()
const importLog = logger.createModuleLogger('imports')
const configLog = logger.createModuleLogger('config')
const localeLog = logger.createModuleLogger('locale')
const sysLog = logger.createModuleLogger('system')
const pluginLog = logger.createModuleLogger('plugins')
const templateLog = logger.createModuleLogger('templates')
const fileLog = logger.createModuleLogger('files')
const createLog = logger.createModuleLogger('create')
const cliLog = logger.createModuleLogger('cli')
const helpLog = logger.createModuleLogger('help')
const updateLog = logger.createModuleLogger('updates')

/**
 * Özel hata sınıfı - Hoisting sorunu için yukarı taşındı
 */
class StarkonError extends Error {
  constructor(message, code, details = null) {
    super(message)
    this.name = 'StarkonError'
    this.code = code
    this.details = details
  }
}

// Fetch API compatibility check ve polyfill
let fetchPolyfill
try {
  // Node.js 18+ fetch kontrolü
  if (typeof globalThis.fetch === 'undefined') {
    // Fetch mevcut değilse polyfill yükle
    fetchPolyfill = await import('https')
      .then(() => {
        // HTTPS modülü mevcut, basit HTTP client oluştur
        return async (url, options = {}) => {
          const https = await import('https')
          const urlParsed = new URL(url)

          return new Promise((resolve, reject) => {
            const req = https.request(
              {
                hostname: urlParsed.hostname,
                port: urlParsed.port || 443,
                path: urlParsed.pathname + urlParsed.search,
                method: options.method || 'GET',
                headers: {
                  'User-Agent': 'starkon/0.0.12',
                  ...options.headers,
                },
              },
              (res) => {
                let data = ''
                res.on('data', (chunk) => (data += chunk))
                res.on('end', () => {
                  resolve({
                    ok: res.statusCode >= 200 && res.statusCode < 300,
                    status: res.statusCode,
                    json: () => Promise.resolve(JSON.parse(data)),
                    text: () => Promise.resolve(data),
                  })
                })
              },
            )

            req.on('error', reject)
            req.setTimeout(10000, () => reject(new Error('Timeout')))

            if (options.body) {
              req.write(options.body)
            }
            req.end()
          })
        }
      })
      .catch(() => null)
  }
} catch {
  fetchPolyfill = null
}

// Fetch function - native veya polyfill
const safeFetch =
  globalThis.fetch ||
  fetchPolyfill ||
  (() => {
    throw new Error('Fetch API mevcut değil ve polyfill yüklenemedi')
  })

// Enhanced dynamic import with retry and error handling
async function safeImport(moduleName, fallback = null) {
  const maxRetries = 2
  let lastError

  for (let i = 0; i < maxRetries; i++) {
    try {
      const importedModule = await import(moduleName)
      return importedModule.default || importedModule
    } catch (error) {
      lastError = error

      // Network error'larda kısa retry
      if (error.code === 'ERR_NETWORK' && i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * (i + 1)))
        continue
      }
      break
    }
  }

  // Fallback kullan veya error fırlat
  if (fallback) {
    importLog.warn(`Module loading failed, using fallback`, { module: moduleName, attempts: maxRetries })
    return fallback
  } else {
    throw new Error(`Module yüklenemedi: ${moduleName} - ${lastError.message}`)
  }
}

// Chalk'ı güvenli dynamic import ile yükle
let chalk
try {
  chalk = await safeImport('chalk', {
    // Enhanced fallback with more colors and styles
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    magenta: (text) => `\x1b[35m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    white: (text) => `\x1b[37m${text}\x1b[0m`,
    bold: {
      blue: (text) => `\x1b[1m\x1b[34m${text}\x1b[0m`,
      green: (text) => `\x1b[1m\x1b[32m${text}\x1b[0m`,
      red: (text) => `\x1b[1m\x1b[31m${text}\x1b[0m`,
      yellow: (text) => `\x1b[1m\x1b[33m${text}\x1b[0m`,
    },
    dim: (text) => `\x1b[2m${text}\x1b[0m`,
    underline: (text) => `\x1b[4m${text}\x1b[0m`,
  })
} catch (error) {
  importLog.fatal('Critical error loading chalk module', { error: error.message, stack: error.stack })
  shutdownManager.safeExit(1)
}

/**
 * Configuration Management System
 */
async function loadUserConfig() {
  const cachedConfig = await stateManager.getConfig()
  if (cachedConfig) return cachedConfig

  try {
    const configDir = path.join(os.homedir(), '.starkon')
    const configPath = path.join(configDir, 'config.json')

    let config
    if (await fs.pathExists(configPath)) {
      const userConfig = await fs.readJson(configPath)
      config = { ...getDefaultConfig(), ...userConfig }
    } else {
      config = getDefaultConfig()
    }

    await stateManager.setConfig(config)
    return config
  } catch (error) {
    configLog.warn('Config loading error', {
      error: error.message,
      configPath: path.join(os.homedir(), '.starkon', 'config.json'),
    })
    const defaultConfig = getDefaultConfig()
    await stateManager.setConfig(defaultConfig)
    return defaultConfig
  }
}

function getDefaultConfig() {
  return {
    defaultTemplate: 'standard',
    preferredPackageManager: 'auto',
    skipGit: false,
    skipUpdateCheck: false,
    telemetryEnabled: true,
    locale: 'tr',
    themes: {
      colors: true,
      spinners: true,
    },
  }
}

async function saveUserConfig(updates) {
  try {
    const configDir = path.join(os.homedir(), '.starkon')
    const configPath = path.join(configDir, 'config.json')

    await fs.ensureDir(configDir)
    const currentConfig = await loadUserConfig()
    const newConfig = { ...currentConfig, ...updates }

    await fs.writeJson(configPath, newConfig, { spaces: 2 })
    await stateManager.setConfig(newConfig)
    return true
  } catch (error) {
    configLog.error('Config save error', {
      error: error.message,
      updates,
      configPath: path.join(os.homedir(), '.starkon', 'config.json'),
    })
    return false
  }
}

/**
 * Internationalization System
 */
async function loadLocale(locale = 'tr') {
  if (stateManager.hasLocale(locale)) {
    return await stateManager.getLocale(locale)
  }

  try {
    const localeMessages = await getLocaleMessages(locale)
    await stateManager.setLocale(locale, localeMessages)
    return localeMessages
  } catch (error) {
    localeLog.warn('Locale loading error', {
      locale,
      error: error.message,
      localesDir: path.join(__dirname, 'locales'),
    })

    // Fallback to Turkish
    if (locale !== 'tr') {
      try {
        const fallbackMessages = await getLocaleMessages('tr')
        await stateManager.setLocale(locale, fallbackMessages)
        return fallbackMessages
      } catch {
        // En son fallback - hardcoded mesajlar
        const hardcodedMessages = {
          PROJECT_CREATING: '🌊 Yeni proje oluşturuluyor...',
          OPERATION_CANCELLED: 'İşlem iptal edildi.',
          ERROR_OCCURRED: 'hata oluştu',
        }
        await stateManager.setLocale(locale, hardcodedMessages)
        return hardcodedMessages
      }
    }

    throw error
  }
}

async function getLocaleMessages(locale) {
  const messages = {
    tr: {
      PROJECT_CREATING: '🌊 Starkon boilerplate ile yeni Next.js projesi oluşturuluyor...',
      PROJECT_CREATED_SUCCESS: '🎉 Starkon boilerplate projesi başarıyla oluşturuldu!',
      PROJECT_NAME_PROMPT: 'Proje adını girin:',
      PROJECT_NAME_EMPTY: 'Proje adı boş olamaz',
      PROJECT_NAME_TOO_LONG: 'Proje adı 50 karakterden uzun olamaz',
      PROJECT_NAME_INVALID: 'Proje adı sadece harf, rakam, nokta, tire ve alt çizgi içerebilir',
      TEMPLATE_SELECTION: '📋 Mevcut Template Seçenekleri:',
      TEMPLATE_SELECTED: 'seçildi',
      FEATURES: 'Özellikler:',
      OPERATION_CANCELLED: 'İşlem iptal edildi.',
      DIRECTORY_EXISTS: 'dizini zaten var ve boş değil. Devam edilsin mi?',
      ANALYZING_TEMPLATES: 'Template dosyaları analiz ediliyor...',
      CREATING_STRUCTURE: 'Proje yapısı oluşturuluyor...',
      COPYING_FILES: 'Template dosyaları kopyalanıyor...',
      CUSTOMIZING_PACKAGE: 'Package.json özelleştiriliyor...',
      INITIALIZING_GIT: 'Git repository hazırlanıyor...',
      FINAL_CHECKS: 'Son kontroller yapılıyor...',
      GET_STARTED: 'Başlamak için aşağıdaki komutları çalıştırın:',
      ALTERNATIVE_PM: 'Alternatif olarak',
      MORE_INFO: 'Daha fazla bilgi için:',
      HAPPY_CODING: 'Keyifli kodlamalar!',
      ERROR_OCCURRED: 'hata oluştu',
      CLEANUP_SUCCESS: 'Yarım kalan dosyalar temizlendi.',
      UPDATE_AVAILABLE: '🆕 Yeni versiyon mevcut!',
      UPDATE_COMMAND: 'Güncellemek için: npm install -g starkon@latest',
    },
    en: {
      PROJECT_CREATING: '🌊 Creating new Next.js project with Starkon boilerplate...',
      PROJECT_CREATED_SUCCESS: '🎉 Starkon boilerplate project created successfully!',
      PROJECT_NAME_PROMPT: 'Enter project name:',
      PROJECT_NAME_EMPTY: 'Project name cannot be empty',
      PROJECT_NAME_TOO_LONG: 'Project name cannot be longer than 50 characters',
      PROJECT_NAME_INVALID: 'Project name can only contain letters, numbers, dots, hyphens and underscores',
      TEMPLATE_SELECTION: '📋 Available Template Options:',
      TEMPLATE_SELECTED: 'selected',
      FEATURES: 'Features:',
      OPERATION_CANCELLED: 'Operation cancelled.',
      DIRECTORY_EXISTS: 'directory already exists and is not empty. Continue?',
      ANALYZING_TEMPLATES: 'Analyzing template files...',
      CREATING_STRUCTURE: 'Creating project structure...',
      COPYING_FILES: 'Copying template files...',
      CUSTOMIZING_PACKAGE: 'Customizing package.json...',
      INITIALIZING_GIT: 'Initializing git repository...',
      FINAL_CHECKS: 'Running final checks...',
      GET_STARTED: 'To get started, run the following commands:',
      ALTERNATIVE_PM: 'Alternatively you can use',
      MORE_INFO: 'For more information:',
      HAPPY_CODING: 'Happy coding!',
      ERROR_OCCURRED: 'error occurred',
      CLEANUP_SUCCESS: 'Cleaned up incomplete files.',
      UPDATE_AVAILABLE: '🆕 New version available!',
      UPDATE_COMMAND: 'To update: npm install -g starkon@latest',
    },
  }

  return messages[locale] || messages.tr
}

/**
 * System Requirements Validation
 */
async function validateSystemRequirements() {
  const requirements = {
    node: '>=18.0.0',
    npm: '>=8.0.0',
  }

  // Node.js version check
  const nodeVersion = process.version
  if (!satisfiesVersion(nodeVersion, requirements.node)) {
    throw new StarkonError(`Node.js ${requirements.node} gerekiyor, mevcut: ${nodeVersion}`, 'UNSUPPORTED_NODE_VERSION')
  }

  // NPM version check (optional)
  try {
    const childProcess = await safeImport('child_process')
    const npmVersion = childProcess.execSync('npm --version', { encoding: 'utf8' }).trim()
    if (!satisfiesVersion(`v${npmVersion}`, requirements.npm.replace('>=', '>='))) {
      sysLog.warn('NPM version recommendation', { recommended: requirements.npm, current: `v${npmVersion}` })
    }
  } catch {
    // NPM version check optional - silent fail
  }

  return true
}

function satisfiesVersion(current, required) {
  // Input validation ve güvenlik kontrolleri
  if (!current || !required || typeof current !== 'string' || typeof required !== 'string') {
    return false
  }

  // String uzunluğu limiti (ReDoS koruması)
  if (current.length > 50 || required.length > 50) {
    return false
  }

  // Güvenli version parsing - sadece numeric kısımları alır
  const parseVersion = (v) => {
    const cleaned = v.replace(/^v/, '').trim()
    // Sadece valid semver karakterleri: rakamlar, noktalar, tire, artı
    if (!/^[\d.\-+a-zA-Z]+$/.test(cleaned)) {
      return []
    }

    const parts = cleaned.split('.').slice(0, 3) // En fazla major.minor.patch
    return parts.map((part) => {
      // Pre-release ve build metadata'yı temizle
      const numericPart = part.split(/[-+]/)[0]
      const num = parseInt(numericPart, 10)
      return isNaN(num) ? 0 : num
    })
  }

  // Operator parsing - güvenli regex ile
  let reqOp = '>='
  let reqVer = required

  const operatorMatch = required.match(/^(>=|<=|>|<|=)(.+)$/)
  if (operatorMatch) {
    reqOp = operatorMatch[1]
    reqVer = operatorMatch[2].trim()
  } else {
    // Fallback: eğer operator yoksa >= varsay
    reqVer = required.replace(/^>=\s*/, '')
  }

  const currentParts = parseVersion(current)
  const requiredParts = parseVersion(reqVer)

  // Version array'leri boşsa geçersiz
  if (currentParts.length === 0 || requiredParts.length === 0) {
    return false
  }

  // Normalize to same length (3 parts: major.minor.patch)
  while (currentParts.length < 3) currentParts.push(0)
  while (requiredParts.length < 3) requiredParts.push(0)

  // Version karşılaştırması
  for (let i = 0; i < 3; i++) {
    const curr = currentParts[i]
    const req = requiredParts[i]

    if (curr > req) {
      return reqOp === '>' || reqOp === '>=' || reqOp === '!='
    }
    if (curr < req) {
      return reqOp === '<' || reqOp === '<=' || reqOp === '!='
    }
  }

  // Versions are equal
  return reqOp === '=' || reqOp === '>=' || reqOp === '<='
}

/**
 * Template Caching System
 */
async function getCacheDir() {
  const cacheDir = path.join(os.tmpdir(), 'starkon-cache')
  await fs.ensureDir(cacheDir)
  return cacheDir
}

async function cacheTemplate(templateKey, templateData) {
  try {
    const cacheDir = await getCacheDir()
    const cachePath = path.join(cacheDir, `${templateKey}.json`)
    const cacheData = {
      timestamp: Date.now(),
      version: '0.0.12',
      data: templateData,
    }

    await fs.writeJson(cachePath, cacheData)
    return true
  } catch {
    return false
  }
}

async function getCachedTemplate(templateKey) {
  try {
    const cacheDir = await getCacheDir()
    const cachePath = path.join(cacheDir, `${templateKey}.json`)

    if (await fs.pathExists(cachePath)) {
      const cached = await fs.readJson(cachePath)
      // Cache valid for 24 hours
      if (Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
        return cached.data
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Plugin System Architecture
 */
class PluginManager {
  constructor() {
    this.plugins = []
    this.hooks = {
      beforeProjectCreate: [],
      afterProjectCreate: [],
      beforeTemplateSelect: [],
      afterTemplateSelect: [],
      beforeFilesCopy: [],
      afterFilesCopy: [],
    }
  }

  async loadPlugins() {
    try {
      const config = await loadUserConfig()
      const pluginPaths = config.plugins || []

      for (const pluginPath of pluginPaths) {
        await this.loadPlugin(pluginPath)
      }
    } catch {
      // Plugin loading hatası critical değil
    }
  }

  async loadPlugin(pluginPath) {
    try {
      const plugin = await safeImport(pluginPath)
      if (plugin && typeof plugin === 'object') {
        this.plugins.push(plugin)
        this.registerHooks(plugin)
      }
    } catch (error) {
      pluginLog.warn('Plugin loading failed', { pluginPath, error: error.message })
    }
  }

  registerHooks(plugin) {
    for (const [hookName, hookFn] of Object.entries(plugin)) {
      if (this.hooks[hookName] && typeof hookFn === 'function') {
        this.hooks[hookName].push(hookFn)
      }
    }
  }

  async executeHook(hookName, context) {
    const hooks = this.hooks[hookName] || []
    for (const hook of hooks) {
      try {
        await hook(context)
      } catch {
        // Individual hook hatası tüm process'i durdurmamalı
      }
    }
  }
}

const pluginManager = new PluginManager()

/**
 * Package manager'ı detect eden fonksiyon
 */
async function detectPackageManager() {
  // Global olarak yüklü package manager'ları kontrol et
  try {
    const childProcess = await safeImport('child_process')

    // pnpm kontrolü
    try {
      childProcess.execSync('pnpm --version', { stdio: 'ignore' })
      return 'pnpm'
    } catch {
      // pnpm not available
    }

    // yarn kontrolü
    try {
      childProcess.execSync('yarn --version', { stdio: 'ignore' })
      return 'yarn'
    } catch {
      // yarn not available
    }

    // npm her zaman mevcut (Node.js ile gelir)
    return 'npm'
  } catch {
    return 'npm'
  }
}

/**
 * Package manager'a göre komutları döndüren fonksiyon
 */
function getPackageManagerCommands(packageManager) {
  const commands = {
    npm: {
      install: 'npm install',
      dev: 'npm run dev',
      build: 'npm run build',
      start: 'npm start',
    },
    yarn: {
      install: 'yarn install',
      dev: 'yarn dev',
      build: 'yarn build',
      start: 'yarn start',
    },
    pnpm: {
      install: 'pnpm install',
      dev: 'pnpm dev',
      build: 'pnpm build',
      start: 'pnpm start',
    },
  }

  return commands[packageManager] || commands.npm
}

/**
 * Mevcut template'leri tanımlayan obje
 */
const TEMPLATES = {
  basic: {
    name: 'Temel Template',
    description: 'Minimal Next.js template - sadece temel özellikler',
    features: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'ESLint'],
    excludeFiles: [
      'src/components/ui',
      'src/components/forms',
      'src/lib/services/mockAuthService.ts',
      'src/lib/services/authApiService.ts',
      'src/providers/AuthProvider.tsx',
      'src/hooks/useAuth.ts',
      'src/app/(auth)',
      'src/app/login',
      'src/app/register',
      'src/app/forgot-password',
      'src/app/verify-email',
      'src/app/reset-password',
      'src/locales',
      'src/lib/i18n.ts',
      'src/providers/I18nProvider.tsx',
    ],
  },
  standard: {
    name: 'Standart Template',
    description: 'Tam özellikli template - authentication ve i18n dahil',
    features: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Authentication', 'i18n', 'Comprehensive UI Kit'],
    excludeFiles: [], // Hiçbir dosya exclude edilmez
  },
  dashboard: {
    name: 'Dashboard Template',
    description: 'Admin dashboard için optimize edilmiş template',
    features: ['Next.js 15', 'TypeScript', 'Dashboard Layout', 'Data Tables', 'Charts Ready'],
    excludeFiles: [
      'src/app/(public)',
      'src/app/about',
      'src/app/contact',
      'src/app/pricing',
      'src/app/support',
      'src/components/layout/PublicFooter.tsx',
      'src/components/layout/PublicNavbar.tsx',
    ],
  },
  minimal: {
    name: 'Minimal Template',
    description: 'En sade template - sadece Next.js ve TypeScript',
    features: ['Next.js 15', 'TypeScript', 'Minimal Setup'],
    excludeFiles: [
      'src/components/ui',
      'src/components/forms',
      'src/components/layout',
      'src/lib/services',
      'src/providers',
      'src/hooks',
      'src/app/(auth)',
      'src/app/(public)',
      'src/app/login',
      'src/app/register',
      'src/app/forgot-password',
      'src/app/verify-email',
      'src/app/reset-password',
      'src/app/about',
      'src/app/contact',
      'src/app/pricing',
      'src/app/support',
      'src/locales',
      'src/lib/i18n.ts',
      'src/store',
    ],
  },
  landing: {
    name: 'Landing Page Template',
    description: 'Tek sayfalık tanıtım sitesi - Hero, Features, Testimonials',
    features: ['Next.js 15', 'TypeScript', 'Landing Components', 'Animations', 'Contact Forms'],
    excludeFiles: [
      'src/app/(auth)',
      'src/app/(authentication)',
      'src/app/(public)/about',
      'src/app/(public)/contact',
      'src/app/(public)/support',
      'src/components/auth',
      'src/lib/services/mockAuthService.ts',
      'src/lib/services/authApiService.ts',
      'src/lib/services/sessionTokenManager.ts',
      'src/providers/AuthProvider.tsx',
      'src/hooks/useAuth.ts',
      'src/locales',
      'src/lib/i18n.ts',
      'src/providers/I18nProvider.tsx',
      'src/components/layout/AuthNavbar.tsx',
      'src/components/layout/AuthFooter.tsx',
      'src/store/toastStore.ts',
      'src/data/componentDemoData.tsx',
      'NPM_PUBLISH.md',
      'TEMPLATE_RESEARCH.md',
      'TEMPLATE_ROADMAP.md',
    ],
  },
  corporate: {
    name: 'Corporate Website Template',
    description: 'Kurumsal şirket sitesi - Hakkımızda, Hizmetler, Blog, Galeri',
    features: ['Next.js 15', 'TypeScript', 'Corporate Pages', 'Blog System', 'Content Management'],
    excludeFiles: [
      'src/app/(auth)',
      'src/app/(public)',
      'src/components/sections',
      'src/components/ui/register',
      'src/components/ui/language',
      'src/components/ui/settings',
      'src/hooks/useAuth.ts',
      'src/hooks/useLocale.ts',
      'src/lib/locale-utils.ts',
      'src/locales',
      'src/providers/AuthProvider.tsx',
      'src/services/authService.ts',
      'src/lib/validations/auth.ts',
      'src/lib/types/auth.ts',
      'src/utils/authDebug.ts',
      'src/middleware.ts',
    ],
  },
}

/**
 * Template seçim prompt'unu göster
 */
async function selectTemplate() {
  const config = await loadUserConfig()
  // Load locale for template selection
  await loadLocale(config.locale)

  templateLog.info('Showing template selection prompt', {
    locale: config.locale,
    availableTemplates: Object.keys(TEMPLATES),
  })

  const templateChoices = Object.entries(TEMPLATES).map(([key, template]) => ({
    title: `${template.name}`,
    description: template.description,
    value: key,
  }))

  const response = await prompts({
    type: 'select',
    name: 'template',
    message: "Hangi template'i kullanmak istersiniz?",
    choices: templateChoices,
    initial: Object.keys(TEMPLATES).indexOf(config.defaultTemplate) || 1,
  })

  if (!response.template) {
    templateLog.info('Template selection cancelled by user')
    shutdownManager.safeExit(0)
    return
  }

  const selectedTemplate = TEMPLATES[response.template]
  templateLog.info('Template selected successfully', {
    template: selectedTemplate.name,
    key: response.template,
    features: selectedTemplate.features,
  })

  return response.template
}

/**
 * Gelişmiş Türkçe karakterleri normalize eden fonksiyon
 * Unicode normalization + complete Turkish character mapping
 */
function normalizeProjectName(name) {
  if (!name || typeof name !== 'string') {
    return name
  }

  try {
    // 1. Unicode canonical decomposition (NFD) - diacritik ayırma
    let normalized = name.normalize('NFD')

    // 2. Kapsamlı Turkish character mapping - tüm varyantlar dahil
    const turkishMap = {
      // Turkish karakterler - both normal and Unicode forms
      ç: 'c',
      Ç: 'C',
      ğ: 'g',
      Ğ: 'G',
      ı: 'i',
      İ: 'I', // İ ve ı ayrı karakterler!
      ö: 'o',
      Ö: 'O',
      ş: 's',
      Ş: 'S',
      ü: 'u',
      Ü: 'U',

      // Diğer yaygın diacritic karakterler
      á: 'a',
      Á: 'A',
      à: 'a',
      À: 'A',
      â: 'a',
      Â: 'A',
      é: 'e',
      É: 'E',
      è: 'e',
      È: 'E',
      ê: 'e',
      Ê: 'E',
      í: 'i',
      Í: 'I',
      ì: 'i',
      Ì: 'I',
      î: 'i',
      Î: 'I',
      ó: 'o',
      Ó: 'O',
      ò: 'o',
      Ò: 'O',
      ô: 'o',
      Ô: 'O',
      ú: 'u',
      Ú: 'U',
      ù: 'u',
      Ù: 'U',
      û: 'u',
      Û: 'U',
      ñ: 'n',
      Ñ: 'N',
    }

    // 3. Character mapping uygula
    normalized = normalized.replace(/./g, (char) => turkishMap[char] || char)

    // 4. Kalan diacritik işaretleri temizle (Unicode category Mn - Nonspacing_Mark)
    normalized = normalized.replace(/\p{Diacritic}/gu, '')

    // 5. Son normalizasyon (NFC - Canonical Composition)
    normalized = normalized.normalize('NFC')

    return normalized
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  String normalization error: ${error.message}`))

    // Fallback - basit character replacement
    const basicTurkishMap = {
      ç: 'c',
      Ç: 'C',
      ğ: 'g',
      Ğ: 'G',
      ı: 'i',
      İ: 'I',
      ö: 'o',
      Ö: 'O',
      ş: 's',
      Ş: 'S',
      ü: 'u',
      Ü: 'U',
    }

    return name.replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => basicTurkishMap[char] || char)
  }
}

/**
 * Gelişmiş proje adı validasyon fonksiyonu
 */
function validateProjectName(name) {
  // Temel kontroller
  const checks = [
    {
      test: name && name.trim() !== '',
      message: 'Proje adı boş olamaz',
      code: 'EMPTY_NAME',
    },
    {
      test: name.length <= 50,
      message: 'Proje adı 50 karakterden uzun olamaz',
      code: 'NAME_TOO_LONG',
    },
    {
      test: name.length >= 1,
      message: 'Proje adı en az 1 karakter olmalı',
      code: 'NAME_TOO_SHORT',
    },
    {
      test: !/^\d/.test(name),
      message: 'Proje adı sayı ile başlayamaz',
      code: 'STARTS_WITH_NUMBER',
    },
    {
      test: !name.includes(' '),
      message: 'Proje adı boşluk içeremez',
      code: 'CONTAINS_SPACE',
    },
    {
      test: !/^[.-]/.test(name),
      message: 'Proje adı nokta veya tire ile başlayamaz',
      code: 'STARTS_WITH_SPECIAL',
    },
    {
      test: !/[.-]$/.test(name),
      message: 'Proje adı nokta veya tire ile bitemez',
      code: 'ENDS_WITH_SPECIAL',
    },
  ]

  // Kontrolleri çalıştır
  for (const check of checks) {
    if (!check.test) {
      return {
        isValid: false,
        message: check.message,
        code: check.code,
      }
    }
  }

  // Karakter validasyonu (Türkçe karakterler normalize edildikten sonra)
  const normalizedName = normalizeProjectName(name)
  const validationRegex = /^[a-zA-Z0-9._-]+$/
  if (!validationRegex.test(normalizedName)) {
    return {
      isValid: false,
      message: 'Proje adı sadece harf, rakam, nokta, tire ve alt çizgi içerebilir',
      code: 'INVALID_CHARACTERS',
    }
  }

  // Reserved names kontrolü
  const reservedNames = [
    'test',
    'react',
    'node_modules',
    '.git',
    'src',
    'public',
    'build',
    'dist',
    'coverage',
    'next',
    'vercel',
    'netlify',
    'app',
    'api',
    'www',
    'admin',
    'root',
    'system',
    'config',
    'lib',
    'bin',
    'tmp',
  ]

  if (reservedNames.includes(normalizedName.toLowerCase())) {
    return {
      isValid: false,
      message: `"${name}" adı rezerve edilmiştir, farklı bir ad seçin`,
      code: 'RESERVED_NAME',
    }
  }

  // Npm package name kontrolü
  const npmInvalidPatterns = [
    /^_/, // underscore ile başlayamaz
    /\s/, // boşluk içeremez
    /[A-Z]/, // büyük harf içeremez (npm packages)
    /[@/]/, // @ veya / içeremez
  ]

  for (const pattern of npmInvalidPatterns) {
    if (pattern.test(normalizedName)) {
      return {
        isValid: false,
        message: 'Proje adı npm package naming kurallarına uygun değil',
        code: 'INVALID_NPM_NAME',
      }
    }
  }

  return { isValid: true, normalizedName }
}

/**
 * Package.json dosyasını proje için özelleştiren fonksiyon
 */
async function customizePackageJson(targetDir, projectName) {
  const packageJsonPath = path.join(targetDir, 'package.json')

  try {
    const packageJson = await fs.readJson(packageJsonPath)

    // Proje bilgilerini güncelle
    packageJson.name = projectName
    packageJson.version = '0.1.0'
    packageJson.description = `${projectName} - Starkon ile oluşturulmuş Next.js projesi`
    packageJson.private = true

    // CLI specific alanları kaldır
    delete packageJson.bin
    delete packageJson.files
    delete packageJson.main
    delete packageJson.module
    delete packageJson.types
    delete packageJson.sideEffects

    // Build ve dev script'lerini güncelle
    packageJson.scripts = {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'type-check': 'tsc --noEmit',
      prettier: 'prettier --write "src/**/*.{js,ts,jsx,tsx}"',
      'prettier:check': 'prettier --check "src/**/*.{js,ts,jsx,tsx}"',
      test: 'jest',
      'test:watch': 'jest --watch',
      'test:coverage': 'jest --coverage',
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })

    return true
  } catch (error) {
    fileLog.error('Package.json update failed', { error: error.message, packageJsonPath })
    return false
  }
}

/**
 * Multi-step progress tracking
 */
function createProgressTracker(steps) {
  let currentStep = 0
  const totalSteps = steps.length

  return {
    start(spinner) {
      currentStep = 0
      spinner.text = `[1/${totalSteps}] ${steps[currentStep]}`
    },
    next(spinner) {
      currentStep++
      if (currentStep < totalSteps) {
        spinner.text = `[${currentStep + 1}/${totalSteps}] ${steps[currentStep]}`
      }
    },
    getCurrentStep() {
      return currentStep
    },
    getTotalSteps() {
      return totalSteps
    },
  }
}

/**
 * Template dosyalarını kopyalayan fonksiyon
 */
async function copyTemplateFiles(targetDir, templateKey = 'standard') {
  const templateDir = path.join(__dirname)
  const selectedTemplate = TEMPLATES[templateKey]

  try {
    // Base exclude files - CLI ve development dosyaları
    const baseExcludeFiles = [
      'index.js', // CLI dosyası
      'node_modules',
      '.git',
      '.next',
      'dist',
      'coverage',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '.DS_Store',
      'Thumbs.db',
      // Development/Internal dosyalar - kullanıcının görmemesi gerekenler
      'CLAUDE.md', // Claude instructions
      'CLI_USAGE_GUIDE.md', // CLI documentation
      '.claude', // Claude settings directory
      'LICENSE', // Package license
      'tsup.config.ts', // Build configuration
      'tsconfig.cjs.json', // CJS TypeScript config
      '.npmignore', // NPM ignore rules
    ]

    // Template'e özel exclude files
    const templateExcludeFiles = selectedTemplate ? selectedTemplate.excludeFiles : []
    const allExcludeFiles = [...baseExcludeFiles, ...templateExcludeFiles]

    // Template dosyalarını kopyala
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        const relativePath = path.relative(templateDir, src)
        const fileName = path.basename(src)

        // Exclude listesindeki dosyaları atla
        const shouldExclude = allExcludeFiles.some((exclude) => {
          return (
            relativePath.startsWith(exclude) ||
            fileName === exclude ||
            relativePath === exclude ||
            relativePath.includes(exclude)
          )
        })

        return !shouldExclude
      },
    })

    // .gitignore dosyasını özel olarak oluştur (çünkü npm publish sırasında .gitignore dosyası ignore edilebilir)
    const gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# Dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# Testing
/coverage
*.lcov

# Next.js
/.next/
/out/

# Production
/build
/dist

# Misc
.DS_Store
*.pem
.vscode/
.idea/

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Local env files
.env
.env*.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Turbo
.turbo

# Package lock files
package-lock.json
yarn.lock
pnpm-lock.yaml

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`

    await fs.writeFile(path.join(targetDir, '.gitignore'), gitignoreContent)

    return true
  } catch (error) {
    console.error(chalk.red('Template dosyaları kopyalanırken hata oluştu:'), error.message)
    return false
  }
}

/**
 * Git repository'sini initialize eden fonksiyon
 */
async function initializeGit(targetDir) {
  try {
    const childProcess = await safeImport('child_process')

    // Git repo'yu initialize et
    childProcess.execSync('git init', {
      cwd: targetDir,
      stdio: 'ignore',
      timeout: 10000, // 10 saniye timeout
    })

    // Initial commit
    childProcess.execSync('git add .', {
      cwd: targetDir,
      stdio: 'ignore',
      timeout: 10000,
    })

    childProcess.execSync('git commit -m "feat: initial commit with Starkon"', {
      cwd: targetDir,
      stdio: 'ignore',
      timeout: 10000,
    })

    return true
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Git initialization failed: ${error.message}`))
    return false
  }
}

/**
 * Version update kontrolü
 */
async function checkForUpdates(locale) {
  try {
    const currentVersion = '0.0.12'
    const response = await safeFetch('https://registry.npmjs.org/starkon/latest')
    const data = await response.json()

    if (data.version && data.version !== currentVersion) {
      console.log('')
      console.log(chalk.yellow(locale.UPDATE_AVAILABLE))
      updateLog.info('Update available', {
        currentVersion,
        latestVersion: data.version,
        updateCommand: 'npm update -g starkon',
      })
    }
  } catch {
    // Network hatası durumunda sessizce devam et
  }
}

/**
 * Anonim telemetry gönderme (optional)
 */
async function sendTelemetry(_data) {
  // Telemetry tamamen optional ve disable edilebilir
  if (process.env.STARKON_TELEMETRY === 'false' || process.env.NO_TELEMETRY === '1') {
    return
  }

  try {
    // Sadece anonim kullanım istatistikleri
    // const payload = {
    //   version: data.version,
    //   template: data.template,
    //   packageManager: data.packageManager,
    //   timestamp: new Date().toISOString(),
    //   // Hiçbir kişisel bilgi gönderilmez
    //   sessionId: Math.random().toString(36).substring(7),
    // }
    // Fake endpoint - gerçek implementasyonda gerçek endpoint kullanılır
    // await fetch('https://api.starkon.com/telemetry', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // })
  } catch {
    // Telemetry hatası asla kullanıcıyı etkilemez
  }
}

/**
 * Ana proje oluşturma fonksiyonu
 */
async function createProject(projectDir, options = {}) {
  // System requirements kontrolü
  await validateSystemRequirements()

  // Plugin'leri yükle
  await pluginManager.loadPlugins()

  // Hook: beforeProjectCreate
  await pluginManager.executeHook('beforeProjectCreate', { projectDir, options })

  // Config yükle
  const config = await loadUserConfig()
  const locale = await loadLocale(config.locale)

  // Version kontrolü
  if (!options.skipUpdateCheck && !config.skipUpdateCheck) {
    await checkForUpdates(locale)
  }

  createLog.info('Starting project creation', {
    projectDir: projectDir || 'unspecified',
    options,
    locale: config.locale,
  })

  let projectName = projectDir
  let selectedTemplate = config.defaultTemplate || 'standard'

  // Proje adı verilmemişse kullanıcıdan al
  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: locale.PROJECT_NAME_PROMPT,
      initial: 'my-starkon-app',
      validate: (name) => {
        const result = validateProjectName(name)
        return result.isValid ? true : result.message
      },
    })

    if (!response.projectName) {
      createLog.info('Project creation cancelled by user')
      shutdownManager.safeExit(0)
      return
    }

    projectName = response.projectName
  }

  // Hook: beforeTemplateSelect
  await pluginManager.executeHook('beforeTemplateSelect', { projectName, options })

  // Template seçimi (eğer options'da template belirtilmemişse)
  if (!options.template) {
    // Önce cache'den kontrol et
    const cachedTemplate = await getCachedTemplate(selectedTemplate)
    if (cachedTemplate) {
      createLog.info('Template loaded from cache', { template: selectedTemplate })
    }

    selectedTemplate = await selectTemplate()
  } else {
    selectedTemplate = options.template
    if (!TEMPLATES[selectedTemplate]) {
      createLog.error('Invalid template specified', {
        template: selectedTemplate,
        availableTemplates: Object.keys(TEMPLATES),
      })
      shutdownManager.safeExit(1)
      return
    }
  }

  // Hook: afterTemplateSelect
  await pluginManager.executeHook('afterTemplateSelect', { projectName, selectedTemplate, options })

  // Template'i cache'e kaydet
  await cacheTemplate(selectedTemplate, TEMPLATES[selectedTemplate])

  // Proje adını validate et
  const validation = validateProjectName(projectName)
  if (!validation.isValid) {
    createLog.error('Project name validation failed', {
      projectName,
      error: validation.message,
      code: validation.code,
    })
    if (validation.code === 'INVALID_CHARACTERS' && validation.normalizedName) {
      createLog.info('Project name normalization suggestion', {
        original: projectName,
        suggested: normalizeProjectName(projectName),
      })
    }
    shutdownManager.safeExit(1)
    return
  }

  // Türkçe karakterler varsa normalize et
  if (validation.normalizedName !== projectName) {
    createLog.info('Turkish characters normalized', {
      original: projectName,
      normalized: validation.normalizedName,
    })
    projectName = validation.normalizedName
  }

  const targetDir = path.resolve(process.cwd(), projectName)

  // Dizin mevcut mu kontrol et
  if (await fs.pathExists(targetDir)) {
    const files = await fs.readdir(targetDir)
    if (files.length > 0) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `"${projectName}" ${locale.DIRECTORY_EXISTS}`,
        initial: false,
      })

      if (!response.overwrite) {
        createLog.info('Directory overwrite cancelled by user', { targetDir })
        shutdownManager.safeExit(0)
        return
      }
    }
  }

  createLog.info('Creating project directory', { projectName, targetDir })

  // Progress tracker ve spinner başlat
  const steps = [
    locale.ANALYZING_TEMPLATES,
    locale.CREATING_STRUCTURE,
    locale.COPYING_FILES,
    locale.CUSTOMIZING_PACKAGE,
    ...(options.skipGit || config.skipGit ? [] : [locale.INITIALIZING_GIT]),
    locale.FINAL_CHECKS,
  ]

  const progress = createProgressTracker(steps)
  const spinner = ora().start()
  progress.start(spinner)

  try {
    // 1. Template analizi
    await new Promise((resolve) => setTimeout(resolve, 200))
    progress.next(spinner)

    // 2. Hedef dizini oluştur
    await fs.ensureDir(targetDir)
    progress.next(spinner)

    // Hook: beforeFilesCopy
    await pluginManager.executeHook('beforeFilesCopy', { targetDir, selectedTemplate })

    // 3. Template dosyalarını kopyala
    const copySuccess = await copyTemplateFiles(targetDir, selectedTemplate)
    if (!copySuccess) {
      throw new StarkonError('Template dosyaları kopyalanamadı', 'COPY_FAILED')
    }
    progress.next(spinner)

    // Hook: afterFilesCopy
    await pluginManager.executeHook('afterFilesCopy', { targetDir, selectedTemplate })

    // 4. Package.json'ı özelleştir
    const packageSuccess = await customizePackageJson(targetDir, projectName)
    if (!packageSuccess) {
      throw new StarkonError('Package.json güncellenemedi', 'PACKAGE_JSON_FAILED')
    }
    progress.next(spinner)

    // 5. Git repo'yu initialize et
    if (!options.skipGit && !config.skipGit) {
      await initializeGit(targetDir)
      progress.next(spinner)
    }

    // 6. Son kontroller
    await new Promise((resolve) => setTimeout(resolve, 100))
    if (!options.skipGit && !config.skipGit) progress.next(spinner)

    spinner.succeed(chalk.green('✅ Proje başarıyla oluşturuldu!'))

    // Package manager'ı detect et
    const packageManager =
      config.preferredPackageManager === 'auto' ? await detectPackageManager() : config.preferredPackageManager
    const commands = getPackageManagerCommands(packageManager)

    // Başarı mesajları
    createLog.info('Project created successfully', {
      projectName,
      targetDir,
      template: selectedTemplate,
      packageManager,
      commands: {
        install: commands.install,
        dev: commands.dev,
      },
    })

    // Alternatif package manager önerileri
    if (config.preferredPackageManager === 'auto') {
      const alternatives = ['npm', 'yarn', 'pnpm'].filter((pm) => pm !== packageManager)
      if (alternatives.length > 0) {
        const altCommands = getPackageManagerCommands(alternatives[0])
        createLog.info('Alternative package manager available', {
          alternative: alternatives[0],
          commands: {
            install: altCommands.install,
            dev: altCommands.dev,
          },
        })
      }
    }

    createLog.info('Project setup completed', {
      repository: 'https://github.com/zzafergok/sea-ui-kit',
      telemetryEnabled: config.telemetryEnabled,
    })

    // Hook: afterProjectCreate
    await pluginManager.executeHook('afterProjectCreate', {
      targetDir,
      projectName,
      selectedTemplate,
      packageManager,
    })

    // Telemetry gönder (optional)
    if (config.telemetryEnabled) {
      await sendTelemetry({
        version: '0.0.12',
        template: selectedTemplate,
        packageManager: packageManager,
      })
    }
  } catch (error) {
    const locale = await loadLocale((await loadUserConfig()).locale)
    spinner.fail(chalk.red(`Proje oluşturulurken ${locale.ERROR_OCCURRED}`))

    // StarkonError için özel handling
    if (error instanceof StarkonError) {
      createLog.error('StarkonError occurred', {
        code: error.code,
        message: error.message,
        details: error.details,
      })
      // Details logged with error above
    } else {
      createLog.error('Unexpected error during project creation', {
        error: error.message,
        stack: error.stack,
      })
    }

    // Cleanup
    try {
      await fs.remove(targetDir)
      createLog.info('Cleanup completed successfully', { targetDir })
    } catch (cleanupError) {
      createLog.error('Cleanup failed', {
        targetDir,
        error: cleanupError.message,
      })
    }

    shutdownManager.safeExit(1)
  }
}

/**
 * Program konfigürasyonu
 */
program
  .name('starkon')
  .description('🌊 Create production-ready Next.js applications with Starkon boilerplate')
  .version('0.0.12')
  .argument('[project-directory]', 'Projenin oluşturulacağı dizin adı')
  .option('--skip-git', 'Git repository initialize etme')
  .option('--skip-update-check', 'Version update kontrolünü atla')
  .option('--verbose', 'Detaylı çıktı göster')
  .option('-t, --template <template>', 'Kullanılacak template (basic, standard, dashboard, minimal)', 'standard')
  .option('--config-set <key=value>', 'Konfigürasyon ayarla (örnek: --config-set locale=en)')
  .option('--config-get <key>', 'Konfigürasyon değerini göster')
  .option('--clear-cache', "Template cache'ini temizle")
  .action(async (projectDir, options) => {
    try {
      // Config komutları
      if (options.configSet) {
        const [key, value] = options.configSet.split('=')
        if (key && value !== undefined) {
          const updates = { [key]: value === 'true' ? true : value === 'false' ? false : value }
          const success = await saveUserConfig(updates)
          if (success) {
            cliLog.info('Configuration updated', { key, value })
          } else {
            cliLog.error('Configuration save failed', { key, value })
          }
        }
        return
      }

      if (options.configGet) {
        const config = await loadUserConfig()
        const value = config[options.configGet]
        if (value !== undefined) {
          cliLog.info('Configuration value retrieved', { key: options.configGet, value })
        } else {
          cliLog.warn('Configuration key not found', { key: options.configGet })
        }
        return
      }

      if (options.clearCache) {
        const cacheDir = await getCacheDir()
        await fs.remove(cacheDir)
        cliLog.info('Cache cleared successfully', { cacheDir })
        return
      }

      await createProject(projectDir, options)
    } catch (error) {
      if (error instanceof StarkonError) {
        cliLog.error('StarkonError in main action', {
          code: error.code,
          message: error.message,
          details: error.details,
        })
      } else {
        cliLog.error('Unexpected error in main action', {
          message: error.message,
          stack: error.stack,
        })
      }

      if (options.verbose) {
        cliLog.debug('Verbose stack trace', { stack: error.stack })
      }

      shutdownManager.safeExit(1)
    }
  })

// Help komutunu özelleştir
program.on('--help', () => {
  helpLog.info('Displaying help information', {
    availableTemplates: Object.keys(TEMPLATES),
    environmentVariables: ['STARKON_TELEMETRY', 'NO_TELEMETRY'],
  })

  // Keep original console output for help since users expect to see it
  console.log('')
  console.log(chalk.bold('Örnekler:'))
  console.log('  $ npx starkon my-app')
  console.log('  $ npx starkon my-project --skip-git')
  console.log('  $ npx starkon my-dashboard --template dashboard')
  console.log('  $ npx starkon my-minimal --template minimal --skip-update-check')
  console.log('')
  console.log(chalk.bold("Mevcut Template'ler:"))
  Object.entries(TEMPLATES).forEach(([key, template]) => {
    console.log(`  ${chalk.cyan(key.padEnd(10))} - ${template.description}`)
  })
  console.log('')
  console.log(chalk.bold('Environment Variables:'))
  console.log("  STARKON_TELEMETRY=false    - Telemetry'yi devre dışı bırak")
  console.log("  NO_TELEMETRY=1             - Telemetry'yi devre dışı bırak (alternatif)")
  console.log('')
  console.log(chalk.blue('🌊 Create production-ready Next.js applications with Starkon boilerplate!'))
})

// Program'ı çalıştır
program.parse(process.argv)
