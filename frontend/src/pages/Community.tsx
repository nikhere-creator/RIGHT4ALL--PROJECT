import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CommunityApi, Organization, Story, Resource, CommunityStats } from '../services/communityApi'
import { useAppStore } from '../store/appStore'

type TabType = 'ngos' | 'stories' | 'resources'

export default function Community() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('ngos')
  const [activeFilter, setActiveFilter] = useState('All Help')
  const [searchTerm, setSearchTerm] = useState('')
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [stats, setStats] = useState<CommunityStats>({ organizations: 0, stories: 0, resources: 0 })
  const [loading, setLoading] = useState(false)
  const [expandedOrg, setExpandedOrg] = useState<number | null>(null)
  const [expandedStory, setExpandedStory] = useState<number | null>(null)
  const [expandedResource, setExpandedResource] = useState<number | null>(null)

  const ngoFilters = ['All Help', 'Legal Aid', 'Health & Wellbeing', 'Work', 'Other Support']
  const storyFilters = ['All Stories', 'Legal & Documents', 'Fair Pay & Wages', 'Safety & Health', 'Housing & Living Conditions', 'Workplace Rights & Respect', 'Working Hours & Conditions', 'Resilience & Success']
  const resourceFilters = ['All Resources', 'Work & Legal', 'Health & Safety', 'Housing & Everyday Life', 'Money & Daily Life']

  const getCurrentFilters = () => {
    switch (activeTab) {
      case 'ngos': return ngoFilters
      case 'stories': return storyFilters
      case 'resources': return resourceFilters
      default: return ngoFilters
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleEmergencyClick = () => {
    alert('🚨 Emergency Help\n\n24/7 Hotlines:\n• Tenaganita: +60 3-2697-3671\n• Legal Aid: 15999\n• Police: 999\n\nYou are not alone. Help is available.')
  }

  // Get current language from app store
  const language = useAppStore(state => state.language)

  // Fetch data based on active tab and filters
  const fetchData = async () => {
    setLoading(true)
    try {
      const category = activeFilter === getCurrentFilters()[0] ? undefined : activeFilter
      const search = searchTerm || undefined

      switch (activeTab) {
        case 'ngos':
          const orgs = await CommunityApi.getOrganizations(category, search, language)
          setOrganizations(orgs)
          break
        case 'stories':
          const storiesData = await CommunityApi.getStories(category, search, language)
          setStories(storiesData)
          break
        case 'resources':
          const resourcesData = await CommunityApi.getResources(category, search, language)
          setResources(resourcesData)
          break
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      const statsData = await CommunityApi.getStats()
      setStats(statsData)
    }
    fetchStats()
  }, [])

  // Fetch data when tab, filter, search, or language changes
  useEffect(() => {
    fetchData()
  }, [activeTab, activeFilter, searchTerm, language])

  return (
    <section className="min-h-screen py-8 px-4 lg:px-0">
      <div className="container-max">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-rose-500 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              {t('community.title')}
            </h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4"
          >
            {t('community.subtitle')}
          </motion.p>
        </motion.div>


        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-6 md:mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-lg font-medium mb-4 text-center text-white/80 flex items-center justify-center gap-2">
              <span className="text-xl">🔍</span>
              {t('community.searchHelp')}
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t('community.searchPlaceholder')}
                className="w-full px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 text-base backdrop-blur-sm focus:outline-none focus:border-rose-400/50 focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 md:mb-10"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    number: `${stats.organizations}+`,
                    label: t('community.stats.organizations'),
                    icon: '🏢',
                    gradient: 'from-rose-500 to-pink-500'
                  },
                  {
                    number: `${stats.stories}+`,
                    label: t('community.stats.stories'),
                    icon: '📖',
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    number: `${stats.resources}+`,
                    label: t('community.stats.resources'),
                    icon: '📚',
                    gradient: 'from-purple-500 to-indigo-500'
                  }
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl">{stat.icon}</span>
                      </div>
                      <div className="text-left">
                        <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                          {stat.number}
                        </div>
                        <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                      </div>
                    </div>
                    
                    {/* Separator line for desktop */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 right-0 w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-y-1/2 translate-x-4"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
        >
          {[
            { 
              id: 'ngos', 
              icon: '🤝', 
              label: t('community.tabs.findHelp.label'),
              description: t('community.tabs.findHelp.description'),
              gradient: 'from-rose-500 to-pink-500'
            },
            { 
              id: 'stories', 
              icon: '✨', 
              label: t('community.tabs.stories.label'),
              description: t('community.tabs.stories.description'),
              gradient: 'from-blue-500 to-cyan-500'
            },
            { 
              id: 'resources', 
              icon: '🔧', 
              label: t('community.tabs.resources.label'),
              description: t('community.tabs.resources.description'),
              gradient: 'from-purple-500 to-indigo-500'
            }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType)
                // Reset filter to "All" for the new tab
                const newFilters = (() => {
                  switch (tab.id) {
                    case 'ngos': return ngoFilters
                    case 'stories': return storyFilters
                    case 'resources': return resourceFilters
                    default: return ngoFilters
                  }
                })()
                setActiveFilter(newFilters[0])
                // Clear search when switching tabs
                setSearchTerm('')
                // Clear expanded items
                setExpandedOrg(null)
                setExpandedStory(null)
                setExpandedResource(null)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group p-6 rounded-3xl border-2 transition-all duration-300 font-medium text-center ${
                activeTab === tab.id
                  ? 'border-transparent shadow-2xl'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              {activeTab === tab.id && (
                <div className={`absolute -inset-1 bg-gradient-to-r ${tab.gradient} rounded-3xl blur opacity-30`}></div>
              )}
              <div className={`relative ${activeTab === tab.id ? `bg-gradient-to-r ${tab.gradient}` : 'bg-white/5'} backdrop-blur-xl rounded-2xl p-6 border border-white/10`}>
                <div className="text-4xl mb-3">{tab.icon}</div>
                <div className="text-xl font-bold mb-2 text-white">{tab.label}</div>
                <div className="text-white/70 text-sm">{tab.description}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {getCurrentFilters().map((filter, index) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.05 }}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-2xl border-2 transition-all duration-300 text-sm font-semibold ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white shadow-lg shadow-cyan-500/30'
                  : 'border-white/30 bg-white/10 text-white/90 hover:bg-white/20 hover:border-white/50'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Cards */}
        <AnimatePresence mode="wait">
          {activeTab === 'ngos' && (
            <motion.div
              key="ngos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12"
            >
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-white/60">{t('community.loading.organizations')}</div>
                </div>
              ) : organizations.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-white/60">{t('community.notFound.organizations')}</div>
                </div>
              ) : (
                organizations.map((org, index) => {
                  const isExpanded = expandedOrg === org.org_id
                  return (
                    <motion.div
                      key={org.org_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                      <div
                        className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 hover:transform hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-500 cursor-pointer"
                        onClick={() => setExpandedOrg(isExpanded ? null : org.org_id)}
                      >
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
                            🏢
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-2xl text-white">{org.org_name || org.org_en}</h3>
                              <span className="text-white/60 text-lg">
                                {isExpanded ? '▼' : '▶'}
                              </span>
                            </div>
                            <div className="text-cyan-400 flex items-center gap-2 font-medium">
                              <span>📍</span>
                              {org.org_address || 'Location not specified'}
                            </div>
                          </div>
                        </div>

                        <p className="text-white/80 mb-6 leading-relaxed text-base">
                          {isExpanded ? org.org_descr_en : (org.org_descr_en && org.org_descr_en.length > 150 ? `${org.org_descr_en.substring(0, 150)}...` : org.org_descr_en)}
                        </p>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 space-y-4"
                          >
                            {org.org_phone_no && org.org_phone_no !== 'No contact number' && (
                              <div className="flex items-center gap-3">
                                <span className="text-cyan-400">📞</span>
                                <span className="text-white">{org.org_phone_no}</span>
                              </div>
                            )}
                            {org.org_email && (
                              <div className="flex items-center gap-3">
                                <span className="text-cyan-400">✉️</span>
                                <span className="text-white">{org.org_email}</span>
                              </div>
                            )}
                            {org.org_website && (
                              <div className="flex items-center gap-3">
                                <span className="text-cyan-400">🌐</span>
                                <a href={org.org_website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                                  {t('community.actions.visitWebsite')}
                                </a>
                              </div>
                            )}
                            {(org.org_state || org.org_country) && (
                              <div className="flex items-center gap-3">
                                <span className="text-cyan-400">🗺️</span>
                                <span className="text-white">{org.org_state}{org.org_state && org.org_country && ', '}{org.org_country}</span>
                              </div>
                            )}
                          </motion.div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {org.service_type && (
                            <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white/70">
                              {org.service_type}
                            </span>
                          )}
                          {org.tag && (
                            <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white/70">
                              {org.tag.split(',')[0]}
                            </span>
                          )}
                          {org.org_phone_no && org.org_phone_no !== 'No contact number' && (
                            <span className="px-3 py-1.5 bg-green-500/10 rounded-lg text-xs font-medium text-green-400/80">
                              📞 {t('community.actions.contactAvailable')}
                            </span>
                          )}
                          {!isExpanded && (
                            <span className="px-4 py-2 bg-cyan-500/20 rounded-xl text-sm font-medium text-cyan-300 border border-cyan-400/30 backdrop-blur-sm">
                              👆 {t('community.actions.clickForDetails')}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>

          {activeTab === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12"
            >
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-white/60">{t('community.loading.stories')}</div>
                </div>
              ) : stories.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-white/60">{t('community.notFound.stories')}</div>
                </div>
              ) : (
                stories.map((story, index) => {
                  const isExpanded = expandedStory === story.story_id
                  return (
                    <motion.div
                      key={story.story_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                      <div
                        className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 hover:transform hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-500 cursor-pointer"
                        onClick={() => setExpandedStory(isExpanded ? null : story.story_id)}
                      >
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl shadow-lg">
                            ✨
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-2xl text-white">{story.story_title_en}</h3>
                              <span className="text-white/60 text-lg">
                                {isExpanded ? '▼' : '▶'}
                              </span>
                            </div>
                            <div className="text-cyan-400 text-sm font-medium">
                              {t('community.content.personalExperience')} • {story.theme || 'Story'}
                            </div>
                          </div>
                        </div>

                        <p className="text-white/80 mb-6 leading-relaxed text-base">
                          {isExpanded ? story.story_body_en : (story.story_body_en?.length > 200 ? `${story.story_body_en.substring(0, 200)}...` : story.story_body_en)}
                        </p>

                        {isExpanded && story.tips_or_lesson && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/20"
                          >
                            <h4 className="text-cyan-300 font-semibold mb-2 flex items-center gap-2">
                              💡 {t('community.content.keyLessonsAndTips')}
                            </h4>
                            <div className="text-white/90 space-y-2">
                              {story.tips_or_lesson.split(';').map((tip, tipIndex) => (
                                <div key={tipIndex} className="flex items-start gap-2">
                                  <span className="text-cyan-400 mt-1">•</span>
                                  <span>{tip.trim()}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {isExpanded && story.story_url && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6"
                          >
                            <a
                              href={story.story_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 underline"
                            >
                              🔗 {t('community.actions.readFullStory')}
                            </a>
                          </motion.div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {story.theme && (
                            <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white/70">
                              {story.theme}
                            </span>
                          )}
                          {story.tips_or_lesson && (
                            <span className="px-3 py-1.5 bg-cyan-500/10 rounded-lg text-xs font-medium text-cyan-400/80">
                              💡 {t('community.actions.tipsAvailable')}
                            </span>
                          )}
                          {!isExpanded && (
                            <span className="px-4 py-2 bg-cyan-500/20 rounded-xl text-sm font-medium text-cyan-300 border border-cyan-400/30 backdrop-blur-sm">
                              👆 {t('community.actions.clickToReadMore')}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 md:space-y-8 mb-8 md:mb-12"
            >
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-white/60">{t('community.loading.resources')}</div>
                </div>
              ) : resources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-white/60">{t('community.notFound.resources')}</div>
                </div>
              ) : (
                <>
                  {/* Expanded Card - Full Width */}
                  {expandedResource && resources.find(r => r.guide_topic_id === expandedResource) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8"
                    >
                      {(() => {
                        const resource = resources.find(r => r.guide_topic_id === expandedResource)!
                        return (
                          <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur opacity-30"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                              {/* Header with close button */}
                              <div className="flex items-start justify-between gap-4 mb-6">
                                <div className="flex items-start gap-4 flex-1">
                                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-3xl shadow-lg">
                                    📚
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-3xl text-white mb-2">{resource.guide_topic_name}</h3>
                                    {resource.category_name && (
                                      <div className="text-cyan-400 text-lg font-medium mb-2">{resource.category_name}</div>
                                    )}
                                    <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-green-500/20 text-green-400">
                                      📚 {t('community.content.completeStepByStepGuide')}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setExpandedResource(null)}
                                  className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                                >
                                  ✕
                                </button>
                              </div>

                              <p className="text-white/90 text-lg mb-8 leading-relaxed">{resource.guide_summary}</p>

                              {/* Content in horizontal layout */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" onClick={(e) => e.stopPropagation()}>
                                {resource.guide_who_is_this_for && (
                                  <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-400/20">
                                    <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      👥 {t('community.content.whoIsThisFor')}
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.guide_who_is_this_for}</p>
                                  </div>
                                )}

                                {resource.guide_what_you_need && (
                                  <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-400/20">
                                    <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      📋 {t('community.content.whatYouNeed')}
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.guide_what_you_need}</p>
                                  </div>
                                )}

                                {resource.cost_n_time && (
                                  <div className="p-6 bg-yellow-500/10 rounded-xl border border-yellow-400/20">
                                    <h4 className="text-yellow-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      💰 {t('community.content.costAndTime')}
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.cost_n_time}</p>
                                  </div>
                                )}

                                {resource.guide_legal_chckpoint && (
                                  <div className="p-6 bg-red-500/10 rounded-xl border border-red-400/20">
                                    <h4 className="text-red-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      ⚖️ {t('community.content.legalInformation')}
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.guide_legal_chckpoint}</p>
                                  </div>
                                )}

                                {resource.prob_n_scams && (
                                  <div className="p-6 bg-orange-500/10 rounded-xl border border-orange-400/20">
                                    <h4 className="text-orange-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      ⚠️ {t('community.content.problemsAndScams')}
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.prob_n_scams}</p>
                                  </div>
                                )}

                                {resource.whr_to_get_help && (
                                  <div className="p-6 bg-emerald-500/10 rounded-xl border border-emerald-400/20">
                                    <h4 className="text-emerald-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      🤝 {t('community.content.whereToGetHelp')}
                                    </h4>
                                    <div className="space-y-2">
                                      {resource.whr_to_get_help.split(',').map((helpItem, helpIndex) => (
                                        <div key={helpIndex} className="flex items-center gap-2 text-white/90">
                                          <span className="text-emerald-400">•</span>
                                          <span>{helpItem.trim()}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Step-by-step guide - Full width */}
                              {resource.guide_steps && (
                                <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-400/20">
                                  <h4 className="text-green-300 font-semibold mb-6 flex items-center gap-2 text-xl">
                                    📝 {t('community.content.stepByStepGuide')}
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    {resource.guide_steps.split('.').filter(step => step.trim()).map((step, stepIndex) => (
                                      <div key={stepIndex} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                                        <span className="text-green-400 font-bold text-lg min-w-[32px] mt-1 bg-green-500/20 rounded-full w-8 h-8 flex items-center justify-center">
                                          {stepIndex + 1}
                                        </span>
                                        <span className="text-white/90 leading-relaxed">{step.trim()}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })()}
                    </motion.div>
                  )}

                  {/* Regular Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {resources.map((resource, index) => {
                      const isExpanded = expandedResource === resource.guide_topic_id
                      if (isExpanded) return null // Don't show in grid if expanded

                      return (
                        <motion.div
                          key={resource.guide_topic_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                          <div
                            className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 hover:transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full"
                            onClick={() => setExpandedResource(resource.guide_topic_id)}
                          >
                            <div className="flex items-start gap-3 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-lg shadow-lg">
                                📚
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-lg text-white mb-1">{resource.guide_topic_name}</h3>
                                {resource.category_name && (
                                  <div className="text-cyan-400 text-xs font-medium">{resource.category_name}</div>
                                )}
                              </div>
                              <span className="text-white/60 text-sm">▶</span>
                            </div>

                            <p className="text-white/80 text-sm leading-relaxed mb-4">
                              {resource.guide_summary?.length > 120 ? `${resource.guide_summary.substring(0, 120)}...` : resource.guide_summary}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {resource.category_name && (
                                <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white/70">
                                  {resource.category_name}
                                </span>
                              )}
                              <span className="px-3 py-1.5 bg-purple-500/10 rounded-lg text-xs font-medium text-purple-400/80">
                                👆 {t('community.actions.clickToExpand')}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </>
              )}
            </motion.div>
          )}

        {/* Help Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-10"></div>
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center">
            <div className="text-3xl mb-4">💡</div>
            <p className="text-white/80 text-lg">
              {t('community.helpText')}
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
