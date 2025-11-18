import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { translationAPI } from '../services/translationAPI'
import { useAppStore } from '../store/appStore'

interface TranslationContextType {
  translateText: (text: string, from?: string) => Promise<string>
  translateBatch: (texts: string[], from?: string) => Promise<Record<string, string>>
  isTranslating: boolean
  clearCache: () => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

interface TranslationProviderProps {
  children: ReactNode
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [isTranslating, setIsTranslating] = useState(false)
  const language = useAppStore(state => state.language)

  const translateText = useCallback(async (text: string, from: string = 'en'): Promise<string> => {
    if (!text.trim()) return text
    
    setIsTranslating(true)
    try {
      const result = await translationAPI.translate({
        text,
        from,
        to: language
      })
      return result
    } finally {
      setIsTranslating(false)
    }
  }, [language])

  const translateBatch = useCallback(async (
    texts: string[], 
    from: string = 'en'
  ): Promise<Record<string, string>> => {
    if (texts.length === 0) return {}
    
    setIsTranslating(true)
    try {
      const result = await translationAPI.translateBatch({
        texts,
        from,
        to: language
      })
      return result
    } finally {
      setIsTranslating(false)
    }
  }, [language])

  const clearCache = useCallback(() => {
    translationAPI.clearCache()
  }, [])

  const value = {
    translateText,
    translateBatch,
    isTranslating,
    clearCache
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}