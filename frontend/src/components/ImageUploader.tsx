import { useState, useRef } from 'react'
import './ImageUploader.css'

interface ImageUploaderProps {
  onPredict: (file: File) => void
  onReset: () => void
  loading: boolean
  disabled: boolean
}

const ImageUploader = ({ onPredict, onReset, loading, disabled }: ImageUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      setSelectedFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePredict = () => {
    if (selectedFile) {
      onPredict(selectedFile)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onReset()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div className="uploader-container">
      <div
        className={`upload-area ${preview ? 'has-preview' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button
              className="remove-button"
              onClick={handleReset}
              disabled={disabled}
            >
              ×
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Drag and drop an image here, or click to select</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
              disabled={disabled}
            />
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="file-info">
          <p>Selected: {selectedFile.name}</p>
          <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      <div className="button-group">
        <button
          className="predict-button"
          onClick={handlePredict}
          disabled={!selectedFile || disabled || loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Tumor'}
        </button>
        {selectedFile && (
          <button
            className="reset-button"
            onClick={handleReset}
            disabled={disabled}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export default ImageUploader

