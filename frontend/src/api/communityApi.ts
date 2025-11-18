// Mock community API for development
export const useCommunityApi = {
  useGetNGOs: () => ({
    data: [],
    isLoading: false
  }),
  useGetStories: () => ({
    data: []
  })
}