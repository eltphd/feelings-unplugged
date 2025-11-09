'use client'

import { useState, useEffect } from 'react'
import BottomNav from './components/BottomNav'
import DashboardWidgets from './components/DashboardWidgets'
import FloatingActionButton from './components/FloatingActionButton'
import DarkModeToggle from './components/DarkModeToggle'
import DataBackup from './components/DataBackup'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-light-100 pb-24">
      {/* Hero Section - Modern, Spacious */}
      <section className="bg-gradient-to-b from-white to-light-100 border-b border-light-300">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-sans font-bold mb-6 text-dark bg-gradient-to-r from-dark to-dark-200 bg-clip-text text-transparent">
              Feelings Unplugged
            </h1>
            <p className="text-xl md:text-2xl text-dark-300 mb-8 leading-relaxed">
              Track your emotions with clarity. Built on Self-Determination Theory for meaningful growth.
            </p>
            {/* Trigger deployment */}
            <div className="flex flex-wrap gap-4 text-sm text-dark-300">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Free forever
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                No login required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Privacy-first
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Widgets */}
      <DashboardWidgets />

      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Data Backup */}
      <DataBackup />

      {/* Footer */}
      <footer className="bg-white border-t border-ash text-charcoal py-12 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-stone mb-2">
            Altered.earth publications presents Feelings Unplugged
          </p>
          <p className="text-sm text-stone mb-2">
            Created by Dr. Erica L. Tartt | Atlas Academy
          </p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
