#!/bin/bash

# SmartBazaar Development Setup Script
# Automates the setup process for new developers

set -e

echo "🛍️  SmartBazaar Setup Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  Please edit .env.local with your Supabase credentials:"
    echo "   1. Go to https://supabase.com"
    echo "   2. Create a new project"
    echo "   3. Copy the URL and API key"
    echo "   4. Paste them into .env.local"
else
    echo "✅ .env.local already exists"
fi

# Type checking
echo ""
echo "🔍 Running type check..."
npm run type-check || echo "⚠️  TypeScript warnings (non-blocking)"

# Ready to start
echo ""
echo "================================"
echo "✅ Setup complete!"
echo "================================"
echo ""
echo "🚀 Next steps:"
echo "   1. Edit .env.local with your Supabase credentials"
echo "   2. Run: npm run dev"
echo "   3. Open: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - Installation: INSTALLATION.md"
echo "   - Quick Start: QUICKSTART.md"
echo "   - Full Docs: README.md"
echo ""
