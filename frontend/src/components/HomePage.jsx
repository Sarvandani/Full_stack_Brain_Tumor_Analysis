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

        <section className="about-section">
          <h2>About This Project</h2>
          <p>
            This application uses advanced deep learning and convolutional neural networks (CNN) 
            to analyze brain MRI images and detect potential tumors. The AI model has been trained 
            on a comprehensive dataset to provide accurate and fast tumor detection with confidence scores.
          </p>
        </section>

        <section className="how-it-works-section">
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Upload Image</h3>
              <p>Upload a brain MRI image through our intuitive interface. The system accepts standard image formats (JPG, PNG).</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Image Preprocessing</h3>
              <p>The uploaded image is automatically resized to 128x128 pixels and normalized to ensure optimal model performance.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>AI Analysis</h3>
              <p>Our trained CNN model analyzes the image through multiple convolutional layers, extracting features and patterns.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Results & Confidence</h3>
              <p>Get instant results with confidence scores, indicating the likelihood of tumor presence in the analyzed image.</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI-Powered Analysis</h3>
              <p>Deep learning model for accurate tumor detection</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Processing</h3>
              <p>Get results in seconds with real-time analysis</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Confidence Scores</h3>
              <p>Detailed prediction metrics and confidence levels</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🖼️</div>
              <h3>Easy Upload</h3>
              <p>Drag and drop or click to upload MRI images</p>
            </div>
          </div>
        </section>

        <section className="tech-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>CSS3</li>
                <li>Vite</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>FastAPI</li>
                <li>Python</li>
                <li>Uvicorn</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>AI/ML</h3>
              <ul>
                <li>TensorFlow 2.20</li>
                <li>Keras</li>
                <li>CNN Architecture</li>
                <li>Data Augmentation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="disclaimer-section">
          <div className="disclaimer-content">
            <h3>⚠️ Important Disclaimer</h3>
            <p>
              This tool is for <strong>educational and research purposes only</strong>. 
              It should <strong>not be used as a substitute</strong> for professional medical 
              diagnosis, treatment, or advice. Always consult with qualified medical professionals 
              for medical decisions and diagnosis.
            </p>
            <p>
              The AI model provides predictions based on image analysis, but these results are 
              not a replacement for professional medical evaluation by licensed healthcare providers.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage

