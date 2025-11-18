/**
 * Right4All Frontend Application
 * 
 * Main React application component that sets up routing and global layout.
 * Provides multi-language support and integrates the AI chatbot widget.
 * 
 * @component
 * @returns {JSX.Element} The main application component
 */

import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import LanguageSelection from '@/pages/LanguageSelection'
import Home from '@/pages/Home'
import InsightsStories from '@/pages/InsightsStories'
import RightsGuide from '@/pages/RightsGuide'
import Quiz from '@/pages/Quiz'
import Support from '@/pages/Support'
import AboutRight4AllAI from '@/pages/AboutRight4AllAI'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { ChatWidget } from '@/components/Chatbot'

/**
 * Main App component that handles routing and global layout
 */
export default function App() {
  // Sync language preferences across the application
  useLanguageSync()

  return (
    <div className="min-h-screen">
      {/* Global Chatbot Widget - Available on all pages */}
      <ChatWidget />

      {/* Application Routes */}
      <Routes>
        {/* Language selection page - initial landing page */}
        <Route path="/" element={<LanguageSelection />} />
        
        {/* Home page with navigation */}
        <Route path="/home" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <Home />
            </main>
          </>
        } />
        
        {/* Insights and stories page */}
        <Route path="/insights" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <InsightsStories />
            </main>
          </>
        } />
        
        {/* Rights guide page */}
        <Route path="/rights" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <RightsGuide />
            </main>
          </>
        } />
        
        {/* Quiz page for testing knowledge */}
        <Route path="/quiz" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <Quiz />
            </main>
          </>
        } />
        
        {/* Tools page (currently uses Support component) */}
        <Route path="/tools" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <Support />
            </main>
          </>
        } />
        
        {/* Community page (currently uses Support component) */}
        <Route path="/community" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <Support />
            </main>
          </>
        } />
        
        {/* Support page */}
        <Route path="/support" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <Support />
            </main>
          </>
        } />
        
        {/* About Right4All AI page */}
        <Route path="/about-right4all-ai" element={
          <>
            <Navbar />
            <main className="pt-20 md:pt-28 pb-16 min-h-screen">
              <AboutRight4AllAI />
            </main>
          </>
        } />
      </Routes>
    </div>
  )
}
