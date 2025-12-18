# Memory Issue on Render - Solutions

## 🔴 Problem

Render free tier has **512MB memory limit**. TensorFlow + model training exceeds this, causing:
- `Ran out of memory (used over 512MB)`
- Service crashes and recovers repeatedly

## ✅ Solutions (Choose One)

### Solution 1: Upgrade Render Plan (Recommended)

**Easiest and most reliable:**

1. Go to Render Dashboard → Your backend service
2. Click **"Settings"** → **"Plan"**
3. Upgrade to **"Starter"** ($7/month) which includes:
   - **512MB → 2GB RAM** (4x more memory)
   - Always-on (no spin-down)
   - Better for ML workloads

**Pros:**
- ✅ Immediate fix
- ✅ More reliable
- ✅ Better performance

**Cons:**
- ❌ Costs $7/month

---

### Solution 2: Train Model Locally, Upload to Render

**Free option - train on your machine:**

1. **Train model locally** (on your Mac):
   ```bash
   cd backend
   python3 train_model.py
   ```

2. **Commit the trained model to Git**:
   ```bash
   git add backend/models/brain_tumor_model.keras
   git commit -m "Add trained model"
   git push origin main
   ```

3. **Render will use the pre-trained model** (no training needed on Render)

**Pros:**
- ✅ Free
- ✅ No memory issues
- ✅ Faster deployment

**Cons:**
- ❌ Need to retrain locally if model needs updates
- ❌ Model file is large (~27MB) in Git

---

### Solution 3: Optimize Training for Lower Memory

**Reduce memory usage during training:**

1. **Reduce batch size** in `train_model.py`
2. **Reduce image size** (currently 128x128, could go to 64x64)
3. **Train in smaller chunks**

**Pros:**
- ✅ Free
- ✅ Works on free tier

**Cons:**
- ❌ May reduce model accuracy
- ❌ Still might hit memory limits

---

### Solution 4: Use Render's Shell to Train

**Train directly on Render via SSH:**

1. Go to Render Dashboard → Your backend service
2. Click **"Shell"** (if available on your plan)
3. Run training directly:
   ```bash
   cd backend
   python train_model.py
   ```

**Pros:**
- ✅ Uses Render's resources
- ✅ Can monitor directly

**Cons:**
- ❌ Shell may not be available on free tier
- ❌ Still has memory limits

---

## 🎯 Recommended Approach

**For immediate fix:**
1. **Train model locally** (Solution 2) - fastest and free
2. **Commit and push** the model file
3. **Render will use it** without training

**For long-term:**
- **Upgrade to Starter plan** ($7/month) for better performance

---

## 📋 Quick Steps to Train Locally

```bash
# 1. Make sure you have TensorFlow 2.20.0
cd backend
pip3 install tensorflow==2.20.0 numpy>=1.26.0 --upgrade

# 2. Train the model (takes 10-15 minutes)
python3 train_model.py

# 3. Verify model was created
ls -lh models/brain_tumor_model.keras

# 4. Commit and push
cd ..
git add backend/models/brain_tumor_model.keras
git commit -m "Add trained model for TensorFlow 2.20.0"
git push origin main

# 5. Render will auto-deploy with the model
```

---

## ⚠️ Important Notes

1. **Model file size**: ~27MB - make sure it's in `.gitignore` is NOT ignoring it
2. **Git LFS**: Consider using Git LFS for large files (optional)
3. **Memory limits**: Free tier is very limited for ML workloads

---

**Current Status**: Service is crashing due to memory limits  
**Best Action**: Train model locally and push it to Git (Solution 2)

