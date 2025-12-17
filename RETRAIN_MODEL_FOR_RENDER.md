# Retrain Model for Render Deployment

## Why Retrain?

Render's free tier uses Python 3.13.4, which only supports TensorFlow 2.20.0. Your current model was trained with TensorFlow 2.15.0 and is incompatible.

## Solution: Retrain with TensorFlow 2.20.0

### Step 1: Update Local Environment (Optional)

If you want to test locally first:

```bash
cd backend
pip install tensorflow==2.20.0 --upgrade
```

### Step 2: Retrain the Model

```bash
cd backend
python train_model.py
```

This will:
- Train a new model compatible with TensorFlow 2.20.0
- Save to `backend/models/brain_tumor_model.keras`
- Take 10-15 minutes

### Step 3: Commit and Push

```bash
git add backend/models/brain_tumor_model.keras
git commit -m "Retrain model with TensorFlow 2.20.0 for Render compatibility"
git push origin main
```

### Step 4: Deploy on Render

After pushing, Render will automatically redeploy with the new model.

## What Changed

- Updated `requirements.txt` to use `tensorflow==2.20.0`
- Updated model architecture to use `MaxPooling2D` instead of `MaxPool2D` (TF 2.20.0 syntax)
- Updated optimizer to use `keras.optimizers.Adam` directly
- Model loading now has compatibility fallbacks

## Note

The new model will be compatible with Python 3.13 and TensorFlow 2.20.0, which is what Render uses by default.

