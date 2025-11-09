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
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white pb-24 relative overflow-hidden">
      {/* Ambient Firefly Glows - Background */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber/20 to-terracotta/10 rounded-full blur-3xl animate-firefly-glow pointer-events-none"></div>
      <div className="fixed top-60 left-10 w-96 h-96 bg-gradient-to-br from-sage/15 to-forest/10 rounded-full blur-3xl animate-firefly-glow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section - Mobile-First Enhanced */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg-sage py-16 md:py-20 px-6 relative">
          {/* Floating Fireflies - Multiple */}
          <div className="absolute top-8 right-8 md:right-16 pointer-events-none">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-amber to-terracotta rounded-full opacity-70 animate-firefly-float blur-md firefly-glow-md"></div>
          </div>
          <div className="absolute top-24 right-24 md:right-32 pointer-events-none">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-amber/60 to-terracotta/60 rounded-full opacity-50 animate-firefly-float blur-sm" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="absolute bottom-12 left-12 md:left-20 pointer-events-none">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-cream/80 to-amber/60 rounded-full opacity-60 animate-firefly-float blur-md" style={{ animationDelay: '1.5s' }}></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center animate-fade-in">
              <div className="mb-4 inline-block">
                <div className="text-5xl md:text-7xl animate-float">✨</div>
              </div>
              <h1 className="text-5xl md:text-7xl font-sans font-black mb-3 text-white drop-shadow-lg">
                ALTERED.EARTH
              </h1>
              <p className="text-2xl md:text-3xl font-serif italic text-amber mb-4 drop-shadow-md">
                Your Personal Feelings Companion
              </p>
              <p className="text-base md:text-lg font-serif text-white/90 mb-6 max-w-2xl mx-auto">
                Every firefly glows differently. Track your emotions, build playlists, and discover your light.
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-3 items-center">
                <div className="bg-white/25 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white/40 firefly-glow-sm">
                  <p className="text-white font-sans text-sm md:text-base font-bold">
                    ✨ Free Forever • 🔒 No Login • 🛡️ Privacy-First
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
