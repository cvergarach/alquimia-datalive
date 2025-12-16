import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function uploadDocument(file) {
  const formData = new FormData()
  formData.append('document', file)

  try {
    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error(
      error.response?.data?.message || 'Error al procesar el documento'
    )
  }
}

export async function getAnalysis(documentId) {
  try {
    const response = await api.get(`/api/analysis/${documentId}`)
    return response.data
  } catch (error) {
    console.error('Analysis error:', error)
    throw new Error(
      error.response?.data?.message || 'Error al obtener el análisis'
    )
  }
}

export async function getEndpoints(documentId) {
  try {
    const response = await api.get(`/api/endpoints/${documentId}`)
    return response.data
  } catch (error) {
    console.error('Endpoints error:', error)
    throw new Error(
      error.response?.data?.message || 'Error al obtener endpoints'
    )
  }
}

export async function getMetrics(documentId) {
  try {
    const response = await api.get(`/api/metrics/${documentId}`)
    return response.data
  } catch (error) {
    console.error('Metrics error:', error)
    throw new Error(
      error.response?.data?.message || 'Error al obtener métricas'
    )
  }
}

export default api
