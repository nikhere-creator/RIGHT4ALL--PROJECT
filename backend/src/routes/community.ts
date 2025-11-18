import express from 'express'
import { db } from '../services/databaseService'

const router = express.Router()

// Get all organizations/NGOs
router.get('/organizations', async (req, res) => {
  try {
    const { category, search, lang = 'en' } = req.query
    let rows = await db.getOrganizationsData()

    // Map to appropriate language fields
    const languageCode = lang as string
    rows = rows.map(org => {
      const mappedOrg = { ...org }

      // Map language-specific fields
      if (languageCode !== 'en') {
        mappedOrg.service_type = org[`service_type_${languageCode}`] || org.service_type
        mappedOrg.org_descr_en = org[`org_descr_en_${languageCode}`] || org.org_descr_en
        mappedOrg.tag = org[`tag_${languageCode}`] || org.tag
      }

      return mappedOrg
    })

    // Filter by category if provided
    if (category && category !== 'All Help') {
      rows = rows.filter(org =>
        org.service_type?.toLowerCase().includes((category as string).toLowerCase())
      )
    }

    // Filter by search term if provided
    if (search) {
      const searchTerm = (search as string).toLowerCase()
      rows = rows.filter(org =>
        org.org_name?.toLowerCase().includes(searchTerm) ||
        org.org_en?.toLowerCase().includes(searchTerm) ||
        org.org_descr_en?.toLowerCase().includes(searchTerm) ||
        org.service_type?.toLowerCase().includes(searchTerm) ||
        org.org_address?.toLowerCase().includes(searchTerm) ||
        org.org_state?.toLowerCase().includes(searchTerm)
      )
    }

    res.json({ organizations: rows })
  } catch (error) {
    console.error('Organizations endpoint error:', error)
    res.status(500).json({
      error: 'Failed to fetch organizations data',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get all survivor stories
router.get('/stories', async (req, res) => {
  try {
    const { category, search, lang = 'en' } = req.query
    let rows = await db.getSurvivorStoriesData()

    // Map to appropriate language fields
    const languageCode = lang as string
    rows = rows.map(story => {
      const mappedStory = { ...story }

      // Map language-specific fields
      if (languageCode !== 'en') {
        mappedStory.story_title_en = story[`story_title_en_${languageCode}`] || story.story_title_en
        mappedStory.story_body_en = story[`story_body_en_${languageCode}`] || story.story_body_en
        mappedStory.theme = story[`theme_${languageCode}`] || story.theme
        mappedStory.tips_or_lesson = story[`tips_or_lesson_${languageCode}`] || story.tips_or_lesson
      }

      return mappedStory
    })

    // Filter by category if provided
    if (category && category !== 'All Stories') {
      rows = rows.filter(story =>
        story.theme?.toLowerCase().includes((category as string).toLowerCase())
      )
    }

    // Filter by search term if provided
    if (search) {
      const searchTerm = (search as string).toLowerCase()
      rows = rows.filter(story =>
        story.story_title_en?.toLowerCase().includes(searchTerm) ||
        story.story_body_en?.toLowerCase().includes(searchTerm) ||
        story.theme?.toLowerCase().includes(searchTerm) ||
        story.tips_or_lesson?.toLowerCase().includes(searchTerm)
      )
    }

    res.json({ stories: rows })
  } catch (error) {
    console.error('Stories endpoint error:', error)
    res.status(500).json({
      error: 'Failed to fetch stories data',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get all practical guides/resources
router.get('/resources', async (req, res) => {
  try {
    const { category, search, lang = 'en' } = req.query
    let rows = await db.getPracticalGuidesData()

    // Map to appropriate language fields
    const languageCode = lang as string
    rows = rows.map(guide => {
      const mappedGuide = { ...guide }

      // Map language-specific fields
      if (languageCode !== 'en') {
        mappedGuide.guide_topic_name = guide[`guide_topic_name_${languageCode}`] || guide.guide_topic_name
        mappedGuide.guide_summary = guide[`guide_summary_${languageCode}`] || guide.guide_summary
        mappedGuide.guide_who_is_this_for = guide[`guide_who_is_this_for_${languageCode}`] || guide.guide_who_is_this_for
        mappedGuide.guide_what_you_need = guide[`guide_what_you_need_${languageCode}`] || guide.guide_what_you_need
        mappedGuide.guide_steps = guide[`guide_steps_${languageCode}`] || guide.guide_steps
        mappedGuide.guide_legal_chckpoint = guide[`guide_legal_chckpoint_${languageCode}`] || guide.guide_legal_chckpoint
        mappedGuide.cost_n_time = guide[`cost_n_time_${languageCode}`] || guide.cost_n_time
        mappedGuide.prob_n_scams = guide[`prob_n_scams_${languageCode}`] || guide.prob_n_scams
        mappedGuide.whr_to_get_help = guide[`whr_to_get_help_${languageCode}`] || guide.whr_to_get_help
        mappedGuide.disclaimer = guide[`disclaimer_${languageCode}`] || guide.disclaimer
        mappedGuide.category_name = guide[`category_name_${languageCode}`] || guide.category_name
      }

      return mappedGuide
    })

    // Filter by category if provided
    if (category && category !== 'All Resources') {
      rows = rows.filter(guide =>
        guide.category_name?.toLowerCase().includes((category as string).toLowerCase())
      )
    }

    // Filter by search term if provided
    if (search) {
      const searchTerm = (search as string).toLowerCase()
      rows = rows.filter(guide =>
        guide.guide_topic_name?.toLowerCase().includes(searchTerm) ||
        guide.guide_summary?.toLowerCase().includes(searchTerm) ||
        guide.guide_who_is_this_for?.toLowerCase().includes(searchTerm) ||
        guide.guide_steps?.toLowerCase().includes(searchTerm) ||
        guide.category_name?.toLowerCase().includes(searchTerm)
      )
    }

    res.json({ resources: rows })
  } catch (error) {
    console.error('Resources endpoint error:', error)
    res.status(500).json({
      error: 'Failed to fetch resources data',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get specific organization by ID
router.get('/organizations/:id', async (req, res) => {
  try {
    const { id } = req.params
    const query = `
      SELECT *
      FROM organization
      WHERE org_id = $1
    `
    const result = await db.query(query, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Organization not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Organization detail endpoint error:', error)
    res.status(500).json({
      error: 'Failed to fetch organization data',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get community stats for dashboard
router.get('/stats', async (req, res) => {
  try {
    const [orgResult, storyResult, resourceResult] = await Promise.all([
      db.query('SELECT COUNT(*) as count FROM organization'),
      db.query('SELECT COUNT(*) as count FROM survivor_story'),
      db.query('SELECT COUNT(*) as count FROM comm_practical_guide')
    ])

    res.json({
      organizations: orgResult.rows[0]?.count || 0,
      stories: storyResult.rows[0]?.count || 0,
      resources: resourceResult.rows[0]?.count || 0
    })
  } catch (error) {
    console.error('Community stats endpoint error:', error)
    res.status(500).json({
      error: 'Failed to fetch community stats',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

export default router