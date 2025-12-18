import React, { useState, useRef } from 'react'
import './ImageUploader.css'

// Auto-detect API URL
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_URL = isLocalhost 
  ? 'http://localhost:5001'
  : (import.meta.env.VITE_API_URL || 'https://full-stack-brain-tumor-analysis-sarvandan.onrender.com')

function ImageUploader({ onResult, onError, onReset }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      setSelectedFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onReset()
  }

  const checkModelAndPredict = async () => {
    onError(null)

    try {
      // Check model status first
      const healthResponse = await fetch(`${API_URL}/health`)
      const healthData = await healthResponse.json()

      if (!healthData.model_loaded) {
        // Model not loaded, show loading spinner and wait
        setModelLoading(true)
        
        let retries = 0
        const maxRetries = 15 // 30 seconds total (2 seconds * 15)
        
        while (retries < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
          
          const retryResponse = await fetch(`${API_URL}/health`)
          const retryData = await retryResponse.json()
          
          if (retryData.model_loaded) {
            break // Model is loaded, proceed
          }
          
          retries++
        }

        // Final check
        const finalResponse = await fetch(`${API_URL}/health`)
        const finalData = await finalResponse.json()
        
        if (!finalData.model_loaded) {
          setModelLoading(false)
          throw new Error('Model is taking longer than expected to load. Please try again in a moment.')
        }
        
        // Model is now loaded, hide loading spinner
        setModelLoading(false)
      }

      // Model is loaded, proceed with prediction
      setIsAnalyzing(true)

      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to predict')
      }

      const data = await response.json()
      onResult(data)
    } catch (err) {
      onError(`Error: ${err instanceof Error ? err.message : 'An error occurred'}`)
    } finally {
      setModelLoading(false)
      setIsAnalyzing(false)
    }
  }

  const handlePredict = async () => {
    if (!selectedFile) return
    await checkModelAndPredict()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragLeave = () => {
    // Optional: Add visual feedback
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExampleSelect = async (exampleType) => {
    onError(null)

    try {
      // Fetch the example image
      const imagePath = exampleType === 'tumor' 
        ? '/images/example_tumor.jpg'
        : '/images/example_normal.jpg'
      
      const response = await fetch(imagePath)
      const blob = await response.blob()
      const file = new File([blob], `${exampleType}_example.jpg`, { type: 'image/jpeg' })
      
      // Set preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
      
      setSelectedFile(file)
      // Don't automatically analyze - wait for user to click "Analyze Tumor" button
    } catch (err) {
      onError(`Error: ${err instanceof Error ? err.message : 'An error occurred'}`)
    }
  }

  return (
    <div className="uploader-container">
      <div 
        className={`upload-area ${previewUrl ? 'has-preview' : ''}`}
        onClick={() => !previewUrl && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!previewUrl ? (
          <div className="upload-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Drag and drop an image here, or click to select</p>
          </div>
        ) : (
          <div className="preview-container">
            <img src={previewUrl} alt="Preview" className="preview-image" />
            <button className="remove-button" onClick={(e) => {
              e.stopPropagation()
              handleReset()
            }}>
              ×
            </button>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {modelLoading && (
        <div className="model-loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading AI model...</p>
          <p className="loading-submessage">This may take a few moments on first use</p>
        </div>
      )}

      <div className="button-group">
        <button
          className="predict-button"
          onClick={handlePredict}
          disabled={!selectedFile || isAnalyzing || modelLoading}
        >
          {modelLoading ? 'Loading model...' : isAnalyzing ? 'Analyzing...' : 'Analyze Tumor'}
        </button>
        {selectedFile && (
          <button
            className="reset-button"
            onClick={handleReset}
            disabled={modelLoading || isAnalyzing}
          >
            Reset
          </button>
        )}
      </div>

      {!previewUrl && (
        <div className="example-images-section">
          <p className="example-label">Or try with example images:</p>
          <div className="example-images">
            <button
              className="example-image-btn"
              onClick={() => handleExampleSelect('tumor')}
              disabled={isAnalyzing}
              title="Example: Brain with Tumor (Y169)"
            >
              <img src="/images/example_tumor.jpg" alt="Example: Tumor" />
              <span>Example: Tumor</span>
            </button>
            <button
              className="example-image-btn"
              onClick={() => handleExampleSelect('normal')}
              disabled={isAnalyzing}
              title="Example: Normal Brain (N22)"
            >
              <img src="/images/example_normal.jpg" alt="Example: Normal" />
              <span>Example: Normal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader

