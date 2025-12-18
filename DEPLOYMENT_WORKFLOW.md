# 🚀 Deployment Workflow Guide

## Quick Summary

| What You're Updating | Need to Redeploy? | How to Update |
|---------------------|-------------------|---------------|
| **Frontend code** (React, CSS, JS) | ✅ **YES** - Static Site | Push to GitHub → Render auto-deploys (or manual deploy) |
| **Backend code** (main.py, train_model.py, etc.) | ✅ **YES** - Backend Service | Push to GitHub → Render auto-deploys (or manual deploy) |
| **Model file** (new .keras file) | ❌ **NO** - Use `/train` endpoint | POST to `/train` endpoint (trains on server) |
| **Dependencies** (requirements.txt, package.json) | ✅ **YES** - Both services | Push to GitHub → Redeploy both services |

---

## 📋 Detailed Workflow

### 1. **Frontend Updates** (React, CSS, JavaScript)

**When to redeploy:**
- ✅ Changed any `.jsx`, `.js`, `.css` files
- ✅ Updated `package.json` dependencies
- ✅ Modified `vite.config.js`
- ✅ Changed any files in `frontend/src/` or `frontend/public/`

**Steps:**
```bash
# 1. Make your changes locally
# 2. Commit and push to GitHub
git add frontend/
git commit -m "Update frontend: [description]"
git push origin main

# 3. Render will auto-deploy (if enabled) OR manually deploy:
#    - Go to Render Dashboard → Frontend Static Site
#    - Click "Manual Deploy" → "Deploy latest commit"
#    - Wait 2-3 minutes for build
#    - Clear browser cache (Ctrl+Shift+R)
```

**What happens:**
- Render runs: `cd frontend && npm install && npm run build`
- Builds React app to `frontend/dist/`
- Serves static files from `frontend/dist/`

---

### 2. **Backend Code Updates** (Python files, API endpoints)

**When to redeploy:**
- ✅ Changed `main.py`, `train_model.py`, or any Python files
- ✅ Updated `requirements.txt`
- ✅ Modified environment variables
- ✅ Changed API endpoints or logic

**Steps:**
```bash
# 1. Make your changes locally
# 2. Commit and push to GitHub
git add backend/
git commit -m "Update backend: [description]"
git push origin main

# 3. Render will auto-deploy (if enabled) OR manually deploy:
#    - Go to Render Dashboard → Backend Web Service
#    - Click "Manual Deploy" → "Deploy latest commit"
#    - Wait 3-5 minutes for build and startup
```

**What happens:**
- Render runs: `cd backend && pip install -r requirements.txt`
- Starts server: `cd backend && python main.py`
- Model loads on startup (if available)

---

### 3. **Model Updates** (Training a new model)

**When to redeploy:**
- ❌ **NO** - You can train on Render without redeploying!

**Steps (Option A - Train on Render):**
```bash
# 1. POST to /train endpoint (trains model on Render server)
curl -X POST https://your-backend-url.onrender.com/train

# 2. Check training status
curl https://your-backend-url.onrender.com/train/status

# 3. Model is automatically loaded after training completes
#    No redeployment needed!
```

**Steps (Option B - Upload pre-trained model):**
```bash
# 1. Train model locally or on Colab
# 2. Upload model file to Render (via Render Shell or Git)
# 3. Redeploy backend to load new model
```

**What happens:**
- Training runs in background thread (doesn't block API)
- Model is saved to `backend/models/brain_tumor_model.keras`
- Model is automatically loaded after training
- **No redeployment needed!**

---

## 🔄 Auto-Deploy vs Manual Deploy

### Auto-Deploy (Recommended)
- ✅ Render automatically deploys when you push to GitHub
- ✅ Set in Render Dashboard → Settings → "Auto-Deploy: Yes"
- ✅ Works for both frontend and backend

### Manual Deploy
- Use when auto-deploy is disabled
- Use when you want to deploy a specific commit
- Go to Render Dashboard → Service → "Manual Deploy"

---

## 🎯 Common Scenarios

### Scenario 1: "I changed the homepage text"
**Action:** Push frontend changes → Redeploy static site

### Scenario 2: "I added a new API endpoint"
**Action:** Push backend changes → Redeploy backend service

### Scenario 3: "I want to retrain the model with new data"
**Action:** POST to `/train` endpoint → **No redeployment needed!**

### Scenario 4: "I updated TensorFlow version"
**Action:** Update `requirements.txt` → Push → Redeploy backend

### Scenario 5: "I changed the API URL in frontend"
**Action:** Update `AnalysisPage.jsx` → Push → Redeploy static site

---

## ⚡ Quick Reference

### Frontend Deployment
```bash
git add frontend/
git commit -m "Update frontend"
git push origin main
# → Render auto-deploys OR manually deploy static site
```

### Backend Deployment
```bash
git add backend/
git commit -m "Update backend"
git push origin main
# → Render auto-deploys OR manually deploy web service
```

### Model Training (No Redeploy!)
```bash
curl -X POST https://your-backend.onrender.com/train
# → Model trains and loads automatically
```

---

## 🔍 How to Check if Auto-Deploy is Enabled

1. Go to **Render Dashboard**
2. Click on your service (frontend or backend)
3. Go to **Settings** tab
4. Look for **"Auto-Deploy"** section
5. Should say **"Yes"** for automatic deployments

---

## 💡 Pro Tips

1. **Always test locally first** before pushing to GitHub
2. **Clear browser cache** after frontend deployments (Ctrl+Shift+R)
3. **Check Render logs** if deployment fails
4. **Model training** can take 10-30 minutes - be patient!
5. **Use `/train/status`** endpoint to monitor training progress

---

## 🆘 Troubleshooting

### "Changes not showing on Render"
- ✅ Check if latest commit is deployed (Render Dashboard → Events)
- ✅ Clear browser cache (Ctrl+Shift+R)
- ✅ Manually trigger redeploy
- ✅ Check build logs for errors

### "Model not loading"
- ✅ Check `/health` endpoint: `curl https://your-backend.onrender.com/health`
- ✅ Check if model file exists in `backend/models/`
- ✅ Train model via `/train` endpoint if missing
- ✅ Check backend logs for errors

### "Build failing on Render"
- ✅ Check build logs in Render Dashboard
- ✅ Verify `package.json` or `requirements.txt` syntax
- ✅ Check for missing dependencies
- ✅ Ensure Python/Node versions are compatible

