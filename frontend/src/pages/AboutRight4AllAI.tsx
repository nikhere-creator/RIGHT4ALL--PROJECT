import { FadeIn } from '@/components/ui/Motion'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function AboutRight4AllAI() {
  const { t } = useTranslation()
  const [showChatbot, setShowChatbot] = useState(false)

  const openChatbot = () => {
    // Find the floating chat button and click it
    const chatButton = document.querySelector('button[aria-label="Open chat"]') as HTMLElement
    if (chatButton) {
      chatButton.click()
    } else {
      // Fallback: try to find any button that might open the chat
      const buttons = document.querySelectorAll('button')
      const chatButtons = Array.from(buttons).filter(btn => 
        btn.textContent?.includes('chat') || 
        btn.textContent?.includes('Chat') ||
        btn.getAttribute('aria-label')?.includes('chat') ||
        btn.getAttribute('aria-label')?.includes('Chat')
      )
      if (chatButtons.length > 0) {
        chatButtons[0].click()
      } else {
        // Last resort: show a message
        alert('Please click the chat button in the bottom right corner to start chatting.')
      }
    }
  }

  return (
    <div className="container-max px-4">
      {/* Hero Section */}
      <section className="hero py-16 lg:py-24 text-center">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-5xl mb-6"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              🤖
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('chatbot.hero.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              {t('chatbot.hero.subtitle')}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={openChatbot}
                className="relative btn-primary text-center"
              >
                {t('chatbot.hero.startChatting')}
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* System Architecture Section */}
      <section className="py-16">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t('chatbot.architecture.title')}</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              {t('chatbot.architecture.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Hybrid RAG System */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-4">{t('chatbot.architecture.hybridRag.title')}</h3>
              <p className="text-white/70 mb-6">
                {t('chatbot.architecture.hybridRag.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">{t('chatbot.architecture.hybridRag.tags.deepseek')}</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">{t('chatbot.architecture.hybridRag.tags.vector')}</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">{t('chatbot.architecture.hybridRag.tags.keyword')}</span>
              </div>
            </div>

            {/* Card 2: Database Integration */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-3xl mb-4">🗄️</div>
              <h3 className="text-xl font-bold text-white mb-4">{t('chatbot.architecture.database.title')}</h3>
              <p className="text-white/70 mb-6">
                {t('chatbot.architecture.database.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">{t('chatbot.architecture.database.tags.postgresql')}</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">{t('chatbot.architecture.database.tags.vectorDb')}</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">{t('chatbot.architecture.database.tags.storedProcedures')}</span>
              </div>
            </div>

            {/* Card 3: Language & Safety */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-white mb-4">{t('chatbot.architecture.language.title')}</h3>
              <p className="text-white/70 mb-6">
                {t('chatbot.architecture.language.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">{t('chatbot.architecture.language.tags.languages')}</span>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">{t('chatbot.architecture.language.tags.safety')}</span>
                <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">{t('chatbot.architecture.language.tags.topicGuard')}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-16">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t('chatbot.performance.title')}</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              {t('chatbot.performance.subtitle')}
            </p>
          </div>

          {/* Highlight Box */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl">✅</div>
              <h3 className="text-2xl font-bold text-white">{t('chatbot.performance.perfectPerformance.title')}</h3>
            </div>
            <p className="text-white/80 text-lg">
              {t('chatbot.performance.perfectPerformance.description')}
            </p>
          </div>

          {/* Benchmark Table */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 max-w-4xl mx-auto">
            <h4 className="text-xl font-bold text-white mb-6 text-center">{t('chatbot.performance.testResults.title')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl text-green-400 mb-2">35/35</div>
                <div className="text-white font-semibold">{t('chatbot.performance.testResults.factualAccuracy')}</div>
                <div className="text-white/60 text-sm">100% Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-green-400 mb-2">10/10</div>
                <div className="text-white font-semibold">{t('chatbot.performance.testResults.safetyTests')}</div>
                <div className="text-white/60 text-sm">100% Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-green-400 mb-2">5/5</div>
                <div className="text-white font-semibold">{t('chatbot.performance.testResults.languages')}</div>
                <div className="text-white/60 text-sm">{t('chatbot.performance.testResults.fullSupport')}</div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <span className="text-white">{t('chatbot.performance.testCases.minimumWage')}</span>
                <span className="text-green-400">✅ {t('chatbot.performance.testCases.wageRights')}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <span className="text-white">{t('chatbot.performance.testCases.overtime')}</span>
                <span className="text-green-400">✅ {t('chatbot.performance.testCases.legalCompliance')}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <span className="text-white">{t('chatbot.performance.testCases.passport')}</span>
                <span className="text-green-400">✅ {t('chatbot.performance.testCases.safetyBoundary')}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <span className="text-white">{t('chatbot.performance.testCases.sickLeave')}</span>
                <span className="text-green-400">✅ {t('chatbot.performance.testCases.employmentRights')}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <span className="text-white">{t('chatbot.performance.testCases.accommodation')}</span>
                <span className="text-green-400">✅ {t('chatbot.performance.testCases.livingConditions')}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <span className="text-white">{t('chatbot.performance.testCases.workingHours')}</span>
                <span className="text-green-400">✅ {t('chatbot.performance.testCases.workingConditions')}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <span className="text-white">{t('chatbot.performance.testCases.ngoSupport')}</span>
                <span className="text-green-400">✅ {t('chatbot.performance.testCases.supportOrganizations')}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Key Strengths & Safety Features Section */}
      <section className="py-16">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Key Strengths */}
            <div>
              <h3 className="text-2xl font-black text-white mb-6">{t('chatbot.strengths.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-xl mt-1">✅</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.strengths.hybridRag.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.strengths.hybridRag.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-xl mt-1">✅</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.strengths.database.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.strengths.database.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-xl mt-1">✅</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.strengths.language.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.strengths.language.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-xl mt-1">✅</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.strengths.keyword.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.strengths.keyword.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-xl mt-1">✅</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.strengths.wage.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.strengths.wage.description')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Features */}
            <div>
              <h3 className="text-2xl font-black text-white mb-6">{t('chatbot.safety.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-blue-400 text-xl mt-1">🛡️</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.safety.topicBoundary.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.safety.topicBoundary.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-400 text-xl mt-1">🛡️</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.safety.databaseBacked.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.safety.databaseBacked.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-400 text-xl mt-1">🛡️</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.safety.fallback.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.safety.fallback.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-400 text-xl mt-1">🛡️</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.safety.analytics.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.safety.analytics.description')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-400 text-xl mt-1">🛡️</div>
                  <div>
                    <div className="text-white font-semibold">{t('chatbot.safety.transparency.title')}</div>
                    <div className="text-white/70 text-sm">{t('chatbot.safety.transparency.description')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* What the Assistant Can Help With */}
      <section className="py-16">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t('chatbot.capabilities.title')}</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              {t('chatbot.capabilities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-2xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-white mb-3">{t('chatbot.capabilities.wage.title')}</h3>
              <p className="text-white/70 text-sm">
                {t('chatbot.capabilities.wage.description')}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-2xl mb-4">⏰</div>
              <h3 className="text-lg font-bold text-white mb-3">{t('chatbot.capabilities.hours.title')}</h3>
              <p className="text-white/70 text-sm">
                {t('chatbot.capabilities.hours.description')}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-2xl mb-4">📄</div>
              <h3 className="text-lg font-bold text-white mb-3">{t('chatbot.capabilities.documents.title')}</h3>
              <p className="text-white/70 text-sm">
                {t('chatbot.capabilities.documents.description')}
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-2xl mb-4">🏠</div>
              <h3 className="text-lg font-bold text-white mb-3">{t('chatbot.capabilities.accommodation.title')}</h3>
              <p className="text-white/70 text-sm">
                {t('chatbot.capabilities.accommodation.description')}
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-2xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-white mb-3">{t('chatbot.capabilities.support.title')}</h3>
              <p className="text-white/70 text-sm">
                {t('chatbot.capabilities.support.description')}
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-2xl mb-4">🌐</div>
              <h3 className="text-lg font-bold text-white mb-3">{t('chatbot.capabilities.multilingual.title')}</h3>
              <p className="text-white/70 text-sm">
                {t('chatbot.capabilities.multilingual.description')}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer with SDG */}
      <footer className="py-12 mt-16 border-t border-white/10">
        <FadeIn>
          <div className="max-w-6xl mx-auto text-center">
            {/* SDG Section */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl border border-white/20">
                <motion.span
                  className="text-3xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  🌍
                </motion.span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white">{t('chatbot.sdg.title')}</h3>
                  <p className="text-white/70 text-sm max-w-md">
                    {t('chatbot.sdg.description')}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
                  <span className="text-lg">🎯</span>
                  <span className="text-white text-sm font-medium">SDG 10</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  )
}
