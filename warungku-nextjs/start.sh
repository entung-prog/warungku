#!/bin/bash

echo "🏪 Starting WarungKu Digital POS..."
echo ""

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start dev server
echo "🚀 Starting development server..."
echo "📱 Open http://localhost:3000"
echo ""
npm run dev
