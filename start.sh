#!/bin/bash

# Sportloods Oost - First Run Script
# Run this after cloning/downloading the project

echo "🏋️  Welcome to Sportloods Oost Website!"
echo "======================================"
echo ""

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found!"
    echo ""
    echo "Please install Node.js:"
    echo "  → Visit: https://nodejs.org/"
    echo "  → Download: LTS version recommended"
    echo ""
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 Starting development server..."
    echo ""
    
    # Start the dev server
    npm run dev
else
    echo ""
    echo "❌ Installation failed!"
    echo "Please check the errors above and try again."
    echo ""
    exit 1
fi
