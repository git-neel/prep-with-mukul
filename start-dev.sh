#!/bin/bash

# Local Firebase Development Setup
# This script starts the necessary services for local testing

echo "🔥 Firebase Development Environment"
echo "====================================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20+"
    exit 1
fi

echo "✓ Node.js: $(node --version)"
echo "✓ npm: $(npm --version)"
echo ""

# Check if Firebase CLI is installed
if ! npx firebase --version &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install firebase-tools --save-dev
fi

echo "✓ Firebase CLI: $(npx firebase --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    cd functions && npm install && cd ..
fi

echo "✓ Dependencies installed"
echo ""

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✓ Build successful"
echo ""

# Start Vite dev server for frontend
echo "🚀 Starting Frontend Dev Server..."
echo "   URL: http://localhost:5173"
echo ""

npm run dev &
VITE_PID=$!

# Give Vite time to start
sleep 3

echo "✅ All services running!"
echo ""
echo "📋 Services:"
echo "   Frontend (Vite): http://localhost:5173"
echo "   Firestore Console: http://localhost:4000 (after emulator starts)"
echo ""
echo "📝 To use Firebase Emulators for testing:"
echo "   1. In another terminal: npx firebase emulators:start --project=demo-project"
echo "   2. Update .env.local to point to emulator"
echo ""
echo "✋ Press Ctrl+C to stop"
echo ""

# Wait for processes
wait $VITE_PID
