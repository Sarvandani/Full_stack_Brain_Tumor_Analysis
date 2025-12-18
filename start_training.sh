#!/bin/bash
# Quick script to start model training locally

echo "🚀 Starting Brain Tumor Detection Model Training"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "backend/train_model.py" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if dataset exists
if [ ! -d "data/brain_tumor_dataset/yes" ] || [ ! -d "data/brain_tumor_dataset/no" ]; then
    echo "❌ Error: Dataset not found!"
    echo "   Expected: data/brain_tumor_dataset/yes/ and data/brain_tumor_dataset/no/"
    exit 1
fi

# Count images
YES_COUNT=$(ls data/brain_tumor_dataset/yes/*.{jpg,jpeg,png,JPG,PNG} 2>/dev/null | wc -l | tr -d ' ')
NO_COUNT=$(ls data/brain_tumor_dataset/no/*.{jpg,jpeg,png,JPG,PNG} 2>/dev/null | wc -l | tr -d ' ')

echo "📊 Dataset Summary:"
echo "   - Tumor images (yes): $YES_COUNT"
echo "   - No tumor images (no): $NO_COUNT"
echo ""

if [ "$YES_COUNT" -eq 0 ] || [ "$NO_COUNT" -eq 0 ]; then
    echo "❌ Error: Not enough images found!"
    exit 1
fi

echo "⏳ Training will take approximately 10-15 minutes..."
echo "   (Training will stop early if no improvement is seen)"
echo ""
echo "📝 Training progress will be saved to: backend/training_output.log"
echo ""

# Start training
cd backend
python3 train_model.py 2>&1 | tee training_output.log

echo ""
echo "✅ Training completed!"
echo "📁 Model saved to: backend/models/brain_tumor_model.keras"

