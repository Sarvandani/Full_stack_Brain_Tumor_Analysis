# How to Get Your Backend URL After Deployment

## ✅ Yes! You'll Get a URL After Successful Deployment

Render automatically assigns a URL to your backend service. Here's how to find it:

## 🔍 Finding Your Backend URL

### Step 1: Go to Render Dashboard
1. Log in to https://dashboard.render.com
2. You'll see your services listed

### Step 2: Open Your Backend Service
1. Click on `brain-tumor-detection-api` (or whatever name you used)
2. The URL is displayed at the **top of the page**

### Step 3: Copy the URL
The URL will look like one of these:
- ✅ `https://brain-tumor-detection-api.onrender.com` (if name is available)
- ✅ `https://brain-tumor-detection-api-xxxx.onrender.com` (if Render adds a suffix)
- ✅ `https://brain-tumor-detection-api-abc123.onrender.com` (with random suffix)

**Example locations in Render dashboard:**
```
┌─────────────────────────────────────────┐
│ brain-tumor-detection-api               │
│                                         │
│ https://brain-tumor-detection-api-xxxx  │ ← HERE!
│ .onrender.com                           │
│                                         │
│ Status: Live                            │
└─────────────────────────────────────────┘
```

## 📋 What to Do With This URL

### For Frontend Environment Variable:
1. **Copy the exact URL** from Render dashboard
2. **Go to your frontend service** (or create it)
3. **Add environment variable**:
   - Key: `VITE_API_URL`
   - Value: `https://your-actual-backend-url.onrender.com` (paste the URL you copied)

### For Backend CORS Configuration:
1. **Copy your frontend URL** (after you deploy it)
2. **Go to backend service** → Environment variables
3. **Update `ALLOWED_ORIGINS`** to include your frontend URL:
   ```
   https://brain-tumor-detection-frontend.onrender.com,https://your-frontend-url.onrender.com
   ```

## ⚠️ Important Notes

1. **URL Format**: 
   - Service name: `brain-tumor-detection-api`
   - URL might be: `brain-tumor-detection-api.onrender.com` OR `brain-tumor-detection-api-xxxx.onrender.com`
   - Both are valid! Use the exact one Render shows you.

2. **URL is Permanent**: 
   - Once assigned, the URL stays the same
   - Even if you redeploy, the URL doesn't change

3. **Check After Deployment**:
   - Wait for status to show "Live" ✅
   - Then copy the URL
   - Use it in frontend's `VITE_API_URL`

## 🎯 Quick Checklist

- [ ] Backend deployed successfully
- [ ] Status shows "Live"
- [ ] Copied backend URL from Render dashboard
- [ ] Used this URL in frontend's `VITE_API_URL` environment variable
- [ ] Tested frontend can connect to backend

---

**TL;DR**: Yes! After deployment, check your backend service page in Render dashboard - the URL will be displayed at the top. Copy it and use it for your frontend's `VITE_API_URL`.

