// Translation API client for frontend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export interface TranslationRequest {
  text: string
  from?: string
  to: string
}

export interface BatchTranslationRequest {
  texts: string[]
  from?: string
  to: string
}

export interface TranslationResponse {
  success: boolean
  data?: {
    originalText: string
    translatedText: string
    from: string
    to: string
  }
  error?: string
  details?: any
}

export interface BatchTranslationResponse {
  success: boolean
  data?: {
    translations: Record<string, string>
    from: string
    to: string
    count: number
  }
  error?: string
  details?: any
}

class TranslationAPI {
  private baseUrl: string
  private cache = new Map<string, string>()

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl
  }

  private getCacheKey(text: string, from: string, to: string): string {
    return `${from}-${to}-${text}`
  }

  async translate(request: TranslationRequest): Promise<string> {
    const { text, from = 'en', to } = request

    // Return original if same language
    if (from === to) {
      return text
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text, from, to)
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      const response = await fetch(`${this.baseUrl}/translation/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, from, to })
      })

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.statusText}`)
      }

      const data: TranslationResponse = await response.json()
      
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Translation failed')
      }

      const translatedText = data.data.translatedText
      
      // Cache the result
      this.cache.set(cacheKey, translatedText)
      
      return translatedText
    } catch (error) {
      console.error('Translation error:', error)
      
      // Return original text on error
      return text
    }
  }

  async translateBatch(request: BatchTranslationRequest): Promise<Record<string, string>> {
    const { texts, from = 'en', to } = request

    // Return original texts if same language
    if (from === to) {
      const result: Record<string, string> = {}
      texts.forEach(text => {
        result[text] = text
      })
      return result
    }

    try {
      const response = await fetch(`${this.baseUrl}/translation/translate/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texts, from, to })
      })

      if (!response.ok) {
        throw new Error(`Batch translation API error: ${response.statusText}`)
      }

      const data: BatchTranslationResponse = await response.json()
      
      if (!data.success || !data.data) {
        throw new Error(data.error || 'Batch translation failed')
      }

      // Cache all results
      Object.entries(data.data.translations).forEach(([original, translated]) => {
        const cacheKey = this.getCacheKey(original, from, to)
        this.cache.set(cacheKey, translated)
      })

      return data.data.translations
    } catch (error) {
      console.error('Batch translation error:', error)
      
      // Return original texts on error
      const result: Record<string, string> = {}
      texts.forEach(text => {
        result[text] = text
      })
      return result
    }
  }

  async getSupportedLanguages(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/translation/languages`)
      
      if (!response.ok) {
        throw new Error(`Languages API error: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.success || !data.data) {
        throw new Error('Failed to get supported languages')
      }

      return data.data.languages
    } catch (error) {
      console.error('Languages API error:', error)
      
      // Return default languages on error
      return ['en', 'ms', 'ne', 'hi', 'bn']
    }
  }

  clearCache(): void {
    this.cache.clear()
  }
}

// Export singleton instance
export const translationAPI = new TranslationAPI()