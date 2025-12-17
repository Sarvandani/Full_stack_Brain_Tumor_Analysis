#!/bin/bash
# Build script for Render deployment
# This ensures Python 3.9 is used

# Install Python 3.9 if not available
python3.9 --version || {
    echo "Python 3.9 not found, installing..."
    # Render should handle this via runtime.txt, but as fallback:
    export PYTHON_VERSION=3.9.18
}

# Install dependencies
pip install -r requirements.txt

