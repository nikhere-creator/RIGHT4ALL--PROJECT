const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? '/api'  // In production, use relative path since backend is on same domain
    : 'http://localhost:3000/api'  // In development, use localhost with /api prefix
)

export interface Organization {
  org_id: number
  org_name?: string
  org_en?: string
  org_descr_en?: string
  service_type?: string
  org_email?: string
  org_phone_no?: string
  org_website?: string
  org_address?: string
  org_state?: string
  org_country?: string
  tag?: string
  // Legacy fields for backward compatibility
  organization_id?: number
  organization_name?: string
  organization_description?: string
  organization_type?: string
  contact_email?: string
  contact_phone?: string
  website_url?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  latitude?: number
  longitude?: number
  rating?: number
  languages?: string[]
}

export interface Story {
  story_id: number
  story_title_en: string
  story_body_en: string
  language_code: string
  theme?: string
  tips_or_lesson?: string
  story_url?: string
}

export interface Resource {
  guide_topic_id: number
  guide_topic_name: string
  guide_summary: string
  guide_who_is_this_for?: string
  guide_what_you_need?: string
  guide_steps?: string
  guide_legal_chckpoint?: string
  cost_n_time?: string
  prob_n_scams?: string
  whr_to_get_help?: string
  disclaimer?: string
  language_code: string
  category_name?: string
}

export interface CommunityStats {
  organizations: number
  stories: number
  resources: number
}

export class CommunityApi {
  // Get organizations/NGOs
  static async getOrganizations(category?: string, search?: string, language?: string): Promise<Organization[]> {
    try {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (search) params.append('search', search)
      if (language) params.append('lang', language)

      const url = `${API_BASE_URL}/community/organizations?${params.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.organizations || []
    } catch (error) {
      console.error('Error fetching organizations:', error)
      return []
    }
  }

  // Get survivor stories
  static async getStories(category?: string, search?: string, language?: string): Promise<Story[]> {
    try {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (search) params.append('search', search)
      if (language) params.append('lang', language)

      const url = `${API_BASE_URL}/community/stories?${params.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.stories || []
    } catch (error) {
      console.error('Error fetching stories:', error)
      return []
    }
  }

  // Get practical guides/resources
  static async getResources(category?: string, search?: string, language?: string): Promise<Resource[]> {
    try {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (search) params.append('search', search)
      if (language) params.append('lang', language)

      const url = `${API_BASE_URL}/community/resources?${params.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.resources || []
    } catch (error) {
      console.error('Error fetching resources:', error)
      return []
    }
  }

  // Get community stats
  static async getStats(): Promise<CommunityStats> {
    try {
      const url = `${API_BASE_URL}/community/stats`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        organizations: data.organizations || 0,
        stories: data.stories || 0,
        resources: data.resources || 0
      }
    } catch (error) {
      console.error('Error fetching community stats:', error)
      return {
        organizations: 0,
        stories: 0,
        resources: 0
      }
    }
  }

  // Get specific organization by ID
  static async getOrganization(id: number): Promise<Organization | null> {
    try {
      const url = `${API_BASE_URL}/community/organizations/${id}`
      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching organization:', error)
      return null
    }
  }
}