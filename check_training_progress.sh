#!/bin/bash
# Check training progress

TRAIN_PID=$(ps aux | grep "train_model.py" | grep -v grep | awk '{print $2}')

if [ -n "$TRAIN_PID" ]; then
    echo "✅ Training is RUNNING (PID: $TRAIN_PID)"
    CPU=$(ps aux | grep $TRAIN_PID | grep -v grep | awk '{print $3}')
    MEM=$(ps aux | grep $TRAIN_PID | grep -v grep | awk '{print $4}')
    RUNTIME=$(ps aux | grep $TRAIN_PID | grep -v grep | awk '{print $10}')
    echo "   CPU: ${CPU}% | Memory: ${MEM}% | Runtime: ${RUNTIME}"
else
    echo "❌ Training is NOT running"
fi

echo ""

if [ -f "backend/models/brain_tumor_model.keras" ]; then
    SIZE=$(ls -lh backend/models/brain_tumor_model.keras | awk '{print $5}')
    MTIME=$(ls -l backend/models/brain_tumor_model.keras | awk '{print $6, $7, $8}')
    echo "✅ Model file exists"
    echo "   Size: $SIZE"
    echo "   Last modified: $MTIME"
else
    echo "⏳ Model file not yet created"
fi

