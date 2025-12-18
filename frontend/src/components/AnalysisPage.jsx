import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import ResultDisplay from './ResultDisplay'
import './AnalysisPage.css'

// Auto-detect API URL
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_URL = isLocalhost 
  ? 'http://localhost:5001'
  : (import.meta.env.VITE_API_URL || 'https://full-stack-brain-tumor-analysis-sarvandan.onrender.com')

function AnalysisPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [modelLoading, setModelLoading] = useState(true)
  const [modelReady, setModelReady] = useState(false)

  const handleResult = (data) => {
    setResult(data)
    setError(null)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
    setResult(null)
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  // Check if model is loaded
  useEffect(() => {
    let intervalId = null
    let timeoutId = null
    
    const checkModelStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/health`)
        const data = await response.json()
        
        if (data.model_loaded) {
          setModelReady(true)
          setModelLoading(false)
        } else {
          // Model not loaded yet, keep checking
          setModelLoading(true)
          setModelReady(false)
          
          // Retry every 2 seconds
          intervalId = setInterval(async () => {
            try {
              const retryResponse = await fetch(`${API_URL}/health`)
              const retryData = await retryResponse.json()
              
              if (retryData.model_loaded) {
                setModelReady(true)
                setModelLoading(false)
                if (intervalId) clearInterval(intervalId)
                if (timeoutId) clearTimeout(timeoutId)
              }
            } catch (err) {
              console.error('Error checking model status:', err)
            }
          }, 2000)
          
          // Stop checking after 30 seconds
          timeoutId = setTimeout(() => {
            if (intervalId) clearInterval(intervalId)
            setModelLoading(false)
            setError('Model is taking longer than expected to load. Please try again in a moment.')
          }, 30000)
        }
      } catch (err) {
        console.error('Error checking model status:', err)
        setModelLoading(false)
        setError('Unable to connect to the server. Please check your connection.')
      }
    }

    checkModelStatus()
    
    // Cleanup on unmount
    return () => {
      if (intervalId) clearInterval(intervalId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="analysis-page">
      <div className="container">
        <header className="header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <h1>Brain Tumor Analysis</h1>
          <p>Upload a brain MRI image for AI-powered tumor analysis</p>
        </header>

        {modelLoading && (
          <div className="model-loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-message">Loading AI model...</p>
            <p className="loading-submessage">This may take a few moments on first use</p>
          </div>
        )}

        {!modelLoading && modelReady && (
          <ImageUploader 
            onResult={handleResult}
            onError={handleError}
            onReset={handleReset}
          />
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  )
}

export default AnalysisPage

