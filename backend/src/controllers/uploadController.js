import { extractTextFromDocument, cleanupFile } from '../services/documentService.js'
import { extractEndpoints, quickAnalysis } from '../services/geminiService.js'
import { discoverMetrics, deepAnalysis } from '../services/claudeService.js'
import { supabase } from '../config/supabase.js'

export async function uploadDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: 'No se recibió ningún archivo'
      })
    }

    const { path: filePath, mimetype, originalname, size } = req.file

    console.log(`📄 Procesando: ${originalname} (${(size / 1024).toFixed(2)} KB)`)

    // 1. Extraer texto del documento
    console.log('📝 Extrayendo texto...')
    const documentText = await extractTextFromDocument(filePath, mimetype)

    // 2. Análisis rápido con Gemini
    console.log('🤖 Análisis rápido con Gemini...')
    const geminiAnalysisResult = await quickAnalysis(documentText)

    // 3. Extracción de endpoints con Gemini
    console.log('🔗 Extrayendo endpoints con Gemini...')
    const endpoints = await extractEndpoints(documentText)

    // 4. Descubrimiento de métricas con Claude
    console.log('💡 Descubriendo métricas con Claude...')
    const metrics = await discoverMetrics(documentText, endpoints)

    // 5. Análisis profundo con Claude
    console.log('🧠 Análisis profundo con Claude...')
    const claudeAnalysisResult = await deepAnalysis(documentText, endpoints, geminiAnalysisResult)

    // 6. Guardar en Supabase
    console.log('💾 Guardando en base de datos...')
    const { data: document, error: dbError } = await supabase
      .from('documents')
      .insert({
        filename: originalname,
        file_size: size,
        mime_type: mimetype,
        text_content: documentText.substring(0, 50000), // Guardar primeros 50k chars
        gemini_analysis: geminiAnalysisResult,
        claude_analysis: claudeAnalysisResult,
        endpoints: endpoints,
        metrics: metrics,
        processed: true
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Error al guardar en base de datos')
    }

    // Limpiar archivo temporal
    await cleanupFile(filePath)

    console.log('✅ Procesamiento completado')

    // Respuesta completa
    res.json({
      success: true,
      documentId: document.id,
      summary: geminiAnalysisResult.summary,
      endpoints: endpoints,
      metrics: metrics,
      analysis: {
        gemini: geminiAnalysisResult,
        claude: claudeAnalysisResult
      },
      stats: {
        endpointCount: endpoints.length,
        metricCount: metrics.length,
        documentSize: size,
        processingTime: Date.now()
      }
    })

  } catch (error) {
    console.error('Upload controller error:', error)
    
    // Limpiar archivo si existe
    if (req.file) {
      await cleanupFile(req.file.path)
    }

    res.status(500).json({
      error: true,
      message: error.message || 'Error al procesar el documento'
    })
  }
}

export default {
  uploadDocument
}
