/**
 * Right4All Frontend Entry Point
 * 
 * Main entry point for the React application.
 * Sets up the React root, routing, and global providers.
 * 
 * @module main
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App'
import './lib/i18n'
import { TranslationProvider } from './contexts/TranslationContext'

/**
 * Initialize React application
 * Creates root element and renders the main App component
 * with all necessary providers (Router, Translation, etc.)
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* BrowserRouter for client-side routing */}
    <BrowserRouter>
      {/* TranslationProvider for multi-language support */}
      <TranslationProvider>
        {/* Main App component */}
        <App />
      </TranslationProvider>
    </BrowserRouter>
  </React.StrictMode>
)
