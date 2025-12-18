# 🚀 Frontend Static Site Setup on Render

## ✅ Configuration Complete

Your frontend is configured as a **Static Site** on Render, just like the NLP project!

## 📋 Deployment Steps

### Step 1: Create Static Site on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository: `Sarvandani/Full_stack_Brain_Tumor_Analysis`

### Step 2: Configure Static Site

**Settings:**
- **Name**: `brain-tumor-detection-frontend` (or your preferred name)
- **Branch**: `main`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Step 3: Add Environment Variable

**Important:** Add this environment variable:

- **Key**: `VITE_API_URL`
- **Value**: `https://full-stack-brain-tumor-analysis-sarvandan.onrender.com`

This tells the frontend where to find your backend API.

### Step 4: Deploy

Click **"Create Static Site"** and wait for deployment (2-3 minutes).

## 🔗 URLs After Deployment

- **Backend**: `https://full-stack-brain-tumor-analysis-sarvandan.onrender.com`
- **Frontend**: `https://brain-tumor-detection-frontend.onrender.com` (or your chosen name)

## ✅ What's Already Configured

1. ✅ **SPA Routing**: `_redirects` file for React Router
2. ✅ **Build Config**: `vite.config.js` configured
3. ✅ **API URL**: Auto-detects localhost or uses Render backend
4. ✅ **Environment Variable**: Uses `VITE_API_URL` if set

## 🧪 Testing After Deployment

1. **Homepage**: Should load at your frontend URL
2. **Analysis Page**: Navigate to `/analyze` - should work (SPA routing)
3. **API Connection**: Upload an image - should connect to backend

## 🔧 If API Connection Fails

1. **Check Environment Variable**: Make sure `VITE_API_URL` is set correctly
2. **Check CORS**: Backend `ALLOWED_ORIGINS` should include your frontend URL
3. **Check Backend**: Verify backend is running at the URL

## 📝 Update Backend CORS (After Frontend Deploys)

Once you have your frontend URL, update backend environment variable:

1. Go to Backend service → Environment
2. Update `ALLOWED_ORIGINS` to include your frontend URL:
   ```
   https://brain-tumor-detection-frontend.onrender.com
   ```

---

**Ready to deploy!** Your frontend is configured exactly like the NLP project. 🎉

