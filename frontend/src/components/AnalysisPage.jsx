import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import ResultDisplay from './ResultDisplay'
import './AnalysisPage.css'

function AnalysisPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

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

        <ImageUploader 
          onResult={handleResult}
          onError={handleError}
          onReset={handleReset}
        />

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

