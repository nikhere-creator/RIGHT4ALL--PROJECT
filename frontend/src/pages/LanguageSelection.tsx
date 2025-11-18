import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/appStore'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import shieldPng from '@/assets/shield.png'

const languages = [
  { code: 'en', label: 'English', name: 'English', flag: '🇺🇸' },
  { code: 'ms', label: 'Bahasa Melayu', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ne', label: 'नेपाली', name: 'Nepali', flag: '🇳🇵' },
  { code: 'hi', label: 'हिंदी', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', name: 'Bengali', flag: '🇧🇩' },
]

export default function LanguageSelection() {
  const { i18n } = useTranslation()
  const setLanguage = useAppStore(s => s.setLanguage)
  const navigate = useNavigate()

  const selectLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setLanguage(langCode)
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-white grid place-items-center shadow-[0_20px_40px_-10px_rgba(244,63,94,0.9)] p-4">
              <img src={shieldPng} alt="Right4All Shield" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-400">Right4All</span>
          </motion.h1>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/80 mb-8"
          >
            Choose your preferred language to continue
          </motion.p>
        </div>

        {/* Language Options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectLanguage(lang.code)}
              className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{lang.flag}</div>
                <div>
                  <div className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                    {lang.label}
                  </div>
                  <div className="text-sm text-white/70">
                    {lang.name}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-white/60">
            You can change the language anytime from the Navigation Bar
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}