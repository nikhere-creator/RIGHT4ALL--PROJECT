import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ArrowLeft, Users, MessageCircle } from 'lucide-react'
import AvatarAnimation from './AvatarAnimation'
import animationData from '../../data/animationDialogues.json'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/appStore'

type Language = 'en' | 'ms' | 'ne' | 'bn' | 'hi'
type ViewMode = 'categories' | 'animation'

interface Topic {
  name: Record<Language, string>
  sections: {
    title: Record<Language, string>
    dialog: Array<{
      speaker: 'Maya' | 'Alex'
      text: Record<Language, string>
    }>
  }[]
}

const languageNames = {
  en: 'English',
  ms: 'Bahasa Malaysia', 
  ne: 'नेपाली',
  bn: 'বাংলা',
  hi: 'हिंदी'
}

const topicColors = [
  'from-rose-500 to-pink-600',
  'from-blue-500 to-cyan-600', 
  'from-purple-500 to-violet-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-amber-600',
  'from-indigo-500 to-blue-600'
]

export default function AnimatedRightsGuide() {
  const { t } = useTranslation()
  const globalLanguage = useAppStore(state => state.language)
  const [viewMode, setViewMode] = useState<ViewMode>('categories')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [selectedSection, setSelectedSection] = useState<number>(0)
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)

  // Cast the animation data to match our Topic interface
  const topics: Topic[] = animationData.topics as unknown as Topic[]
  const availableLanguages: Language[] = animationData.locales as Language[]
  
  // Use global language, defaulting to 'en' if not supported
  const selectedLanguage: Language = availableLanguages.includes(globalLanguage as Language) 
    ? globalLanguage as Language 
    : 'en'

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic)
    setViewMode('animation')
    setSelectedSection(0)
    setCurrentDialogueIndex(0)
  }

  const handleBackToCategories = () => {
    setViewMode('categories')
    setSelectedTopic(null)
    setSelectedSection(0)
    setCurrentDialogueIndex(0)
  }

  const renderCategoriesView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 md:mb-6 shadow-2xl"
        >
          <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          {t('rightsGuide.title')}
        </h1>
        
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4">
          {t('rightsGuide.subtitle')}
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => handleTopicSelect(topic)}
          >
            <div className={`p-4 md:p-6 rounded-2xl bg-gradient-to-br ${topicColors[index % topicColors.length]} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {t(`rightsGuide.topics.topic${index + 1}`)}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm">
                    {topic.sections.length} {t('rightsGuide.interactiveSections')}
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="px-4 py-2 md:px-6 md:py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center gap-2 backdrop-blur-sm font-medium text-sm md:text-base">
                  <MessageCircle className="w-4 h-4" />
                  {t('rightsGuide.startLearning')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: topics.length * 0.1 + 0.3 }}
        className="max-w-4xl mx-auto px-4 mt-12"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3">
            {t('rightsGuide.disclaimer.title')}
          </h3>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {t('rightsGuide.disclaimer.content')}
          </p>
        </div>
      </motion.div>
    </div>
  )


  const renderAnimationView = () => {
    if (!selectedTopic) return null

    const currentSection = selectedTopic.sections[selectedSection]
    const currentDialogue = currentSection.dialog[currentDialogueIndex]

    return (
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
            <button
              onClick={handleBackToCategories}
              className="flex items-center gap-2 px-3 py-2 md:px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm md:text-base self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('rightsGuide.back')}
            </button>
            
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">
                {currentSection.title[selectedLanguage]}
              </h2>
              <p className="text-white/70 text-xs md:text-sm flex items-center gap-2">
                {languageNames[selectedLanguage]} • 
                {t('rightsGuide.section')} {selectedSection + 1} {t('rightsGuide.of')} {selectedTopic.sections.length}
              </p>
            </div>
          </div>

          <div className="text-white/70 text-xs md:text-sm">
            {t('rightsGuide.dialogue')} {currentDialogueIndex + 1} {t('rightsGuide.of')} {currentSection.dialog.length}
          </div>
        </div>

        {/* Animation Component */}
        <AvatarAnimation
          dialogue={currentDialogue}
          language={selectedLanguage}
          onNext={() => {
            if (currentDialogueIndex < currentSection.dialog.length - 1) {
              setCurrentDialogueIndex(currentDialogueIndex + 1)
            } else if (selectedSection < selectedTopic.sections.length - 1) {
              setSelectedSection(selectedSection + 1)
              setCurrentDialogueIndex(0)
            }
          }}
          onPrevious={() => {
            if (currentDialogueIndex > 0) {
              setCurrentDialogueIndex(currentDialogueIndex - 1)
            } else if (selectedSection > 0) {
              setSelectedSection(selectedSection - 1)
              setCurrentDialogueIndex(selectedTopic.sections[selectedSection - 1].dialog.length - 1)
            }
          }}
          hasNext={currentDialogueIndex < currentSection.dialog.length - 1 || selectedSection < selectedTopic.sections.length - 1}
          hasPrevious={currentDialogueIndex > 0 || selectedSection > 0}
        />

        {/* Progress Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Section Progress */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs md:text-sm">{t('rightsGuide.section')}s:</span>
            {selectedTopic.sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === selectedSection
                    ? 'bg-blue-500 scale-125'
                    : index < selectedSection
                    ? 'bg-green-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          
          {/* Dialogue Progress */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs md:text-sm">{t('rightsGuide.dialogue')}s:</span>
            <div className="flex items-center gap-1 max-w-[200px] overflow-x-auto">
              {currentSection.dialog.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all flex-shrink-0 ${
                    index === currentDialogueIndex
                      ? 'bg-white scale-125'
                      : index < currentDialogueIndex
                      ? 'bg-green-400'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="container-max py-4 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'categories' && renderCategoriesView()}
            {viewMode === 'animation' && renderAnimationView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
