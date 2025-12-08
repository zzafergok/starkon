export interface NavigationItem {
  name: string
  href: string
  current?: boolean
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  badge?: number
  description?: string
  external?: boolean
}

export interface DropdownSection {
  title: string
  items: NavigationItem[]
}

export const isActiveRoute = (pathname: string, href: string): boolean => {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname.startsWith(href)
}
