# WarungKu Digital POS - Next.js

Modern Point of Sale system built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies (already done)
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js (coming soon)
- **State**: React Query (coming soon)

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql

# Create database
createdb warungku

# Update .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/warungku"

# Run migrations
npx prisma db push
```

### Option 2: Supabase (Recommended)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string
4. Update `.env.local`:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
```

5. Run migrations:

```bash
npx prisma db push
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard page
│   ├── kasir/            # Cashier page (coming)
│   ├── stok/             # Inventory page (coming)
│   └── riwayat/          # History page (coming)
├── components/           # Reusable components
├── lib/                  # Utilities
└── generated/            # Prisma client

prisma/
└── schema.prisma         # Database schema
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (DB GUI)
```

## 📝 Next Steps

- [ ] Complete all pages (kasir, stok, riwayat, laporan)
- [ ] Add authentication (NextAuth.js)
- [ ] Implement API routes
- [ ] Add state management (React Query)
- [ ] Setup PWA (next-pwa)
- [ ] Add offline support (IndexedDB)
- [ ] Implement printer integration
- [ ] Add barcode scanner

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Prisma errors
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database
npx prisma db push --force-reset
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Built with ❤️ for Indonesian Warungs**
