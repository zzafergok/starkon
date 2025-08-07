'use client'

import React, { useState, useMemo } from 'react'

import {
  X,
  Zap,
  User,
  Edit,
  Mail,
  Crown,
  Clock,
  Users,
  UserX,
  Search,
  Filter,
  Trash2,
  Shield,
  Upload,
  Package,
  UserPlus,
  Calendar,
  Download,
  UserCheck,
  TrendingUp,
  MoreVertical,
} from 'lucide-react'

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/core/dialog'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/core/dropdown'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/core/alert-dialog'
import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { Avatar, AvatarFallback } from '@/components/core/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core/select'

import { cn } from '@/lib/utils'

// Mock kullanıcı verisi
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    username: 'ahmet.yilmaz',
    email: 'ahmet@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-06-01T00:00:00Z',
    avatar: null,
  },
  {
    id: '2',
    name: 'Zeynep Kaya',
    username: 'zeynep.kaya',
    email: 'zeynep@example.com',
    role: 'editor',
    status: 'active',
    lastLogin: '2024-01-14T15:20:00Z',
    createdAt: '2023-08-15T00:00:00Z',
    avatar: null,
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    username: 'mehmet.demir',
    email: 'mehmet@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-01-10T09:15:00Z',
    createdAt: '2023-10-20T00:00:00Z',
    avatar: null,
  },
  {
    id: '4',
    name: 'Ayşe Öztürk',
    username: 'ayse.ozturk',
    email: 'ayse@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-15T14:45:00Z',
    createdAt: '2023-12-05T00:00:00Z',
    avatar: null,
  },
  {
    id: '5',
    name: 'Can Arslan',
    username: 'can.arslan',
    email: 'can@example.com',
    role: 'editor',
    status: 'pending',
    lastLogin: null,
    createdAt: '2024-01-01T00:00:00Z',
    avatar: null,
  },
  {
    id: '6',
    name: 'Elif Şahin',
    username: 'elif.sahin',
    email: 'elif@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14T11:20:00Z',
    createdAt: '2023-09-10T00:00:00Z',
    avatar: null,
  },
]

type ViewMode = 'grid' | 'table'
type UserRole = 'admin' | 'editor' | 'user'
type UserStatus = 'active' | 'inactive' | 'pending'

interface User {
  id: string
  name: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
  lastLogin: string | null
  createdAt: string
  avatar: string | null
}

export default function UsersPage() {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  // Filtreleme mantığı
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = selectedRole === 'all' || user.role === selectedRole
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchQuery, selectedRole, selectedStatus])

  // Role ve status için seçenekler
  const roleOptions = [
    { value: 'all', label: 'Tüm Roller', count: users.length },
    { value: 'admin', label: 'Admin', count: users.filter((u) => u.role === 'admin').length },
    { value: 'editor', label: 'Editör', count: users.filter((u) => u.role === 'editor').length },
    { value: 'user', label: 'Kullanıcı', count: users.filter((u) => u.role === 'user').length },
  ]

  const statusOptions = [
    { value: 'all', label: 'Tüm Durumlar', count: users.length },
    { value: 'active', label: 'Aktif', count: users.filter((u) => u.status === 'active').length },
    { value: 'inactive', label: 'Pasif', count: users.filter((u) => u.status === 'inactive').length },
    { value: 'pending', label: 'Beklemede', count: users.filter((u) => u.status === 'pending').length },
  ]

  // İstatistikler için data
  const stats = [
    {
      title: 'Toplam Kullanıcı',
      value: users.length,
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-purple-600',
      change: '+12%',
      description: 'Bu aydan',
    },
    {
      title: 'Aktif Kullanıcı',
      value: users.filter((u) => u.status === 'active').length,
      icon: UserCheck,
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      change: '+8%',
      description: 'Bu aydan',
    },
    {
      title: 'Adminler',
      value: users.filter((u) => u.role === 'admin').length,
      icon: Crown,
      color: 'bg-gradient-to-r from-purple-500 to-pink-600',
      change: '+2%',
      description: 'Bu aydan',
    },
    {
      title: 'Beklemede',
      value: users.filter((u) => u.status === 'pending').length,
      icon: Clock,
      color: 'bg-gradient-to-r from-amber-500 to-orange-600',
      change: '+5%',
      description: 'Bu aydan',
    },
  ]

  // Utility fonksiyonlar
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className='h-4 w-4' />
      case 'editor':
        return <Shield className='h-4 w-4' />
      default:
        return <User className='h-4 w-4' />
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800/50'
      case 'editor':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/50'
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-950/30 dark:text-neutral-300 dark:border-neutral-800/50'
    }
  }

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/50'
      case 'inactive':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/50'
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/50'
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-950/30 dark:text-neutral-300 dark:border-neutral-800/50'
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Hiç giriş yapmadı'
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  // Event handlers
  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setShowUserDialog(true)
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      setUserToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserDialog(true)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedRole('all')
    setSelectedStatus('all')
  }

  const hasActiveFilters = searchQuery || selectedRole !== 'all' || selectedStatus !== 'all'

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800'>
      <div className='container mx-auto px-4 py-6 lg:py-8'>
        <div className='max-w-7xl mx-auto space-y-6 lg:space-y-8'>
          {/* Header */}
          <div className='text-center space-y-4'>
            <div className='relative'>
              <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                <div className='flex space-x-1'>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-bounce`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className='inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 px-4 py-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 mb-4'>
                <Package className='h-4 w-4 text-indigo-600 dark:text-indigo-400' />
                <span className='text-sm font-medium text-indigo-700 dark:text-indigo-300'>Boilerplate Demo</span>
              </div>
              <h1 className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4'>
                Kullanıcı Yönetimi
              </h1>
              <p className='text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto'>
                Sistem kullanıcılarınızı yönetin, roller atayın ve kullanıcı aktivitelerini takip edin. Bu bir örnek
                boilerplate sayfasıdır.
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card
                  key={index}
                  className='group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm overflow-hidden'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none'></div>
                  <CardContent className='p-6 relative'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-2'>
                        <p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>{stat.title}</p>
                        <div className='flex items-baseline gap-2'>
                          <p className='text-3xl font-bold text-neutral-900 dark:text-neutral-50'>{stat.value}</p>
                          <Badge className='bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/50 text-xs'>
                            <TrendingUp className='h-3 w-3 mr-1' />
                            {stat.change}
                          </Badge>
                        </div>
                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>{stat.description}</p>
                      </div>
                      <div
                        className={`${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className='h-6 w-6 text-white' />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Action Bar */}
          <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl'>
            <CardContent className='p-6'>
              <div className='space-y-6'>
                {/* Search Bar */}
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                  <div className='relative flex-1 max-w-md'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
                    <Input
                      placeholder='Kullanıcı ara...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='pl-10 bg-neutral-50/50 dark:bg-neutral-700/50 h-11'
                    />
                    {searchQuery && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setSearchQuery('')}
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3'>
                    <Button
                      variant='outline'
                      className='flex items-center gap-2 bg-neutral-50/50 dark:bg-neutral-700/50 h-11'
                    >
                      <Download className='h-4 w-4' />
                      Dışa Aktar
                    </Button>
                    <Button
                      variant='outline'
                      className='flex items-center gap-2 bg-neutral-50/50 dark:bg-neutral-700/50 h-11'
                    >
                      <Upload className='h-4 w-4' />
                      İçe Aktar
                    </Button>
                    <Button
                      onClick={handleAddUser}
                      className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg flex items-center gap-2 h-11'
                    >
                      <UserPlus className='h-4 w-4' />
                      Yeni Kullanıcı
                    </Button>
                  </div>
                </div>

                {/* Filters Row */}
                <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                  <div className='flex flex-col sm:flex-row gap-3 flex-1'>
                    <div className='flex-1 sm:flex-none'>
                      <label className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2'>
                        Rol Filtresi
                      </label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger className='w-full sm:w-[200px] h-11 bg-neutral-50/50 dark:bg-neutral-700/50'>
                          <SelectValue placeholder='Rol seçin' />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className='flex items-center justify-between w-full min-w-[150px]'>
                                <span>{option.label}</span>
                                <Badge variant='secondary' className='ml-3 text-xs'>
                                  {option.count}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='flex-1 sm:flex-none'>
                      <label className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2'>
                        Durum Filtresi
                      </label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className='w-full sm:w-[200px] h-11 bg-neutral-50/50 dark:bg-neutral-700/50'>
                          <SelectValue placeholder='Durum seçin' />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className='flex items-center justify-between w-full min-w-[150px]'>
                                <span>{option.label}</span>
                                <Badge variant='secondary' className='ml-3 text-xs'>
                                  {option.count}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* View Mode Toggle */}
                  <div className='flex flex-col sm:flex-none'>
                    <label className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 sm:opacity-0 sm:pointer-events-none'>
                      Görünüm
                    </label>
                    <div className='flex items-center gap-1 p-1 bg-neutral-100/70 dark:bg-neutral-700/70 rounded-lg h-11'>
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => setViewMode('table')}
                        className='p-2 h-9'
                      >
                        <Filter className='h-4 w-4' />
                      </Button>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => setViewMode('grid')}
                        className='p-2 h-9'
                      >
                        <Users className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className='flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/30'>
                  <span className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>Aktif filtreler:</span>
                  {searchQuery && (
                    <Badge
                      variant='secondary'
                      className='gap-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300'
                    >
                      Arama: "{searchQuery}"
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setSearchQuery('')}
                        className='h-4 w-4 p-0 hover:bg-transparent'
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    </Badge>
                  )}
                  {selectedRole !== 'all' && (
                    <Badge
                      variant='secondary'
                      className='gap-1 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300'
                    >
                      Rol: {roleOptions.find((r) => r.value === selectedRole)?.label}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setSelectedRole('all')}
                        className='h-4 w-4 p-0 hover:bg-transparent'
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    </Badge>
                  )}
                  {selectedStatus !== 'all' && (
                    <Badge
                      variant='secondary'
                      className='gap-1 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300'
                    >
                      Durum: {statusOptions.find((s) => s.value === selectedStatus)?.label}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => setSelectedStatus('all')}
                        className='h-4 w-4 p-0 hover:bg-transparent'
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    </Badge>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={clearFilters}
                    className='text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                  >
                    Tümünü temizle
                  </Button>
                </div>
              )}

              {/* Results Summary */}
              <div className='flex items-center justify-between mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-700/30'>
                <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                  <strong className='text-neutral-900 dark:text-neutral-100'>{filteredUsers.length}</strong> kullanıcı
                  gösteriliyor
                  {filteredUsers.length !== users.length && <span className='ml-1'>({users.length} toplam)</span>}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Users Display */}
          {filteredUsers.length > 0 ? (
            viewMode === 'table' ? (
              /* Table View */
              <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b border-neutral-200/50 dark:border-neutral-700/30 bg-neutral-50/50 dark:bg-neutral-800/50'>
                        <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50'>Kullanıcı</th>
                        <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50 hidden md:table-cell'>
                          Rol
                        </th>
                        <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50 hidden lg:table-cell'>
                          Durum
                        </th>
                        <th className='text-left p-4 font-semibold text-neutral-900 dark:text-neutral-50 hidden xl:table-cell'>
                          Son Giriş
                        </th>
                        <th className='text-right p-4 font-semibold text-neutral-900 dark:text-neutral-50'>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          className='border-b border-neutral-200/30 dark:border-neutral-700/20 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 transition-all duration-200 group'
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className='p-4'>
                            <div className='flex items-center gap-3'>
                              <Avatar className='group-hover:scale-105 transition-transform duration-200'>
                                <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold'>
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className='min-w-0'>
                                <p className='font-medium text-neutral-900 dark:text-neutral-50 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                                  {user.name}
                                </p>
                                <p className='text-sm text-neutral-600 dark:text-neutral-400 truncate'>{user.email}</p>
                                {/* Mobile: Show role and status */}
                                <div className='md:hidden mt-1 flex items-center gap-2'>
                                  <Badge className={cn('text-xs border', getRoleColor(user.role))}>
                                    <span className='flex items-center gap-1'>
                                      {getRoleIcon(user.role)}
                                      {user.role}
                                    </span>
                                  </Badge>
                                  <Badge className={cn('text-xs border', getStatusColor(user.status))}>
                                    {user.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='p-4 hidden md:table-cell'>
                            <Badge className={cn('text-xs border', getRoleColor(user.role))}>
                              <span className='flex items-center gap-1'>
                                {getRoleIcon(user.role)}
                                {user.role}
                              </span>
                            </Badge>
                          </td>
                          <td className='p-4 hidden lg:table-cell'>
                            <Badge className={cn('text-xs border', getStatusColor(user.status))}>{user.status}</Badge>
                          </td>
                          <td className='p-4 hidden xl:table-cell'>
                            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                              {formatDate(user.lastLogin)}
                            </div>
                          </td>
                          <td className='p-4 text-right'>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                                >
                                  <MoreVertical className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                  <Edit className='h-4 w-4 mr-2' />
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className='h-4 w-4 mr-2' />
                                  E-posta Gönder
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(user)}
                                  className='text-red-600 dark:text-red-400'
                                >
                                  <Trash2 className='h-4 w-4 mr-2' />
                                  Sil
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              /* Grid View */
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {filteredUsers.map((user, index) => (
                  <Card
                    key={user.id}
                    className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden'
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                    <CardContent className='p-6 relative'>
                      <div className='space-y-4'>
                        {/* User Info */}
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-12 w-12 group-hover:scale-110 transition-transform duration-300'>
                            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-semibold'>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1 min-w-0'>
                            <p className='font-semibold text-neutral-900 dark:text-neutral-50 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                              {user.name}
                            </p>
                            <p className='text-sm text-neutral-600 dark:text-neutral-400 truncate'>@{user.username}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                              >
                                <MoreVertical className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <Edit className='h-4 w-4 mr-2' />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className='h-4 w-4 mr-2' />
                                E-posta Gönder
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(user)}
                                className='text-red-600 dark:text-red-400'
                              >
                                <Trash2 className='h-4 w-4 mr-2' />
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Email */}
                        <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 p-2 rounded-lg bg-neutral-50/50 dark:bg-neutral-700/30'>
                          <Mail className='h-4 w-4 shrink-0' />
                          <span className='truncate'>{user.email}</span>
                        </div>

                        {/* Role and Status */}
                        <div className='flex items-center gap-2'>
                          <Badge className={cn('text-xs border flex-1 justify-center', getRoleColor(user.role))}>
                            <span className='flex items-center gap-1'>
                              {getRoleIcon(user.role)}
                              {user.role}
                            </span>
                          </Badge>
                          <Badge className={cn('text-xs border flex-1 justify-center', getStatusColor(user.status))}>
                            {user.status}
                          </Badge>
                        </div>

                        {/* Last Login */}
                        <div className='text-xs text-neutral-500 dark:text-neutral-400 p-2 rounded-lg bg-neutral-50/50 dark:bg-neutral-700/30'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-3 w-3' />
                            {formatDate(user.lastLogin)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : (
            /* No Results */
            <Card className='bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-0 shadow-xl'>
              <CardContent className='p-12'>
                <div className='text-center space-y-6'>
                  <div className='relative'>
                    <div className='text-neutral-300 dark:text-neutral-600'>
                      <Users className='h-20 w-20 mx-auto' />
                    </div>
                    <div className='absolute -top-2 -right-2'>
                      <div className='w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce'>
                        <Search className='h-4 w-4 text-white' />
                      </div>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
                      Kullanıcı bulunamadı
                    </h3>
                    <p className='text-neutral-600 dark:text-neutral-400 max-w-md mx-auto'>
                      Arama kriterlerinizi değiştirin veya yeni kullanıcı ekleyin. Bu bir boilerplate örnek sayfasıdır.
                    </p>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
                    <Button
                      onClick={clearFilters}
                      variant='outline'
                      className='bg-neutral-50/50 dark:bg-neutral-700/50'
                    >
                      <X className='h-4 w-4 mr-2' />
                      Filtreleri Temizle
                    </Button>
                    <Button
                      onClick={handleAddUser}
                      className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg flex items-center gap-2'
                    >
                      <UserPlus className='h-4 w-4' />
                      Yeni Kullanıcı Ekle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className='fixed top-32 left-8 opacity-20 dark:opacity-10 pointer-events-none'>
        <div className='w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-2xl animate-pulse'></div>
      </div>
      <div className='fixed bottom-32 right-12 opacity-20 dark:opacity-10 pointer-events-none'>
        <div
          className='w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-2xl animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className='max-w-md p-6 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              {selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
            </DialogTitle>
            <DialogDescription>
              {selectedUser ? 'Kullanıcı bilgilerini güncelleyin.' : 'Yeni kullanıcı bilgilerini girin.'}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>Ad Soyad</label>
              <Input placeholder='Kullanıcının adını girin' className='bg-neutral-50/50 dark:bg-neutral-700/50' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>E-posta</label>
              <Input type='email' placeholder='email@example.com' className='bg-neutral-50/50 dark:bg-neutral-700/50' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>Kullanıcı Adı</label>
              <Input placeholder='kullanici_adi' className='bg-neutral-50/50 dark:bg-neutral-700/50' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>Rol</label>
              <Select defaultValue='user'>
                <SelectTrigger className='bg-neutral-50/50 dark:bg-neutral-700/50'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='user'>Kullanıcı</SelectItem>
                  <SelectItem value='editor'>Editör</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className='flex flex-col sm:flex-row gap-3'>
            <Button
              variant='outline'
              onClick={() => setShowUserDialog(false)}
              className='bg-neutral-50/50 dark:bg-neutral-700/50'
            >
              İptal
            </Button>
            <Button
              onClick={() => setShowUserDialog(false)}
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            >
              <Zap className='h-4 w-4 mr-2' />
              {selectedUser ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className='bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm'>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center gap-2 text-red-600 dark:text-red-400'>
              <UserX className='h-5 w-5' />
              Kullanıcıyı Sil
            </AlertDialogTitle>
            <AlertDialogDescription>
              {userToDelete && (
                <>
                  <strong className='text-neutral-900 dark:text-neutral-100'>{userToDelete.name}</strong> kullanıcısını
                  silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm kullanıcı verileri kalıcı olarak
                  silinir.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='bg-neutral-50/50 dark:bg-neutral-700/50'>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className='bg-red-600 hover:bg-red-700 text-white'>
              <Trash2 className='h-4 w-4 mr-2' />
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
