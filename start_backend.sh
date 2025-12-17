#!/bin/bash

# Start Backend Server for Brain Tumor Detection
echo "🧠 Starting Brain Tumor Detection Backend..."

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/backend"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/.deps_installed" ]; then
    echo "📥 Installing dependencies..."
    pip install -r requirements.txt
    touch venv/.deps_installed
fi

# Check if model exists
if [ ! -f "models/brain_tumor_model.keras" ]; then
    echo "⚠️  Model not found! Training model first..."
    echo "This may take a while..."
    python train_model.py
fi

# Start server
echo "🚀 Starting server on http://localhost:5001"
echo "📝 Press Ctrl+C to stop"
python main.py
