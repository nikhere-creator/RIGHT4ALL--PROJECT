import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/appStore'

export const useLanguageSync = () => {
  const { i18n } = useTranslation()
  const language = useAppStore(state => state.language)
  const setLanguage = useAppStore(state => state.setLanguage)

  // Sync i18n language with app store on mount
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [])

  // Listen for i18n language changes and sync to app store
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (lng !== language) {
        setLanguage(lng)
      }
    }

    i18n.on('languageChanged', handleLanguageChange)
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n, language, setLanguage])
}