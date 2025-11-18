import { apiClient } from '../api/client'

interface ChatResponse {
  answer: string
  sourceType: 'database' | 'general' | 'off-topic'
  citations: string[]
  responseTime: number
}

interface WageCalculation {
  steps: string[]
  citation: string
  totalOvertimePay?: number
}

class ChatbotAPI {
  private baseUrl = '/chatbot'

  async sendMessage(
    question: string,
    language: string,
    sessionId?: string
  ): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>(`${this.baseUrl}/chat`, {
      question,
      language,
      sessionId
    })
    return response
  }

  async calculateWage(monthly: number, otHours: number): Promise<WageCalculation> {
    const response = await apiClient.post<WageCalculation>(`${this.baseUrl}/wage/check`, {
      monthly,
      otHours
    })
    return response
  }

  async getStarterQuestions(language: string): Promise<string[]> {
    const response = await apiClient.get<{ questions: string[] }>(`${this.baseUrl}/starter-questions?language=${language}`)
    return response.data?.questions || []
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get<{ ok: boolean }>(`${this.baseUrl}/health`)
      return response.data?.ok || false
    } catch {
      return false
    }
  }
}

export const chatbotAPI = new ChatbotAPI()
