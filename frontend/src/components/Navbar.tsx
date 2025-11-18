import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/appStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import shieldPng from '@/assets/shield.png'

const langs = [
  { code: 'en', label: 'English', name: 'English' },
  { code: 'ms', label: 'Bahasa Melayu', name: 'Bahasa Melayu' },
  { code: 'ne', label: 'नेपाली', name: 'Nepali' },
  { code: 'hi', label: 'हिंदी', name: 'Hindi' },
  { code: 'bn', label: 'বাংলা', name: 'Bengali' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const language = useAppStore(s => s.language)
  const setLanguage = useAppStore(s => s.setLanguage)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const switchLang = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  const item = (to: string, label: string, mobile = false) => (
    <NavLink 
      to={to} 
      className={`nav-item relative text-white/90 transition-colors hover:text-white ${
        mobile ? 'block px-4 py-3 border-b border-white/10' : 'px-3 py-2'
      }`}
      onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      {({ isActive }) => (
        <span className="relative">
          {label}
          {isActive && !mobile && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
            />
          )}
          {isActive && mobile && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-rose-500 rounded-full" />
          )}
        </span>
      )}
    </NavLink>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 md:top-5 md:left-1/2 md:-translate-x-1/2 md:w-[95%] md:max-w-7xl">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .6, ease: 'easeOut' }}
        className="flex items-center justify-between card px-4 py-3 md:px-5 md:rounded-2xl rounded-none"
      >
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 text-white font-bold">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white grid place-items-center shadow-[0_10px_30px_-10px_rgba(244,63,94,0.9)] p-1.5">
            <img src={shieldPng} alt="Shield" className="w-full h-full object-contain" />
          </div>
          <span className="tracking-tight text-sm md:text-base">Right4All</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {item('/home', t('nav.home'))}
          {item('/support', t('nav.support'))}
          {item('/rights', t('nav.rights'))}
          {item('/insights', t('nav.insights'))}
        </div>

        {/* Desktop Language Switcher */}
        <div className="hidden md:flex gap-1">
          {langs.map(l => (
            <button 
              key={l.code} 
              onClick={() => switchLang(l.code)}
              title={l.name}
              className={'px-2 py-1 rounded-lg text-xs font-medium transition-all ' + (language===l.code ? 'bg-rose-600 text-white shadow-lg' : 'bg-white/10 text-white/80 border border-white/10 hover:bg-white/20')}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden card mx-4 mt-2 rounded-xl overflow-hidden"
          >
            <div className="py-2">
              {item('/home', t('nav.home'), true)}
              {item('/support', t('nav.support'), true)}
              {item('/rights', t('nav.rights'), true)}
              {item('/insights', t('nav.insights'), true)}
            </div>
            
            {/* Mobile Language Switcher */}
            <div className="border-t border-white/10 p-4">
              <div className="text-xs text-white/70 mb-2">{t('common.language')}</div>
              <div className="grid grid-cols-2 gap-2">
                {langs.map(l => (
                  <button 
                    key={l.code} 
                    onClick={() => {
                      switchLang(l.code)
                      setIsMobileMenuOpen(false)
                    }}
                    className={'px-3 py-2 rounded-lg text-xs font-medium transition-all text-center ' + (language===l.code ? 'bg-rose-600 text-white shadow-lg' : 'bg-white/10 text-white/80 border border-white/10 hover:bg-white/20')}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
