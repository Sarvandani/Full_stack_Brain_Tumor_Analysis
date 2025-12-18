# Train Model on Google Colab (Free & Easy)

## Why Colab?

- ✅ TensorFlow 2.20.0 works perfectly
- ✅ Free GPU available (faster training)
- ✅ No macOS compatibility issues
- ✅ Takes 5-10 minutes instead of 15

## Step-by-Step Guide

### Step 1: Open Google Colab

1. Go to https://colab.research.google.com
2. Click **"New notebook"**

### Step 2: Upload Your Code

1. **Upload `train_model.py`**:
   - Click folder icon (left sidebar)
   - Click upload button
   - Select `backend/train_model.py`

2. **Upload dataset** (or use GitHub):
   - Option A: Upload `data/brain_tumor_dataset` folder
   - Option B: Clone from GitHub (see Step 3)

### Step 3: Clone from GitHub (Easier)

In a Colab cell, run:
```python
!git clone https://github.com/Sarvandani/Full_stack_Brain_Tumor_Analysis.git
!cd Full_stack_Brain_Tumor_Analysis
```

### Step 4: Install Dependencies

In a new cell:
```python
!pip install tensorflow==2.20.0 numpy>=1.26.0 Pillow scikit-learn
```

### Step 5: Run Training

In a new cell:
```python
import os
os.chdir('/content/Full_stack_Brain_Tumor_Analysis/backend')
!python train_model.py
```

### Step 6: Download the Model

After training completes:
```python
from google.colab import files
files.download('models/brain_tumor_model.keras')
```

### Step 7: Add to Your Project

1. **Move downloaded model** to your local project:
   ```bash
   mv ~/Downloads/brain_tumor_model.keras backend/models/
   ```

2. **Commit and push**:
   ```bash
   git add backend/models/brain_tumor_model.keras
   git commit -m "Add trained model for TensorFlow 2.20.0"
   git push origin main
   ```

---

## Quick Colab Notebook

Copy this into Colab:

```python
# Install dependencies
!pip install tensorflow==2.20.0 numpy>=1.26.0 Pillow scikit-learn

# Clone repo
!git clone https://github.com/Sarvandani/Full_stack_Brain_Tumor_Analysis.git
%cd Full_stack_Brain_Tumor_Analysis/backend

# Train model
!python train_model.py

# Download model
from google.colab import files
files.download('models/brain_tumor_model.keras')
```

---

## Alternative: Use Existing Model (May Not Work)

If you want to try using the existing model:

1. **Commit the existing model**:
   ```bash
   git add backend/models/brain_tumor_model.keras
   git commit -m "Add existing model (may need retraining)"
   git push origin main
   ```

2. **Render will try to load it** - if it fails, you'll need to retrain

---

**Recommended**: Use Google Colab - it's free, fast, and guaranteed to work! 🚀

