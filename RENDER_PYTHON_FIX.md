# Fix Python Version in Render Dashboard

## The Problem
Render is using Python 3.13.4, but TensorFlow 2.15.0 only supports Python 3.9-3.11.

## Solution: Set Python Version Manually in Render

### Step 1: Go to Your Backend Service
1. Open Render Dashboard: https://dashboard.render.com
2. Click on your backend service (e.g., `brain-tumor-detection-api`)

### Step 2: Set Python Version
1. Click **"Settings"** tab
2. Scroll down to **"Build & Deploy"** section
3. Find **"Python Version"** field
4. Enter: `3.9.18`
5. Click **"Save Changes"**

### Step 3: Redeploy
1. Click **"Manual Deploy"** button
2. Select **"Deploy latest commit"**
3. Wait for build to complete (10-15 minutes)

## Alternative: Use Environment Variable

If the Python Version field doesn't work:

1. Go to **"Environment"** tab
2. Add environment variable:
   - **Key**: `PYTHON_VERSION`
   - **Value**: `3.9.18`
3. Click **"Save Changes"**
4. Redeploy

## Verify It's Working

After deployment, check the build logs. You should see:
```
==> Installing Python version 3.9.18...
==> Using Python version 3.9.18
```

Instead of:
```
==> Installing Python version 3.13.4...
```

## Why This Happens

- The `runtime.txt` file should work, but Render sometimes ignores it
- Manual setting in dashboard is more reliable
- TensorFlow 2.15.0 requires Python 3.9-3.11
- Your model was trained with TensorFlow 2.15.0, so we need to match that version

