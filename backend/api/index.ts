import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import translationRouter from '../src/routes/translation'
import insightsRouter from '../src/routes/insights'
import communityRouter from '../src/routes/community'

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'right4all-backend',
    time: new Date().toISOString()
  })
})

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Right4All Backend API' })
})

// Translation routes
app.use('/api/translation', translationRouter)

// Insights routes (labor market data from Neon database)
app.use('/api/insights', insightsRouter)

// Community routes (organizations, stories, resources)
app.use('/api/community', communityRouter)

// Export for Vercel
export default app