#!/bin/bash

# WarungKu Digital POS - Quick Start Script

echo "🏪 WarungKu Digital POS"
echo "======================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python3 detected"
    echo "🚀 Starting local server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python detected"
    echo "🚀 Starting local server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found"
    echo ""
    echo "Alternative options:"
    echo "1. Install Python: sudo apt install python3"
    echo "2. Use Node.js: npx serve"
    echo "3. Open index.html directly in your browser"
    echo ""
    
    # Try to open in browser directly
    if command -v xdg-open &> /dev/null; then
        echo "📂 Opening index.html in browser..."
        xdg-open index.html
    elif command -v open &> /dev/null; then
        echo "📂 Opening index.html in browser..."
        open index.html
    else
        echo "Please open index.html manually in your browser"
    fi
fi
