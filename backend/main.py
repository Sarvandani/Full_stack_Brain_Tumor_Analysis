from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import io
import os

app = FastAPI(title="Brain Tumor Detection API")

# Enable CORS - Must be added before routes
# Get allowed origins from environment or use defaults
import os
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:4001,http://localhost:4000,http://localhost:3000,http://localhost:5173,http://127.0.0.1:4001"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Global variable to store the model
model = None
# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "brain_tumor_model.keras")

def load_model():
    """Load the trained model with compatibility handling"""
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model not found at {MODEL_PATH}. Please train the model first by POSTing to /train endpoint"
            )
        try:
            # Try loading with safe_mode=False for TF 2.20.0 compatibility
            model = keras.models.load_model(MODEL_PATH, safe_mode=False)
            print(f"✅ Model loaded from {MODEL_PATH}")
        except Exception as e:
            # Model is incompatible - needs retraining
            error_msg = str(e)
            if "batch_input_shape" in error_msg or "could not be deserialized" in error_msg or "Unrecognized keyword" in error_msg:
                # Old model incompatible - rename it and raise clear error
                old_model_path = MODEL_PATH + ".old"
                if os.path.exists(MODEL_PATH) and not os.path.exists(old_model_path):
                    import shutil
                    shutil.move(MODEL_PATH, old_model_path)
                    print(f"⚠️  Moved incompatible model to {old_model_path}")
                raise RuntimeError(
                    f"Model is incompatible with TensorFlow 2.20.0. "
                    f"The model was trained with an older version. Please retrain by POSTing to /train endpoint. "
                    f"Error: {error_msg[:300]}"
                )
            else:
                raise RuntimeError(
                    f"Failed to load model. Error: {error_msg[:300]}. "
                    f"Please retrain by POSTing to /train endpoint."
                )
    return model

def preprocess_image(image: Image.Image) -> np.ndarray:
    """Preprocess image for model prediction"""
    # Resize to 128x128 (model input size)
    image = image.resize((128, 128))
    # Convert to RGB if needed
    if image.mode != 'RGB':
        image = image.convert('RGB')
    # Convert to array
    img_array = np.array(image)
    # Normalize to [0, 1]
    img_array = img_array / 255.0
    # Reshape for model input: (1, 128, 128, 3)
    img_array = img_array.reshape(1, 128, 128, 3)
    return img_array

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    try:
        load_model()
        print("✅ Model loaded successfully!")
    except (FileNotFoundError, RuntimeError) as e:
        print(f"⚠️  Warning: {e}")
        print("⚠️  Model will be loaded on first prediction request")
        print("⚠️  To train the model, POST to /train endpoint")
        print("⚠️  Note: Old model is incompatible with TensorFlow 2.20.0 - retraining required")

@app.get("/")
async def root():
    return {"message": "Brain Tumor Detection API", "status": "running"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        model = load_model()
        return {"status": "healthy", "model_loaded": True}
    except Exception as e:
        return {"status": "unhealthy", "model_loaded": False, "error": str(e)}

@app.post("/train")
async def train_model_endpoint():
    """
    Train the model (one-time use on Render)
    This endpoint triggers model training and saves the model.
    WARNING: This takes 10-15 minutes to complete!
    """
    import subprocess
    import sys
    
    try:
        # Check if model already exists
        if os.path.exists(MODEL_PATH):
            return JSONResponse({
                "status": "info",
                "message": "Model already exists. Delete it first if you want to retrain.",
                "model_path": MODEL_PATH
            })
        
        # Run training script
        train_script = os.path.join(BASE_DIR, "train_model.py")
        result = subprocess.run(
            [sys.executable, train_script],
            cwd=BASE_DIR,
            capture_output=True,
            text=True,
            timeout=1800  # 30 minutes timeout
        )
        
        if result.returncode == 0:
            # Reload model after training
            global model
            model = None
            load_model()
            
            return JSONResponse({
                "status": "success",
                "message": "Model trained successfully!",
                "output": result.stdout[-1000:],  # Last 1000 chars
                "model_path": MODEL_PATH
            })
        else:
            return JSONResponse(
                status_code=500,
                content={
                    "status": "error",
                    "message": "Training failed",
                    "error": result.stderr[-1000:] if result.stderr else "Unknown error",
                    "output": result.stdout[-1000:] if result.stdout else ""
                }
            )
    except subprocess.TimeoutExpired:
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": "Training timed out after 30 minutes"
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": f"Error during training: {str(e)}"
            }
        )

@app.post("/predict")
async def predict_tumor(file: UploadFile = File(...)):
    """
    Predict if an uploaded image contains a brain tumor
    
    Returns:
    - has_tumor: boolean indicating if tumor is detected
    - confidence: confidence score (0-1)
    - prediction_value: raw prediction value
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Validate image dimensions
        if image.size[0] < 64 or image.size[1] < 64:
            raise HTTPException(status_code=400, detail="Image too small. Minimum size: 64x64")
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Load model if not already loaded
        model = load_model()
        
        # Make prediction
        prediction = model.predict(processed_image, verbose=0)
        prediction_value = float(prediction[0][0])
        
        # Determine result
        threshold = 0.5
        has_tumor = prediction_value >= threshold
        confidence = prediction_value if has_tumor else (1 - prediction_value)
        
        return JSONResponse({
            "has_tumor": has_tumor,
            "confidence": round(confidence * 100, 2),
            "prediction_value": round(prediction_value, 4),
            "message": "Tumor detected" if has_tumor else "No tumor detected"
        })
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 5001))
    uvicorn.run(app, host="0.0.0.0", port=port)

