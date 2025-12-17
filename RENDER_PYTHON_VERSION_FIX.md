# How to Set Python Version in Render (When runtime.txt Doesn't Work)

## The Problem
Render is using Python 3.13.4, but TensorFlow 2.15.0 requires Python 3.9-3.11.

## Solution: Update Service Settings

Since there's no direct "Python Version" field in the dashboard, try these methods:

### Method 1: Update Build Command (Recommended)

1. Go to your backend service in Render Dashboard
2. Click **"Settings"** tab
3. Find **"Build Command"** field
4. Change it to:
   ```bash
   python3.9 -m pip install -r backend/requirements.txt || cd backend && pip install -r requirements.txt
   ```
   Or simpler:
   ```bash
   cd backend && python3.9 -m pip install -r requirements.txt
   ```

### Method 2: Add Build Script

1. In Render Dashboard → Your Service → Settings
2. Change **"Build Command"** to:
   ```bash
   chmod +x backend/build.sh && backend/build.sh
   ```

### Method 3: Use Environment Variable in Build

1. Go to **"Environment"** tab
2. Add environment variable:
   - **Key**: `PYTHON_VERSION`
   - **Value**: `3.9.18`
3. Change **"Build Command"** to:
   ```bash
   cd backend && python3.9 -m pip install -r requirements.txt || pip install -r requirements.txt
   ```

### Method 4: Contact Render Support

If none of the above work, the issue might be that Render's free tier doesn't support Python version selection. You may need to:

1. Upgrade to Starter plan ($7/month) which has more configuration options
2. Or contact Render support to enable Python version selection

## Alternative: Retrain Model with TensorFlow 2.20.0

If you can't change Python version, you'll need to retrain the model:

1. Update `backend/requirements.txt` to use `tensorflow==2.20.0`
2. Retrain the model locally with Python 3.13
3. Push the new model to GitHub
4. Deploy again

This will take 10-15 minutes to retrain.

## Quick Fix: Try This Build Command

In Render Dashboard → Settings → Build Command, use:

```bash
cd backend && python3.9 -m pip install --upgrade pip && python3.9 -m pip install -r requirements.txt
```

If Python 3.9 is not available, Render will use the default Python, and you'll need to either:
- Upgrade your Render plan
- Retrain the model with TensorFlow 2.20.0

