# Step-by-Step Render Deployment Guide

## Prerequisites ✅
- ✅ GitHub repository created: https://github.com/Sarvandani/Full_stack_Brain_Tumor_Analysis
- ✅ Model trained and committed to git
- ✅ All code pushed to GitHub

## Deployment Steps

### Step 1: Sign Up / Login to Render
1. Go to https://render.com
2. Sign up or log in with your GitHub account
3. Authorize Render to access your GitHub repositories

### Step 2: Deploy Backend (API Service)

1. **Click "New +" → "Web Service"**
2. **Connect Repository**:
   - Select: `Sarvandani/Full_stack_Brain_Tumor_Analysis`
   - Click "Connect"

3. **Configure Backend Service**:
   - **Name**: `brain-tumor-detection-api` (or any name you prefer)
   - **Region**: Choose closest to you (e.g., `Oregon (US West)`)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or set to `backend` if needed)
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```bash
     cd backend && pip install -r requirements.txt
     ```
   - **Start Command**: 
     ```bash
     cd backend && python main.py
     ```
   - **Plan**: Choose `Free` (for testing) or `Starter` ($7/month for always-on)

4. **Environment Variables** (Click "Advanced"):
   - `PORT`: Leave empty (Render will set automatically)
   - `ALLOWED_ORIGINS`: Leave empty for now (we'll update after frontend is deployed)

5. **Click "Create Web Service"**
   - ⏱️ First build takes 10-15 minutes (TensorFlow installation)
   - ✅ Wait for "Live" status

6. **Note Your Backend URL**:
   - Example: `https://brain-tumor-detection-api.onrender.com`
   - Copy this URL - you'll need it for the frontend

### Step 3: Update CORS for Backend

After backend is deployed, update CORS to allow your frontend:

1. In Render Dashboard, go to your backend service
2. Click "Environment" tab
3. Add/Update environment variable:
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-frontend-url.onrender.com,http://localhost:4001`
   (Replace `your-frontend-url` with your actual frontend URL after Step 4)
4. Click "Save Changes"
5. Service will automatically redeploy

### Step 4: Deploy Frontend (Static Site)

1. **Click "New +" → "Static Site"**

2. **Connect Repository**:
   - Select: `Sarvandani/Full_stack_Brain_Tumor_Analysis`
   - Click "Connect"

3. **Configure Frontend**:
   - **Name**: `brain-tumor-detection-frontend`
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Build Command**: 
     ```bash
     cd frontend && npm install && npm run build
     ```
   - **Publish Directory**: 
     ```
     frontend/dist
     ```

4. **Environment Variables**:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from Step 2
     - Example: `https://brain-tumor-detection-api.onrender.com`

5. **Click "Create Static Site"**
   - ⏱️ Build takes 2-5 minutes
   - ✅ Wait for "Live" status

6. **Note Your Frontend URL**:
   - Example: `https://brain-tumor-detection-frontend.onrender.com`

### Step 5: Update Backend CORS with Frontend URL

1. Go back to your backend service in Render
2. Update `ALLOWED_ORIGINS` environment variable:
   - **Value**: `https://brain-tumor-detection-frontend.onrender.com,http://localhost:4001`
   (Use your actual frontend URL)
3. Save and wait for redeploy

### Step 6: Test Your Deployment

1. Visit your frontend URL: `https://your-frontend-url.onrender.com`
2. Test the homepage
3. Try uploading an image for analysis
4. Check if predictions work

## Alternative: Using render.yaml (Faster)

If you prefer automated setup:

1. **Click "New +" → "Blueprint"**
2. **Connect Repository**: Select your repo
3. Render will automatically detect `render.yaml`
4. Review the services it will create
5. Click "Apply"
6. Render will create both services automatically
7. **Important**: After deployment, update:
   - Frontend `VITE_API_URL` with actual backend URL
   - Backend `ALLOWED_ORIGINS` with actual frontend URL

## Important Notes

### Model File Size
- Your model file (`brain_tumor_model.keras`) is ~27MB
- This is fine for GitHub and Render
- If you have issues, the model is already in your repo ✅

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- For production, consider Starter plan ($7/month) for always-on

### Build Time
- First backend build: 10-15 minutes (TensorFlow installation)
- Subsequent builds: 3-5 minutes
- Frontend builds: 2-5 minutes

### Troubleshooting

**Backend won't start:**
- Check build logs in Render dashboard
- Verify model file exists: `backend/models/brain_tumor_model.keras`
- Check Python version (should be 3.9+)

**CORS errors:**
- Make sure `ALLOWED_ORIGINS` includes your frontend URL
- Restart backend after updating environment variables

**Frontend can't connect:**
- Verify `VITE_API_URL` is set correctly
- Check backend is running (visit `/health` endpoint)
- Check browser console for errors

## Quick Checklist

- [ ] Backend deployed and running
- [ ] Backend URL noted
- [ ] Frontend deployed
- [ ] Frontend URL noted
- [ ] `VITE_API_URL` set in frontend
- [ ] `ALLOWED_ORIGINS` updated in backend
- [ ] Tested image upload and prediction

## Your URLs After Deployment

- **Backend**: `https://brain-tumor-detection-api.onrender.com`
- **Frontend**: `https://brain-tumor-detection-frontend.onrender.com`
- **Backend Health Check**: `https://brain-tumor-detection-api.onrender.com/health`
- **API Docs**: `https://brain-tumor-detection-api.onrender.com/docs`

## Support

If you encounter issues:
1. Check Render build logs
2. Check Render service logs
3. Verify environment variables are set correctly
4. Ensure model file is in the repository

Good luck with your deployment! 🚀

