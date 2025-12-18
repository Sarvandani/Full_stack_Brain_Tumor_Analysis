# 🚀 Render Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Model Status
- ✅ Model file exists: `backend/models/brain_tumor_model.keras` (26.83 MB)
- ✅ Model is compatible with TensorFlow 2.20.0
- ✅ Backend code is ready to load the model

### 2. Frontend Build
- ✅ React app builds successfully
- ✅ SPA routing configured with `_redirects` file
- ✅ Build output in `frontend/dist/`

## 📋 Deployment Steps

### Step 1: Deploy Backend

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository: `Sarvandani/Full_stack_Brain_Tumor_Analysis`
4. Render will detect `render.yaml` automatically
5. The backend service will be created as `brain-tumor-detection-api`

**Backend Configuration:**
- **Build Command**: `cd backend && pip install -r requirements.txt`
- **Start Command**: `cd backend && python main.py`
- **Environment Variables**:
  - `PORT`: `5001`
  - `ALLOWED_ORIGINS`: `https://brain-tumor-detection-frontend.onrender.com` (update after frontend deploys)

### Step 2: Deploy Frontend

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `brain-tumor-detection-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://brain-tumor-detection-api.onrender.com` (your backend URL)

### Step 3: Update Backend CORS

After frontend deploys, update backend environment variable:
- `ALLOWED_ORIGINS`: `https://brain-tumor-detection-frontend.onrender.com`

## 🔧 SPA Routing Configuration

The React Router SPA routing is configured via:

1. **`frontend/public/_redirects`** - Automatically copied to `dist/` during build
   ```
   /*    /index.html   200
   ```

2. **`render.yaml`** - Routes configuration for Render
   ```yaml
   routes:
     - type: rewrite
       source: /*
       destination: /index.html
   ```

This ensures all routes (like `/analyze`) redirect to `index.html` so React Router can handle them client-side.

## 🌐 URLs After Deployment

- **Backend API**: `https://brain-tumor-detection-api.onrender.com`
- **Frontend**: `https://brain-tumor-detection-frontend.onrender.com`

## ✅ Verification

1. **Backend Health Check**: 
   ```
   https://brain-tumor-detection-api.onrender.com/health
   ```

2. **Frontend Homepage**: 
   ```
   https://brain-tumor-detection-frontend.onrender.com
   ```

3. **Frontend Analysis Page**: 
   ```
   https://brain-tumor-detection-frontend.onrender.com/analyze
   ```

4. **Test Image Upload**: Upload an MRI image and verify prediction works

## 🐛 Troubleshooting

### Issue: 404 on `/analyze` route
**Solution**: The `_redirects` file should be in `frontend/dist/` after build. Verify it exists.

### Issue: CORS errors
**Solution**: Update `ALLOWED_ORIGINS` in backend environment variables to include your frontend URL.

### Issue: API connection fails
**Solution**: Check `VITE_API_URL` environment variable in frontend service matches your backend URL.

### Issue: Model not loading
**Solution**: Verify model file is committed to Git (it's 27MB, so ensure Git LFS is not blocking it).

## 📝 Notes

- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Model file (27MB) is included in the repository
- Backend uses TensorFlow 2.20.0 (compatible with Python 3.13)

---

**Ready to deploy!** 🚀

