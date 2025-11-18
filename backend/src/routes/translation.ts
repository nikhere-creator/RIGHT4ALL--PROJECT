import express from 'express'
import { translationService } from '../services/translationService'
import { z } from 'zod'

const router = express.Router()

// Validation schemas
const translateSchema = z.object({
  text: z.string().min(1).max(5000), // Limit text length
  from: z.string().length(2).default('en'),
  to: z.string().length(2)
})

const batchTranslateSchema = z.object({
  texts: z.array(z.string().min(1).max(5000)).max(100), // Limit array size
  from: z.string().length(2).default('en'),
  to: z.string().length(2)
})

// Single text translation
router.post('/translate', async (req, res) => {
  try {
    const { text, from, to } = translateSchema.parse(req.body)
    
    const translation = await translationService.translate(text, from, to)
    
    res.json({
      success: true,
      data: {
        originalText: text,
        translatedText: translation,
        from,
        to
      }
    })
  } catch (error) {
    console.error('Translation error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Translation failed'
    })
  }
})

// Batch text translation
router.post('/translate/batch', async (req, res) => {
  try {
    const { texts, from, to } = batchTranslateSchema.parse(req.body)
    
    const translations = await translationService.translateBatch(texts, from, to)
    
    res.json({
      success: true,
      data: {
        translations,
        from,
        to,
        count: texts.length
      }
    })
  } catch (error) {
    console.error('Batch translation error:', error)
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors
      })
    }
    
    res.status(500).json({
      success: false,
      error: 'Batch translation failed'
    })
  }
})

// Get supported languages
router.get('/languages', (req, res) => {
  const languages = translationService.getSupportedLanguages()
  
  res.json({
    success: true,
    data: {
      languages,
      count: languages.length
    }
  })
})

// Clear translation cache (admin endpoint)
router.delete('/cache', (req, res) => {
  try {
    translationService.clearCache()
    
    res.json({
      success: true,
      message: 'Translation cache cleared'
    })
  } catch (error) {
    console.error('Cache clear error:', error)
    
    res.status(500).json({
      success: false,
      error: 'Failed to clear cache'
    })
  }
})

export default router