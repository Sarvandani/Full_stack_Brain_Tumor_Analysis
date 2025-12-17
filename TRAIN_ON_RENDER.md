# Train Model Directly on Render

## The Issue

TensorFlow 2.20.0 has compatibility issues on macOS, but it works fine on Linux (which Render uses).

## Solution: Train on Render

Since local training is problematic, we can train the model directly on Render:

### Option 1: One-Time Training Service

1. **Create a temporary Web Service on Render**:
   - Name: `brain-tumor-train-model` (temporary)
   - Environment: `Python 3`
   - Build Command: `cd backend && pip install -r requirements.txt`
   - Start Command: `cd backend && python train_model.py`
   - Plan: `Free` or `Starter`

2. **Let it train** (10-15 minutes)
   - Monitor the logs
   - Wait for "Training completed successfully!"

3. **Download the model**:
   - The model will be saved to `backend/models/brain_tumor_model.keras`
   - Use Render's file browser or SSH to download it
   - Or commit it to git from the service

4. **Delete the training service** after getting the model

### Option 2: Add Training Endpoint (Recommended)

Add a training endpoint to your main backend that can be triggered manually:

1. Add to `backend/main.py`:
```python
@app.post("/train")
async def train_model_endpoint():
    """Train the model (one-time use)"""
    import subprocess
    result = subprocess.run(
        ["python", "train_model.py"],
        cwd="backend",
        capture_output=True,
        text=True
    )
    return {"status": "completed", "output": result.stdout}
```

2. Deploy backend
3. Call the endpoint once: `POST https://your-backend.onrender.com/train`
4. Wait for completion
5. Model will be saved and ready to use

### Option 3: Use Google Colab (Free GPU)

1. Upload your code to Google Colab
2. Install TensorFlow 2.20.0
3. Run training (faster with GPU)
4. Download the model
5. Commit to GitHub

## Current Status

- ✅ Code updated for TensorFlow 2.20.0
- ✅ Requirements.txt fixed (NumPy < 2.0)
- ⏳ Model needs to be retrained with TF 2.20.0
- ⚠️ Local training has macOS compatibility issues

## Quick Fix: Use Existing Model with Compatibility Layer

Alternatively, we can modify the model loading to handle the version mismatch, but this is less reliable.

