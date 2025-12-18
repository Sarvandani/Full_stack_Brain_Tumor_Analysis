# 🚨 URGENT: Fix CORS Error

## Problem

Frontend cannot access backend due to CORS policy:
- Frontend: `https://full-stack-brain-tumor-analysis-1q4r.onrender.com`
- Backend: `https://full-stack-brain-tumor-analysis-sarvandan.onrender.com`

## Immediate Fix (Do This Now!)

### Step 1: Update Backend Environment Variable

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Backend service** (the one with URL ending in `sarvandan.onrender.com`)
3. Click **Environment** tab (left sidebar)
4. Find `ALLOWED_ORIGINS` variable
5. **Update the value** to:
   ```
   https://full-stack-brain-tumor-analysis-1q4r.onrender.com
   ```
6. Click **Save Changes**
7. Render will automatically redeploy (takes 1-2 minutes)

### Step 2: Verify Fix

After redeploy completes:
1. Go to your frontend: `https://full-stack-brain-tumor-analysis-1q4r.onrender.com`
2. Try uploading an image
3. CORS errors should be gone!

## Model Issue

If you also see "model not available" errors:

1. **Check if model exists**: The model needs to be trained first
2. **Train the model** by calling:
   ```bash
   curl -X POST https://full-stack-brain-tumor-analysis-sarvandan.onrender.com/train
   ```
3. **Monitor training**:
   ```bash
   curl https://full-stack-brain-tumor-analysis-sarvandan.onrender.com/train/status
   ```

**Note**: Training takes 10-15 minutes. The model will be ready after training completes.

---

**Do Step 1 now to fix CORS!** The code has been updated, but you need to update the environment variable in Render Dashboard. 🚀

