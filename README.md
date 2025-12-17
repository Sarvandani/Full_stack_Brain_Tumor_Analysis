# Brain Tumor Detection - Full Stack Application

A full-stack deep learning application for detecting brain tumors in MRI images. Built with React + TypeScript frontend and FastAPI backend.

## Features

- 🧠 Upload brain MRI images for tumor detection
- 🤖 AI-powered classification using deep learning CNN
- 📊 Confidence score display
- 🎨 Modern, responsive UI
- ⚡ Fast API with FastAPI
- 🔒 Type-safe with TypeScript
- ☁️ Ready for deployment on Render

## Project Structure

```
.
├── backend/              # FastAPI backend
│   ├── main.py         # API server
│   ├── train_model.py  # Model training script
│   ├── requirements.txt
│   └── models/         # Saved models (created after training)
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── data/               # Training data
│   └── brain_tumor_dataset/
│       ├── yes/        # Images with tumors
│       └── no/         # Images without tumors
├── render.yaml         # Render deployment configuration
└── DEPLOYMENT.md       # Deployment guide
```

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Local Development

#### 1. Train the Model (First Time Only)

```bash
cd backend
pip install -r requirements.txt
python train_model.py
```

This will:
- Load images from `data/brain_tumor_dataset/`
- Train a CNN model
- Save the model to `backend/models/brain_tumor_model.keras`

**Note:** Training takes 5-15 minutes depending on your hardware.

#### 2. Start Backend

```bash
cd backend
python main.py
```

The API will be available at `http://localhost:5001`

#### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:4001`

## Usage

1. Make sure both backend and frontend servers are running
2. Open `http://localhost:4001` in your browser
3. Upload a brain MRI image by:
   - Clicking the upload area and selecting a file, or
   - Dragging and dropping an image
4. Click "Detect Tumor" to analyze the image
5. View the results showing whether a tumor was detected and the confidence score

## API Endpoints

### `GET /`
Health check endpoint

### `GET /health`
Check API and model status

### `POST /predict`
Upload an image for tumor detection

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**
```json
{
  "has_tumor": true,
  "confidence": 85.5,
  "prediction_value": 0.855,
  "message": "Tumor detected"
}
```

## Model Architecture

The CNN model consists of:
- 4 Convolutional layers with MaxPooling
- Dropout layer (0.25)
- Dense layers (256 units, then 1 output)
- Sigmoid activation for binary classification
- Input size: 128x128x3

## Deployment

This project is ready for deployment on Render. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Use `render.yaml` for automatic service setup
4. Set environment variables as needed

## Development

### Backend Development
- API documentation available at `http://localhost:5001/docs` (Swagger UI)
- Alternative docs at `http://localhost:5001/redoc`

### Frontend Development
- Built with Vite for fast development
- TypeScript for type safety
- React 18 with hooks

## Environment Variables

### Backend
- `PORT`: Server port (default: 5001)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:5001)

## Notes

- The model needs to be trained before the API can make predictions
- Training may take some time depending on your hardware
- The model is saved in Keras format (`.keras`)
- Make sure the data directories contain valid image files

## Disclaimer

⚠️ **This tool is for educational purposes only and should not be used as a substitute for professional medical diagnosis. Always consult with qualified medical professionals for medical decisions.**

## License

See LICENCE.txt for details.
