import express from 'express'
import { 
  getAnalysis, 
  getEndpoints, 
  getMetrics 
} from '../controllers/analysisController.js'

const router = express.Router()

router.get('/analysis/:id', getAnalysis)
router.get('/endpoints/:id', getEndpoints)
router.get('/metrics/:id', getMetrics)

export default router
