import React, { useState, useRef } from 'react'
import './DocumentUploader.css'

const DocumentUploader = ({ onResults, onLoading }) => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleFileChange = (selectedFile) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
    
    const maxSize = 50 * 1024 * 1024 // 50MB
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please select a PDF, DOCX, or TXT file')
      setFile(null)
      return
    }
    
    if (selectedFile.size > maxSize) {
      setError('File size must be under 50MB')
      setFile(null)
      return
    }
    
    setFile(selectedFile)
    setError(null)
    setUploadProgress(0)
  }

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      handleFileChange(selectedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileChange(droppedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    onLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 10
        })
      }, 300)

      // Your existing upload logic here
      const formData = new FormData()
      formData.append('document', file)
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/upload`, {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      setTimeout(() => {
        onResults(result)
      }, 500)
      
    } catch (err) {
      setError(err.message || 'Error processing document')
      console.error('Upload error:', err)
    } finally {
      onLoading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const resetFile = () => {
    setFile(null)
    setError(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <section className="uploader">
      <div className="uploader__container">
        
        {/* Header */}
        <div className="uploader__header">
          <h2 className="uploader__title">
            Upload API Documentation
          </h2>
          <p className="uploader__subtitle">
            Our AI will analyze your API documentation and extract valuable business insights automatically
          </p>
        </div>

        {/* Upload Area */}
        <div className="uploader__content">
          <div 
            className={`upload-zone ${isDragging ? 'upload-zone--dragging' : ''} ${file ? 'upload-zone--has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleInputChange}
              accept=".pdf,.docx,.txt"
              className="upload-zone__input"
            />

            {!file ? (
              <div className="upload-zone__content">
                <div className="upload-zone__icon">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M24 8L16 16H20V28H28V16H32L24 8Z" fill="currentColor"/>
                    <path d="M8 36H40V40H8V36Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="upload-zone__text">
                  <h3>Drop your files here</h3>
                  <p>or <span className="upload-link">browse files</span></p>
                  <span className="upload-formats">
                    Supports PDF, DOCX, TXT • Max 50MB
                  </span>
                </div>
              </div>
            ) : (
              <div className="file-preview">
                <div className="file-preview__icon">
                  {file.type.includes('pdf') && <span>📄</span>}
                  {file.type.includes('word') && <span>📝</span>}
                  {file.type.includes('text') && <span>📃</span>}
                </div>
                <div className="file-preview__info">
                  <h4 className="file-preview__name">{file.name}</h4>
                  <p className="file-preview__size">{formatFileSize(file.size)}</p>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="progress-bar">
                      <div 
                        className="progress-bar__fill"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    resetFile()
                  }}
                  className="file-preview__remove"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <div className="error-message__icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="uploader__actions">
            <button
              onClick={handleUpload}
              disabled={!file || uploadProgress > 0}
              className="btn-upload"
            >
              <span className="btn-upload__icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="btn-upload__text">
                {uploadProgress > 0 && uploadProgress < 100 ? 'Processing...' : 'Analyze with AI'}
              </span>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="uploader__features">
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-item__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="feature-item__content">
                <h3>AI-Powered Analysis</h3>
                <p>Advanced machine learning extracts endpoints and business metrics automatically</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-item__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="feature-item__content">
                <h3>Lightning Fast</h3>
                <p>Process hundreds of pages in under 30 seconds with enterprise-grade performance</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-item__icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="feature-item__content">
                <h3>Enterprise Security</h3>
                <p>Your documents are processed securely and deleted immediately after analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DocumentUploader
