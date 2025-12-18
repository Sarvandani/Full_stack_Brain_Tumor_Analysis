# 🔧 CORS Fix - Update Backend Environment Variable

## Issue

CORS error: Frontend at `https://full-stack-brain-tumor-analysis-1q4r.onrender.com` cannot access backend at `https://full-stack-brain-tumor-analysis-sarvandan.onrender.com`

## Solution

The backend needs to allow the frontend URL in its CORS configuration.

### Option 1: Update via Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your **Backend service** (`brain-tumor-detection-api` or `full-stack-brain-tumor-analysis-sarvandan`)
3. Go to **Environment** tab
4. Find `ALLOWED_ORIGINS` environment variable
5. Update the value to:
   ```
   https://full-stack-brain-tumor-analysis-1q4r.onrender.com
   ```
6. Click **Save Changes**
7. Render will automatically redeploy

### Option 2: Wait for Auto-Deploy

The code has been updated to include the frontend URL in the default allowed origins. After Render redeploys from the latest commit, it should work automatically.

## Verify Fix

After updating, test the frontend:
1. Go to your frontend URL
2. Upload an image
3. Check browser console - CORS errors should be gone

## Current URLs

- **Backend**: `https://full-stack-brain-tumor-analysis-sarvandan.onrender.com`
- **Frontend**: `https://full-stack-brain-tumor-analysis-1q4r.onrender.com`

---

**Quick Fix**: Update `ALLOWED_ORIGINS` in Render Dashboard to include your frontend URL! 🚀

