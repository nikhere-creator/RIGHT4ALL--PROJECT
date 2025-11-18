/**
 * Insights Page Component for Right4All Frontend
 * 
 * Data visualization and analytics page showing migrant worker statistics,
 * risk analysis, and interactive maps for Malaysian labor market insights.
 * 
 * @component
 * @module pages/Insights
 */

import React, { useEffect, useMemo, useState } from 'react'
import { Activity, Calendar, Filter, Globe, MapPin, Shield, Zap, HelpCircle } from 'lucide-react'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Legend, Bar } from 'recharts'
import { useStatesData, useSectorsData, useNationalitiesData, useOverviewData } from '../hooks/useAPIData'
import type { StateData, SectorData, NationalityData } from '../types'
import { riskColors } from '../data/malaysiaMap'
import GoogleMalaysiaMap from '../components/GoogleMalaysiaMap'
import { useTranslation } from 'react-i18next'

/**
 * Risk level types for workplace safety classification
 */
type Risk = 'low'|'medium'|'high'

/**
 * Color mapping for different nationalities in charts
 */
const nationalityColors: Record<string,string> = {
  Bangladesh: '#FF6B6B',
  Indonesia: '#4ECDC4',
  Myanmar: '#45B7D1',
  Nepal: '#FFA07A',
  Pakistan: '#98D8C8',
  Malaysia: '#9B59B6'
}

/**
 * Map API risk level string to standardized risk type
 * @param {string} apiRisk - Risk level from API
 * @returns {Risk} Standardized risk level
 */
function mapRiskLevel(apiRisk: string): Risk {
  const risk = apiRisk.trim().toLowerCase()
  if (risk.includes('high')) return 'high'
  if (risk.includes('medium')) return 'medium'
  return 'low'
}

/**
 * Map risk level for map display (simplified to low/high)
 * @param {string} apiRisk - Risk level from API
 * @returns {'low' | 'high'} Simplified risk level for map visualization
 */
function mapRiskLevelForMap(apiRisk: string): 'low' | 'high' {
  const risk = apiRisk.trim().toLowerCase()
  if (risk.includes('high') || risk.includes('medium')) return 'high'
  return 'low'
}

/**
 * Get CSS classes for different risk levels
 * @param {Risk} risk - Risk level
 * @returns {object} CSS classes for gradients, badges, and glow effects
 */
function riskClasses(risk: Risk) {
  switch (risk) {
    case 'high':
      return { grad: 'from-red-400 to-red-600', badge: 'bg-red-500/20 text-red-300 border-red-500/50', glow: 'shadow-red-500/50' }
    case 'medium':
      return { grad: 'from-yellow-400 to-orange-500', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50', glow: 'shadow-yellow-500/50' }
    default:
      return { grad: 'from-green-400 to-green-600', badge: 'bg-green-500/20 text-green-300 border-green-500/50', glow: 'shadow-green-500/50' }
  }
}

/**
 * Main Insights page component
 * Provides interactive data visualization for migrant worker statistics
 * 
 * @returns {JSX.Element} Insights page with charts, maps, and analytics
 */
export default function Insights() {
  // Translation hook for multi-language support
  const { t } = useTranslation()
  
  // State management for interactive filters
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState<string | 'all'>('all')
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'overview'|'industry'|'comparison'>('overview')

  // API data hooks for fetching migrant worker statistics
  const { data: statesData, loading: statesLoading, error: statesError } = useStatesData()
  const { data: sectorsData, loading: sectorsLoading, error: sectorsError } = useSectorsData()
  const { data: nationalitiesData, loading: nationalitiesLoading, error: nationalitiesError } = useNationalitiesData()
  const { data: overviewData, loading: overviewLoading, error: overviewError } = useOverviewData()

  const states = statesData?.rows || []
  const sectors = sectorsData?.rows || []
  const nationalities = nationalitiesData?.rows || []
  const availableNationalities = nationalities
    .filter(n => n.nationality_number && n.nationality_number > 0)
    .map(n => n.nationality_name_en)

  useEffect(() => {
    if (selectedNationalities.length >= 2) setViewMode('comparison')
    else setViewMode('overview')
  }, [selectedNationalities])

  const chartData = useMemo(() => {
    if (selectedNationalities.length >= 2) {
      // For nationality comparison, we'll use the nationality data
      return selectedNationalities.map(nationality => {
        const nationalityData = nationalities.find(n => n.nationality_name_en === nationality)
        return {
          nationality,
          workers: nationalityData?.nationality_number || 0
        }
      })
    } else if (selectedState) {
      // Show selected state breakdown by industry percentages
      const state = states.find(s => s.state_name_en.trim() === selectedState)
      if (state) {
        return [
          { industry: t('insights.industries.manufacturing'), percentage: parseFloat(state.manuf_perc_in_state) },
          { industry: t('insights.industries.construction'), percentage: parseFloat(state.const_perc_in_state) },
          { industry: t('insights.industries.agriculture'), percentage: parseFloat(state.agric_percent_in_state) },
          { industry: t('insights.industries.services'), percentage: Math.max(0, 100 - parseFloat(state.manuf_perc_in_state) - parseFloat(state.const_perc_in_state) - parseFloat(state.agric_percent_in_state)) }
        ]
      }
      return []
    } else {
      // Overview: show states by worker count
      return states.map(state => ({
        state: state.state_name_en.trim(),
        workers: state.migrant_number
      }))
    }
  }, [selectedNationalities, selectedState, states, nationalities])

  // Separate chart data for industry growth over time
  const industryChartData = useMemo(() => {
    if (selectedIndustry !== 'all') {
      const sector = sectors.find(s => s.sector_name.toLowerCase().includes(selectedIndustry.toLowerCase()))
      if (sector) {
        return [
          { period: '2001', percentage: parseFloat(sector['2001_perc']) },
          { period: '2005', percentage: parseFloat(sector['2005_perc']) },
          { period: '2010', percentage: parseFloat(sector['2010_perc']) },
          { period: '2015', percentage: parseFloat(sector['2015_perc']) },
          { period: '2020', percentage: parseFloat(sector['2020_perc']) },
          { period: '2023', percentage: parseFloat(sector['2023_perc']) }
        ]
      }
    }
    return []
  }, [selectedIndustry, sectors])

  const handleStateClick = (stateName: string) => {
    setSelectedState(stateName)
    setSelectedNationalities([])
  }

  // Loading state
  if (statesLoading || sectorsLoading || nationalitiesLoading) {
    return (
      <div className="relative z-10 p-6">
        <div className="container-max min-h-[calc(100vh-140px)] py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-6 shadow-2xl shadow-purple-500/50 animate-pulse">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-rose-300 to-cyan-300 mb-2">
              Loading Analytics...
            </h1>
            <p className="text-slate-600">Fetching real-time migrant worker data</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (statesError || sectorsError || nationalitiesError) {
    return (
      <div className="relative z-10 p-6">
        <div className="container-max min-h-[calc(100vh-140px)] py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6 shadow-2xl shadow-red-500/50">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 mb-2">
              Connection Error
            </h1>
            <p className="text-slate-600">Unable to fetch data from API</p>
            <div className="mt-4 text-sm text-red-600">
              {statesError || sectorsError || nationalitiesError}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 p-4 md:p-6">
      <div className="container-max min-h-[calc(100vh-140px)] py-4 md:py-8">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4 md:mb-6 shadow-2xl shadow-purple-500/50">
            <Activity className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-rose-300 to-cyan-300 mb-2">
            {t('insights.title')}
          </h1>
          <p className="text-slate-600 text-sm md:text-base">{t('insights.subtitle')} {overviewData?.summary?.year || 2024}</p>
        </div>

        {/* Malaysia Overview Section - Always Visible */}
        <div className="card p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-cyan-600"/>{t('insights.overview.title')}
            </h2>
          </div>
            
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <div className="text-sm text-white/70 mb-1">{t('insights.overview.totalWorkers')} ({overviewData?.summary?.year || 2024})</div>
              <div className="text-2xl font-bold text-blue-400">
                {overviewData?.summary?.total_migrant_worker?.toLocaleString() || 'Loading...'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <div className="text-sm text-white/70 mb-1">{t('insights.overview.statesCovered')}</div>
              <div className="text-2xl font-bold text-green-400">{states.length}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <div className="text-sm text-white/70 mb-1">{t('insights.overview.topNationalities')}</div>
              <div className="text-2xl font-bold text-purple-400">{availableNationalities.length}</div>
            </div>
          </div>

          {/* Chart - Show Malaysia overview data */}
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={states.map(state => ({
                state: state.state_name_en.trim(),
                workers: state.migrant_number
              }))} margin={{top:10,right:10,left:10,bottom:60}}>
                <defs>
                  <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>
                <XAxis 
                  dataKey="state" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 10 }}
                  interval={0}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 10 }}
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '7px' }}
                  formatter={(value) => [Number(value).toLocaleString(), 'Workers']}
                />
                <Area type="monotone" 
                  dataKey="workers" 
                  stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorData)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nationality Comparison Section - Always Visible */}
        <div className="card p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-teal-600"/>{t('insights.countryComparison.title')}
            </h2>
          </div>
          
          {/* Nationality Controls - Right with the chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Controls */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-white">{t('insights.countryComparison.selectCountries')}</h3>
              </div>
              <div className="space-y-2">
                {availableNationalities.slice(0, 6).map(nationality => {
                  const selected = selectedNationalities.includes(nationality)
                  return (
                    <button key={nationality}
                      onClick={() => {
                        const next = selected ? selectedNationalities.filter(x=>x!==nationality) : [...selectedNationalities, nationality]
                        setSelectedNationalities(next)
                      }}
                      className={"w-full p-3 rounded-xl border flex items-center justify-between transition-all " + (selected ? "bg-teal-600 text-white border-teal-400" : "bg-white/10 border-white/20 hover:bg-white/20 text-white")}>
                      <span className="text-sm font-medium">{nationality}</span>
                      <span className="w-3 h-3 rounded-full" style={{backgroundColor: nationalityColors[nationality] || '#888'}}/>
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 space-y-2">
                <button 
                  onClick={() => setSelectedNationalities(['Bangladesh', 'Indonesia'])}
                  className="w-full text-sm bg-teal-600/20 text-teal-300 px-3 py-2 rounded-lg hover:bg-teal-600/30 transition"
                >
                  {t('insights.countryComparison.compareTop2')}
                </button>
                <button 
                  onClick={() => setSelectedNationalities([])}
                  className="w-full text-sm bg-gray-600/20 text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600/30 transition"
                >
                  {t('insights.countryComparison.clearSelection')}
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-2">
              {selectedNationalities.length >= 2 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{top:20,right:30,left:80,bottom:80}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>
                      <XAxis 
                        dataKey="nationality" 
                        tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }}
                        angle={-15}
                        textAnchor="end"
                        height={60}
                        interval={0}
                        label={{ value: 'Country', position: 'insideBottom', offset: -50, style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.8)' } }}
                      />
                      <YAxis 
                        tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
                        label={{ value: 'Number of Workers', angle: -90, position: 'insideLeft', offset: -40, style: { textAnchor: 'middle', fill: 'rgba(255,255,255,0.8)' } }}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                        formatter={(value) => [Number(value).toLocaleString(), 'Workers']}
                      />
                      <Legend/>
                      <Bar dataKey="workers" fill="#8B5CF6" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-white/30 mx-auto mb-4"/>
                    <h3 className="text-lg font-semibold text-white/70 mb-2">{t('insights.countryComparison.selectToCompare')}</h3>
                    <p className="text-sm text-white/50">{t('insights.countryComparison.chooseAtLeast2')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* State/Industry Analysis Section */}
        {(selectedState || selectedIndustry !== 'all') && (
          <div className="card p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 md:mb-6">
              <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-white">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-orange-600"/>
                <span className="text-sm md:text-2xl">
                  {selectedIndustry !== 'all' ? `${selectedIndustry} Industry Growth Over Time` : `${selectedState} State Industry Distribution`}
                </span>
              </h2>
              <div className="flex gap-2">
                {selectedState && (
                  <button onClick={() => setSelectedState(null)}
                    className="btn-outline text-white border-white/30 hover:bg-white/10 text-sm self-start sm:self-auto">Clear State</button>
                )}
                {selectedIndustry !== 'all' && (
                  <button onClick={() => setSelectedIndustry('all')}
                    className="btn-outline text-white border-white/30 hover:bg-white/10 text-sm self-start sm:self-auto">Clear Industry</button>
                )}
              </div>
            </div>
            
            {/* Context Information */}
            {selectedIndustry !== 'all' && (
              <div className="mb-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <h3 className="font-semibold text-orange-300">{t('insights.industry.shareAnalysis')}</h3>
                </div>
                <p className="text-sm text-white/80">
                  {(() => {
                    const industryName = selectedIndustry.toLowerCase() === 'agriculture' ? t('insights.industries.agriculture') :
                                       selectedIndustry.toLowerCase() === 'manufacturing' ? t('insights.industries.manufacturing') :
                                       selectedIndustry.toLowerCase() === 'construction' ? t('insights.industries.construction') :
                                       selectedIndustry.toLowerCase() === 'services' ? t('insights.industries.services') :
                                       selectedIndustry;
                    return t('insights.industry.shareDescription').replace('{industry}', industryName);
                  })()}
                </p>
                <div className="mt-2 text-xs text-orange-300">
                  📈 {t('insights.industry.higherPercentages')}
                </div>
              </div>
            )}
            
            {selectedState && (
              <div className="mb-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h3 className="font-semibold text-blue-300">{t('insights.industry.stateBreakdown')}</h3>
                </div>
                <p className="text-sm text-white/80">
                  {t('insights.industry.stateDescription').replace(/\{state\}/g, selectedState || '')}
                </p>
              </div>
            )}
            
            {/* Chart */}
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedIndustry !== 'all' ? industryChartData : chartData} margin={{top:10,right:10,left:10,bottom:60}}>
                  <defs>
                    <linearGradient id="colorIndustry" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedIndustry !== 'all' ? "#F97316" : "#8B5CF6"} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={selectedIndustry !== 'all' ? "#F97316" : "#8B5CF6"} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>
                  <XAxis 
                    dataKey={selectedIndustry !== 'all' ? 'period' : 'industry'}
                    tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 10 }}
                    angle={selectedIndustry !== 'all' ? 0 : -45}
                    textAnchor={selectedIndustry !== 'all' ? 'middle' : 'end'}
                    height={60}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 10 }}
                    domain={selectedIndustry !== 'all' ? [0, 'dataMax + 2'] : [0, 'dataMax + 5']}
                    width={50}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white' }}
                    formatter={(value, name) => [
                      `${Number(value).toFixed(1)}%`, 
                      selectedIndustry !== 'all' ? `Share of ${selectedIndustry} Industry` : `${name} Workers in ${selectedState}`
                    ]}
                    labelFormatter={(label) => selectedIndustry !== 'all' ? `Year ${label}` : `${label} Industry`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke={selectedIndustry !== 'all' ? "#F97316" : "#8B5CF6"} 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorIndustry)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Summary Stats */}
            {selectedIndustry !== 'all' && industryChartData.length > 0 && (
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group relative">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-xs text-white/60">{t('insights.stats.highestPoint')}</div>
                    <HelpCircle className="w-3 h-3 text-blue-400 cursor-help" />
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black/90 text-white text-xs rounded-lg border border-white/20 z-10">
                      <strong>{t('insights.stats.highestPoint')}:</strong> The peak percentage this industry reached in Malaysia's migrant worker population. Shows when this sector was most dominant.
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-400">
                    {Math.max(...industryChartData.map(d => (d as any).percentage)).toFixed(1)}%
                  </div>
                  <div className="text-xs text-green-300">
                    in {(industryChartData.find(d => (d as any).percentage === Math.max(...industryChartData.map(d => (d as any).percentage))) as any)?.period}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group relative">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-xs text-white/60">{t('insights.stats.currentLevel')}</div>
                    <HelpCircle className="w-3 h-3 text-blue-400 cursor-help" />
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black/90 text-white text-xs rounded-lg border border-white/20 z-10">
                      <strong>{t('insights.stats.currentLevel')}:</strong> What percentage of all migrant workers in Malaysia currently work in this industry (as of 2023).
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-400">
                    {(industryChartData[industryChartData.length - 1] as any)?.percentage?.toFixed(1)}%
                  </div>
                  <div className="text-xs text-blue-300">in 2023</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group relative">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-xs text-white/60">{t('insights.stats.growthPattern')}</div>
                    <HelpCircle className="w-3 h-3 text-blue-400 cursor-help" />
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black/90 text-white text-xs rounded-lg border border-white/20 z-10">
                      <strong>{t('insights.stats.growthPattern')}:</strong> How much this industry's portion of migrant workers has grown or shrunk since 2001. 📈 = growing sector, 📉 = declining sector.
                    </div>
                  </div>
                  <div className="text-lg font-bold text-orange-400">
                    {industryChartData.length >= 2 && (industryChartData[industryChartData.length - 1] as any)?.percentage > (industryChartData[0] as any)?.percentage ? '📈' : '📉'}
                    {industryChartData.length >= 2 ? 
                      Math.abs((((industryChartData[industryChartData.length - 1] as any)?.percentage - (industryChartData[0] as any)?.percentage) / (industryChartData[0] as any)?.percentage * 100)).toFixed(1) : '0'}%
                  </div>
                  <div className="text-xs text-orange-300">
                    {industryChartData.length >= 2 && (industryChartData[industryChartData.length - 1] as any)?.percentage > (industryChartData[0] as any)?.percentage ? t('insights.stats.growth') : 'decline'} since 2001
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/* Industry cards with real accident data */}
        <div className="card p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-orange-600"/>{t('insights.industry.title')}
            </h2>
            {selectedIndustry !== 'all' && (
              <div className="text-sm text-orange-400">{t('insights.industry.selected')}: {selectedIndustry}</div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {sectors.map(sector => {
              const risk = mapRiskLevel(sector.accident_risk_level)
              const r = riskClasses(risk)
              const isSelected = selectedIndustry === sector.sector_name.trim()
              return (
                <button key={sector.sector_id} 
                  onClick={() => {
                    const newIndustry = isSelected ? 'all' : sector.sector_name.trim()
                    setSelectedIndustry(newIndustry)
                  }} 
                  className={"p-4 rounded-2xl border text-left transition " + (isSelected ? "bg-orange-500/20 border-orange-400/50 ring-2 ring-orange-400/30" : "bg-white/10 border-white/20 hover:bg-white/20")}>
                  <div className={"badge mb-2 border " + r.badge}>{risk.toUpperCase()}</div>
                  <div className="font-semibold text-white">{sector.sector_name.trim()}</div>
                  <div className="text-xs text-white/70 mb-2">{sector.description}</div>
                  <div className="text-sm text-white/80">
                    {t('insights.industry.accidents2023')}: <span className="text-rose-400 font-bold">{sector.total_accidents_2023.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-white/80">
                    {t('insights.industry.percentageMigrantWorkers')}: <span className="text-blue-400 font-bold">{sector['2023_perc']}%</span>
                  </div>
                  <div className="text-xs text-white/50 mt-2">
                    {isSelected ? t('insights.industry.clickToDeselect') : t('insights.industry.clickToViewTrend')}
                  </div>
                </button>
              )
            })}
          </div>
          
          {/* Industry Risk Levels Information */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-orange-500"/>
              <h3 className="font-medium text-white">Safety Risk Levels</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/50">LOW</div>
                <span className="text-green-200">Few accidents reported in 2023</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/50">MEDIUM</div>
                <span className="text-yellow-200">Moderate number of accidents</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/50">HIGH</div>
                <span className="text-red-200">Many accidents—extra caution needed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map - Moved to Bottom */}
        <div className="card p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-purple-600"/>{t('insights.map.title')}
            </h2>
          </div>
          <div className="mb-4">
            <div className="text-sm text-white/70 mb-2">
              {selectedState ? `${t('insights.map.viewing')}: ${selectedState}` : t('insights.map.selectState')}
            </div>
            {selectedState && (
              <button 
                onClick={() => setSelectedState(null)}
                className="text-sm bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg hover:bg-purple-600/30 transition"
              >
                {t('insights.map.clearSelection')}
              </button>
            )}
          </div>
          
          {/* Temporary Debug Component */}
          <div className="mb-4">
          </div>
          
          <GoogleMalaysiaMap 
            states={states}
            selectedState={selectedState}
            onStateClick={handleStateClick}
          />
          
          {/* State Risk Levels Information */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-purple-500"/>
              <h3 className="font-medium text-white">Risk Level Information</h3>
            </div>
            <p className="text-sm text-white/80 mb-3">
              Risk level shows workplace safety for foreign workers based on injury rates, dangerous job types, and economic protection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-0.5 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-green-300 text-sm">Low Risk</div>
                  <div className="text-xs text-green-200/80">Less danger and better protection for workers</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500 mt-0.5 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-red-300 text-sm">High Risk</div>
                  <div className="text-xs text-red-200/80">More danger and less protection for workers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
