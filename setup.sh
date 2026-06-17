#!/bin/bash

# Neighbourly Quick Setup Script
# This script automates the initial setup

echo "🚀 Neighbourly - Quick Setup"
echo "=============================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Copy environment files
echo ""
echo "🔐 Creating environment files..."
cp apps/web/.env.local.example apps/web/.env.local
cp apps/mobile/.env.local.example apps/mobile/.env.local

echo ""
echo "✨ Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit environment files with your Supabase credentials:"
echo "   - apps/web/.env.local"
echo "   - apps/mobile/.env.local"
echo ""
echo "2. Push to GitHub:"
echo "   cd c:\\Users\\LENOVO\\Desktop\\Neighbourly"
echo "   git push -u origin main"
echo ""
echo "3. Start development:"
echo "   npm run dev"
echo ""
echo "📚 Read SETUP_SUMMARY.md for complete guide"
echo ""
