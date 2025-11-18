// React hooks for fetching Right4All API data
import { useState, useEffect, useCallback } from 'react'
import { 
  apiClient, 
  APIResponse, 
  OverviewData, 
  StateData, 
  SectorData, 
  NationalityData 
} from '../api/client'

interface UseAPIState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

function useAPICall<T>(
  apiCall: () => Promise<APIResponse<T>>,
  deps: unknown[] = []
): UseAPIState<T> {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: string | null
  }>({
    data: null,
    loading: true,
    error: null
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await apiCall()
      
      if (response.error) {
        setState({
          data: null,
          loading: false,
          error: response.error
        })
      } else {
        setState({
          data: response.data || null,
          loading: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }, deps)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    ...state,
    refetch: fetchData
  }
}

export function useOverviewData(): UseAPIState<OverviewData> {
  return useAPICall(() => apiClient.getOverview())
}

export function useStatesData(): UseAPIState<{ rows: StateData[] }> {
  return useAPICall(() => apiClient.getStates())
}

export function useSectorsData(): UseAPIState<{ rows: SectorData[] }> {
  return useAPICall(() => apiClient.getSectors())
}

export function useNationalitiesData(): UseAPIState<{ rows: NationalityData[] }> {
  return useAPICall(() => apiClient.getNationalities())
}

export function useHealthCheck(): UseAPIState<{ ok: boolean; service: string; time: string }> {
  return useAPICall(() => apiClient.getHealthCheck())
}