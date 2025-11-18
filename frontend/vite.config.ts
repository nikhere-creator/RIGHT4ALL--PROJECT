
/**
 * Vite Configuration for Right4All Frontend
 * 
 * Build tool configuration for the React frontend application.
 * Provides fast development server and optimized production builds.
 * 
 * @module vite.config
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * Vite configuration object
 * Sets up React plugin and path aliases for cleaner imports
 */
export default defineConfig({
  // React plugin for JSX/TSX support and fast refresh
  plugins: [react()],
  
  // Module resolution configuration
  resolve: {
    // Path aliases for cleaner import statements
    alias: {
      // '@' alias points to the src directory
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
