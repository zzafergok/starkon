# test-corporate-app CLI Kullanım Kılavuzu

## 🚀 Kurulum ve Kullanım

### Hızlı Başlangıç

```bash
npx test-corporate-app@latest my-project --template corporate
cd my-project
npm install
npm run dev
```

## 📋 Komut Tablosu

| Komut                                                            | Açıklama                                | Örnek                                                           |
| ---------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `npx test-corporate-app@latest <proje-adı>`                      | Varsayılan template ile proje oluşturur | `npx test-corporate-app@latest my-app`                          |
| `npx test-corporate-app@latest <proje-adı> --template default`   | Tam özellikli template (auth + i18n)    | `npx test-corporate-app@latest my-app --template default`       |
| `npx test-corporate-app@latest <proje-adı> --template landing`   | Landing page template                   | `npx test-corporate-app@latest landing-site --template landing` |
| `npx test-corporate-app@latest <proje-adı> --template corporate` | Kurumsal website template               | `npx test-corporate-app@latest sirket-web --template corporate` |
| `npx test-corporate-app@latest --help`                           | Yardım menüsünü gösterir                | -                                                               |
| `npx test-corporate-app@latest --version`                        | Versiyon bilgisini gösterir             | -                                                               |

## 🎯 Template Türleri

### 1. Default Template

```bash
npx test-corporate-app@latest my-app --template default
```

**İçerik:**

- ✅ Tam authentication sistemi (JWT)
- ✅ Çoklu dil desteği (i18n)
- ✅ User dashboard ve settings
- ✅ Tüm core componentler
- ✅ Protected routes

### 2. Landing Template

```bash
npx test-corporate-app@latest landing-site --template landing
```

**İçerik:**

- ✅ Hero, Features, Testimonials, CTA bölümleri
- ✅ Contact form
- ✅ Basit ve hızlı landing page odaklı
- ❌ Authentication sistemi yok
- ❌ i18n karmaşıklığı yok

### 3. Corporate Template

```bash
npx test-corporate-app@latest sirket-web --template corporate
```

**İçerik:**

- ✅ Ana sayfa, Hakkımızda, Hizmetler, Blog, Galeri sayfaları
- ✅ Corporate componentler (ServiceCard, TeamMember, BlogCard)
- ✅ Content management sistemi
- ✅ SEO optimizasyonu
- ❌ Authentication sistemi yok
- ❌ i18n karmaşıklığı yok

## 🖥️ CLI Ekran Görünümü

### 1. Yardım Menüsü

```bash
❯ npx test-corporate-app@latest --help

Usage: create-starkon-template [options] <project-name>

Create a new Next.js project with Starkon template

Arguments:
  project-name               Name of the project to create

Options:
  -V, --version              output the version number
  -t, --template <template>  Template to use (default, landing, corporate)
                             (default: "default")
  -h, --help                 display help for command
```

### 2. Proje Oluşturma Süreci

```bash
❯ npx test-corporate-app@latest demo-sirket --template corporate

npm warn exec The following package was not found and will be installed: test-corporate-app@0.1.3
⠋ Creating demo-sirket with Corporate Website Template...
✔ ✅ demo-sirket successfully created!

📦 Next steps:
  cd demo-sirket
  npm install
  npm run dev

🎉 Happy coding!
```

### 3. Hata Durumları

#### Mevcut Klasör Hatası

```bash
❯ npx test-corporate-app@latest existing-folder --template corporate

⠋ Creating existing-folder with Corporate Website Template...
✖ ❌ Directory existing-folder already exists!
```

#### Geçersiz Template

```bash
❯ npx test-corporate-app@latest my-app --template invalid

❌ Template "invalid" not found!
Available templates:
  • default: Full-featured Next.js boilerplate with authentication and i18n
  • landing: Landing page focused template without auth and i18n complexity
  • corporate: Corporate focused template with company pages and content management
```

## 💡 Proje Kurulum Sonrası

Proje oluşturduktan sonra şu adımları takip edin:

```bash
# Proje klasörüne geçin
cd your-project-name

# Bağımlılıkları yükleyin
npm install

# Development server başlatın
npm run dev

# Browser'da açın: http://localhost:3000
```

## 🔧 Geliştirme Komutları

| Komut                | Ne Yapar                        |
| -------------------- | ------------------------------- |
| `npm run dev`        | Development server başlatır     |
| `npm run build`      | Production build oluşturur      |
| `npm run start`      | Production server başlatır      |
| `npm run lint`       | ESLint ile kod kalitesi kontrol |
| `npm run type-check` | TypeScript tip kontrolü         |
| `npm run prettier`   | Kod formatlaması                |
| `npm test`           | Jest testleri çalıştırır        |

## 📱 Örnek Corporate Website Özellikleri

Corporate template ile oluşturacağınız projede:

- **Ana Sayfa:** Hero section, özellikler, hizmetler, ekip, blog önizleme
- **Hakkımızda:** Şirket hikayesi ve değerler
- **Hizmetler:** Detaylı hizmet kartları
- **Blog:** Makale listesi ve kategoriler
- **Galeri:** Proje galerileri
- **Modern UI:** Framer Motion animasyonları
- **Responsive:** Mobil uyumlu tasarım
- **Dark Mode:** Koyu tema desteği
