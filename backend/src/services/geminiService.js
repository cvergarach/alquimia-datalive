import { geminiModel } from '../config/gemini.js'

export async function extractEndpoints(documentText) {
  const prompt = `
Analiza la siguiente documentación de API y extrae TODOS los endpoints de forma estructurada.

Para cada endpoint, identifica:
1. Método HTTP (GET, POST, PUT, DELETE, PATCH, etc.)
2. Ruta/Path completo
3. Descripción breve
4. Parámetros (query, path, body)

Responde SOLO con un JSON array válido, sin texto adicional:

[
  {
    "method": "GET",
    "path": "/api/users",
    "description": "Obtiene lista de usuarios",
    "parameters": ["page", "limit", "sort"]
  }
]

DOCUMENTACIÓN:
${documentText}
`

  try {
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Limpiar y parsear JSON
    const cleanedText = text.replace(/```json|```/g, '').trim()
    const endpoints = JSON.parse(cleanedText)
    
    return endpoints
  } catch (error) {
    console.error('Gemini extraction error:', error)
    throw new Error('Error al extraer endpoints con Gemini')
  }
}

export async function quickAnalysis(documentText) {
  const prompt = `
Realiza un análisis rápido de esta documentación de API.

Proporciona:
1. Resumen ejecutivo (2-3 líneas)
2. Tecnologías detectadas
3. Número aproximado de endpoints
4. Complejidad general (baja/media/alta)

Responde en JSON:

{
  "summary": "...",
  "technologies": ["REST", "OAuth2"],
  "endpointCount": 25,
  "complexity": "media"
}

DOCUMENTACIÓN:
${documentText.substring(0, 10000)}
`

  try {
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const cleanedText = text.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(cleanedText)
    
    return analysis
  } catch (error) {
    console.error('Gemini analysis error:', error)
    return {
      summary: 'Documentación API procesada',
      technologies: [],
      endpointCount: 0,
      complexity: 'desconocida'
    }
  }
}

export default {
  extractEndpoints,
  quickAnalysis
}
