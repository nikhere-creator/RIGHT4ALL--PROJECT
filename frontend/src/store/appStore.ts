import { create } from 'zustand'

type AppState = {
  language: string
  setLanguage: (lng: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lng) => set({ language: lng })
}))
