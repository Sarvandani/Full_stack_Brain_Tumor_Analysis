# Deployment Guide for Render

## Prerequisites

1. **Trained Model**: Make sure you have trained the model before deploying:
   ```bash
   cd backend
   python train_model.py
   ```
   This creates `backend/models/brain_tumor_model.keras`

2. **Git Repository**: Push your code to GitHub/GitLab/Bitbucket

## Deployment Steps

### Option 1: Deploy Both Services (Recommended)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Create New Web Service** for Backend:
   - Connect your repository
   - Name: `brain-tumor-detection-api`
   - Environment: `Python 3`
   - Build Command: `cd backend && pip install -r requirements.txt`
   - Start Command: `cd backend && python main.py`
   - Add Environment Variable: `PORT` = `5001` (or let Render assign)

3. **Create New Static Site** for Frontend:
   - Connect same repository
   - Name: `brain-tumor-detection-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Add Environment Variable: `VITE_API_URL` = your backend URL

### Option 2: Use render.yaml (Simpler)

1. Push code to repository
2. In Render Dashboard, select "New" → "Blueprint"
3. Connect repository
4. Render will automatically detect `render.yaml` and create services

## Environment Variables

### Backend
- `PORT`: Port number (Render will set this automatically)
- `PYTHON_VERSION`: `3.9.6` (optional)

### Frontend
- `VITE_API_URL`: Your backend API URL (e.g., `https://brain-tumor-detection-api.onrender.com`)

## Important Notes

1. **Model File**: Make sure `backend/models/brain_tumor_model.keras` is committed to git or uploaded separately
   - If model is large, consider using Render's persistent disk
   - Or upload model to cloud storage (S3, etc.) and download on startup

2. **Training Data**: The `data/` folder is needed only for training, not for predictions
   - You can exclude it from deployment if model is already trained
   - Add to `.gitignore` if not needed

3. **CORS**: Update CORS origins in `backend/main.py` to include your Render frontend URL

4. **Build Time**: First deployment may take 10-15 minutes due to TensorFlow installation

## Updating CORS for Production

Edit `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-url.onrender.com",
        "http://localhost:4001",  # Keep for local development
    ],
    # ... rest of config
)
```

## Troubleshooting

### Model Not Found
- Ensure model file is in repository or uploaded to persistent storage
- Check build logs for model loading errors

### Build Fails
- Check Python version (should be 3.9+)
- Verify all dependencies in `requirements.txt`
- Check build logs for specific errors

### CORS Errors
- Update CORS origins to include your Render frontend URL
- Restart backend service after changes

## Cost Considerations

- **Free Tier**: Services spin down after 15 minutes of inactivity
- **Starter Plan**: $7/month per service (always on)
- **Standard Plan**: $25/month per service (better performance)

For production, consider at least Starter plan to avoid cold starts.

