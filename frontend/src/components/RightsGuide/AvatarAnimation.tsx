import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Gauge } from 'lucide-react'

type Language = 'en' | 'ms' | 'ne' | 'bn' | 'hi'

interface DialogueItem {
  speaker: 'Maya' | 'Alex'
  text: Record<Language, string>
}

interface AvatarAnimationProps {
  dialogue: DialogueItem
  language: Language
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

const avatarStyles = {
  Maya: {
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    textColor: 'text-pink-300',
    avatar: '👩🏻‍💼', // Professional woman
    name: 'Maya',
    role: 'Migrant Worker'
  },
  Alex: {
    gradient: 'from-blue-400 to-cyan-500', 
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    textColor: 'text-blue-300',
    avatar: '👨🏻‍💼', // Professional man
    name: 'Alex',
    role: 'Rights Advisor'
  }
}

export default function AvatarAnimation({
  dialogue,
  language,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: AvatarAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [showText, setShowText] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [textProgress, setTextProgress] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedControl, setShowSpeedControl] = useState(false)

  const currentSpeaker = dialogue.speaker
  const currentText = dialogue.text[language]
  const speakerData = avatarStyles[currentSpeaker]

  useEffect(() => {
    setShowText(false)
    setTextProgress(0)
    const timer = setTimeout(() => {
      setShowText(true)
      if (isAutoPlaying) {
        startTextAnimation()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [dialogue, language])

  useEffect(() => {
    if (showText && isAutoPlaying) {
      startTextAnimation()
    }
  }, [isAutoPlaying, showText, playbackSpeed])

  const startTextAnimation = () => {
    const textLength = currentText.length
    const baseDuration = Math.max(3000, textLength * 50) // Minimum 3 seconds, 50ms per character
    const duration = baseDuration / playbackSpeed // Adjust duration based on speed
    let startTime = Date.now()
    
    const animate = () => {
      if (!isAutoPlaying) return
      
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setTextProgress(progress)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Auto advance after text completes + pause (also affected by speed)
        const pauseDuration = Math.max(1000, 2000 / playbackSpeed)
        setTimeout(() => {
          if (hasNext && isAutoPlaying) {
            onNext()
          }
        }, pauseDuration)
      }
    }
    
    requestAnimationFrame(animate)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    if (!isAutoPlaying && showText) {
      startTextAnimation()
    }
  }

  const restartAnimation = () => {
    setIsAnimating(false)
    setShowText(false)
    setTextProgress(0)
    setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setShowText(true)
        if (isAutoPlaying) {
          startTextAnimation()
        }
      }, 500)
    }, 100)
  }

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]
  
  const cycleSpeed = () => {
    const currentIndex = speedOptions.indexOf(playbackSpeed)
    const nextIndex = (currentIndex + 1) % speedOptions.length
    setPlaybackSpeed(speedOptions[nextIndex])
    
    // Restart animation with new speed if currently playing
    if (isAutoPlaying && showText) {
      setTextProgress(0)
      startTextAnimation()
    }
  }

  const getSpeedLabel = (speed: number) => {
    if (speed === 0.5) return 'Slow'
    if (speed === 0.75) return 'Slower'
    if (speed === 1) return 'Normal'
    if (speed === 1.25) return 'Faster'
    if (speed === 1.5) return 'Fast'
    if (speed === 2) return 'Very Fast'
    return `${speed}x`
  }

  const getDisplayText = () => {
    if (!isAutoPlaying || textProgress === 1) {
      return currentText
    }
    const targetLength = Math.floor(currentText.length * textProgress)
    return currentText.slice(0, targetLength)
  }

  return (
    <div className="space-y-0">
      {/* Main Animation Container */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden">
        {/* Avatar Stage - Top Section */}
        <div className="flex items-center justify-center gap-4 md:gap-8 p-4 md:p-8 min-h-[200px] md:min-h-[300px]">
          {/* Maya Avatar */}
          <motion.div
            className={`flex flex-col items-center gap-2 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${
              currentSpeaker === 'Maya' ? avatarStyles.Maya.bgGradient : 'from-gray-600/10 to-gray-700/10'
            } border ${
              currentSpeaker === 'Maya' ? 'border-pink-400/30' : 'border-white/10'
            } transition-all duration-500 min-w-[100px] md:min-w-[140px]`}
            animate={{
              scale: currentSpeaker === 'Maya' ? 1.05 : 0.95,
              y: currentSpeaker === 'Maya' && isAnimating ? [0, -8, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.5 },
              y: { duration: 2, repeat: isAnimating && currentSpeaker === 'Maya' ? Infinity : 0, ease: "easeInOut" }
            }}
          >
            <motion.div 
              className={`text-3xl md:text-5xl relative ${currentSpeaker === 'Maya' ? 'animate-pulse' : ''}`}
              animate={{
                rotate: currentSpeaker === 'Maya' && isAnimating ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                rotate: { duration: 3, repeat: isAnimating && currentSpeaker === 'Maya' ? Infinity : 0 }
              }}
            >
              {avatarStyles.Maya.avatar}
              {currentSpeaker === 'Maya' && isAnimating && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div className="text-center">
              <h3 className={`font-bold text-xs md:text-sm ${
                currentSpeaker === 'Maya' ? 'text-pink-300' : 'text-white/60'
              }`}>
                {avatarStyles.Maya.name}
              </h3>
              <p className={`text-xs ${
                currentSpeaker === 'Maya' ? 'text-pink-200/80' : 'text-white/40'
              }`}>
                {avatarStyles.Maya.role}
              </p>
            </div>
          </motion.div>

          {/* Conversation Indicator */}
          <motion.div 
            className="flex items-center"
            animate={{
              scale: isAnimating ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 2, repeat: isAnimating ? Infinity : 0 }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                    currentSpeaker === 'Maya' ? 'bg-pink-400' : 'bg-blue-400'
                  }`}
                  animate={{
                    y: isAnimating ? [0, -6, 0] : 0,
                    opacity: isAnimating ? [0.4, 1, 0.4] : 0.6,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isAnimating ? Infinity : 0,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Alex Avatar */}
          <motion.div
            className={`flex flex-col items-center gap-2 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${
              currentSpeaker === 'Alex' ? avatarStyles.Alex.bgGradient : 'from-gray-600/10 to-gray-700/10'
            } border ${
              currentSpeaker === 'Alex' ? 'border-blue-400/30' : 'border-white/10'
            } transition-all duration-500 min-w-[100px] md:min-w-[140px]`}
            animate={{
              scale: currentSpeaker === 'Alex' ? 1.05 : 0.95,
              y: currentSpeaker === 'Alex' && isAnimating ? [0, -8, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.5 },
              y: { duration: 2, repeat: isAnimating && currentSpeaker === 'Alex' ? Infinity : 0, ease: "easeInOut" }
            }}
          >
            <motion.div 
              className={`text-3xl md:text-5xl relative ${currentSpeaker === 'Alex' ? 'animate-pulse' : ''}`}
              animate={{
                rotate: currentSpeaker === 'Alex' && isAnimating ? [0, -5, 5, 0] : 0,
              }}
              transition={{
                rotate: { duration: 3, repeat: isAnimating && currentSpeaker === 'Alex' ? Infinity : 0 }
              }}
            >
              {avatarStyles.Alex.avatar}
              {currentSpeaker === 'Alex' && isAnimating && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div className="text-center">
              <h3 className={`font-bold text-xs md:text-sm ${
                currentSpeaker === 'Alex' ? 'text-blue-300' : 'text-white/60'
              }`}>
                {avatarStyles.Alex.name}
              </h3>
              <p className={`text-xs ${
                currentSpeaker === 'Alex' ? 'text-blue-200/80' : 'text-white/40'
              }`}>
                {avatarStyles.Alex.role}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Speech Bubble Section - Bottom */}
        <div className="border-t border-white/10 bg-gradient-to-br from-slate-900/30 to-slate-800/30 backdrop-blur-sm">
          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 md:p-6"
              >
                <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br ${speakerData.bgGradient} border border-white/20 backdrop-blur-sm shadow-lg relative`}>
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl flex-shrink-0">{speakerData.avatar}</span>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <span className={`font-bold text-base md:text-lg ${speakerData.textColor}`}>
                          {speakerData.name}
                        </span>
                        <span className="text-white/60 text-xs md:text-sm">is speaking...</span>
                      </div>
                      <p className="text-white text-sm md:text-lg leading-relaxed min-h-[2rem]">
                        {getDisplayText()}
                        {isAutoPlaying && textProgress < 1 && (
                          <span className="animate-pulse">|</span>
                        )}
                      </p>
                      
                      {/* Progress bar */}
                      {isAutoPlaying && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-white/60">Reading progress</span>
                            <span className="text-xs text-white/60">{Math.round(textProgress * 100)}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full bg-gradient-to-r ${speakerData.gradient}`}
                              animate={{ width: `${textProgress * 100}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/10">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-all text-sm md:text-base ${
            hasPrevious 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-white/5 text-white/40 cursor-not-allowed'
          }`}
        >
          <SkipBack className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <button
          onClick={toggleAutoPlay}
          className={`flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all text-sm md:text-base ${
            isAutoPlaying
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5" />}
          <span className="hidden sm:inline">
            {isAutoPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
          </span>
        </button>

        {/* Speed Control */}
        <div className="relative">
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all text-sm md:text-base"
            title={`Current speed: ${getSpeedLabel(playbackSpeed)} (${playbackSpeed}x)`}
          >
            <Gauge className="w-4 h-4" />
            <span className="font-medium">{getSpeedLabel(playbackSpeed)}</span>
          </button>
        </div>
        
        <button
          onClick={restartAnimation}
          className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm md:text-base"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Restart</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg transition-all text-sm md:text-base ${
            hasNext 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-white/5 text-white/40 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}