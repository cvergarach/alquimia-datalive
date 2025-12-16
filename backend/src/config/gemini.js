import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY in environment variables')
}

const genAI = new GoogleGenerativeAI(apiKey)

// Usar Gemini 2.0 Flash
export const geminiModel = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash'
})

export default geminiModel
