import { anthropic } from '../config/claude.js'

export async function discoverMetrics(documentText, endpoints) {
  const prompt = `
Eres un experto en análisis de negocio y APIs. Analiza esta documentación y los endpoints extraídos para descubrir métricas de negocio NO OBVIAS.

Busca:
1. KPIs ocultos que se pueden calcular combinando endpoints
2. Métricas de rendimiento del sistema
3. Indicadores de uso y adopción
4. Oportunidades de optimización
5. Patrones de monetización
6. Métricas de calidad de servicio

ENDPOINTS DETECTADOS:
${JSON.stringify(endpoints, null, 2)}

DOCUMENTACIÓN:
${documentText.substring(0, 15000)}

Responde SOLO con JSON array de métricas:

[
  {
    "name": "Nombre de la métrica",
    "description": "Descripción detallada de qué mide y por qué es valiosa",
    "type": "performance|business|quality|usage",
    "calculation": "Cómo se calcula o de dónde se obtiene",
    "value": "Valor o rango esperado (si aplica)"
  }
]
`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    const text = message.content[0].text
    const cleanedText = text.replace(/```json|```/g, '').trim()
    const metrics = JSON.parse(cleanedText)
    
    return metrics
  } catch (error) {
    console.error('Claude metrics error:', error)
    throw new Error('Error al descubrir métricas con Claude')
  }
}

export async function deepAnalysis(documentText, endpoints, geminiAnalysis) {
  const prompt = `
Realiza un análisis profundo de esta documentación de API.

ANÁLISIS INICIAL (Gemini):
${JSON.stringify(geminiAnalysis, null, 2)}

ENDPOINTS (${endpoints.length}):
${JSON.stringify(endpoints.slice(0, 10), null, 2)}

DOCUMENTACIÓN:
${documentText.substring(0, 20000)}

Proporciona insights sobre:
1. Arquitectura y diseño de la API
2. Mejores prácticas aplicadas o ausentes
3. Áreas de mejora potencial
4. Casos de uso principales
5. Consideraciones de seguridad

Responde en JSON:

{
  "architecture": "...",
  "bestPractices": ["...", "..."],
  "improvements": ["...", "..."],
  "useCases": ["...", "..."],
  "security": "..."
}
`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    const text = message.content[0].text
    const cleanedText = text.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(cleanedText)
    
    return analysis
  } catch (error) {
    console.error('Claude deep analysis error:', error)
    return {
      architecture: 'No disponible',
      bestPractices: [],
      improvements: [],
      useCases: [],
      security: 'No disponible'
    }
  }
}

export default {
  discoverMetrics,
  deepAnalysis
}
