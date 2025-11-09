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

      // Quiet acknowledgment (SDT: competence feedback, not celebration)
      const messages = [
        'Logged',
        'Noted',
        'Saved',
      ]
      setCelebrationMessage(messages[Math.floor(Math.random() * messages.length)])
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }

    localStorage.setItem('alteredEarthJournal', JSON.stringify(data))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 -mt-8 relative z-20">
      {/* Quiet Toast - Minimal feedback */}
      {showCelebration && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
          <div className="bg-charcoal text-white px-4 py-2 rounded-lg font-sans text-sm shadow-lg">
            {celebrationMessage}
          </div>
        </div>
      )}

      {/* Mood Check-In - Minimal */}
      <div className="mb-6 animate-fade-in">
        <div className="card-minimal p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-sans font-semibold text-charcoal mb-1">
            How are you feeling?
          </h2>
          <p className="text-sm text-stone mb-5">
            Check in with yourself
          </p>

          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => saveTodayMood(mood.label)}
                className={`
                  tap-target haptic-medium
                  flex flex-col items-center justify-center
                  p-3 md:p-4 rounded-xl
                  transition-all duration-200
                  ${
                    todaysMood === mood.label
                      ? 'bg-lavender border-2 border-lavender shadow-sm'
                      : 'bg-white hover:bg-ash/50 border border-ash'
                  }
                `}
              >
                <span className="text-2xl md:text-4xl mb-1">
                  {mood.emoji}
                </span>
                <span className={`text-[10px] md:text-xs font-sans font-medium ${
                  todaysMood === mood.label ? 'text-charcoal' : 'text-stone'
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

        {/* Progress Widget - Minimal, SDT-aligned */}
        <div className="card-minimal p-6">
          <h3 className="text-lg font-sans font-semibold text-charcoal mb-4">
            Progress
          </h3>

          <div className="space-y-4">
            {/* Progress Bar - Competence */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-stone">Entries</span>
                <span className="text-sm font-mono text-charcoal">{totalDays}/30</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min((totalDays / 30) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Stats Grid - Clean */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="text-center bg-ash/30 rounded-lg p-3 border border-ash">
                <div className="text-2xl font-semibold text-charcoal font-mono">{currentStreak}</div>
                <div className="text-xs text-stone font-sans">Streak</div>
              </div>
              <div className="text-center bg-ash/30 rounded-lg p-3 border border-ash">
                <div className="text-2xl font-semibold text-charcoal font-mono">{totalDays}</div>
                <div className="text-xs text-stone font-sans">Total</div>
              </div>
            </div>

            {/* Muted Encouragement - Only when needed */}
            {totalDays === 0 && (
              <p className="text-xs text-stone text-center mt-3">
                Start today
              </p>
            )}
            {totalDays >= 30 && (
              <p className="text-xs text-stone text-center mt-3">
                30 days complete
              </p>
            )}
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
