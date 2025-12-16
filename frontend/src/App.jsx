import React, { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import DocumentUploader from './components/DocumentUploader'
import ResultsDisplay from './components/ResultsDisplay'
import LoadingOverlay from './components/LoadingOverlay'
import './styles/design-system.css'
import './App.css'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentView, setCurrentView] = useState('upload') // 'upload', 'results'

  const handleResults = (data) => {
    setResults(data)
    setCurrentView('results')
  }

  const handleNewAnalysis = () => {
    setResults(null)
    setCurrentView('upload')
  }

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="app__main">
        {currentView === 'upload' && (
          <>
            <HeroSection />
            <DocumentUploader 
              onResults={handleResults}
              onLoading={setLoading}
            />
          </>
        )}

        {currentView === 'results' && results && (
          <ResultsDisplay 
            results={results}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app__footer">
        <div className="footer__container">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="logo-symbol">
                <svg viewBox="0 0 32 32" fill="none">
                  <path 
                    d="M16 2L6 8v6c0 7.18 4.82 13.94 12 15.5 7.18-1.56 12-8.32 12-15.5V8l-10-6z" 
                    fill="var(--primary-500)"
                  />
                </svg>
              </div>
              <div className="footer__brand-text">
                <span className="brand-name">Alquimia Datalive</span>
                <span className="brand-tagline">AI-Powered API Intelligence</span>
              </div>
            </div>
          </div>

          <div className="footer__content">
            <div className="footer__section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#api">API</a></li>
                <li><a href="#integrations">Integrations</a></li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#guides">Guides</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#status">Status</a></li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Connect</h4>
              <div className="footer__social">
                <a href="#twitter" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="#github" className="social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__legal">
              <p>&copy; 2024 Alquimia Datalive. All rights reserved.</p>
              <div className="footer__links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Policy</a>
              </div>
            </div>
            <div className="footer__status">
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}
    </div>
  )
}

export default App
