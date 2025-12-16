import './ResultsDisplay.css'

function ResultsDisplay({ results }) {
  if (!results) return null

  const { endpoints = [], metrics = [], summary = '' } = results

  return (
    <div className="results-display">
      <h2>📊 Resultados del Análisis</h2>

      {summary && (
        <div className="summary-section">
          <h3>Resumen</h3>
          <p>{summary}</p>
        </div>
      )}

      {endpoints && endpoints.length > 0 && (
        <div className="endpoints-section">
          <h3>🔗 Endpoints Detectados ({endpoints.length})</h3>
          <div className="endpoints-grid">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="endpoint-card">
                <div className="endpoint-method">{endpoint.method || 'GET'}</div>
                <div className="endpoint-path">{endpoint.path}</div>
                {endpoint.description && (
                  <p className="endpoint-description">{endpoint.description}</p>
                )}
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div className="endpoint-params">
                    <strong>Parámetros:</strong>
                    <ul>
                      {endpoint.parameters.map((param, i) => (
                        <li key={i}>{param}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {metrics && metrics.length > 0 && (
        <div className="metrics-section">
          <h3>💡 Métricas de Negocio Descubiertas ({metrics.length})</h3>
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-icon">📈</div>
                <h4>{metric.name}</h4>
                <p>{metric.description}</p>
                {metric.value && (
                  <div className="metric-value">{metric.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="export-section">
        <button onClick={() => exportResults(results)}>
          💾 Exportar Resultados
        </button>
      </div>
    </div>
  )
}

function exportResults(results) {
  const dataStr = JSON.stringify(results, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `alquimia-results-${Date.now()}.json`
  link.click()
}

export default ResultsDisplay
