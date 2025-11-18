/**
 * Quiz Page Component for Right4All Frontend
 * 
 * Interactive learning quiz page for migrant workers to test their knowledge
 * about Malaysian labor laws and workers' rights in multiple languages.
 * 
 * @component
 * @module pages/Quiz
 */

import { useState } from 'react'
import QuizCategorySelection from '@/components/Quiz/QuizCategorySelection'
import QuizInterface from '@/components/Quiz/QuizInterface'
import quizDataRaw from '@/data/quizData.json'
import { useAppStore } from '@/store/appStore'

/**
 * View modes for the quiz interface
 */
type ViewMode = 'category' | 'quiz'

/**
 * Language interface for multi-language support
 */
interface Language {
  code: string;
  name: string;
}

/**
 * Topic interface for quiz categories
 */
interface Topic {
  id: number;
  name: string;
  questions: any[];
}

/**
 * Multilingual quiz topic interface
 */
interface QuizTopic {
  topic_name: Record<string, string>;
  questions: any[];
}

/**
 * Array type for quiz data
 */
type QuizDataArray = QuizTopic[];

/**
 * Transform multilingual question data to standardized format
 * @param {any} questionData - Raw question data from JSON
 * @param {number} index - Question index
 * @param {string} languageCode - Target language code
 * @returns {object} Transformed question object
 */
const transformQuestion = (questionData: any, index: number, languageCode: string) => {
  const options = questionData.options.map((opt: any) => ({
    letter: opt.option_order,
    text: opt.option_text[languageCode] || opt.option_text['en'],
    correct: opt.is_correct
  }));

  return {
    id: index + 1,
    legalId: null,
    type: questionData.question_type || 'multiple_choice',
    question: questionData.question_text[languageCode] || questionData.question_text['en'],
    options,
    correctAnswer: questionData.right_answer,
    explanations: questionData.options.map((opt: any) => ({
      option: opt.option_order,
      text: opt.option_explanation_text[languageCode] || opt.option_explanation_text['en']
    }))
  };
};

/**
 * Main Quiz page component
 * Manages quiz state, language selection, and view transitions
 * 
 * @returns {JSX.Element} Interactive quiz interface
 */
export default function Quiz() {
  // Global language state from app store
  const globalLanguage = useAppStore(state => state.language)
  
  // Quiz state management
  const [viewMode, setViewMode] = useState<ViewMode>('category')
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)

  // Cast imported quiz data to correct type
  const quizData = quizDataRaw as QuizDataArray
  
  /**
   * Available languages for the quiz
   * Supports English, Bahasa Malaysia, Nepali, Hindi, and Bengali
   */
  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'ms', name: 'Bahasa Malaysia' },
    { code: 'ne', name: 'नेपाली' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' }
  ]

  // Use global language, defaulting to English if not supported
  const selectedLanguage = languages.find(lang => lang.code === globalLanguage)?.code || 'en'

  /**
   * Handle topic selection and transition to quiz mode
   * @param {number} topicId - Selected topic ID
   */
  const handleTopicSelect = (topicId: number) => {
    setSelectedTopic(topicId)
    setViewMode('quiz')
  }

  /**
   * Return to category selection view
   */
  const handleBackToCategories = () => {
    setViewMode('category')
    setSelectedTopic(null)
  }

  /**
   * Restart quiz and return to category selection
   */
  const handleRestartQuiz = () => {
    setViewMode('category')
    setSelectedTopic(null)
  }

  // Get current language display name
  const currentLanguageName = languages.find(lang => lang.code === selectedLanguage)?.name || ''

  /**
   * Transform quiz data to topics for selected language
   * Maps multilingual data to current language selection
   */
  const topics: Topic[] = quizData.map((topicData, index) => ({
    id: index + 1,
    name: topicData.topic_name[selectedLanguage] || topicData.topic_name['en'] || 'Unknown Topic',
    questions: topicData.questions.map((q: any, qIndex: number) => 
      transformQuestion(q, qIndex, selectedLanguage)
    )
  }))
  
  const allTopics = topics
  
  // Get currently selected topic
  const currentTopic = topics.find(topic => topic.id === selectedTopic) || null
  const isAllTopics = false

  // Render category selection view
  if (viewMode === 'category') {
    return (
      <QuizCategorySelection
        topics={topics}
        selectedLanguage={selectedLanguage}
        languageName={currentLanguageName}
        onTopicSelect={handleTopicSelect}
        onBack={undefined} // No back button needed since we start at category view
      />
    )
  }

  // Render quiz interface view
  if (viewMode === 'quiz') {
    return (
      <QuizInterface
        topic={currentTopic}
        allTopics={topics}
        isAllTopics={isAllTopics}
        languageName={currentLanguageName}
        onBack={handleBackToCategories}
        onRestart={handleRestartQuiz}
      />
    )
  }

  return null
}
