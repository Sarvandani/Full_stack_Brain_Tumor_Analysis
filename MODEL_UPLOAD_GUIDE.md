# 📦 Model Upload Guide

## Issue: Model File Too Large (111MB > 100MB GitHub Limit)

The trained model is 111MB, which exceeds GitHub's 100MB file size limit.

## Solution Options

### Option 1: Use Git LFS (Recommended)

**Install Git LFS:**
```bash
# macOS
brew install git-lfs

# Or download from: https://git-lfs.github.com
```

**Then configure:**
```bash
git lfs install
git lfs track "*.keras"
git add .gitattributes
git add backend/models/brain_tumor_model.keras
git commit -m "Add model with Git LFS"
git push origin main
```

### Option 2: Train on Render

Since the model is too large for GitHub, you can train it directly on Render:

1. **Delete the local model** (it's already backed up as `.old`)
2. **Push code without model** to GitHub
3. **On Render**, call the training endpoint:
   ```bash
   curl -X POST https://full-stack-brain-tumor-analysis-sarvandan.onrender.com/train
   ```
4. **Monitor training**:
   ```bash
   curl https://full-stack-brain-tumor-analysis-sarvandan.onrender.com/train/status
   ```

**⚠️ Warning**: Render's free tier (512MB) may not have enough memory for training.

### Option 3: Use External Storage

1. Upload model to Google Drive / Dropbox
2. Download on Render during deployment using a script
3. Store download URL in environment variable

### Option 4: Compress Model

We can try saving in a more compressed format, but this may reduce compatibility.

---

## Current Status

✅ **Model trained successfully** with TensorFlow 2.20.0
✅ **Test Accuracy: 79.55%**
✅ **Model verified** - loads correctly with TF 2.20.0
❌ **Cannot push to GitHub** - file too large

## Recommended Next Steps

1. **Install Git LFS** (if you want to store model in Git)
2. **Or train on Render** (if you prefer not to use Git LFS)

---

**The model is ready and compatible with Render!** Just need to get it deployed. 🚀

