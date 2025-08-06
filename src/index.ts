// Core UI Components
export { Button, buttonVariants } from './components/core/button'
export { Input } from './components/core/input'
export { Textarea } from './components/core/textarea'
export { Checkbox } from './components/core/checkbox'
export { Switch } from './components/core/switch'
export { Label } from './components/core/label'

// Select Components
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './components/core/select'

// Dialog Components
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/core/dialog'

// Tabs Components
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/core/tabs'

// Card Components
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/core/card'

// Alert Dialog Components
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './components/core/alert-dialog'

// Avatar Components
export { Avatar, AvatarFallback, AvatarImage } from './components/core/avatar'

// Dropdown Menu Components
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './components/core/dropdown'

// Loading Components
export { LoadingSpinner, LoadingDots, LoadingPulse } from './components/core/loading-spinner'

export type { BadgeProps } from './components/core/badge'
export { Badge } from './components/core/badge'

// Skeleton Components
export { Skeleton, SkeletonAvatar, SkeletonText } from './components/core/skeleton'

// Tooltip Components
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/core/tooltip'

// Popover Components
export { Popover, PopoverContent, PopoverTrigger } from './components/core/popover'

// Command Components
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './components/core/command-menu'

// Accordion Components
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/core/accordion'

// Separator Component
export { Separator } from './components/core/separator'

// Slider Component
export { Slider } from './components/core/slider'

// Form Components
export { Form } from './components/form/Form'

// UI Components

export { ToastContainer } from './components/ui/ToastContainer/ToastContainer'

export { ComponentDemo } from './components/ui/ComponentDemo/ComponentDemo'

export { EnhancedErrorBoundary } from './components/ui/ErrorBoundary/EnhancedErrorBoundary'

export { DataTable } from './components/core/data-table'

export { FileUpload } from './components/ui/FileUpload/FileUpload'

export { PageHeader } from './components/ui/PageHeader/PageHeader'

// Custom Hooks
export { useAuth } from './hooks/useAuth'

export { useForm } from './hooks/useForm'

export { useTheme } from './hooks/useTheme'

export { useLocale } from './hooks/useLocale'

// Utilities
export { cn, debounce, isDarkMode, get, storage, formatDate, sanitizeHtml } from './lib/utils'

// Validation Schemas
export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  checkPasswordStrength,
  validateLoginData,
  PasswordStrength,
} from './lib/validations/auth'

// Types
export type {
  LoginFormValues,
  RegisterFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from './lib/validations/auth'

export type {
  BaseComponentProps,
  FormFieldProps,
  ButtonProps,
  InputProps,
  SelectProps,
  SelectOption,
  ThemeMode,
  ThemeState,
  ApiResponse,
  ApiError,
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  LoadingState,
  Optional,
  RequiredFields,
  DeepPartial,
  NonEmptyArray,
  ValueOf,
} from './types'

// API Services
export { apiService, apiInstance, createApiInstance } from './services/apiService'

export {
  tokenManagerService,
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
  isTokenExpired,
  updateLastActivity,
  isSessionExpired,
  refreshAccessToken,
  getTokenInfo,
} from './services/authService'

// API Constants
export { API_ENDPOINTS, HTTP_STATUS, ERROR_CODES, REQUEST_TIMEOUT, CACHE_DURATIONS } from './services/constants'

// API Types
export type {
  ApiResponse as ServiceApiResponse,
  ApiError as ServiceApiError,
  RefreshTokenResponse,
  RequestConfig,
} from './services/utils'

export { AuthProvider } from './providers/AuthProvider'

// Locale Utils
export {
  getUserLocale,
  setUserLocale,
  isSupportedLocale,
  detectPreferredLocale,
  parseAcceptLanguage,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  type SupportedLocale,
} from './lib/locale-utils'

// i18n Setup
export { default as i18n } from './locales'

// Security Utils
export { secureStorage } from './utils/security'

export { componentDemoData } from './data/componentDemoData'

// Configuration
export { default as apiConfig } from './config/api'
