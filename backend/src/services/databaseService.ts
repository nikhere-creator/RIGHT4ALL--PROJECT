/**
 * Database Service for Right4All Backend
 * 
 * Provides PostgreSQL database connectivity and query execution for the application.
 * Handles connection pooling, error handling, and data retrieval for all database operations.
 * 
 * @module services/databaseService
 */

import { Pool } from 'pg'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

/**
 * PostgreSQL connection pool configuration
 * Creates a connection pool for efficient database connections
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? {
    rejectUnauthorized: false
  } : false,
  max: 10, // Maximum number of clients in pool
  idleTimeoutMillis: 60000, // Close idle clients after 60 seconds
  connectionTimeoutMillis: 30000, // Return error after 30 seconds if connection could not be established
})

/**
 * Handle pool errors to prevent application crashes
 */
pool.on('error', (err) => {
  console.error('Database pool error:', err)
})

/**
 * Main database service class providing database operations
 */
export class DatabaseService {
  private pool: Pool

  constructor() {
    this.pool = pool
  }

  /**
   * Test database connection
   * Verifies that the application can connect to the PostgreSQL database
   * @returns {Promise<boolean>} True if connection successful, false otherwise
   */
  async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect()
      const result = await client.query('SELECT NOW()')
      client.release()
      console.log('✅ Database connected successfully at:', result.rows[0].now)
      return true
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      return false
    }
  }

  /**
   * Execute a database query with parameters
   * @param {string} text - SQL query text
   * @param {any[]} params - Query parameters (optional)
   * @returns {Promise<any>} Query result object
   */
  async query(text: string, params?: any[]): Promise<any> {
    const start = Date.now()
    try {
      const result = await this.pool.query(text, params)
      const duration = Date.now() - start
      if (process.env.NODE_ENV === 'development') {
        console.log('Query executed', { duration, rows: result.rowCount })
      }
      return result
    } catch (error: any) {
      const duration = Date.now() - start
      console.error('Query failed', { duration, error: error.message })
      throw error
    }
  }

  /**
   * Get all states data with migrant worker statistics
   * @returns {Promise<any[]>} Array of state data objects
   */
  async getStatesData(): Promise<any[]> {
    const query = `
      SELECT 
        state_code,
        state_name_en,
        migrant_number,
        risk_level,
        manuf_perc_in_state,
        const_perc_in_state,
        agric_percent_in_state
      FROM v_state_overview 
      ORDER BY state_code
    `
    const result = await this.query(query)
    return result.rows
  }

  /**
   * Get all sectors data with accident statistics and risk levels
   * @returns {Promise<any[]>} Array of sector data objects
   */
  async getSectorsData(): Promise<any[]> {
    const query = `
      SELECT 
        sector_id,
        sector_name,
        sector_description as description,
        total_accidents_2023,
        accident_risk_level,
        "2001_perc",
        "2005_perc", 
        "2010_perc",
        "2015_perc",
        "2020_perc",
        "2023_perc"
      FROM v_sector_overview
      ORDER BY sector_id
    `
    const result = await this.query(query)
    return result.rows
  }

  /**
   * Get all nationalities data with migrant worker counts
   * @returns {Promise<any[]>} Array of nationality data objects
   */
  async getNationalitiesData(): Promise<any[]> {
    const query = `
      SELECT 
        dn.nationality_id,
        dn.nationality_name_en,
        dn.nationality_iso_code,
        mn.nationality_number
      FROM dim_nationality dn
      INNER JOIN migrant_by_nationality mn ON dn.nationality_id = mn.nationality_id
      WHERE mn.nationality_number IS NOT NULL AND mn.nationality_number > 0
      ORDER BY mn.nationality_number DESC
    `
    const result = await this.query(query)
    return result.rows
  }

  /**
   * Get overview/summary data for migrant workers
   * @returns {Promise<any>} Summary data object with timestamp
   */
  async getOverviewData(): Promise<any> {
    const query = `
      SELECT 
        total_migrant_worker,
        year
      FROM migrant_summary
      ORDER BY year DESC
      LIMIT 1
    `
    const result = await this.query(query)
    return {
      summary: result.rows[0] || { total_migrant_worker: 0, year: new Date().getFullYear() },
      ts: new Date().toISOString()
    }
  }

  /**
   * Get all organizations/NGOs data
   * @returns {Promise<any[]>} Array of organization objects
   */
  async getOrganizationsData(): Promise<any[]> {
    const query = `
      SELECT *
      FROM organization
      ORDER BY org_name
    `
    const result = await this.query(query)
    return result.rows
  }

  /**
   * Get all survivor stories from migrant workers
   * @returns {Promise<any[]>} Array of survivor story objects
   */
  async getSurvivorStoriesData(): Promise<any[]> {
    const query = `
      SELECT *
      FROM survivor_story
      ORDER BY story_id
    `
    const result = await this.query(query)
    return result.rows
  }

  /**
   * Get all practical guides for community resources
   * @returns {Promise<any[]>} Array of practical guide objects
   */
  async getPracticalGuidesData(): Promise<any[]> {
    const query = `
      SELECT *
      FROM comm_practical_guide
      ORDER BY guide_topic_name
    `
    const result = await this.query(query)
    return result.rows
  }

  /**
   * Get organizations by category/filter
   * @param {string} category - Category to filter organizations by
   * @returns {Promise<any[]>} Array of filtered organization objects
   */
  async getOrganizationsByCategory(category: string): Promise<any[]> {
    const query = `
      SELECT
        o.organization_id,
        o.organization_name,
        o.organization_description,
        o.organization_type,
        o.contact_email,
        o.contact_phone,
        o.website_url,
        o.address,
        o.city,
        o.state,
        o.postal_code,
        o.latitude,
        o.longitude,
        o.rating,
        o.is_active,
        array_agg(DISTINCT ol.language_name) as languages
      FROM organization o
      LEFT JOIN organization_language ol ON o.organization_id = ol.organization_id
      WHERE o.is_active = true
        AND (o.organization_type ILIKE $1 OR o.organization_description ILIKE $1)
      GROUP BY o.organization_id, o.organization_name, o.organization_description,
               o.organization_type, o.contact_email, o.contact_phone, o.website_url,
               o.address, o.city, o.state, o.postal_code, o.latitude, o.longitude,
               o.rating, o.is_active
      ORDER BY o.rating DESC
    `
    const result = await this.query(query, [`%${category}%`])
    return result.rows
  }

  /**
   * Search organizations by name, description, type, or location
   * @param {string} searchTerm - Search term to match against organization fields
   * @returns {Promise<any[]>} Array of matching organization objects
   */
  async searchOrganizations(searchTerm: string): Promise<any[]> {
    const query = `
      SELECT
        o.organization_id,
        o.organization_name,
        o.organization_description,
        o.organization_type,
        o.contact_email,
        o.contact_phone,
        o.website_url,
        o.address,
        o.city,
        o.state,
        o.postal_code,
        o.latitude,
        o.longitude,
        o.rating,
        o.is_active,
        array_agg(DISTINCT ol.language_name) as languages
      FROM organization o
      LEFT JOIN organization_language ol ON o.organization_id = ol.organization_id
      WHERE o.is_active = true
        AND (
          o.organization_name ILIKE $1 OR
          o.organization_description ILIKE $1 OR
          o.organization_type ILIKE $1 OR
          o.city ILIKE $1 OR
          o.state ILIKE $1
        )
      GROUP BY o.organization_id, o.organization_name, o.organization_description,
               o.organization_type, o.contact_email, o.contact_phone, o.website_url,
               o.address, o.city, o.state, o.postal_code, o.latitude, o.longitude,
               o.rating, o.is_active
      ORDER BY o.rating DESC
    `
    const result = await this.query(query, [`%${searchTerm}%`])
    return result.rows
  }

  /**
   * Close the database connection pool (for graceful shutdown)
   */
  async close(): Promise<void> {
    await this.pool.end()
    console.log('Database pool closed')
  }
}

// Export singleton instance of the database service
export const db = new DatabaseService()
