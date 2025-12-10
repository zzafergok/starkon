// Core UI Components
export { Input } from './components/core/input'
export { Label } from './components/core/label'
export { Switch } from './components/core/switch'
export { Textarea } from './components/core/textarea'
export { Checkbox } from './components/core/checkbox'
export { Button, buttonVariants } from './components/core/button'

// Select Components
export {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectSeparator,
} from './components/core/select'

// Dialog Components
export {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from './components/core/dialog'

// Tabs Components
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/core/tabs'

// Card Components
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/core/card'

// Alert Dialog Components
export {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from './components/core/alert-dialog'

// Avatar Components
export { Avatar, AvatarFallback, AvatarImage } from './components/core/avatar'

// Dropdown Menu Components
export {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
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

// Accordion Components
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/core/accordion'

// Separator Component
export { Separator } from './components/core/separator'

// Slider Component
export { Slider } from './components/core/slider'

// UI Components

export { ToastContainer } from './components/ui/ToastContainer/ToastContainer'

export { ComponentDemo } from './components/ui/ComponentDemo/ComponentDemo'

export { EnhancedErrorBoundary } from './components/ui/ErrorBoundary/EnhancedErrorBoundary'

export { DataTable } from './components/core/data-table'

export { FileUpload } from './components/ui/FileUpload/FileUpload'

export { PageHeader } from './components/ui/PageHeader/PageHeader'

// Custom Hooks
export { useAuth } from './hooks/useAuth'

export { useTheme } from './hooks/useTheme'

export { useLocale } from './hooks/useLocale'

// Utilities
export { cn, debounce, isDarkMode, get, storage, formatDate, sanitizeHtml } from './lib/utils'

export type {
  User,
  ValueOf,
  ApiError,
  Optional,
  ThemeMode,
  InputProps,
  ThemeState,
  DeepPartial,
  SelectProps,
  ButtonProps,
  ApiResponse,
  AuthResponse,
  LoadingState,
  SelectOption,
  NonEmptyArray,
  FormFieldProps,
  RequiredFields,
  LoginCredentials,
  RegisterCredentials,
  BaseComponentProps,
} from './types'

// API Services
export { apiService, apiInstance, createApiInstance } from './services/apiService'

export {
  tokenManagerService,
  setTokens,
  removeTokens,
  getTokenInfo,
  getAccessToken,
  isTokenExpired,
  getRefreshToken,
  isSessionExpired,
  updateLastActivity,
  refreshAccessToken,
} from './services/authService'

// API Constants
export { API_ENDPOINTS, HTTP_STATUS, ERROR_CODES, REQUEST_TIMEOUT, CACHE_DURATIONS } from './services/constants'

// API Types
export type {
  RequestConfig,
  RefreshTokenResponse,
  ApiError as ServiceApiError,
  ApiResponse as ServiceApiResponse,
} from './services/utils'

export { AuthProvider } from './providers/AuthProvider'

// Locale Utils
export {
  getUserLocale,
  setUserLocale,
  DEFAULT_LOCALE,
  isSupportedLocale,
  SUPPORTED_LOCALES,
  parseAcceptLanguage,
  detectPreferredLocale,
  type SupportedLocale,
} from './lib/locale-utils'

// i18n Setup
export { default as i18n } from './locales'

// Security Utils
export { secureStorage } from './utils/security'

export { useComponentDemoData } from './data/componentDemoData'

// Configuration
export { default as apiConfig } from './config/api'
