import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, DollarSign, Shield, AlertTriangle, Calendar, Home, Heart, Coffee, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Topic {
  id: number;
  name: string;
  questions: any[];
}

interface QuizCategorySelectionProps {
  topics: Topic[];
  selectedLanguage: string;
  languageName: string;
  onTopicSelect: (topicId: number) => void;
  onBack?: () => void;
}

const topicIcons: Record<number, React.ComponentType<any>> = {
  1: Shield,      // Complete Rights
  2: DollarSign,  // Wages & Salary 
  3: Clock,       // Working Hours
  4: Users,       // Workplace Rights
  5: AlertTriangle, // Overtime Rules
  6: DollarSign,  // Overtime Rates
  7: Home,        // Housing & Hostel
  8: Heart,       // Safety & Health
  9: Coffee,      // Rest & Holidays
  10: FileText,   // Passport Retention
};

const topicColors = [
  'from-rose-500 to-pink-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-violet-600', 
  'from-green-500 to-emerald-600',
  'from-orange-500 to-amber-600',
  'from-indigo-500 to-blue-600',
  'from-teal-500 to-cyan-600',
  'from-red-500 to-rose-600',
  'from-yellow-500 to-orange-600',
  'from-gray-500 to-slate-600'
];

export default function QuizCategorySelection({ 
  topics, 
  selectedLanguage, 
  languageName, 
  onTopicSelect, 
  onBack 
}: QuizCategorySelectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen p-6">
      <div className="container-max py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('common.back')}
              </button>
            )}
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">
                {t('quiz.chooseQuizCategory')}
              </h2>
              <p className="text-white/70">
                {t('quiz.selectedLanguage')}: <span className="font-semibold">{languageName}</span>
              </p>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const IconComponent = topicIcons[topic.id] || Shield;
              const colorClass = topicColors[index % topicColors.length];
              
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => onTopicSelect(topic.id)}
                >
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${colorClass} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {topic.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {topic.questions.length} {t('quiz.questionsAvailable')}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center gap-2 backdrop-blur-sm font-medium">
                        {t('quiz.startQuiz')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Disclaimer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: topics.length * 0.1 + 0.3 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                {t('quiz.disclaimer.title')}
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {t('quiz.disclaimer.content')}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
