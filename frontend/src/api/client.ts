// API client for Right4All backend
import type {
  APIResponse,
  OverviewData,
  StateData,
  SectorData,
  NationalityData
} from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<APIResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    }
  }
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<APIResponse<T>> {
    return fetchAPI<T>(endpoint)
  },

  async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  },

  async getOverview(): Promise<APIResponse<OverviewData>> {
    return fetchAPI<OverviewData>('/insights/overview')
  },

  async getStates(): Promise<APIResponse<{ rows: StateData[] }>> {
    return fetchAPI<{ rows: StateData[] }>('/insights/states')
  },

  async getSectors(): Promise<APIResponse<{ rows: SectorData[] }>> {
    return fetchAPI<{ rows: SectorData[] }>('/insights/sectors')
  },

  async getNationalities(): Promise<APIResponse<{ rows: NationalityData[] }>> {
    return fetchAPI<{ rows: NationalityData[] }>('/insights/nationalities')
  },

  async getHealthCheck(): Promise<APIResponse<{ ok: boolean; service: string; time: string }>> {
    return fetchAPI<{ ok: boolean; service: string; time: string }>('/health')
  }
}
