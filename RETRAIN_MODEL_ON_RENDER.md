# 🔄 Retrain Model on Render

## Current Situation

✅ **Backend is live**: https://full-stack-brain-tumor-analysis-sarvandan.onrender.com

⚠️ **Model Issue**: The model was trained with an older TensorFlow version and is incompatible with TensorFlow 2.20.0

## Solution: Retrain the Model

You have two options:

### Option 1: Retrain on Render (Recommended for Quick Fix)

The backend has a `/train` endpoint that will retrain the model. However, **Render's free tier has memory limitations** (512MB), and training might fail due to memory constraints.

**Steps:**
1. Call the training endpoint:
   ```bash
   curl -X POST https://full-stack-brain-tumor-analysis-sarvandan.onrender.com/train
   ```

2. Monitor progress:
   ```bash
   curl https://full-stack-brain-tumor-analysis-sarvandan.onrender.com/train/status
   ```

3. Check Render logs for training progress

**⚠️ Warning**: This may fail on Render's free tier due to memory limits. If it fails, use Option 2.

### Option 2: Retrain Locally or on Colab (Recommended)

**Best approach**: Train the model locally or on Google Colab, then commit the new model to Git.

#### Using Google Colab:

1. Open `train_model_colab.ipynb` in Google Colab
2. Run all cells to train the model
3. Download the trained model: `backend/models/brain_tumor_model.keras`
4. Commit to Git:
   ```bash
   git add backend/models/brain_tumor_model.keras
   git commit -m "Add retrained model compatible with TensorFlow 2.20.0"
   git push origin main
   ```
5. Render will automatically redeploy with the new model

#### Using Local Training:

1. Make sure you have TensorFlow 2.15.0 installed (for macOS compatibility):
   ```bash
   cd backend
   pip install -r requirements_local.txt
   ```

2. Train the model:
   ```bash
   python3 train_model.py
   ```

3. Commit the new model:
   ```bash
   git add backend/models/brain_tumor_model.keras
   git commit -m "Add retrained model compatible with TensorFlow 2.20.0"
   git push origin main
   ```

4. Render will automatically redeploy

## Verify Model After Retraining

Once the new model is deployed, check:

```bash
curl https://full-stack-brain-tumor-analysis-sarvandan.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## Why This Happened

The model was trained with TensorFlow 2.15.0 (or earlier), but Render is using TensorFlow 2.20.0. TensorFlow 2.20.0 has breaking changes in model serialization, so the old model format is incompatible.

## Next Steps

1. **Choose retraining method** (Colab recommended)
2. **Train the model** with TensorFlow 2.20.0 compatible code
3. **Commit and push** the new model
4. **Wait for Render to redeploy** (automatic)
5. **Verify** the model loads correctly

---

**Note**: The backend is working fine - it just needs a compatible model! 🚀

