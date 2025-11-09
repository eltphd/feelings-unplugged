'use client'

import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import FloatingActionButton from '../components/FloatingActionButton'

export default function WeeklyReviewPage() {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [weeklyData, setWeeklyData] = useState<Record<string, any>>({})
  const [journalData, setJournalData] = useState<any>({})

  // Load data from localStorage
  useEffect(() => {
    const savedWeekly = localStorage.getItem('alteredEarthWeeklyReview')
    const savedJournal = localStorage.getItem('alteredEarthJournal')

    if (savedWeekly) {
      setWeeklyData(JSON.parse(savedWeekly))
    }
    if (savedJournal) {
      setJournalData(JSON.parse(savedJournal))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(weeklyData).length > 0) {
      localStorage.setItem('alteredEarthWeeklyReview', JSON.stringify(weeklyData))
    }
  }, [weeklyData])

  const updateWeeklyEntry = (week: number, field: string, value: string) => {
    setWeeklyData(prev => ({
      ...prev,
      [`week${week}`]: {
        ...prev[`week${week}`],
        [field]: value
      }
    }))
  }

  const getWeekData = (week: number) => weeklyData[`week${week}`] || {}

  // Calculate weekly stats from journal data
  const getWeeklyStats = (week: number) => {
    const startDay = (week - 1) * 7 + 1
    const endDay = Math.min(week * 7, 30)

    let completedDays = 0
    let moodCounts: Record<string, number> = {}

    for (let day = startDay; day <= endDay; day++) {
      const dayData = journalData[`day${day}`]
      if (dayData && Object.keys(dayData).length > 0) {
        completedDays++

        // Count moods
        if (dayData.morningMood) {
          const mood = getMoodLabel(dayData.morningMood)
          moodCounts[mood] = (moodCounts[mood] || 0) + 1
        }
      }
    }

    return { completedDays, totalDays: endDay - startDay + 1, moodCounts }
  }

  const getMoodLabel = (emoji: string) => {
    const moodMap: Record<string, string> = {
      '😊': 'Happy',
      '😐': 'Okay',
      '😢': 'Sad',
      '😡': 'Mad',
      '😰': 'Anxious'
    }
    return moodMap[emoji] || 'Unknown'
  }

  const stats = getWeeklyStats(currentWeek)

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white pb-24">
      {/* Header */}
      <header className="gradient-bg-terracotta text-off-white py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white/80 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-sans text-lg">
            <span>←</span> <span>Back to Home</span>
          </a>
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="text-6xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl">📊</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-bold mb-4 text-white">Weekly Review</h1>
          <p className="text-xl md:text-2xl text-white/90 font-serif mb-4">
            Reflect on your journey & track your progress
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
            <p className="text-white/90 font-sans text-sm">
              ✨ Review your week • Track patterns • Set intentions
            </p>
          </div>
        </div>
      </header>

      {/* Week Selector */}
      <div className="sticky top-0 glass-card border-b-2 border-terracotta/20 z-10 py-4 px-6 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="font-sans font-bold text-forest whitespace-nowrap">Week:</span>
            {Array.from({ length: 4 }, (_, i) => i + 1).map((week) => (
              <button
                key={week}
                onClick={() => setCurrentWeek(week)}
                className={`px-5 py-2 rounded-full font-sans font-bold whitespace-nowrap transition-all ${
                  currentWeek === week
                    ? 'bg-gradient-to-r from-terracotta to-amber text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-terracotta/30 text-terracotta hover:border-terracotta hover-lift'
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Review Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-fade-in">
        {/* Weekly Stats Dashboard */}
        <section className="card-glass p-6 md:p-8 rounded-3xl border-2 border-amber/20">
          <h2 className="text-3xl font-sans font-bold gradient-text mb-6">
            Week {currentWeek} at a Glance
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Completion Rate */}
            <div className="neomorph p-6 text-center">
              <div className="text-5xl font-bold gradient-text font-sans mb-2">
                {stats.completedDays}/{stats.totalDays}
              </div>
              <div className="text-gray-600 font-sans">Days Completed</div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-terracotta to-amber h-full rounded-full transition-all duration-500"
                  style={{ width: `${(stats.completedDays / stats.totalDays) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Most Common Mood */}
            <div className="neomorph p-6 text-center">
              <div className="text-5xl mb-2">
                {Object.keys(stats.moodCounts).length > 0
                  ? Object.entries(stats.moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] === 'Happy' ? '😊' :
                    Object.entries(stats.moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] === 'Sad' ? '😢' :
                    Object.entries(stats.moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] === 'Mad' ? '😡' :
                    Object.entries(stats.moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] === 'Anxious' ? '😰' : '😐'
                  : '—'}
              </div>
              <div className="text-gray-600 font-sans">Most Common Mood</div>
              <div className="text-sm text-gray-500 mt-2 font-sans">
                {Object.keys(stats.moodCounts).length > 0
                  ? Object.entries(stats.moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
                  : 'No data yet'}
              </div>
            </div>

            {/* Total Moods Logged */}
            <div className="neomorph p-6 text-center">
              <div className="text-5xl font-bold gradient-text font-sans mb-2">
                {Object.values(stats.moodCounts).reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-gray-600 font-sans">Moods Logged</div>
            </div>
          </div>

          {/* Mood Breakdown */}
          {Object.keys(stats.moodCounts).length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-sans font-bold text-forest mb-4">Mood Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(stats.moodCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([mood, count]) => (
                    <div key={mood} className="flex items-center gap-4">
                      <span className="text-2xl w-10">
                        {mood === 'Happy' ? '😊' : mood === 'Sad' ? '😢' : mood === 'Mad' ? '😡' : mood === 'Anxious' ? '😰' : '😐'}
                      </span>
                      <span className="font-sans font-bold text-forest w-20">{mood}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            mood === 'Happy' ? 'bg-gradient-to-r from-amber to-yellow-400' :
                            mood === 'Sad' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                            mood === 'Mad' ? 'bg-gradient-to-r from-red-400 to-terracotta' :
                            mood === 'Anxious' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                            'bg-gradient-to-r from-sage to-green-400'
                          }`}
                          style={{ width: `${(count / Object.values(stats.moodCounts).reduce((a, b) => a + b, 0)) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-sans font-bold text-gray-600 w-12 text-right">{count}x</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>

        {/* Reflective Prompts */}
        <WeeklyReflection
          week={currentWeek}
          data={getWeekData(currentWeek)}
          onUpdate={(field, value) => updateWeeklyEntry(currentWeek, field, value)}
        />

        {/* Pattern Recognition */}
        <section className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-sage/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-sage to-forest p-3 rounded-2xl text-3xl">🔍</div>
            <h3 className="text-3xl font-sans font-bold text-forest">Pattern Recognition</h3>
          </div>
          <div className="space-y-6">
            <PromptField
              label="What patterns did you notice this week?"
              placeholder="Did certain times of day feel harder? Did specific activities help or hurt? What emotions kept showing up?"
              value={getWeekData(currentWeek).patterns || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'patterns', value)}
            />
            <PromptField
              label="What triggered difficult emotions this week?"
              placeholder="People, places, situations, thoughts..."
              value={getWeekData(currentWeek).triggers || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'triggers', value)}
            />
            <PromptField
              label="What helped you feel better this week?"
              placeholder="Activities, people, music, journaling, rest..."
              value={getWeekData(currentWeek).helpers || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'helpers', value)}
            />
          </div>
        </section>

        {/* Celebrations */}
        <section className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-amber/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-amber to-terracotta p-3 rounded-2xl text-3xl">✨</div>
            <h3 className="text-3xl font-sans font-bold text-forest">Celebrate Wins</h3>
          </div>
          <div className="space-y-6">
            <PromptField
              label="What are you proud of this week (even small things)?"
              placeholder="You showed up, you survived, you tried something new, you asked for help..."
              value={getWeekData(currentWeek).wins || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'wins', value)}
            />
            <PromptField
              label="What surprised you this week?"
              placeholder="A strength you didn't know you had, something that felt easier than expected..."
              value={getWeekData(currentWeek).surprises || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'surprises', value)}
            />
          </div>
        </section>

        {/* Looking Forward */}
        <section className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-forest/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-forest to-sage p-3 rounded-2xl text-3xl">🌱</div>
            <h3 className="text-3xl font-sans font-bold text-forest">Next Week Intentions</h3>
          </div>
          <div className="space-y-6">
            <PromptField
              label="What do you want to try next week?"
              placeholder="A new coping skill, reaching out to someone, saying no to something..."
              value={getWeekData(currentWeek).intentions || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'intentions', value)}
            />
            <PromptField
              label="What support do you need?"
              placeholder="From yourself, from others, from your environment..."
              value={getWeekData(currentWeek).support || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'support', value)}
            />
            <PromptField
              label="One kind thing to tell yourself this week:"
              placeholder="A reminder, an affirmation, permission to rest..."
              value={getWeekData(currentWeek).kindness || ''}
              onChange={(value) => updateWeeklyEntry(currentWeek, 'kindness', value)}
            />
          </div>
        </section>

        {/* Privacy Notice */}
        <div className="glass-card rounded-3xl p-6 text-center border-2 border-sage/30">
          <p className="text-lg font-sans text-forest">
            <span className="text-2xl">🔒</span> Your weekly reviews are saved privately in your browser. No one else can see them.
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

function WeeklyReflection({
  week,
  data,
  onUpdate
}: {
  week: number
  data: any
  onUpdate: (field: string, value: string) => void
}) {
  const phases = [
    {
      phase: 'Looking Back',
      emoji: '🔙',
      prompts: [
        { key: 'bigFeelings', label: 'What were the biggest feelings this week?', placeholder: 'Happy, sad, overwhelmed, proud, scared...' },
        { key: 'hardestMoment', label: 'What was the hardest moment?', placeholder: 'Describe what happened and how it felt...' },
        { key: 'bestMoment', label: 'What was the best moment?', placeholder: 'Describe what happened and how it felt...' },
      ]
    },
    {
      phase: 'Being Present',
      emoji: '🎯',
      prompts: [
        { key: 'howFeelNow', label: 'How do you feel RIGHT NOW reflecting on this week?', placeholder: 'Relieved, tired, hopeful, numb...' },
        { key: 'bodyFeels', label: 'How does your body feel?', placeholder: 'Tense, relaxed, heavy, energized...' },
        { key: 'needRightNow', label: 'What do you need right now?', placeholder: 'Rest, movement, connection, quiet...' },
      ]
    },
    {
      phase: 'Growth Moments',
      emoji: '🌟',
      prompts: [
        { key: 'learned', label: 'What did you learn about yourself?', placeholder: 'Your limits, your strengths, your triggers...' },
        { key: 'coped', label: 'How did you cope with hard things?', placeholder: 'What strategies worked? What didn\'t?' },
        { key: 'growing', label: 'Where do you see yourself growing?', placeholder: 'Even tiny shifts count...' },
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {phases.map((phase, index) => (
        <section key={index} className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-terracotta/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-terracotta to-amber p-3 rounded-2xl text-3xl">{phase.emoji}</div>
            <h3 className="text-3xl font-sans font-bold text-forest">{phase.phase}</h3>
          </div>
          <div className="space-y-6">
            {phase.prompts.map((prompt) => (
              <PromptField
                key={prompt.key}
                label={prompt.label}
                placeholder={prompt.placeholder}
                value={data[prompt.key] || ''}
                onChange={(value) => onUpdate(prompt.key, value)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function PromptField({
  label,
  placeholder,
  value,
  onChange
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block font-sans font-bold text-terracotta mb-3 text-lg">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/20 font-serif text-lg transition-all"
        rows={4}
        placeholder={placeholder}
      />
    </div>
  )
}
