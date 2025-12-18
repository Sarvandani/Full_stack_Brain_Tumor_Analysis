# 🧠 SARVANDANI - Brain Tumor Analysis System

A full-stack application for AI-powered brain tumor detection from MRI images using deep learning.

## 🌐 Live Application

**🔗 Backend API**: [https://full-stack-brain-tumor-analysis.onrender.com](https://full-stack-brain-tumor-analysis.onrender.com)  
**🔗 Frontend**: Deployed on Render (Static Site)

## 🚀 Tech Stack

### Frontend
- **Single HTML File** - No build process, no MIME type issues
- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS** - Responsive design

### Backend
- **FastAPI** - Modern Python web framework
- **TensorFlow 2.15** - Deep learning framework
- **Keras** - High-level neural network API
- **CNN Architecture** - Convolutional Neural Network for image classification

### AI/ML
- **Deep Learning Model** - Trained CNN for tumor detection
- **Data Augmentation** - Improved model accuracy
- **Confidence Scores** - Detailed prediction metrics

## 📋 Features

- 🧠 **AI-Powered Analysis** - Deep learning model for tumor detection
- ⚡ **Fast Processing** - Get results in seconds
- 📊 **Confidence Scores** - Detailed prediction metrics
- 🖼️ **Image Upload** - Drag and drop or click to upload
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Installation

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sarvandani/Full_stack_Brain_Tumor_Analysis.git
   cd Full_stack_Brain_Tumor_Analysis
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Train the model** (if not already trained)
   ```bash
   python train_model.py
   ```

## 🚀 Running Locally

### Start Backend

```bash
cd backend
python main.py
```

The backend will start on `http://localhost:5001`

### Start Frontend

Simply open `frontend/index.html` in your browser, or use a local server:

```bash
cd frontend
python -m http.server 4001
```

Then open `http://localhost:4001` in your browser.

## 📦 Project Structure

```
Full_stack_Brain_Tumor_Analysis/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── train_model.py       # Model training script
│   ├── requirements.txt     # Python dependencies
│   └── models/              # Trained model (generated)
├── frontend/
│   ├── index.html           # Single HTML file (all-in-one)
│   └── images/              # MRI sample images
├── data/
│   └── brain_tumor_dataset/ # Training dataset
├── render.yaml              # Render deployment config
└── README.md               # This file
```

## 🌐 Deployment on Render

### Backend Deployment

1. **Connect GitHub repository** to Render
2. **Create new Web Service**
3. **Configure**:
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python main.py`
   - **Environment Variables**:
     - `PORT`: `5001`
     - `ALLOWED_ORIGINS`: Your frontend URL

### Frontend Deployment

1. **Create new Static Site** on Render
2. **Configure**:
   - **Build Command**: `echo "No build needed"`
   - **Publish Directory**: `frontend`
3. **Update backend CORS** with frontend URL

Or use `render.yaml` for automatic deployment.

## 📝 API Endpoints

- `GET /health` - Health check
- `POST /predict` - Analyze brain MRI image for tumor detection
- `POST /train` - Train the model (background task)
- `GET /train/status` - Check training status

## ⚙️ Configuration

- **Backend Port**: 5001 (configurable via `PORT` env var)
- **Frontend Port**: 4001 (local development)
- **Model Path**: `backend/models/brain_tumor_model.keras`

## ⚠️ Important Disclaimer

This tool is for **educational and research purposes only**. It should **not be used as a substitute** for professional medical diagnosis, treatment, or advice. Always consult with qualified medical professionals for medical decisions and diagnosis.

## 👨‍💻 Author

**SARVANDANI**

---

*For questions, issues, or contributions, please open an issue on GitHub.*
