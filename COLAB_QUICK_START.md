# 🚀 Quick Start: Train Model on Google Colab

## Step 1: Open Google Colab

1. Go to **https://colab.research.google.com**
2. Click **"File"** → **"Upload notebook"**
3. Upload `train_model_colab.ipynb` (the file I just created)

**OR** create a new notebook and copy the code from the notebook file.

## Step 2: Run the Notebook

1. **Enable GPU** (optional but faster):
   - Click **"Runtime"** → **"Change runtime type"**
   - Select **"GPU"** → **"Save"**

2. **Run all cells**:
   - Click **"Runtime"** → **"Run all"**
   - Or run each cell one by one (Shift+Enter)

## Step 3: Wait for Training

- **With GPU**: 5-10 minutes
- **Without GPU**: 10-15 minutes
- You'll see progress for each epoch

## Step 4: Download Model

The last cell will automatically download the model file.

## Step 5: Add to Your Project

After downloading:

```bash
# Move the downloaded file
mv ~/Downloads/brain_tumor_model.keras backend/models/

# Commit and push
git add backend/models/brain_tumor_model.keras
git commit -m "Add model trained with TensorFlow 2.20.0"
git push origin main
```

## Step 6: Render Auto-Deploys

Render will automatically detect the new model and deploy it!

---

## ✅ That's It!

The model will be trained with TensorFlow 2.20.0 and ready for Render deployment.

**Need help?** Check the notebook - it has detailed comments in each cell!

