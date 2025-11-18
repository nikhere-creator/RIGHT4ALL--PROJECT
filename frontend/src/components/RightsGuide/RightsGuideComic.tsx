import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Play, Volume2, VolumeX, ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import DialogueComic from './DialogueComic'
import { TranslatedText } from '../TranslatedText'
import { rightsGuideData, type RightsCategory, type DialogueExchange } from '../../data/rightsGuideDialogues'

type ViewMode = 'categories' | 'comic' | 'text'

export default function RightsGuideComic() {
  const [selectedCategory, setSelectedCategory] = useState<RightsCategory | null>(null)
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>('categories')
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const currentDialogue = selectedCategory?.dialogues[currentDialogueIndex] || null

  const handleCategorySelect = (category: RightsCategory) => {
    setSelectedCategory(category)
    setCurrentDialogueIndex(0)
    setViewMode('comic')
  }

  const handleNextDialogue = () => {
    if (selectedCategory && currentDialogueIndex < selectedCategory.dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1)
    }
  }

  const handlePreviousDialogue = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(currentDialogueIndex - 1)
    }
  }

  const handleBackToCategories = () => {
    setViewMode('categories')
    setSelectedCategory(null)
    setCurrentDialogueIndex(0)
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
  }

  const hasNextDialogue = selectedCategory ? currentDialogueIndex < selectedCategory.dialogues.length - 1 : false
  const hasPreviousDialogue = currentDialogueIndex > 0

  const renderCategoryCard = (category: RightsCategory, index: number) => (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
    >
      <div className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-white">
                <TranslatedText>{category.title}</TranslatedText>
              </h3>
              <p className="text-white/80 text-sm">
                {category.dialogues.length} scenarios
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-white/80" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expandedCategory === category.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="border-t border-white/20 pt-4">
                <div className="grid gap-2">
                  {category.dialogues.slice(0, 3).map((dialogue, idx) => (
                    <div key={dialogue.id} className="text-white/90 text-sm p-2 bg-white/10 rounded-lg">
                      <div className="font-medium">
                        <TranslatedText>{dialogue.title}</TranslatedText>
                      </div>
                    </div>
                  ))}
                  {category.dialogues.length > 3 && (
                    <div className="text-white/70 text-xs text-center py-1">
                      +{category.dialogues.length - 3} more scenarios
                    </div>
                  )}
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCategorySelect(category)
                  }}
                  className="w-full mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <TranslatedText>Start Learning</TranslatedText>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )

  const renderCategoriesView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl"
        >
          <BookOpen className="w-8 h-8 text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-black text-white mb-4">
          <TranslatedText>Rights Guide</TranslatedText>
        </h1>
        
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          <TranslatedText>
            Learn about your workplace rights through interactive conversations between Maya and Alex. 
            Choose a category to start exploring your legal protections.
          </TranslatedText>
        </p>
      </div>

      {/* Global Controls */}
      <div className="flex items-center justify-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm">
            <TranslatedText>Visual Mode:</TranslatedText>
          </span>
          <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('comic')}
              className={`px-3 py-1 text-sm transition-all ${
                viewMode === 'comic' ? 'bg-blue-500 text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              <TranslatedText>Comics / Animation</TranslatedText>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-all ${
              audioEnabled 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <TranslatedText>Toggle audio for narration in your selected language</TranslatedText>
          </button>
        </div>

        <Link
          to="/quiz"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <TranslatedText>Take Quiz</TranslatedText>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rightsGuideData.map((category, index) => renderCategoryCard(category, index))}
      </div>
    </div>
  )

  const renderComicView = () => {
    if (!selectedCategory || !currentDialogue) return null

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToCategories}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <TranslatedText>Back to Categories</TranslatedText>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-white/80 text-sm">
              <span className={`px-3 py-1 rounded-lg bg-gradient-to-r ${selectedCategory.color} text-white`}>
                <TranslatedText>{selectedCategory.title}</TranslatedText>
              </span>
              <span className="ml-2">
                {currentDialogueIndex + 1} of {selectedCategory.dialogues.length}
              </span>
            </div>

            <Link
              to="/quiz"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <TranslatedText>Take Quiz to reinforce learning</TranslatedText>
            </Link>
          </div>
        </div>

        {/* Comic Component */}
        <DialogueComic
          dialogue={currentDialogue}
          onNext={handleNextDialogue}
          onPrevious={handlePreviousDialogue}
          hasNext={hasNextDialogue}
          hasPrevious={hasPreviousDialogue}
          autoPlay={autoPlay}
          audioEnabled={audioEnabled}
          onAudioToggle={toggleAudio}
        />

        {/* Category Progress */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <span className="text-white/80 text-sm mr-2">
              <TranslatedText>Progress:</TranslatedText>
            </span>
            {selectedCategory.dialogues.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentDialogueIndex
                    ? 'bg-white scale-125'
                    : index < currentDialogueIndex
                    ? 'bg-green-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container-max py-8">
        <AnimatePresence mode="wait">
          {viewMode === 'categories' ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderCategoriesView()}
            </motion.div>
          ) : (
            <motion.div
              key="comic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderComicView()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}