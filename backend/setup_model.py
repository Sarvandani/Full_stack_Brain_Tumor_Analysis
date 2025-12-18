#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Setup script for brain tumor detection model
Similar to NLP project's setup_models.py

This script helps download or prepare the model for deployment.
Since models are too large for Git, they should be:
1. Trained on Render using /train endpoint, OR
2. Downloaded from external storage, OR
3. Trained locally and uploaded separately
"""

import os
import sys

def check_model_exists():
    """Check if model file exists"""
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(BASE_DIR, "models", "brain_tumor_model.keras")
    
    if os.path.exists(MODEL_PATH):
        size_mb = os.path.getsize(MODEL_PATH) / (1024 * 1024)
        print(f"✅ Model found: {MODEL_PATH}")
        print(f"📦 Size: {size_mb:.2f} MB")
        return True
    else:
        print(f"❌ Model not found: {MODEL_PATH}")
        print("\n📋 Options to get the model:")
        print("1. Train on Render: POST to /train endpoint")
        print("2. Train locally: python train_model.py")
        print("3. Download from external storage (if configured)")
        return False

def main():
    """Main setup function"""
    print("=" * 50)
    print("Brain Tumor Detection Model Setup")
    print("=" * 50)
    print()
    
    # Check if model exists
    model_exists = check_model_exists()
    
    if not model_exists:
        print("\n⚠️  Model will be trained automatically on first deployment")
        print("   Or you can train it manually using the /train endpoint")
    
    print("\n✅ Setup complete!")
    print("\n💡 Note: Models are excluded from Git (too large)")
    print("   This follows the same pattern as the NLP project")

if __name__ == "__main__":
    main()

