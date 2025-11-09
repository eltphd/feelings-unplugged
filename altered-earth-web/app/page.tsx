'use client'

import { useState, useEffect } from 'react'
import BottomNav from './components/BottomNav'
import DashboardWidgets from './components/DashboardWidgets'
import FloatingActionButton from './components/FloatingActionButton'
import DarkModeToggle from './components/DarkModeToggle'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white pb-24">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg-sage py-12 md:py-16 px-6">
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Floating Firefly */}
            <div className="absolute top-4 right-4 md:right-12">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber to-terracotta rounded-full opacity-80 animate-float blur-sm"></div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-sans font-bold mb-2 text-white">
                ALTERED.EARTH
              </h1>
              <p className="text-xl md:text-2xl font-serif italic text-amber mb-3">
                Your Personal Feelings Companion
              </p>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <p className="text-white/90 font-sans text-xs md:text-sm">
                  ✨ Free • No Login • Privacy-First
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Widgets */}
      <DashboardWidgets />

      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Footer */}
      <footer className="gradient-bg-sage text-white py-12 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-2 font-sans font-semibold">
            Altered.earth publications presents Feelings Unplugged
          </p>
          <p className="text-base mb-2 font-sans">
            Created by Dr. Erica L. Tartt | Atlas Academy
          </p>
          <p className="text-cream text-base font-serif italic">
            Your brilliance is not conditional. Neither is theirs.
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
