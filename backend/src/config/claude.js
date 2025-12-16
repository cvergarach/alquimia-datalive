import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.ANTHROPIC_API_KEY

if (!apiKey) {
  throw new Error('Missing ANTHROPIC_API_KEY in environment variables')
}

export const anthropic = new Anthropic({
  apiKey: apiKey,
})

export default anthropic
