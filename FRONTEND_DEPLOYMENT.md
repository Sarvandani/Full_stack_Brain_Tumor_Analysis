# Frontend Deployment Guide

## ✅ Good News: Frontend is Already Configured!

The frontend code is already set up to use environment variables:
- **Code**: Uses `import.meta.env.VITE_API_URL` (line 25 in `App.tsx`)
- **Render config**: Already in `render.yaml` with the correct backend URL

## 📋 Frontend Deployment Steps

### Option 1: Using render.yaml (Recommended - Already Configured!)

The `render.yaml` file already has the frontend service configured:

```yaml
- type: web
  name: brain-tumor-detection-frontend
  env: node
  buildCommand: cd frontend && npm install && npm run build
  startCommand: cd frontend && npm run preview
  envVars:
    - key: VITE_API_URL
      value: https://brain-tumor-detection-api.onrender.com
```

**To deploy:**
1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your GitHub repo
4. Render will automatically detect `render.yaml` and create both services
5. ✅ Frontend will be configured with the correct backend URL automatically!

### Option 2: Manual Static Site Creation

If you prefer to create the frontend separately:

1. **Go to Render Dashboard** → "New +" → "Static Site"
2. **Connect Repository**: Select your GitHub repo
3. **Configure**:
   - **Name**: `brain-tumor-detection-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables** (Important!):
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-actual-backend-url.onrender.com`
     - ⚠️ **Replace with your actual backend URL!**
     - Example: `https://brain-tumor-detection-api.onrender.com`
5. **Click "Create Static Site"**

## 🔍 How to Find Your Backend URL

1. Go to Render Dashboard
2. Open your backend service (`brain-tumor-detection-api`)
3. Copy the URL shown at the top (e.g., `https://brain-tumor-detection-api.onrender.com`)
4. Use this URL in the frontend's `VITE_API_URL` environment variable

## ⚠️ Important Notes

1. **Environment Variable**: `VITE_API_URL` must be set **before building**
   - Vite bakes environment variables into the build at build time
   - If you change it later, you need to rebuild

2. **CORS**: Make sure your backend's `ALLOWED_ORIGINS` includes your frontend URL
   - Backend should allow: `https://brain-tumor-detection-frontend.onrender.com`
   - This is already configured in `render.yaml`

3. **Build Time**: Frontend builds are fast (1-2 minutes)

## ✅ Verification

After deployment:
1. Visit your frontend URL
2. Open browser DevTools (F12) → Network tab
3. Try uploading an image
4. Check if requests go to: `https://your-backend-url.onrender.com/predict`
5. If you see CORS errors, check backend's `ALLOWED_ORIGINS`

## 🎯 Quick Checklist

- [ ] Backend is deployed and live
- [ ] Note your backend URL
- [ ] Deploy frontend (using render.yaml or manual)
- [ ] Set `VITE_API_URL` environment variable to backend URL
- [ ] Verify frontend can connect to backend
- [ ] Test image upload and prediction

---

**Current Status**: ✅ Frontend code is ready, just needs deployment on Render!

