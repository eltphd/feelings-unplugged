'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardWidgets() {
  const [journalData, setJournalData] = useState<any>({})
  const [currentStreak, setCurrentStreak] = useState(0)
  const [totalDays, setTotalDays] = useState(0)
  const [todaysMood, setTodaysMood] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState('')

  useEffect(() => {
    // Load journal data from localStorage
    const saved = localStorage.getItem('alteredEarthJournal')
    if (saved) {
      const data = JSON.parse(saved)
      setJournalData(data)

      // Calculate stats
      const days = Object.keys(data).length
      setTotalDays(days)

      // Get today's mood if exists
      const today = new Date().toISOString().split('T')[0]
      if (data.todayMood) {
        setTodaysMood(data.todayMood)
      }
    }
  }, [])

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'from-amber to-yellow-400' },
    { emoji: '😐', label: 'Okay', color: 'from-sage to-green-400' },
    { emoji: '😢', label: 'Sad', color: 'from-blue-400 to-blue-600' },
    { emoji: '😡', label: 'Mad', color: 'from-red-400 to-terracotta' },
    { emoji: '😰', label: 'Anxious', color: 'from-purple-400 to-purple-600' },
  ]

  const saveTodayMood = (mood: string) => {
    setTodaysMood(mood)
    const saved = localStorage.getItem('alteredEarthJournal') || '{}'
    const data = JSON.parse(saved)
    const today = new Date().toISOString().split('T')[0]

    // Check if this is first mood log of the day
    const existingToday = data.moodLog?.find((entry: any) => entry.date === today)

    data.todayMood = mood
    data.moodLog = data.moodLog || []

    if (!existingToday) {
      data.moodLog.push({ date: today, mood })

      // Celebration for mood check-in
      const messages = [
        '✨ Checked in! Your feelings matter',
        '🌟 Great job checking in with yourself',
        '💫 You showed up today. That counts.',
        '🔥 Emotional awareness unlocked!',
        '⭐ Your feelings are valid, always'
      ]
      setCelebrationMessage(messages[Math.floor(Math.random() * messages.length)])
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }

    localStorage.setItem('alteredEarthJournal', JSON.stringify(data))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 -mt-8 relative z-20">
      {/* Celebration Toast */}
      {showCelebration && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
          <div className="bg-gradient-to-br from-terracotta via-amber to-amber text-white px-6 py-4 rounded-full firefly-glow-lg font-sans font-bold text-center shadow-2xl animate-celebration">
            {celebrationMessage}
          </div>
        </div>
      )}

      {/* Firefly Ambient Glows */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-amber/30 to-terracotta/20 rounded-full blur-3xl animate-firefly-glow pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-sage/20 to-forest/10 rounded-full blur-3xl animate-firefly-glow pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      {/* Quick Check-In Widget - Enhanced */}
      <div className="mb-6 animate-fade-in">
        <div className="card-glass p-6 md:p-8 rounded-3xl hover-lift relative overflow-hidden border border-terracotta/10">
          {/* Decorative Firefly Accents */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-amber rounded-full animate-firefly-float opacity-60"></div>
          <div className="absolute top-8 right-12 w-2 h-2 bg-terracotta rounded-full animate-firefly-float opacity-40" style={{ animationDelay: '0.5s' }}></div>

          <h2 className="text-2xl md:text-4xl font-sans font-extrabold gradient-text mb-2 text-center md:text-left">
            How are you feeling right now?
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-serif mb-5 text-center md:text-left">
            Every firefly glows differently. Your feelings are valid. ✨
          </p>

          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => saveTodayMood(mood.label)}
                className={`
                  tap-target haptic-heavy
                  flex flex-col items-center justify-center
                  p-3 md:p-5 rounded-2xl md:rounded-3xl
                  transition-all duration-300
                  relative overflow-hidden
                  ${
                    todaysMood === mood.label
                      ? `bg-gradient-to-br ${mood.color} text-white scale-110 firefly-glow-md animate-celebration shadow-2xl`
                      : 'bg-white hover:scale-110 hover:shadow-xl border-2 border-gray-100'
                  }
                `}
              >
                {/* Shimmer effect for selected mood */}
                {todaysMood === mood.label && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                )}

                <span className={`text-3xl md:text-5xl mb-1 md:mb-2 transition-all ${
                  todaysMood === mood.label ? 'animate-bounce-soft' : ''
                }`}>
                  {mood.emoji}
                </span>
                <span className={`text-[10px] md:text-sm font-sans font-extrabold uppercase tracking-wide ${
                  todaysMood === mood.label ? 'text-white' : 'text-gray-700'
                }`}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Today's Journal Widget */}
        <Link href="/journal" className="group">
          <div className="card-glass p-6 rounded-3xl hover-lift h-full bg-gradient-to-br from-white to-terracotta/10">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">✍️</div>
              <div className="bg-terracotta/10 px-3 py-1 rounded-full">
                <span className="text-xs font-sans font-bold text-terracotta">TODAY</span>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-sans font-bold text-forest mb-2">
              Daily Journal
            </h3>
            <p className="text-gray-600 font-serif mb-4">
              Start your morning ritual, check in at midday, reflect tonight
            </p>
            <div className="flex items-center gap-2 text-terracotta font-sans font-bold group-hover:translate-x-2 transition-transform">
              <span>Write now</span>
              <span>→</span>
            </div>
          </div>
        </Link>

        {/* Progress Widget - Enhanced with Streaks */}
        <div className="card-glass p-6 rounded-3xl hover-lift bg-gradient-to-br from-white to-amber/10 border border-amber/20 relative overflow-hidden">
          {/* Firefly glow accent */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber/40 to-terracotta/30 rounded-full blur-2xl animate-firefly-glow"></div>

          <div className="relative z-10">
            <div className={`text-5xl mb-4 inline-block ${currentStreak >= 3 ? 'animate-wiggle' : ''}`}>
              🔥
            </div>
            <h3 className="text-xl md:text-2xl font-sans font-extrabold text-forest mb-3">
              Your Progress
            </h3>

            {/* Streak Milestone Messages */}
            {currentStreak >= 7 && (
              <div className="mb-4 p-3 bg-gradient-to-r from-amber/20 to-terracotta/20 rounded-2xl border border-amber/30 animate-scale-in">
                <p className="text-sm font-sans font-bold text-forest">
                  🎉 {currentStreak} day streak! You're on fire!
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-sans font-bold text-gray-700">Days Completed</span>
                  <span className="text-sm font-sans font-extrabold gradient-text">{totalDays}/30</span>
                </div>
                <div className="w-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-amber via-terracotta to-amber h-full rounded-full transition-all duration-700 firefly-glow-sm relative"
                    style={{
                      width: `${Math.min((totalDays / 30) * 100, 100)}%`,
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s linear infinite'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center bg-gradient-to-br from-amber/10 to-terracotta/10 rounded-2xl p-4 border border-amber/20">
                  <div className="text-3xl font-black gradient-text font-sans">{currentStreak}</div>
                  <div className="text-xs text-gray-600 font-sans font-bold uppercase tracking-wide">Day Streak 🔥</div>
                </div>
                <div className="text-center bg-gradient-to-br from-sage/10 to-forest/10 rounded-2xl p-4 border border-sage/20">
                  <div className="text-3xl font-black gradient-text font-sans">{totalDays}</div>
                  <div className="text-xs text-gray-600 font-sans font-bold uppercase tracking-wide">Total Entries ✨</div>
                </div>
              </div>

              {/* Motivational Progress Messages */}
              {totalDays === 0 && (
                <p className="text-xs text-gray-600 font-serif italic text-center mt-3">
                  🌟 Start your journey today. Every firefly starts with a single glow.
                </p>
              )}
              {totalDays >= 1 && totalDays < 7 && (
                <p className="text-xs text-gray-600 font-serif italic text-center mt-3">
                  💫 You're building momentum. Keep glowing!
                </p>
              )}
              {totalDays >= 7 && totalDays < 14 && (
                <p className="text-xs text-gray-600 font-serif italic text-center mt-3">
                  ⭐ One week strong! Your consistency is powerful.
                </p>
              )}
              {totalDays >= 14 && totalDays < 30 && (
                <p className="text-xs text-gray-600 font-serif italic text-center mt-3">
                  🚀 Halfway there! Your growth is undeniable.
                </p>
              )}
              {totalDays >= 30 && (
                <p className="text-xs text-gray-600 font-serif italic text-center mt-3">
                  👑 30 days completed! You're a journaling legend.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mood Calendar Widget */}
        <div className="card-glass p-6 rounded-3xl hover-lift bg-gradient-to-br from-white to-sage/10 md:col-span-2 lg:col-span-1">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl md:text-2xl font-sans font-bold text-forest mb-4">
            Mood Patterns
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 14 }, (_, i) => {
              const hasEntry = i < totalDays
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg transition-all ${
                    hasEntry
                      ? 'bg-gradient-to-br from-sage to-forest hover:scale-110'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title={hasEntry ? `Day ${i + 1}` : 'No entry'}
                />
              )
            })}
          </div>
          <p className="text-xs text-gray-500 mt-3 font-sans">Last 14 days</p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <QuickAccessCard
          emoji="📊"
          title="Weekly Review"
          description="Reflect on patterns and track your growth"
          href="/weekly-review"
          gradient="from-terracotta to-amber"
        />
        <QuickAccessCard
          emoji="📚"
          title="Read Articles"
          description="Learn about your brain, emotions, and shadow work"
          href="/articles"
          gradient="from-forest to-sage"
        />
        <QuickAccessCard
          emoji="🎵"
          title="Build Playlists"
          description="Create emotional playlists for every mood"
          href="/playlists"
          gradient="from-amber to-terracotta"
        />
        <QuickAccessCard
          emoji="🆘"
          title="Get Help"
          description="Crisis resources available 24/7"
          href="/resources"
          gradient="from-sage to-forest"
          highlight
        />
      </div>

      {/* Backup Reminder */}
      {totalDays > 7 && (
        <div className="mt-6 card-glass p-6 rounded-3xl border-2 border-amber/30 bg-gradient-to-br from-amber/10 to-terracotta/10">
          <div className="flex items-center gap-4">
            <div className="text-5xl">💾</div>
            <div className="flex-1">
              <h3 className="text-xl font-sans font-bold text-forest mb-2">
                Backup Your Progress!
              </h3>
              <p className="text-gray-700 font-serif mb-3">
                You've journaled for {totalDays} days! Your entries are precious. Back them up so you never lose them.
              </p>
              <p className="text-sm text-gray-600 font-sans">
                💡 Click "Backup Data" in the top-left corner to download your entries.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inspirational Quote Widget */}
      <div className="mt-6 card-glass p-6 rounded-3xl text-center bg-gradient-to-br from-white to-cream/50">
        <p className="text-xl md:text-2xl font-serif italic text-gray-700 mb-2">
          "Your feelings are not too much."
        </p>
        <p className="text-sm text-gray-500 font-sans">
          You're exactly where you need to be.
        </p>
      </div>
    </div>
  )
}

function QuickAccessCard({
  emoji,
  title,
  description,
  href,
  gradient,
  highlight = false
}: {
  emoji: string
  title: string
  description: string
  href: string
  gradient: string
  highlight?: boolean
}) {
  return (
    <Link href={href} className="group">
      <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
        highlight
          ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200'
          : 'bg-white'
      }`}>
        <div className={`inline-block bg-gradient-to-br ${gradient} p-3 rounded-xl text-3xl mb-3 group-hover:scale-110 transition-transform`}>
          {emoji}
        </div>
        <h4 className="text-lg font-sans font-bold text-forest mb-2 group-hover:gradient-text transition-all">
          {title}
        </h4>
        <p className="text-sm text-gray-600 font-serif mb-3">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm font-sans font-bold text-terracotta group-hover:translate-x-2 transition-transform">
          <span>Go</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  )
}
