import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../contexts/TranslationContext'
import { useAppStore } from '../store/appStore'

interface UseTranslateContentOptions {
  enabled?: boolean
  from?: string
  skipCache?: boolean
}

export const useTranslateContent = (
  originalText: string,
  options: UseTranslateContentOptions = {}
) => {
  const { translateText, isTranslating } = useTranslation()
  const language = useAppStore(state => state.language)
  const [translatedText, setTranslatedText] = useState<string>(originalText)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastLanguage = useRef<string>(language)
  const lastText = useRef<string>(originalText)
  
  const { enabled = true, from = 'en' } = options

  useEffect(() => {
    const shouldTranslate = 
      enabled && 
      originalText.trim() &&
      language !== from &&
      (language !== lastLanguage.current || originalText !== lastText.current)

    if (!shouldTranslate) {
      if (language === from) {
        setTranslatedText(originalText)
      }
      return
    }

    const performTranslation = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const result = await translateText(originalText, from)
        setTranslatedText(result)
      } catch (err) {
        console.error('Translation error:', err)
        setError(err instanceof Error ? err.message : 'Translation failed')
        setTranslatedText(originalText) // Fallback to original
      } finally {
        setIsLoading(false)
      }
    }

    performTranslation()
    lastLanguage.current = language
    lastText.current = originalText
  }, [originalText, language, from, enabled, translateText])

  // Return original text if same language as source
  const displayText = language === from ? originalText : translatedText

  return {
    text: displayText,
    isLoading,
    error,
    isTranslating: isTranslating || isLoading
  }
}

// Hook for translating multiple texts at once
export const useTranslateBatch = (
  originalTexts: string[],
  options: UseTranslateContentOptions = {}
) => {
  const { translateBatch } = useTranslation()
  const language = useAppStore(state => state.language)
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastLanguage = useRef<string>(language)
  const lastTexts = useRef<string[]>(originalTexts)
  
  const { enabled = true, from = 'en' } = options

  useEffect(() => {
    const textsChanged = JSON.stringify(originalTexts) !== JSON.stringify(lastTexts.current)
    const shouldTranslate = 
      enabled && 
      originalTexts.length > 0 &&
      language !== from &&
      (language !== lastLanguage.current || textsChanged)

    if (!shouldTranslate) {
      if (language === from) {
        const original: Record<string, string> = {}
        originalTexts.forEach(text => {
          original[text] = text
        })
        setTranslatedTexts(original)
      }
      return
    }

    const performBatchTranslation = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const result = await translateBatch(originalTexts, from)
        setTranslatedTexts(result)
      } catch (err) {
        console.error('Batch translation error:', err)
        setError(err instanceof Error ? err.message : 'Batch translation failed')
        
        // Fallback to original texts
        const fallback: Record<string, string> = {}
        originalTexts.forEach(text => {
          fallback[text] = text
        })
        setTranslatedTexts(fallback)
      } finally {
        setIsLoading(false)
      }
    }

    performBatchTranslation()
    lastLanguage.current = language
    lastTexts.current = [...originalTexts]
  }, [originalTexts, language, from, enabled, translateBatch])

  const getTranslatedText = (originalText: string): string => {
    if (language === from) return originalText
    return translatedTexts[originalText] || originalText
  }

  return {
    getTranslatedText,
    translatedTexts,
    isLoading,
    error
  }
}