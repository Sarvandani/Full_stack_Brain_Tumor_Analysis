# 🚨 Important: TensorFlow 2.20.0 macOS Compatibility Issue

## Problem

TensorFlow 2.20.0 has **known compatibility issues with macOS**, causing crashes:
```
libc++abi: terminating due to uncaught exception of type std::__1::system_error: mutex lock failed: Invalid argument
```

## Solution: Use Google Colab (Recommended)

Since Render uses TensorFlow 2.20.0, we need to train with the same version. **Google Colab runs on Linux** and supports TensorFlow 2.20.0 without issues.

### Quick Steps:

1. **Open Google Colab**: https://colab.research.google.com/

2. **Upload the notebook**: `train_model_colab.ipynb`

3. **Run all cells** - The notebook will:
   - Install TensorFlow 2.20.0
   - Clone/download your dataset
   - Train the model
   - Save it in a format compatible with Render

4. **Download the trained model**:
   - After training completes, download `brain_tumor_model.keras` from Colab

5. **Commit to Git**:
   ```bash
   # Copy the downloaded model to your project
   cp ~/Downloads/brain_tumor_model.keras backend/models/
   
   # Commit and push
   git add backend/models/brain_tumor_model.keras
   git commit -m "Add retrained model compatible with TensorFlow 2.20.0"
   git push origin main
   ```

6. **Render will auto-deploy** with the new model

## Alternative: Use Docker (Advanced)

If you really want to train locally, you can use Docker to run Linux:

```bash
# Create Dockerfile for training
docker run -it --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  python:3.11-slim \
  bash -c "pip install tensorflow==2.20.0 numpy>=1.26.0 Pillow scikit-learn && cd backend && python train_model.py"
```

## Why This Happens

- **macOS**: TensorFlow 2.20.0 has threading/mutex issues on macOS
- **Linux (Colab/Render)**: Works perfectly
- **Solution**: Train on Linux (Colab), deploy on Linux (Render)

---

**Recommendation**: Use Google Colab - it's free, fast, and guaranteed to work! 🚀

