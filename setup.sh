#!/bin/bash

# Sportloods Oost - Setup Script
# This script helps set up the development environment

echo "🏋️  Setting up Sportloods Oost Website..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm detected: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
else
    echo ""
    echo "❌ Failed to install dependencies. Please check the error messages above."
    exit 1
fi

# Check if content.json exists
if [ -f "data/content.json" ]; then
    echo "✅ Content file found"
else
    echo "⚠️  Warning: data/content.json not found"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run 'npm run dev' to start the development server"
echo "  2. Open http://localhost:3000 in your browser"
echo "  3. Edit data/content.json to update website content"
echo ""
echo "📚 Documentation:"
echo "  - QUICKSTART.md    - Quick reference guide"
echo "  - CONTENT_GUIDE.md - How to edit content"
echo "  - DEVELOPER_GUIDE.md - Developer documentation"
echo ""
echo "Happy coding! 🚀"
