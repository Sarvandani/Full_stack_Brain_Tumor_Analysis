# 🚀 Train Model Locally

This guide will help you train the brain tumor detection model on your local machine.

## 📋 Prerequisites

- **Python 3.9** or higher (you have Python 3.9.6 ✅)
- **pip** package manager
- **Dataset** in `data/brain_tumor_dataset/` folder (already present ✅)

## 🔧 Setup

### Step 1: Install Dependencies

For **macOS** (recommended):
```bash
cd backend
pip install -r requirements_local.txt
```

For **Linux/Windows** or if you want to use TensorFlow 2.20.0:
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Verify Installation

```bash
python3 -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__)"
```

Expected output:
- macOS: `TensorFlow version: 2.15.0`
- Linux/Windows: `TensorFlow version: 2.20.0` (or 2.15.0)

## 🎯 Train the Model

### Option 1: Direct Training

```bash
cd backend
python3 train_model.py
```

### Option 2: Training with Progress Log

```bash
cd backend
python3 train_model.py 2>&1 | tee training_output.log
```

This will:
- Save training progress to `training_output.log`
- Show real-time output in terminal

## ⏱️ Training Time

- **Expected time**: 10-15 minutes (depending on your CPU/GPU)
- **Epochs**: Up to 200 (with early stopping)
- **Early stopping**: Training stops if no improvement for 15 epochs

## 📊 What Happens During Training

1. **Data Loading**: Loads images from `data/brain_tumor_dataset/yes/` and `data/brain_tumor_dataset/no/`
2. **Data Preprocessing**: Resizes images to 128x128, normalizes pixel values
3. **Data Splitting**: 80% training, 20% testing
4. **Model Creation**: Creates CNN with 4 convolutional blocks
5. **Training**: Trains with data augmentation, class weighting, and callbacks
6. **Model Saving**: Saves best model to `backend/models/brain_tumor_model.keras`

## ✅ Success Indicators

You'll see output like:
```
==================================================
Brain Tumor Detection Model Training
==================================================
Loading images with tumors...
Loading images without tumors...
Data shape: (253, 128, 128, 3)
Labels shape: (253, 1)
Number of tumor images: 155
Number of no-tumor images: 98
...
Training samples: 202
Test samples: 51
...
Epoch 1/200
...
Test Accuracy: 0.9216
Model saved to: backend/models/brain_tumor_model.keras
Training completed successfully!
```

## 🔍 Troubleshooting

### Issue: `libc++abi: terminating due to uncaught exception` (macOS)

**Solution**: Use TensorFlow 2.15.0 instead of 2.20.0:
```bash
pip install tensorflow==2.15.0 numpy<2.0
```

### Issue: `No images found!`

**Solution**: Verify dataset exists:
```bash
ls data/brain_tumor_dataset/yes/ | wc -l  # Should show ~155 files
ls data/brain_tumor_dataset/no/ | wc -l   # Should show ~98 files
```

### Issue: Out of Memory

**Solution**: Reduce batch size in `train_model.py`:
- Change `batch_size=32` to `batch_size=16` or `batch_size=8`

### Issue: Training is too slow

**Solution**: 
- Use GPU if available (TensorFlow will automatically detect)
- Reduce epochs: Change `epochs=200` to `epochs=50` in `train_model.py`

## 📁 Output Files

After training, you'll have:
- `backend/models/brain_tumor_model.keras` - The trained model
- `backend/models/training_history.json` - Training metrics
- `backend/training_output.log` - Training log (if using Option 2)

## 🎉 Next Steps

After successful training:
1. The model is automatically saved to `backend/models/brain_tumor_model.keras`
2. Restart your backend server to load the new model:
   ```bash
   cd backend
   python3 main.py
   ```
3. Test the model by uploading an image through the frontend

## 💡 Tips

- **Monitor GPU usage** (if available): `nvidia-smi` (Linux) or Activity Monitor (macOS)
- **Check training progress**: Look for increasing accuracy and decreasing loss
- **Early stopping**: Training will stop automatically if no improvement is seen
- **Best model**: The model with highest validation accuracy is automatically saved

---

**Note**: Training locally gives you full control and no time limits, unlike cloud services!

