import pdf from 'pdf-parse'
import fs from 'fs/promises'

export async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath)
    const data = await pdf(dataBuffer)
    return data.text
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Error al extraer texto del PDF')
  }
}

export async function extractTextFromTXT(filePath) {
  try {
    const text = await fs.readFile(filePath, 'utf-8')
    return text
  } catch (error) {
    console.error('TXT extraction error:', error)
    throw new Error('Error al leer archivo de texto')
  }
}

export async function extractTextFromDocument(filePath, mimeType) {
  if (mimeType === 'application/pdf') {
    return await extractTextFromPDF(filePath)
  } else if (mimeType === 'text/plain') {
    return await extractTextFromTXT(filePath)
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // Para DOCX, por ahora retornamos error - se puede agregar mammoth.js después
    throw new Error('Soporte para DOCX en desarrollo')
  } else {
    throw new Error('Tipo de archivo no soportado')
  }
}

export async function cleanupFile(filePath) {
  try {
    await fs.unlink(filePath)
  } catch (error) {
    console.error('Cleanup error:', error)
  }
}

export default {
  extractTextFromPDF,
  extractTextFromTXT,
  extractTextFromDocument,
  cleanupFile
}
