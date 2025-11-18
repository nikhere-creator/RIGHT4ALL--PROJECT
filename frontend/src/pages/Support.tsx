import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CommunityApi, Organization, Resource, CommunityStats } from '../services/communityApi'
import { useAppStore } from '../store/appStore'

type TabType = 'gethelp' | 'lifehacks'

export default function Support() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('gethelp')
  const [activeFilter, setActiveFilter] = useState(t('support.filters.getHelp.allHelp'))
  const [searchTerm, setSearchTerm] = useState('')
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [stats, setStats] = useState<CommunityStats>({ organizations: 0, stories: 0, resources: 0 })
  const [loading, setLoading] = useState(false)
  const [expandedOrg, setExpandedOrg] = useState<number | null>(null)
  const [expandedResource, setExpandedResource] = useState<number | null>(null)

  const ngoFilters = [
    t('support.filters.getHelp.allHelp'),
    t('support.filters.getHelp.legalAid'),
    t('support.filters.getHelp.healthWellbeing'),
    t('support.filters.getHelp.work'),
    t('support.filters.getHelp.otherSupport')
  ]
  const resourceFilters = [
    t('support.filters.lifeHacks.allResources'),
    t('support.filters.lifeHacks.workLegal'),
    t('support.filters.lifeHacks.healthSafety'),
    t('support.filters.lifeHacks.housingEveryday'),
    t('support.filters.lifeHacks.moneyDaily')
  ]

  const getCurrentFilters = () => {
    switch (activeTab) {
      case 'gethelp': return ngoFilters
      case 'lifehacks': return resourceFilters
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
        case 'gethelp':
          const orgs = await CommunityApi.getOrganizations(category, search, language)
          setOrganizations(orgs)
          break
        case 'lifehacks':
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
              {t('support.title')}
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4"
          >
            {t('support.subtitle')}
          </motion.p>
        </motion.div>


        {/* Stats - Fancy floating style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 md:mb-10"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              {
                number: `${stats.organizations}+`,
                label: t('support.stats.organizations'),
                icon: '🏢',
                gradient: 'from-rose-500 to-pink-500'
              },
              {
                number: `${stats.resources}+`,
                label: t('support.stats.resources'),
                icon: '📚',
                gradient: 'from-purple-500 to-indigo-500'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex flex-col items-center text-center space-y-2 p-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-xl">{stat.icon}</span>
                  </motion.div>
                  <div>
                    <motion.div
                      className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-white/80 font-medium text-sm">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12"
        >
          {[
            {
              id: 'gethelp',
              icon: '🤝',
              label: t('support.sections.getHelp.title'),
              description: t('support.sections.getHelp.subtitle'),
              gradient: 'from-rose-500 to-pink-500'
            },
            {
              id: 'lifehacks',
              icon: '🔧',
              label: t('support.sections.lifeHacks.title'),
              description: t('support.sections.lifeHacks.subtitle'),
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
                    case 'gethelp': return ngoFilters
                    case 'lifehacks': return resourceFilters
                    default: return ngoFilters
                  }
                })()
                setActiveFilter(newFilters[0])
                // Clear search when switching tabs
                setSearchTerm('')
                // Clear expanded items
                setExpandedOrg(null)
                setExpandedResource(null)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group p-4 rounded-2xl border-2 transition-all duration-300 font-medium text-center ${
                activeTab === tab.id
                  ? 'border-transparent shadow-2xl'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              {activeTab === tab.id && (
                <div className={`absolute -inset-1 bg-gradient-to-r ${tab.gradient} rounded-2xl blur opacity-30`}></div>
              )}
              <div className={`relative ${activeTab === tab.id ? `bg-gradient-to-r ${tab.gradient}` : 'bg-white/5'} backdrop-blur-xl rounded-xl p-4 border border-white/10`}>
                <div className="text-3xl mb-2">{tab.icon}</div>
                <div className="text-lg font-bold mb-1 text-white">{tab.label}</div>
                <div className="text-white/70 text-xs">{tab.description}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Search Section - Moved below tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="relative mb-6 md:mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-lg font-medium mb-4 text-center text-white/80 flex items-center justify-center gap-2">
              <span className="text-xl">🔍</span>
              {t('support.search.placeholder')}
            </div>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t('support.search.organizationsPlaceholder')}
                className="w-full px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 text-base backdrop-blur-sm focus:outline-none focus:border-rose-400/50 focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>
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
          {activeTab === 'gethelp' && (
            <motion.div
              key="gethelp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12"
            >
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-white/60">Loading organizations...</div>
                </div>
              ) : organizations.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-white/60">No organizations found matching your criteria.</div>
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
                                  Visit Website
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

          {activeTab === 'lifehacks' && (
            <motion.div
              key="lifehacks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 md:space-y-8 mb-8 md:mb-12"
            >
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-white/60">Loading resources...</div>
                </div>
              ) : resources.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-white/60">No resources found matching your criteria.</div>
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
                                      📚 Complete Step-by-Step Guide
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
                                      👥 Who is this for?
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.guide_who_is_this_for}</p>
                                  </div>
                                )}

                                {resource.guide_what_you_need && (
                                  <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-400/20">
                                    <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      📋 What you need
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.guide_what_you_need}</p>
                                  </div>
                                )}

                                {resource.cost_n_time && (
                                  <div className="p-6 bg-yellow-500/10 rounded-xl border border-yellow-400/20">
                                    <h4 className="text-yellow-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      💰 Cost and time
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.cost_n_time}</p>
                                  </div>
                                )}

                                {resource.guide_legal_chckpoint && (
                                  <div className="p-6 bg-red-500/10 rounded-xl border border-red-400/20">
                                    <h4 className="text-red-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      ⚖️ Legal Information
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.guide_legal_chckpoint}</p>
                                  </div>
                                )}

                                {resource.prob_n_scams && (
                                  <div className="p-6 bg-orange-500/10 rounded-xl border border-orange-400/20">
                                    <h4 className="text-orange-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      ⚠️ Problems and scams
                                    </h4>
                                    <p className="text-white/90 leading-relaxed">{resource.prob_n_scams}</p>
                                  </div>
                                )}

                                {resource.whr_to_get_help && (
                                  <div className="p-6 bg-emerald-500/10 rounded-xl border border-emerald-400/20">
                                    <h4 className="text-emerald-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                                      🤝 Where to get help
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
                                    📝 Step-by-step guide
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
        </AnimatePresence>

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
              {t('support.descriptions.immediateHelp')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
