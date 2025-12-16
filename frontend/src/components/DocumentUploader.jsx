import { useState } from 'react'
import { uploadDocument } from '../services/api'
import './DocumentUploader.css'

function DocumentUploader({ onResults, onLoading }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Validar que sea PDF o documento
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError('Por favor selecciona un archivo PDF, DOCX o TXT')
        setFile(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo primero')
      return
    }

    onLoading(true)
    setError(null)

    try {
      const result = await uploadDocument(file)
      onResults(result)
    } catch (err) {
      setError(err.message || 'Error al procesar el documento')
      console.error('Upload error:', err)
    } finally {
      onLoading(false)
    }
  }

  return (
    <div className="document-uploader">
      <div className="upload-section">
        <h2>📄 Cargar Documentación API</h2>
        <p className="upload-description">
          Sube documentación de APIs (PDF, DOCX, TXT) y nuestra AI extraerá automáticamente 
          endpoints, parámetros y métricas de negocio.
        </p>

        <div className="upload-controls">
          <label htmlFor="file-upload" className="file-upload-label">
            {file ? `📎 ${file.name}` : '📁 Seleccionar archivo'}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
          />
          
          <button 
            onClick={handleUpload}
            disabled={!file}
            className="upload-button"
          >
            🚀 Procesar con AI
          </button>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {file && !error && (
          <div className="file-info">
            ✓ Archivo listo: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature">
          <span className="feature-icon">🤖</span>
          <h3>Gemini 2.0 Flash</h3>
          <p>Procesamiento rápido y extracción de endpoints</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🧠</span>
          <h3>Claude AI</h3>
          <p>Análisis profundo y descubrimiento de métricas</p>
        </div>
        <div className="feature">
          <span className="feature-icon">⚡</span>
          <h3>Resultados Instantáneos</h3>
          <p>Procesa miles de páginas en segundos</p>
        </div>
      </div>
    </div>
  )
}

export default DocumentUploader
