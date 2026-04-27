#!/bin/bash

echo "🏪 WarungKu Digital POS - Next.js Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Create Next.js project
echo "📦 Creating Next.js project..."
npx create-next-app@latest warungku-nextjs \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git

cd warungku-nextjs

# Install shadcn/ui
echo ""
echo "🎨 Installing shadcn/ui..."
npx shadcn-ui@latest init -y

# Install core dependencies
echo ""
echo "📚 Installing dependencies..."
npm install @supabase/supabase-js prisma @prisma/client
npm install dexie dexie-react-hooks
npm install @tanstack/react-query
npm install next-auth
npm install zod react-hook-form @hookform/resolvers
npm install date-fns
npm install recharts
npm install class-variance-authority clsx tailwind-merge

# Install dev dependencies
npm install -D @types/node prisma

# Install PWA
npm install next-pwa

# Initialize Prisma
echo ""
echo "🗄️  Initializing Prisma..."
npx prisma init

echo ""
echo "✅ Setup complete!"
echo ""
echo "📁 Project created at: ./warungku-nextjs"
echo ""
echo "Next steps:"
echo "1. cd warungku-nextjs"
echo "2. Configure .env file with database URL"
echo "3. Update prisma/schema.prisma"
echo "4. Run: npx prisma migrate dev"
echo "5. Run: npm run dev"
echo ""
echo "Happy coding! 🚀"
