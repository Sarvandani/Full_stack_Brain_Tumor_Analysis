#!/bin/bash

# Check training progress
echo "🔍 Checking Model Training Status..."
echo ""

# Check if training process is running
TRAIN_PID=$(ps aux | grep "train_model.py" | grep -v grep | awk '{print $2}')
if [ -n "$TRAIN_PID" ]; then
    echo "✅ Training is RUNNING (PID: $TRAIN_PID)"
    echo "   CPU Usage: $(ps aux | grep $TRAIN_PID | grep -v grep | awk '{print $3}')%"
    echo "   Memory Usage: $(ps aux | grep $TRAIN_PID | grep -v grep | awk '{print $4}')%"
else
    echo "❌ Training is NOT running"
fi

echo ""

# Check if model file exists
if [ -f "backend/models/brain_tumor_model.keras" ]; then
    MODEL_SIZE=$(ls -lh backend/models/brain_tumor_model.keras | awk '{print $5}')
    echo "✅ Model file EXISTS"
    echo "   Size: $MODEL_SIZE"
    echo "   Location: backend/models/brain_tumor_model.keras"
else
    echo "⏳ Model file NOT YET CREATED (training in progress...)"
fi

echo ""

# Check backend status
BACKEND_PID=$(lsof -ti:5001)
if [ -n "$BACKEND_PID" ]; then
    echo "✅ Backend is RUNNING (PID: $BACKEND_PID)"
    HEALTH=$(curl -s http://localhost:5001/health 2>/dev/null | python3 -m json.tool 2>/dev/null | grep -o '"model_loaded":[^,]*' || echo "")
    if [ -n "$HEALTH" ]; then
        echo "   $HEALTH"
    fi
else
    echo "❌ Backend is NOT running"
fi

echo ""
echo "💡 Training typically takes 5-15 minutes"
echo "💡 Check again later with: ./check_training.sh"

