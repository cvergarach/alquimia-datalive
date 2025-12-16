import { supabase } from '../config/supabase.js'

export async function getAnalysis(req, res) {
  try {
    const { id } = req.params

    const { data: document, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !document) {
      return res.status(404).json({
        error: true,
        message: 'Documento no encontrado'
      })
    }

    res.json({
      success: true,
      document: {
        id: document.id,
        filename: document.filename,
        createdAt: document.created_at,
        geminiAnalysis: document.gemini_analysis,
        claudeAnalysis: document.claude_analysis,
        endpointCount: document.endpoints?.length || 0,
        metricCount: document.metrics?.length || 0
      }
    })

  } catch (error) {
    console.error('Get analysis error:', error)
    res.status(500).json({
      error: true,
      message: 'Error al obtener análisis'
    })
  }
}

export async function getEndpoints(req, res) {
  try {
    const { id } = req.params

    const { data: document, error } = await supabase
      .from('documents')
      .select('endpoints, filename')
      .eq('id', id)
      .single()

    if (error || !document) {
      return res.status(404).json({
        error: true,
        message: 'Documento no encontrado'
      })
    }

    res.json({
      success: true,
      filename: document.filename,
      endpoints: document.endpoints || [],
      count: document.endpoints?.length || 0
    })

  } catch (error) {
    console.error('Get endpoints error:', error)
    res.status(500).json({
      error: true,
      message: 'Error al obtener endpoints'
    })
  }
}

export async function getMetrics(req, res) {
  try {
    const { id } = req.params

    const { data: document, error } = await supabase
      .from('documents')
      .select('metrics, filename')
      .eq('id', id)
      .single()

    if (error || !document) {
      return res.status(404).json({
        error: true,
        message: 'Documento no encontrado'
      })
    }

    res.json({
      success: true,
      filename: document.filename,
      metrics: document.metrics || [],
      count: document.metrics?.length || 0
    })

  } catch (error) {
    console.error('Get metrics error:', error)
    res.status(500).json({
      error: true,
      message: 'Error al obtener métricas'
    })
  }
}

export default {
  getAnalysis,
  getEndpoints,
  getMetrics
}
