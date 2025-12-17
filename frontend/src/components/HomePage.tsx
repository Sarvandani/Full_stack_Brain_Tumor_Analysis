import { useNavigate } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()

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
              <button className="cta-button" onClick={() => navigate('/analyze')}>
                Start Analysis
              </button>
            </div>
            <div className="cta-image-right">
              <img src="/images/mri_normal.jpg" alt="Normal MRI" />
            </div>
          </div>
        </section>

        <section className="intro-section">
          <div className="intro-content">
            <h2>About This Project</h2>
            <p>
              This advanced brain tumor analysis system uses deep learning and artificial intelligence 
              to assist in the detection and analysis of brain tumors from MRI images. Our system 
              leverages state-of-the-art convolutional neural networks (CNNs) to provide accurate 
              and rapid analysis of medical imaging data.
            </p>
          </div>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Deep Learning</h3>
              <p>Advanced CNN architecture with data augmentation for high accuracy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Analysis</h3>
              <p>Get results in seconds with our optimized AI model</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Confidence Scores</h3>
              <p>Detailed confidence metrics for each analysis</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your medical images are processed securely</p>
            </div>
          </div>
        </section>

        <section className="technology-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Frontend</h3>
              <ul>
                <li>React 18</li>
                <li>TypeScript</li>
                <li>Vite</li>
                <li>Modern CSS</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Backend</h3>
              <ul>
                <li>FastAPI</li>
                <li>Python 3.9+</li>
                <li>Uvicorn</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>AI/ML</h3>
              <ul>
                <li>TensorFlow 2.15</li>
                <li>Keras</li>
                <li>CNN Architecture</li>
                <li>Data Augmentation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="examples-section">
          <h2>Example MRI Images</h2>
          <div className="examples-grid">
            <div className="example-card">
              <div className="example-image-placeholder tumor-example">
                <span>MRI with Tumor</span>
              </div>
              <p className="example-label">Images with detected tumors</p>
            </div>
            <div className="example-card">
              <div className="example-image-placeholder no-tumor-example">
                <span>Normal MRI</span>
              </div>
              <p className="example-label">Normal brain scans</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Upload Image</h3>
              <p>Upload a brain MRI image in common formats (JPG, PNG)</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Our deep learning model analyzes the image using advanced CNN architecture</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Results</h3>
              <p>Receive detailed analysis with confidence scores and recommendations</p>
            </div>
          </div>
        </section>

        <section className="disclaimer-section">
          <div className="disclaimer-box">
            <h3>⚠️ Important Disclaimer</h3>
            <p>
              This tool is for <strong>educational and research purposes only</strong>. 
              It should <strong>not be used as a substitute</strong> for professional medical diagnosis, 
              treatment, or advice. Always consult with qualified medical professionals for 
              medical decisions and diagnosis.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage

