import { useState } from 'react'
import './App.css'
import DocumentUploader from './components/DocumentUploader'
import ResultsDisplay from './components/ResultsDisplay'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔮 Alquimia Datalive</h1>
        <p>Plataforma AI para análisis automático de documentación API</p>
      </header>

      <main className="App-main">
        <DocumentUploader 
          onResults={setResults}
          onLoading={setLoading}
        />
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Procesando documentación con AI...</p>
          </div>
        )}
        
        {results && !loading && (
          <ResultsDisplay results={results} />
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 Alquimia Datalive - Powered by Gemini & Claude</p>
      </footer>
    </div>
  )
}

export default App
