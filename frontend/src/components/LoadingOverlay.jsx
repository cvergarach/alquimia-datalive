import React from 'react'
import './LoadingOverlay.css'

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-overlay__content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        
        <div className="loading-text">
          <h3>Processing with AI</h3>
          <p>Analyzing your document with Gemini & Claude...</p>
        </div>
        
        <div className="loading-steps">
          <div className="step step--active">
            <div className="step-icon">📄</div>
            <span>Reading document</span>
          </div>
          <div className="step step--active">
            <div className="step-icon">🤖</div>
            <span>AI analysis</span>
          </div>
          <div className="step">
            <div className="step-icon">💡</div>
            <span>Generating insights</span>
          </div>
        </div>
      </div>
      
      <div className="loading-overlay__background"></div>
    </div>
  )
}

export default LoadingOverlay
