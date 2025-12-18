import React from 'react'
import './ResultDisplay.css'

function ResultDisplay({ result }) {
  const { has_tumor, confidence, message } = result

  const resultClass = has_tumor ? 'tumor-detected' : 'no-tumor'
  
  const iconSvg = has_tumor ? (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ) : (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )

  return (
    <div className={`result-container ${resultClass}`}>
      <div className="result-icon">{iconSvg}</div>
      <h2 className="result-title">{message}</h2>
      <div className="confidence-bar-container">
        <div className="confidence-label">
          Confidence: {confidence}%
        </div>
        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: `${confidence}%` }}></div>
        </div>
      </div>
      <div className="result-message">
        <p>
          {has_tumor
            ? '⚠️ A tumor has been detected in the image. Please consult with a medical professional for further evaluation.'
            : '✓ No tumor detected in the image. However, this is an AI-based tool and should not replace professional medical diagnosis.'}
        </p>
      </div>
      <div className="disclaimer">
        <p>
          <strong>Disclaimer:</strong> This tool is for educational purposes only and should not be used as a substitute for professional medical diagnosis.
        </p>
      </div>
    </div>
  )
}

export default ResultDisplay

