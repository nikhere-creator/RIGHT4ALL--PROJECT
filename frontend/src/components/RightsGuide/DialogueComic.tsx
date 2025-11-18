import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react'
import { TranslatedText } from '../TranslatedText'
import type { DialogueExchange } from '../../data/rightsGuideDialogues'

interface DialogueComicProps {
  dialogue: DialogueExchange
  onNext?: () => void
  onPrevious?: () => void
  hasNext: boolean
  hasPrevious: boolean
  autoPlay?: boolean
  audioEnabled?: boolean
  onAudioToggle?: () => void
}

interface Character {
  name: 'Maya' | 'Alex'
  avatar: string
  color: string
  position: 'left' | 'right'
}

const characters: Record<string, Character> = {
  Maya: {
    name: 'Maya',
    avatar: '👩‍💼', // Could be replaced with actual character images
    color: 'from-pink-500 to-rose-500',
    position: 'left'
  },
  Alex: {
    name: 'Alex', 
    avatar: '👨‍💼',
    color: 'from-blue-500 to-cyan-500',
    position: 'right'
  }
}

export default function DialogueComic({
  dialogue,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  autoPlay = false,
  audioEnabled = false,
  onAudioToggle
}: DialogueComicProps) {
  const [currentStep, setCurrentStep] = useState(0) // 0: Maya speaks, 1: Alex speaks
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis)
    }
  }, [])

  const speakText = (text: string, voice: 'maya' | 'alex') => {
    if (!speechSynthesis || !audioEnabled) return

    speechSynthesis.cancel() // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = voice === 'maya' ? 1.1 : 0.9 // Higher pitch for Maya
    utterance.volume = 0.8

    // Try to set appropriate voices
    const voices = speechSynthesis.getVoices()
    const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman'))
    const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('man'))
    
    if (voice === 'maya' && femaleVoice) {
      utterance.voice = femaleVoice
    } else if (voice === 'alex' && maleVoice) {
      utterance.voice = maleVoice
    }

    speechSynthesis.speak(utterance)
  }

  const handleStepForward = () => {
    if (currentStep === 0) {
      setCurrentStep(1)
      if (audioEnabled) {
        speakText(dialogue.alex, 'alex')
      }
    } else if (hasNext) {
      setCurrentStep(0)
      onNext?.()
      if (audioEnabled) {
        setTimeout(() => speakText(dialogue.maya, 'maya'), 500)
      }
    }
  }

  const handleStepBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0)
      if (audioEnabled) {
        speakText(dialogue.maya, 'maya')
      }
    } else if (hasPrevious) {
      onPrevious?.()
      setCurrentStep(1)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (speechSynthesis) {
      if (isPlaying) {
        speechSynthesis.cancel()
      } else {
        const currentText = currentStep === 0 ? dialogue.maya : dialogue.alex
        const currentVoice = currentStep === 0 ? 'maya' : 'alex'
        speakText(currentText, currentVoice)
      }
    }
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentStep === 0) {
      speakText(dialogue.maya, 'maya')
    }
  }, [dialogue, isPlaying])

  const renderCharacter = (character: Character, isActive: boolean, text: string) => (
    <motion.div
      className={`flex flex-col items-center ${character.position === 'left' ? 'items-start' : 'items-end'}`}
      animate={{
        scale: isActive ? 1.05 : 0.95,
        opacity: isActive ? 1 : 0.7,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Character Avatar */}
      <motion.div
        className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${character.color} flex items-center justify-center text-3xl shadow-lg mb-4`}
        animate={{
          y: isActive ? [-2, 2, -2] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {character.avatar}
        
        {/* Speaking indicator */}
        {isActive && (
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Character Name */}
      <div className={`text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${character.color}`}>
        {character.name}
      </div>

      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative max-w-md p-4 bg-white rounded-2xl shadow-lg border border-gray-200 ${
              character.position === 'left' ? 'ml-4' : 'mr-4'
            }`}
          >
            {/* Speech bubble arrow */}
            <div className={`absolute top-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 ${
              character.position === 'left' ? '-left-2' : '-right-2'
            }`} />
            
            <TranslatedText className="text-gray-800 leading-relaxed">
              {text}
            </TranslatedText>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          <TranslatedText>{dialogue.title}</TranslatedText>
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm text-white/70">
          <span>Step {currentStep + 1} of 2</span>
          <div className="flex gap-1">
            {[0, 1].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step === currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comic Panel */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 shadow-xl border border-white/20">
        <div className="grid md:grid-cols-2 gap-8 items-start min-h-[300px]">
          {/* Maya (Left) */}
          {renderCharacter(
            characters.Maya,
            currentStep === 0,
            dialogue.maya
          )}

          {/* Alex (Right) */}
          {renderCharacter(
            characters.Alex,
            currentStep === 1,
            dialogue.alex
          )}
        </div>

        {/* Conversation Flow Indicator */}
        <div className="flex items-center justify-center mt-6">
          <motion.div
            className="flex items-center gap-2 text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentStep === 0 ? (
              <>
                <span className="text-pink-500">Maya</span>
                <motion.div
                  className="flex gap-1"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-1 h-1 bg-pink-500 rounded-full" />
                  <div className="w-1 h-1 bg-pink-500 rounded-full" />
                  <div className="w-1 h-1 bg-pink-500 rounded-full" />
                </motion.div>
                <span className="text-blue-500">Alex</span>
              </>
            ) : (
              <>
                <span className="text-pink-500 opacity-50">Maya</span>
                <motion.div
                  className="flex gap-1"
                  animate={{ x: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-1 h-1 bg-blue-500 rounded-full" />
                  <div className="w-1 h-1 bg-blue-500 rounded-full" />
                  <div className="w-1 h-1 bg-blue-500 rounded-full" />
                </motion.div>
                <span className="text-blue-500">Alex</span>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStepBack}
            disabled={currentStep === 0 && !hasPrevious}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:opacity-50 text-white rounded-lg transition-all"
          >
            <SkipBack className="w-4 h-4" />
            <TranslatedText>Previous</TranslatedText>
          </button>
        </div>

        {/* Audio & Play Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAudioToggle}
            className={`p-2 rounded-lg transition-all ${
              audioEnabled 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white/70'
            }`}
            title="Toggle Audio Narration"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={togglePlayPause}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        {/* Forward Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStepForward}
            disabled={currentStep === 1 && !hasNext}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:opacity-50 text-white rounded-lg transition-all"
          >
            <TranslatedText>Next</TranslatedText>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 text-center text-white/60 text-sm">
        <TranslatedText>
          {currentStep === 0 
            ? "Maya is asking about her rights..." 
            : "Alex is explaining the law..."}
        </TranslatedText>
      </div>
    </div>
  )
}