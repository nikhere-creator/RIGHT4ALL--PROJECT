/**
 * Right4All Backend Server
 * 
 * Main entry point for the Right4All backend API server.
 * Provides RESTful APIs for translation, insights, community features, and AI chatbot.
 * 
 * @module backend
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import translationRouter from './routes/translation'
import insightsRouter from './routes/insights'
import communityRouter from './routes/community'
import chatbotRouter from './routes/chatbot'
import { db } from './services/databaseService'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Security middleware - Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet())

// CORS middleware - Enable Cross-Origin Resource Sharing for frontend communication
app.use(cors())

// Body parsing middleware - Parse JSON and URL-encoded request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Initialize database connection on server startup
 * Tests connection to PostgreSQL database and exits if connection fails
 */
async function initializeDatabase() {
  const isConnected = await db.testConnection()
  if (!isConnected) {
    console.error('❌ Failed to connect to database')
    process.exit(1)
  }
}

/**
 * Health check endpoint
 * Used by monitoring services to verify server is running and responsive
 */
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'right4all-backend',
    time: new Date().toISOString()
  })
})

/**
 * API root endpoint
 * Returns basic information about the API
 */
app.get('/api', (req, res) => {
  res.json({ message: 'Right4All Backend API' })
})

// Mount API route modules
app.use('/api/translation', translationRouter)      // Translation services for multi-language support
app.use('/api/insights', insightsRouter)            // Labor market data and insights from Neon database
app.use('/api/community', communityRouter)          // Community organizations, stories, and resources
app.use('/api/chatbot', chatbotRouter)              // AI assistant with RAG (Retrieval-Augmented Generation)

/**
 * Graceful shutdown handlers
 * Clean up database connections and resources when server is terminated
 */
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...')
  await db.close()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...')
  await db.close()
  process.exit(0)
})

/**
 * Start the Express server
 * Initializes database connection and starts listening on configured port
 */
async function startServer() {
  await initializeDatabase()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 Labor Market API: http://localhost:${PORT}/api/insights/`)
    console.log(`🌐 Translation API: http://localhost:${PORT}/api/translation/`)
    console.log(`🤖 Chatbot API: http://localhost:${PORT}/api/chatbot/`)
  })
}

// Export Express app for Vercel serverless deployment
export default app

// Start server only if not in Vercel environment (Vercel handles server startup)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer().catch(console.error)
}
