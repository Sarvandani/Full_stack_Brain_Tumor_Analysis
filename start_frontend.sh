#!/bin/bash

# Start Frontend Server for Brain Tumor Detection
echo "🎨 Starting Brain Tumor Detection Frontend..."

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/frontend"

# Check if node_modules exists or package.json was modified
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start development server
echo "🚀 Starting frontend on http://localhost:4001"
echo "📝 Make sure backend is running on http://localhost:5001"
npm run dev

