// Corporate website content management system

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  image?: string
  icon?: string
  slug: string
  category: string
  price?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  email?: string
  social: {
    linkedin?: string
    github?: string
    twitter?: string
  }
  skills: string[]
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  tags: string[]
  readingTime: string
  featured: boolean
  image?: string
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  image: string
  category: string
  projectUrl?: string
  tags: string[]
}

export interface CompanyInfo {
  name: string
  description: string
  mission: string
  vision: string
  founded: string
  employees: string
  location: string
  contact: {
    email: string
    phone: string
    address: string
  }
}

// Mock data for demo purposes
export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Web Geliştirme',
    description: 'Modern ve responsive web siteleri ile web uygulamaları geliştiriyoruz.',
    features: [
      'Responsive tasarım',
      'SEO optimizasyonu',
      'Hızlı loading süreleri',
      'Modern teknolojiler'
    ],
    slug: 'web-gelistirme',
    category: 'Yazılım',
    price: '₺5.000 - ₺25.000'
  },
  {
    id: '2',
    title: 'Mobil Uygulama',
    description: 'iOS ve Android platformları için native ve cross-platform uygulamalar.',
    features: [
      'Native performans',
      'Cross-platform uyumluluk',
      'App Store yayınlama',
      'Maintenance desteği'
    ],
    slug: 'mobil-uygulama',
    category: 'Yazılım',
    price: '₺15.000 - ₺50.000'
  },
  {
    id: '3',
    title: 'UI/UX Tasarım',
    description: 'Kullanıcı dostu ve estetik arayüz tasarımları.',
    features: [
      'User research',
      'Wireframe ve mockup',
      'Prototype geliştirme',
      'Usability testing'
    ],
    slug: 'ui-ux-tasarim',
    category: 'Tasarım',
    price: '₺3.000 - ₺15.000'
  }
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    role: 'CEO & Kurucu',
    bio: '10+ yıl teknoloji sektöründe deneyim. Şirketimizin vizyonunu belirliyor ve stratejik kararları alıyor.',
    email: 'ahmet@company.com',
    social: {
      linkedin: 'https://linkedin.com/in/ahmetyilmaz',
      twitter: 'https://twitter.com/ahmetyilmaz'
    },
    skills: ['Leadership', 'Strategy', 'Business Development']
  },
  {
    id: '2',
    name: 'Elif Demir',
    role: 'CTO',
    bio: 'Full-stack developer ve teknoloji lideri. Ekibimizin teknik gelişimini yönetiyor.',
    email: 'elif@company.com',
    social: {
      linkedin: 'https://linkedin.com/in/elifdemir',
      github: 'https://github.com/elifdemir'
    },
    skills: ['React', 'Node.js', 'System Architecture', 'Team Management']
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    role: 'Senior Developer',
    bio: 'Frontend ve backend geliştirme konularında uzman. Open source projelere katkıda bulunuyor.',
    email: 'mehmet@company.com',
    social: {
      github: 'https://github.com/mehmetkaya',
      linkedin: 'https://linkedin.com/in/mehmetkaya'
    },
    skills: ['React', 'Next.js', 'TypeScript', 'GraphQL']
  }
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Next.js 15 ile Modern Web Geliştirme',
    slug: 'nextjs-15-modern-web-gelistirme',
    excerpt: 'Next.js 15\'in yeni özellikleri ve modern web geliştirme practices.',
    content: 'Lorem ipsum dolor sit amet...',
    publishedAt: '2024-01-15',
    author: {
      name: 'Elif Demir',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786'
    },
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript'],
    readingTime: '5 dk',
    featured: true,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices 2024',
    slug: 'typescript-best-practices-2024',
    excerpt: 'TypeScript kullanırken dikkat edilmesi gereken en iyi uygulamalar.',
    content: 'Lorem ipsum dolor sit amet...',
    publishedAt: '2024-01-10',
    author: {
      name: 'Mehmet Kaya',
    },
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    readingTime: '7 dk',
    featured: false,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
  }
]

export const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'E-ticaret Platformu',
    description: 'Modern e-ticaret sitesi tasarımı ve geliştirmesi',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    category: 'Web Development',
    projectUrl: 'https://example.com',
    tags: ['React', 'Node.js', 'E-commerce']
  },
  {
    id: '2',
    title: 'Mobil Bankacılık Uygulaması',
    description: 'iOS ve Android için bankacılık uygulaması UI tasarımı',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
    category: 'Mobile App',
    tags: ['Mobile', 'Banking', 'UI/UX']
  },
  {
    id: '3',
    title: 'Kurumsal Web Sitesi',
    description: 'Kurumsal kimlik ve web sitesi tasarımı',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    category: 'Web Design',
    projectUrl: 'https://example.com',
    tags: ['Corporate', 'Branding', 'Web Design']
  }
]

export const mockCompanyInfo: CompanyInfo = {
  name: 'TechCorp Solutions',
  description: 'Modern teknolojiler ile dijital çözümler üreten yazılım şirketi.',
  mission: 'Müşterilerimizin dijital dönüşüm sürecinde güvenilir teknoloji partneri olmak.',
  vision: 'Teknoloji ile hayatı kolaylaştıran, sürdürülebilir çözümler geliştirmek.',
  founded: '2020',
  employees: '25+',
  location: 'İstanbul, Türkiye',
  contact: {
    email: 'info@techcorp.com',
    phone: '+90 212 555 0123',
    address: 'Maslak Mahallesi, Teknoloji Sokağı No:1, Sarıyer/İstanbul'
  }
}

// Content utilities
export function getServiceBySlug(slug: string): Service | undefined {
  return mockServices.find(service => service.slug === slug)
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find(post => post.slug === slug)
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return mockBlogPosts.filter(post => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return mockBlogPosts.filter(post => post.category === category)
}

export function getGalleryItemsByCategory(category: string): GalleryItem[] {
  return mockGalleryItems.filter(item => item.category === category)
}