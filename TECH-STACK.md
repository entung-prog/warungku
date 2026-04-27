# 🛠️ Tech Stack Recommendation - WarungKu Digital POS

## 📋 Overview

Rekomendasi stack teknologi untuk mengembangkan WarungKu Digital POS dari prototype menjadi aplikasi production-ready dengan fitur offline-first PWA.

---

## 🎯 Opsi 1: Fullstack Next.js (Recommended)

### Frontend / PWA
```
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion (animations)
```

### Backend
```
- Next.js Server Actions
- Next.js API Routes
- Prisma ORM
- NextAuth.js (authentication)
```

### Database
```
- PostgreSQL (production)
- Supabase (alternative, includes auth & storage)
```

### PWA & Offline
```
- next-pwa
- Service Worker
- IndexedDB (via Dexie.js)
- React Query (caching)
```

### Deployment
```
- Vercel (frontend + serverless)
- Railway / Supabase (database)
```

**Pros:**
- ✅ Single codebase (fullstack)
- ✅ Fast development
- ✅ Built-in API routes
- ✅ Excellent PWA support
- ✅ Easy deployment

**Cons:**
- ❌ Tightly coupled frontend-backend
- ❌ Scaling complexity untuk traffic tinggi

---

## 🎯 Opsi 2: Next.js + Laravel API (Scalable)

### Frontend / PWA
```
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios / TanStack Query
```

### Backend
```
- Laravel 11
- Laravel Sanctum (API auth)
- Laravel Octane (performance)
- Laravel Queue (background jobs)
```

### Database
```
- PostgreSQL / MySQL
- Redis (cache & sessions)
```

### PWA & Offline
```
- next-pwa
- Service Worker
- IndexedDB
- Background Sync API
```

### Deployment
```
- Vercel (frontend)
- DigitalOcean / AWS (Laravel API)
- Cloudflare (CDN)
```

**Pros:**
- ✅ Separation of concerns
- ✅ Laravel ecosystem (mature)
- ✅ Better untuk tim besar
- ✅ Scalable architecture

**Cons:**
- ❌ Lebih kompleks setup
- ❌ Butuh 2 deployment
- ❌ CORS configuration

---

## 📦 Package Dependencies

### Next.js Fullstack
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "prisma": "^5.13.0",
    "@prisma/client": "^5.13.0",
    "next-auth": "^5.0.0",
    "zod": "^3.23.0",
    "react-hook-form": "^7.51.0",
    "@tanstack/react-query": "^5.32.0",
    "dexie": "^4.0.0",
    "dexie-react-hooks": "^1.1.0",
    "next-pwa": "^5.6.0",
    "date-fns": "^3.6.0",
    "recharts": "^2.12.0"
  }
}
```

### Laravel API
```json
{
  "require": {
    "php": "^8.2",
    "laravel/framework": "^11.0",
    "laravel/sanctum": "^4.0",
    "laravel/octane": "^2.3",
    "predis/predis": "^2.2"
  }
}
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(CASHIER)
  createdAt DateTime @default(now())
  
  transactions Transaction[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  sku         String   @unique
  price       Decimal  @db.Decimal(10, 2)
  stock       Int
  category    String
  image       String?
  minStock    Int      @default(5)
  createdAt   DateTime @default(now())
  
  items TransactionItem[]
}

model Transaction {
  id          String   @id @default(cuid())
  userId      String
  total       Decimal  @db.Decimal(10, 2)
  paymentType String
  status      Status   @default(COMPLETED)
  createdAt   DateTime @default(now())
  
  user  User              @relation(fields: [userId], references: [id])
  items TransactionItem[]
}

model TransactionItem {
  id            String   @id @default(cuid())
  transactionId String
  productId     String
  quantity      Int
  price         Decimal  @db.Decimal(10, 2)
  
  transaction Transaction @relation(fields: [transactionId], references: [id])
  product     Product     @relation(fields: [productId], references: [id])
}

enum Role {
  ADMIN
  CASHIER
}

enum Status {
  PENDING
  COMPLETED
  CANCELLED
}
```

---

## 🔧 PWA Configuration

### next.config.js
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60
        }
      }
    },
    {
      urlPattern: /\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60
        }
      }
    }
  ]
})

module.exports = withPWA({
  reactStrictMode: true,
})
```

### manifest.json
```json
{
  "name": "WarungKu Digital POS",
  "short_name": "WarungKu",
  "description": "Sistem POS Modern untuk Warung Indonesia",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f4fbf4",
  "theme_color": "#10b981",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 💾 Offline Storage (IndexedDB)

```typescript
// lib/db.ts
import Dexie, { Table } from 'dexie'

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface Transaction {
  id: string
  total: number
  items: any[]
  synced: boolean
  createdAt: Date
}

class WarungDB extends Dexie {
  products!: Table<Product>
  transactions!: Table<Transaction>

  constructor() {
    super('WarungKuDB')
    this.version(1).stores({
      products: 'id, name, stock',
      transactions: 'id, synced, createdAt'
    })
  }
}

export const db = new WarungDB()
```

---

## 🚀 Development Roadmap

### Phase 1: Setup (Week 1-2)
- [ ] Initialize Next.js project
- [ ] Setup Tailwind + shadcn/ui
- [ ] Configure Prisma + PostgreSQL
- [ ] Setup authentication (NextAuth)
- [ ] Convert HTML to React components

### Phase 2: Core Features (Week 3-6)
- [ ] Dashboard dengan real data
- [ ] Kasir system (cart, checkout)
- [ ] Product management (CRUD)
- [ ] Transaction history
- [ ] Basic reports

### Phase 3: PWA & Offline (Week 7-8)
- [ ] Service Worker setup
- [ ] IndexedDB integration
- [ ] Offline transaction queue
- [ ] Background sync
- [ ] Install prompt

### Phase 4: Advanced Features (Week 9-12)
- [ ] Printer integration (thermal)
- [ ] Barcode scanner
- [ ] Multi-user support
- [ ] Advanced analytics
- [ ] Export reports (PDF/Excel)

### Phase 5: Production (Week 13-14)
- [ ] Testing (unit + e2e)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Deployment
- [ ] Documentation

---

## 💰 Estimated Costs

### Development
- Developer: Rp 15-30 juta (3 bulan)
- Designer: Rp 5-10 juta (UI polish)

### Infrastructure (Monthly)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Domain: $10/year
- **Total: ~$50/month**

### Alternative (Self-hosted)
- VPS DigitalOcean: $12/month
- Database: Included
- **Total: ~$12/month**

---

## 📚 Learning Resources

### Next.js
- https://nextjs.org/docs
- https://ui.shadcn.com/

### PWA
- https://web.dev/progressive-web-apps/
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

### Prisma
- https://www.prisma.io/docs

### Laravel (if chosen)
- https://laravel.com/docs

---

## 🎯 Recommendation

**Untuk WarungKu POS, saya rekomendasikan:**

### ✅ Opsi 1: Next.js Fullstack + Supabase

**Alasan:**
1. Faster time to market
2. Lower infrastructure cost
3. Built-in auth & storage (Supabase)
4. Excellent PWA support
5. Easy untuk solo developer / small team
6. Supabase provides real-time subscriptions

**Stack:**
```
Next.js 14 + TypeScript
Tailwind CSS + shadcn/ui
Supabase (PostgreSQL + Auth + Storage)
Prisma ORM
next-pwa
IndexedDB (Dexie.js)
```

**Deployment:**
```
Vercel (frontend)
Supabase (backend)
Total: ~$25-50/month
```

---

## 📞 Next Steps

1. **Setup Project**
   ```bash
   npx create-next-app@latest warungku-pos --typescript --tailwind --app
   cd warungku-pos
   npx shadcn-ui@latest init
   ```

2. **Install Dependencies**
   ```bash
   npm install @supabase/supabase-js prisma @prisma/client
   npm install dexie dexie-react-hooks
   npm install next-pwa
   ```

3. **Convert HTML to Components**
   - Start with Dashboard
   - Create reusable components
   - Add state management

4. **Setup Database**
   - Create Supabase project
   - Run Prisma migrations
   - Seed initial data

5. **Implement PWA**
   - Configure service worker
   - Setup offline storage
   - Test offline functionality

---

**Ready to build? Let's go! 🚀**
