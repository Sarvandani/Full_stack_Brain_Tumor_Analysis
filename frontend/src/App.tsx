import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import ImageUploader from './components/ImageUploader'
import ResultDisplay from './components/ResultDisplay'
import { PredictionResult } from './types'

function AnalysisPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePrediction = async (file: File) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Use environment variable for API URL, fallback to localhost for development
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to predict')
      }

      const data: PredictionResult = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="app analysis-page">
      <div className="container">
        <header className="header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <h1>Brain Tumor Analysis</h1>
          <p>Upload a brain MRI image for AI-powered tumor analysis</p>
        </header>

        <ImageUploader
          onPredict={handlePrediction}
          onReset={handleReset}
          loading={loading}
          disabled={loading}
        />

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

