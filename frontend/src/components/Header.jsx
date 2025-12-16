import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        {/* Brand */}
        <div className="header__brand">
          <div className="header__logo">
            <div className="logo-symbol">
              <svg viewBox="0 0 32 32" fill="none">
                <path 
                  d="M16 2L6 8v6c0 7.18 4.82 13.94 12 15.5 7.18-1.56 12-8.32 12-15.5V8l-10-6z" 
                  fill="url(#gradient-primary)"
                />
                <path 
                  d="M16 8L12 10v4c0 3.59 2.41 6.97 6 7.75 3.59-.78 6-4.16 6-7.75v-4l-4-2-4 2z" 
                  fill="url(#gradient-accent)"
                />
                <defs>
                  <linearGradient id="gradient-primary" x1="6" y1="2" x2="26" y2="22">
                    <stop offset="0%" stopColor="var(--primary-600)" />
                    <stop offset="100%" stopColor="var(--primary-500)" />
                  </linearGradient>
                  <linearGradient id="gradient-accent" x1="12" y1="8" x2="22" y2="18">
                    <stop offset="0%" stopColor="var(--accent-500)" />
                    <stop offset="100%" stopColor="var(--accent-400)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">Alquimia</h1>
              <span className="brand-subtitle">Datalive</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="header__nav">
          <a href="#platform" className="nav-link">Platform</a>
          <a href="#solutions" className="nav-link">Solutions</a>
          <a href="#docs" className="nav-link">Documentation</a>
          <a href="#pricing" className="nav-link">Pricing</a>
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <button className="btn btn--ghost">Sign In</button>
          <button className="btn btn--primary">Get Started</button>
        </div>
      </div>

      {/* Gradient Background */}
      <div className="header__gradient"></div>
    </header>
  )
}

export default Header
