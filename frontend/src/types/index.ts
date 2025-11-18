// Shared types between frontend and backend

export interface APIResponse<T> {
  data?: T
  error?: string
  details?: string
}

export interface OverviewData {
  summary: {
    total_migrant_worker: number
    year: number
  } | null
  ts?: string
}

export interface StateData {
  state_code: number
  state_name_en: string
  migrant_number: number
  risk_level: string
  manuf_perc_in_state: string
  const_perc_in_state: string
  agric_percent_in_state: string
}

export interface SectorData {
  sector_id: number
  sector_name: string
  description: string
  total_accidents_2023: number
  accident_risk_level: string
  '2001_perc': string
  '2005_perc': string
  '2010_perc': string
  '2015_perc': string
  '2020_perc': string
  '2023_perc': string
}

export interface NationalityData {
  nationality_id: number
  nationality_name_en: string
  nationality_number: number | null
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct_answer: number
  explanation?: string
  category?: string
}