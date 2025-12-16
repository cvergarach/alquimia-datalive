import React from 'react'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge">
            <span className="badge">
              <span className="badge__icon">🚀</span>
              Powered by Gemini 2.0 & Claude AI
            </span>
          </div>

          {/* Main Content */}
          <div className="hero__text">
            <h1 className="hero__title">
              Transform API Documentation
              <span className="title-accent">Into Business Intelligence</span>
            </h1>
            
            <p className="hero__description">
              Alquimia Datalive automatically reads complex API documentation, 
              extracts endpoints, and discovers hidden business metrics using 
              cutting-edge AI technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <button className="cta-button cta-button--primary">
              <span>Start Analysis</span>
              <svg className="cta-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button className="cta-button cta-button--secondary">
              <span>View Demo</span>
              <svg className="cta-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="hero__trust">
            <span className="trust-text">Trusted by leading enterprise teams</span>
            <div className="trust-metrics">
              <div className="metric">
                <span className="metric-value">98%</span>
                <span className="metric-label">Accuracy</span>
              </div>
              <div className="metric">
                <span className="metric-value">&lt;30s</span>
                <span className="metric-label">Processing</span>
              </div>
              <div className="metric">
                <span className="metric-value">500+</span>
                <span className="metric-label">APIs Analyzed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Element */}
        <div className="hero__visual">
          <div className="visual-container">
            {/* Animated Dashboard Preview */}
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-title">API Analysis Dashboard</div>
              </div>
              
              <div className="preview-content">
                <div className="preview-stats">
                  <div className="stat-item">
                    <div className="stat-label">Endpoints Found</div>
                    <div className="stat-value">147</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Business Metrics</div>
                    <div className="stat-value">23</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Processing Time</div>
                    <div className="stat-value">12s</div>
                  </div>
                </div>
                
                <div className="preview-chart">
                  <div className="chart-bars">
                    <div className="bar" style={{'--height': '60%'}}></div>
                    <div className="bar" style={{'--height': '80%'}}></div>
                    <div className="bar" style={{'--height': '45%'}}></div>
                    <div className="bar" style={{'--height': '90%'}}></div>
                    <div className="bar" style={{'--height': '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="floating-elements">
              <div className="float-item float-item--1">
                <span className="float-icon">📊</span>
                <span className="float-text">Real-time Analysis</span>
              </div>
              <div className="float-item float-item--2">
                <span className="float-icon">🔗</span>
                <span className="float-text">API Endpoints</span>
              </div>
              <div className="float-item float-item--3">
                <span className="float-icon">💡</span>
                <span className="float-text">Business Insights</span>
              </div>
            </div>
          </div>

          {/* Background Gradients */}
          <div className="visual-bg"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
