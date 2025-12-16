import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import uploadRoutes from './routes/upload.js'
import analysisRoutes from './routes/analysis.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🔮 Alquimia Datalive API',
    version: '0.1.0',
    status: 'active',
    endpoints: {
      upload: '/api/upload',
      analysis: '/api/analysis/:id',
      endpoints: '/api/endpoints/:id',
      metrics: '/api/metrics/:id'
    }
  })
})

app.use('/api', uploadRoutes)
app.use('/api', analysisRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal server error'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Route not found'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}`)
})

export default app
