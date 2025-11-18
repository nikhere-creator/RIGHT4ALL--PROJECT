/**
 * Home Page Component for Right4All Frontend
 * 
 * Main landing page featuring hero section, FAQ, and SDG information.
 * Provides navigation to key application features and multilingual support.
 * 
 * @component
 * @module pages/Home
 */

import { FadeIn } from '@/components/ui/Motion'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HeroScene from '@/components/Three/HeroScene'

/**
 * Main Home page component
 * Renders the landing page with hero section, FAQ, and footer
 */
export default function Home() {
  // Translation hook for multi-language support
  const { t } = useTranslation()

  return (
    <div className="container-max px-4">
      {/* Hero Section */}
      <section className="hero grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center min-h-[calc(100vh-140px)] py-4 lg:py-8">
        <div className="space-y-6">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {t('home.empowering')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-400">{t('home.migrantWorkers')}</span>
            </h1>
          </FadeIn>
          <FadeIn>
            <p className="text-lg md:text-xl text-white/80">
              {t('home.withDataTools')}. {t('home.description')}
            </p>
          </FadeIn>
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link className="relative btn-primary text-center" to="/support">{t('home.buttons.getSupport')}</Link>
              <Link className="btn-outline text-center" to="/rights">{t('home.buttons.rightsEducation')}</Link>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="text-center lg:text-left">
              <p className="text-sm text-white/60 italic">
                {t('home.tagline')}
              </p>
            </div>
          </FadeIn>
        </div>
        <FadeIn>
          <HeroScene />
        </FadeIn>
      </section>




      {/* FAQ Section */}
      <section className="faq-section py-16">
        <FadeIn>
          <div className="faq-header text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t('home.faq.sectionTitle')}</h2>
            <h3 className="text-xl md:text-2xl font-bold text-rose-400 mb-6">✨ <em>{t('home.faq.sectionSubtitle')}</em> ✨</h3>
            <p className="text-white/80 max-w-2xl mx-auto">{t('home.faq.sectionDescription')}</p>
          </div>

          <div className="faq-content grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="faq-category bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">{t('home.faq.homepageGuidance')}</h3>

              <div className="space-y-4">
                <Link to="/support" className="block group">
                  <div className="faq-item bg-white/5 rounded-2xl p-4 border border-transparent hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="faq-question font-semibold text-white mb-2">🆘 {t('home.faq.findNGOs')}</div>
                    <div className="text-sm text-cyan-300 group-hover:text-cyan-200 flex items-center gap-2">
                      <span>{t('home.faq.goToGetSupport')}</span>
                      <span className="text-xs opacity-60">→</span>
                    </div>
                  </div>
                </Link>

                <Link to="/about-right4all-ai" className="block group">
                  <div className="faq-item bg-white/5 rounded-2xl p-4 border border-transparent hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="faq-question font-semibold text-white mb-2">💬 {t('home.faq.chatWithAI')}</div>
                    <div className="text-sm text-cyan-300 group-hover:text-cyan-200 flex items-center gap-2">
                      <span>{t('home.faq.learnAboutAI')}</span>
                      <span className="text-xs opacity-60">→</span>
                    </div>
                  </div>
                </Link>

                <Link to="/rights" className="block group">
                  <div className="faq-item bg-white/5 rounded-2xl p-4 border border-transparent hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="faq-question font-semibold text-white mb-2">📚 {t('home.faq.learnRights')}</div>
                    <div className="text-sm text-cyan-300 group-hover:text-cyan-200 flex items-center gap-2">
                      <span>{t('home.faq.goToRightsEducation')}</span>
                      <span className="text-xs opacity-60">→</span>
                    </div>
                  </div>
                </Link>

                <Link to="/rights" className="block group">
                  <div className="faq-item bg-white/5 rounded-2xl p-4 border border-transparent hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="faq-question font-semibold text-white mb-2">🧠 {t('home.faq.testKnowledge')}</div>
                    <div className="text-sm text-cyan-300 group-hover:text-cyan-200 flex items-center gap-2">
                      <span>{t('home.faq.goToRightsEducation')}</span>
                      <span className="text-xs opacity-60">→</span>
                    </div>
                  </div>
                </Link>

                <Link to="/insights" className="block group">
                  <div className="faq-item bg-white/5 rounded-2xl p-4 border border-transparent hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="faq-question font-semibold text-white mb-2">📊 {t('home.faq.exploreJobs')}</div>
                    <div className="text-sm text-cyan-300 group-hover:text-cyan-200 flex items-center gap-2">
                      <span>{t('home.faq.goToInsightsStories')}</span>
                      <span className="text-xs opacity-60">→</span>
                    </div>
                  </div>
                </Link>

                <Link to="/insights" className="block group">
                  <div className="faq-item bg-white/5 rounded-2xl p-4 border border-transparent hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="faq-question font-semibold text-white mb-2">✨ {t('home.faq.readStories')}</div>
                    <div className="text-sm text-cyan-300 group-hover:text-cyan-200 flex items-center gap-2">
                      <span>{t('home.faq.goToInsightsStories')}</span>
                      <span className="text-xs opacity-60">→</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="faq-category bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">🌐 {t('home.faq.aboutWebsite')}</h3>

              <div className="space-y-4">
                <div className="faq-item bg-white/5 rounded-2xl p-4">
                  <div className="faq-question font-semibold text-white mb-2">🧑‍🤝‍🧑 {t('home.faq.whoIsThisFor')}</div>
                  <div className="faq-answer text-sm text-white/70">
                    {t('home.faq.whoIsThisForAnswer')}
                  </div>
                </div>

                <div className="faq-item bg-white/5 rounded-2xl p-4">
                  <div className="faq-question font-semibold text-white mb-2">🆓 {t('home.faq.registerOrPay')}</div>
                  <div className="faq-answer text-sm text-white/70">
                    {t('home.faq.registerOrPayAnswer')}
                  </div>
                </div>

                <div className="faq-item bg-white/5 rounded-2xl p-4">
                  <div className="faq-question font-semibold text-white mb-2">🔒 {t('home.faq.infoSafe')}</div>
                  <div className="faq-answer text-sm text-white/70">
                    {t('home.faq.infoSafeAnswer')}
                  </div>
                </div>

                <div className="faq-item bg-white/5 rounded-2xl p-4">
                  <div className="faq-question font-semibold text-white mb-2">🌍 {t('home.faq.whyFiveLanguages')}</div>
                  <div className="faq-answer text-sm text-white/70">
                    {t('home.faq.whyFiveLanguagesAnswer')}
                  </div>
                </div>

                <div className="faq-item disclaimer bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-4">
                  <div className="faq-question font-semibold text-white mb-2">⚠️ {t('home.faq.legalAdvice')}</div>
                  <div className="faq-answer text-sm text-white/70">
                    {t('home.faq.legalAdviceAnswer')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer with SDG and Copyright */}
      <footer className="py-12 mt-16 border-t border-white/10">
        <FadeIn>
          <div className="max-w-6xl mx-auto text-center">
            {/* SDG Section - Compact */}
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
                  <h3 className="text-lg font-bold text-white">{t('home.sdg.title')}</h3>
                  <p className="text-white/70 text-sm max-w-md">
                    {t('home.sdg.description')}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
                  <span className="text-lg">🎯</span>
                  <span className="text-white text-sm font-medium">SDG 10</span>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-white/60 text-sm leading-relaxed">
              {t('home.footer.copyright')}
            </div>
          </div>
        </FadeIn>
      </footer>

    </div>
  )
}
