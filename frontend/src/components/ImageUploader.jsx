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
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Set file immediately
    setSelectedFile(file)

    // Read file for preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target.result)
    }
    reader.onerror = () => {
      onError('Error reading image file')
      setSelectedFile(null)
      setPreviewUrl(null)
    }
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onReset()
  }

  const handlePredict = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    onError(null)

    try {
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
      setIsAnalyzing(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target.result)
      }
      reader.onerror = () => {
        onError('Error reading image file')
      }
      reader.readAsDataURL(file)
    } else {
      onError('Please drop a valid image file')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="uploader-container">
      {!previewUrl ? (
        <label 
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="upload-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Drag and drop an image here, or click to select</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </label>
      ) : (
        <div className="preview-area">
          <img src={previewUrl} alt="Preview" className="preview-image" />
          <button className="remove-button" onClick={handleReset}>
            ×
          </button>
        </div>
      )}

      <div className="button-group">
        <button
          className="predict-button"
          onClick={handlePredict}
          disabled={!selectedFile || isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Tumor'}
        </button>
        {selectedFile && (
          <button
            className="reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
