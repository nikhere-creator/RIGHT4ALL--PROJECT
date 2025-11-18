import React, { useState } from 'react'
import { TranslatedText, TranslatedParagraph, TranslatedHeading } from '../components/TranslatedText'
import { useTranslateContent, useTranslateBatch } from '../hooks/useTranslateContent'
import { useTranslation } from '../contexts/TranslationContext'

export default function TranslationDemo() {
  const { translateText, isTranslating } = useTranslation()
  const [inputText, setInputText] = useState('Hello, how are you today?')
  const [translatedResult, setTranslatedResult] = useState('')

  const sampleTexts = [
    'Welcome to Right4All',
    'Protect your workplace rights',
    'Get help and support',
    'Join our community',
    'Learn about labor laws'
  ]

  const { getTranslatedText, isLoading: batchLoading } = useTranslateBatch(sampleTexts)

  const handleTranslate = async () => {
    if (!inputText.trim()) return
    
    try {
      const result = await translateText(inputText)
      setTranslatedResult(result)
    } catch (error) {
      console.error('Translation failed:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <TranslatedHeading className="text-4xl font-bold text-white">
          Translation System Demo
        </TranslatedHeading>
        <TranslatedParagraph className="text-lg text-white/80">
          This page demonstrates the dynamic translation system in action
        </TranslatedParagraph>
      </div>

      {/* Individual Translation Components */}
      <div className="card p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-4">
          <TranslatedText>Automatic Translation Components</TranslatedText>
        </h2>
        
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-lg">
            <TranslatedText className="text-white">
              Your rights are protected by Malaysian labor laws
            </TranslatedText>
          </div>
          
          <div className="p-3 bg-white/5 rounded-lg">
            <TranslatedText className="text-white">
              Minimum wage workers deserve fair treatment and respect
            </TranslatedText>
          </div>
          
          <div className="p-3 bg-white/5 rounded-lg">
            <TranslatedText className="text-white">
              Report workplace violations to the authorities
            </TranslatedText>
          </div>
        </div>
      </div>

      {/* Manual Translation */}
      <div className="card p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-4">
          <TranslatedText>Manual Translation</TranslatedText>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">
              <TranslatedText>Enter text to translate:</TranslatedText>
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
              placeholder="Type your text here..."
            />
          </div>
          
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTranslating ? (
              <TranslatedText>Translating...</TranslatedText>
            ) : (
              <TranslatedText>Translate</TranslatedText>
            )}
          </button>
          
          {translatedResult && (
            <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="text-green-400 text-sm mb-1">
                <TranslatedText>Translation Result:</TranslatedText>
              </div>
              <div className="text-white">{translatedResult}</div>
            </div>
          )}
        </div>
      </div>

      {/* Batch Translation Demo */}
      <div className="card p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-4">
          <TranslatedText>Batch Translation</TranslatedText>
        </h2>
        
        <div className="grid gap-3">
          {sampleTexts.map((text, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="text-white/70 text-sm">Original: "{text}"</div>
              <div className="text-white">
                {batchLoading ? (
                  <span className="text-blue-400">
                    <TranslatedText>Loading...</TranslatedText>
                  </span>
                ) : (
                  getTranslatedText(text)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="card p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-white mb-4">
          <TranslatedText>How to Use</TranslatedText>
        </h2>
        
        <div className="space-y-3 text-white/80">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="font-medium text-blue-400 mb-2">
              <TranslatedText>For Individual Text:</TranslatedText>
            </div>
            <code className="text-sm text-white/90">
              {"<TranslatedText>Your text here</TranslatedText>"}
            </code>
          </div>
          
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="font-medium text-green-400 mb-2">
              <TranslatedText>For Paragraphs:</TranslatedText>
            </div>
            <code className="text-sm text-white/90">
              {"<TranslatedParagraph>Your paragraph here</TranslatedParagraph>"}
            </code>
          </div>
          
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="font-medium text-purple-400 mb-2">
              <TranslatedText>For Custom Components:</TranslatedText>
            </div>
            <code className="text-sm text-white/90">
              {"const { text } = useTranslateContent('Your text')"}
            </code>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="text-center text-white/60">
        <TranslatedText>Change language using the selector in the navigation bar to see translations in action</TranslatedText>
      </div>
    </div>
  )
}