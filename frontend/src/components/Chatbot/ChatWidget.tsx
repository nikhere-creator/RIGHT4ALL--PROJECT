/**
 * Chat Widget Component for Right4All Frontend
 * 
 * Provides an interactive AI chatbot interface with multi-language support,
 * voice input, and real-time messaging capabilities.
 * 
 * @component
 * @module components/Chatbot/ChatWidget
 */

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Mic, MicOff, Loader2, Bot, User, Globe, Trash2 } from 'lucide-react'
import { useChatbot } from '../../hooks/useChatbot'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Message interface representing chat messages
 */
interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  citations?: string[]
  sourceType?: 'database' | 'general' | 'off-topic'
  timestamp: Date
}

/**
 * Main Chat Widget component
 * Provides floating chat interface with AI assistant capabilities
 */
export const ChatWidget: React.FC = () => {
  // State management for chat functionality
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  // Refs for DOM manipulation and speech recognition
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Chatbot hook for AI functionality
  const {
    sendMessage,
    isLoading,
    language,
    setLanguage,
    starterQuestions,
    sessionId
  } = useChatbot()

  /**
   * Scroll to bottom when new messages arrive
   * Ensures latest messages are always visible
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /**
   * Initialize speech recognition for voice input
   * Sets up Web Speech API for English voice commands
   */
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  /**
   * Show welcome message when chat is first opened
   * Displays language-specific greeting message
   */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: '1',
          type: 'bot',
          content: getWelcomeMessage(),
          timestamp: new Date()
        }])
      }, 500)
    }
  }, [isOpen])

  /**
   * Get language-specific welcome message
   * @returns {string} Welcome message in current language
   */
  const getWelcomeMessage = () => {
    const welcomeMessages: Record<string, string> = {
      en: 'Hello! I\'m your Right4All assistant. I can help you with questions about migrant workers\' rights, wages, working hours, and employment laws in Malaysia. How can I help you today?',
      ms: 'Halo! Saya pembantu Right4All anda. Saya boleh membantu anda dengan soalan tentang hak pekerja migran, gaji, waktu kerja, dan undang-undang pekerjaan di Malaysia. Bagaimana saya boleh membantu anda hari ini?',
      ne: 'नमस्ते! म तपाईंको Right4All सहायक हुँ। म तपाईंलाई मलेसियामा प्रवासी कामदारहरूको अधिकार, तलब, काम गर्ने समय, र रोजगार कानून बारे प्रश्नहरूमा मद्दत गर्न सक्छु। आज म तपाईंलाई कसरी मद्दत गर्न सक्छु?',
      hi: 'नमस्ते! मैं आपका Right4All सहायक हूं। मैं मलेशिया में प्रवासी श्रमिकों के अधिकार, वेतन, काम के घंटे और रोजगार कानूनों के बारे में आपके सवालों में मदद कर सकता हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      bn: 'হ্যালো! আমি আপনার Right4All সহায়ক। আমি মালেশিয়ায় প্রবাসী শ্রমিকদের অধিকার, মজুরি, কাজের সময় এবং কর্মসংস্থান আইন সম্পর্কে আপনার প্রশ্নগুলিতে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?'
    }
    return welcomeMessages[language] || welcomeMessages.en
  }

  /**
   * Handle sending a message to the AI assistant
   * Processes user input and displays bot response
   */
  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await sendMessage(input, language)

      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response.answer,
          citations: response.citations,
          sourceType: response.sourceType,
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 800)

    } catch (error) {
      console.error('Chatbot error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  /**
   * Handle starter question selection
   * @param {string} question - Selected starter question
   */
  const handleStarterQuestion = async (question: string) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  /**
   * Toggle voice input functionality
   * Only supports English language input
   */
  const toggleListening = () => {
    if (language !== 'en') {
      alert('Voice input is only supported in English.')
      return
    }

    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  /**
   * Handle keyboard shortcuts
   * @param {React.KeyboardEvent} e - Keyboard event
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /**
   * Clear chat history
   */
  const clearChat = () => {
    setMessages([])
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 group"
            aria-label="Open chat"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <MessageCircle size={28} />
            </motion.div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
              AI
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200/50 backdrop-blur-sm overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Right4All Assistant</h3>
                    <p className="text-emerald-100 text-xs flex items-center gap-1">
                      <Globe size={12} />
                      Online • AI Assistant
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Language Selector */}
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="text-sm bg-white/20 text-white border-none rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  >
                    <option value="en">🇺🇸 EN</option>
                    <option value="ms">🇲🇾 BM</option>
                    <option value="ne">🇳🇵 NE</option>
                    <option value="hi">🇮🇳 HI</option>
                    <option value="bn">🇧🇩 BN</option>
                  </select>

                  <button
                    onClick={clearChat}
                    className="text-white/80 hover:text-white transition-colors p-1"
                    aria-label="Clear chat"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors p-1"
                    aria-label="Close chat"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-emerald-50/30">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start gap-3 max-w-[85%]">
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot size={16} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl p-4 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg'
                            : 'bg-white text-gray-800 shadow-md border border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.type === 'user' && (
                            <User size={14} className="text-emerald-100" />
                          )}
                          <span className={`text-xs font-medium ${message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
                            {message.type === 'user' ? 'You' : 'Assistant'}
                          </span>
                          <span className={`text-xs ${message.type === 'user' ? 'text-emerald-200' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>

                        {/* Citations */}
                        {message.citations && message.citations.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200/50">
                            <div className="flex flex-wrap gap-1">
                              <span className="text-xs font-semibold text-gray-600">Sources:</span>
                              {message.citations.map((citation, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                                >
                                  {citation}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Source Type Indicator */}
                        {message.sourceType === 'general' && (
                          <div className="mt-2 text-xs text-gray-500 italic">
                            (General Information)
                          </div>
                        )}
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-emerald-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-emerald-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-emerald-500 rounded-full"
                          />
                        </div>
                        <span className="text-sm text-gray-600">Assistant is typing...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Starter Questions */}
              {messages.length === 1 && starterQuestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 mt-4"
                >
                  <p className="text-xs text-gray-500 text-center font-medium">Quick questions to get started:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {starterQuestions.map((question, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStarterQuestion(question)}
                        className="w-full text-left text-sm bg-white hover:bg-emerald-50 text-gray-700 rounded-xl p-3 border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about migrant workers' rights..."
                    className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    rows={2}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {/* Voice Input Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleListening}
                    disabled={isLoading}
                    className={`p-3 rounded-xl transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    aria-label="Voice input"
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </motion.button>

                  {/* Send Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </motion.button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
