import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
}

interface QuizLanguageSelectionProps {
  languages: Language[];
  onLanguageSelect: (languageCode: string) => void;
}

// Remove language flag icons - just show language names

export default function QuizLanguageSelection({ languages, onLanguageSelect }: QuizLanguageSelectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen p-6">
      <div className="container-max py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl"
            >
              <Globe className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-black text-white mb-4">
              {t('quiz.title')}
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t('quiz.subtitle')}
            </p>
          </div>

          {/* Language Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {languages.map((language, index) => (
              <motion.button
                key={language.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onLanguageSelect(language.code)}
                className="group p-6 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-white/10 hover:border-white/30 transition-all hover:scale-105 backdrop-blur-sm"
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {language.name}
                  </h3>
                  <p className="text-white/70 text-sm mt-2">
                    {t('quiz.takeQuizInLanguage')}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">
                    {t('quiz.interactiveQuizAvailable')}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors group-hover:translate-x-1 transform duration-200" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
