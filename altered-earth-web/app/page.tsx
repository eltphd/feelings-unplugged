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
    <div className="min-h-screen bg-pearl pb-24 relative">
      {/* Hero Section - Minimal */}
      <section className="bg-white border-b border-ash">
        <div className="py-16 md:py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-sans font-semibold mb-3 text-charcoal">
                Feelings Unplugged
              </h1>
              <p className="text-xl md:text-2xl text-stone mb-4">
                Emotional tracking designed for clarity
              </p>
              <p className="text-base text-stone mb-6 max-w-2xl">
                Evidence-based journaling grounded in Self-Determination Theory. No login required.
              </p>
              {/* Trigger deploy */}
              <div className="inline-flex flex-col sm:flex-row gap-3 items-start">
                <div className="bg-ash/50 px-4 py-2 rounded-lg border border-ash">
                  <p className="text-charcoal font-sans text-sm">
                    Free • Private • No tracking
                  </p>
                </div>
              </div>
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
