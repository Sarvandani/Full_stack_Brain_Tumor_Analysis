import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  const handleStartAnalysis = () => {
    navigate('/analyze')
  }

  return (
    <div className="homepage">
      <div className="homepage-container">
        <header className="homepage-header">
          <h1>SARVANDANI - Brain Tumor Analysis System</h1>
          <p className="subtitle">AI-Powered Medical Image Analysis</p>
        </header>

        <section className="cta-section">
          <div className="cta-content">
            <div className="cta-image-left">
              <img src="/images/mri_tumor.jpg" alt="MRI with Tumor" />
            </div>
            <div className="cta-text">
              <h2>Ready to Analyze?</h2>
              <p>Upload a brain MRI image to get started with AI-powered tumor analysis</p>
              <button className="cta-button" onClick={handleStartAnalysis}>
                Start Analysis
              </button>
            </div>
            <div className="cta-image-right">
              <img src="/images/mri_normal.jpg" alt="Normal MRI" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage

