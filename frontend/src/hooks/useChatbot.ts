/**
 * Chatbot Hook for Right4All Frontend
 * 
 * Custom React hook providing chatbot functionality with multi-language support.
 * Manages chat state, language selection, and API communication with the AI assistant.
 * 
 * @module hooks/useChatbot
 */

import { useState, useEffect } from 'react'
import { chatbotAPI } from '../services/chatbotAPI'

/**
 * Supported language codes for the chatbot
 */
type Language = 'en' | 'ms' | 'ne' | 'hi' | 'bn'

/**
 * Chat response interface from the AI assistant
 */
interface ChatResponse {
  answer: string
  sourceType: 'database' | 'general' | 'off-topic'
  citations: string[]
  responseTime: number
}

/**
 * Main chatbot hook providing AI assistant functionality
 * 
 * @returns {object} Chatbot state and methods including language, loading state, and API functions
 */
export const useChatbot = () => {
  // State management for chatbot functionality
  const [language, setLanguage] = useState<Language>('en')
  const [isLoading, setIsLoading] = useState(false)
  const [starterQuestions, setStarterQuestions] = useState<string[]>([])
  
  // Generate unique session ID for conversation tracking
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  /**
   * Fetch starter questions when language changes
   * Loads pre-defined questions in the selected language for user convenience
   */
  useEffect(() => {
    const fetchStarterQuestions = async () => {
      try {
        const questions = await chatbotAPI.getStarterQuestions(language)
        setStarterQuestions(questions)
      } catch (error) {
        console.error('Failed to fetch starter questions:', error)
        setStarterQuestions([])
      }
    }

    fetchStarterQuestions()
  }, [language])

  /**
   * Send message to AI assistant
   * Handles loading state and API communication for chat interactions
   * 
   * @param {string} question - User question text
   * @param {Language} lang - Language code for response
   * @returns {Promise<ChatResponse>} AI response with answer and metadata
   */
  const sendMessage = async (question: string, lang: Language): Promise<ChatResponse> => {
    setIsLoading(true)
    try {
      const response = await chatbotAPI.sendMessage(question, lang, sessionId)
      return response
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Calculate wage using Malaysian Employment Act rules
   * Computes daily wage, hourly rate, and overtime pay
   * 
   * @param {number} monthly - Monthly salary in Malaysian Ringgit
   * @param {number} otHours - Overtime hours worked (default: 0)
   * @returns {Promise<any>} Wage calculation with step-by-step breakdown
   */
  const calculateWage = async (monthly: number, otHours: number = 0) => {
    return chatbotAPI.calculateWage(monthly, otHours)
  }

  return {
    language,
    setLanguage,
    isLoading,
    starterQuestions,
    sessionId,
    sendMessage,
    calculateWage
  }
}
