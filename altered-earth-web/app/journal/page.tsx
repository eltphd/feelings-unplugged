'use client'

import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import FloatingActionButton from '../components/FloatingActionButton'

export default function JournalPage() {
  const [currentDay, setCurrentDay] = useState(1)
  const [entries, setEntries] = useState<Record<string, any>>({})

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('alteredEarthJournal')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever entries change
  useEffect(() => {
    if (Object.keys(entries).length > 0) {
      localStorage.setItem('alteredEarthJournal', JSON.stringify(entries))
    }
  }, [entries])

  const updateEntry = (day: number, section: string, value: string) => {
    setEntries(prev => ({
      ...prev,
      [`day${day}`]: {
        ...prev[`day${day}`],
        [section]: value
      }
    }))
  }

  const getDayEntry = (day: number) => entries[`day${day}`] || {}

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white pb-24">
      {/* Header */}
      <header className="gradient-bg-terracotta text-off-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white/80 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-sans text-lg">
            <span>←</span> <span>Back to Home</span>
          </a>
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="text-6xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl">✍️</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold mb-4 text-white">Daily Journal</h1>
          <p className="text-2xl md:text-3xl text-white/90 font-serif">
            30 days of guided prompts
          </p>
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <p className="text-white/90 font-sans text-sm">
                ✨ Auto-saves to your browser • Privacy-first
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="print:hidden inline-flex items-center gap-2 bg-white text-terracotta font-sans font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-all hover-lift"
            >
              <span>📄</span>
              <span>Print/Save PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Day Selector */}
      <div className="sticky top-0 glass-card border-b-2 border-terracotta/20 z-10 py-6 px-6 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="font-sans font-bold text-forest whitespace-nowrap text-lg">Select Day:</span>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`px-5 py-2.5 rounded-full font-sans font-bold whitespace-nowrap transition-all ${
                  currentDay === day
                    ? 'bg-gradient-to-r from-terracotta to-amber text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-terracotta/30 text-terracotta hover:border-terracotta hover-lift'
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Journal Entry */}
      <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
        <JournalEntry
          day={currentDay}
          entry={getDayEntry(currentDay)}
          onUpdate={(section, value) => updateEntry(currentDay, section, value)}
        />
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

function JournalEntry({
  day,
  entry,
  onUpdate
}: {
  day: number
  entry: any
  onUpdate: (section: string, value: string) => void
}) {
  const morningPrompts = [
    { key: 'morningMood', label: 'How do I feel right now?', type: 'emoji', options: ['😊', '😐', '😢', '😡', '😰'] },
    { key: 'bodyFeeling', label: 'In my body, I feel:', type: 'text' },
  ]

  const middayPrompts = [
    { key: 'currentFeeling', label: 'Right now, I feel:', type: 'text', wordBank: ['happy', 'sad', 'mad', 'scared', 'confused', 'excited', 'tired', 'numb'] },
    { key: 'whatBothered', label: 'Something that bothered me today:', type: 'text' },
    { key: 'itMadeMeFeel', label: 'It made me feel:', type: 'text' },
  ]

  const eveningPrompts = [
    { key: 'rose', label: '🌹 Rose (something good):', type: 'text' },
    { key: 'thorn', label: '🌵 Thorn (something hard):', type: 'text' },
    { key: 'bud', label: '🌱 Bud (something to look forward to):', type: 'text' },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-4xl md:text-5xl font-sans font-bold gradient-text mb-2">Day {day}</h2>

      {/* Morning Ritual */}
      <section className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-amber/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-amber to-terracotta p-3 rounded-2xl text-3xl">🌅</div>
          <h3 className="text-3xl font-sans font-bold text-forest">Morning Ritual</h3>
        </div>
        <div className="space-y-6">
          {morningPrompts.map((prompt) => (
            <div key={prompt.key}>
              <label className="block font-sans font-bold text-terracotta mb-3 text-lg">
                {prompt.label}
              </label>
              {prompt.type === 'emoji' && prompt.options ? (
                <div className="flex gap-3">
                  {prompt.options.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => onUpdate(prompt.key, emoji)}
                      className={`text-5xl p-4 rounded-2xl border-2 transition-all ${
                        entry[prompt.key] === emoji
                          ? 'border-terracotta bg-gradient-to-br from-terracotta/20 to-amber/20 scale-110 shadow-lg'
                          : 'border-gray-200 hover:border-terracotta hover:scale-105 bg-white'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  value={entry[prompt.key] || ''}
                  onChange={(e) => onUpdate(prompt.key, e.target.value)}
                  className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/20 font-serif text-lg transition-all"
                  rows={3}
                  placeholder="Write here..."
                />
              )}
              {(prompt as any).wordBank && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Word bank:</span>
                  {((prompt as any).wordBank as string[]).map((word: string) => (
                    <button
                      key={word}
                      onClick={() => onUpdate(prompt.key, entry[prompt.key] ? entry[prompt.key] + ', ' + word : word)}
                      className="text-sm px-2 py-1 bg-cream border border-terracotta rounded hover:bg-terracotta/20"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Midday Check-In */}
      <section className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-sage/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-sage to-forest p-3 rounded-2xl text-3xl">☀️</div>
          <h3 className="text-3xl font-sans font-bold text-forest">Midday Check-In</h3>
        </div>
        <div className="space-y-6">
          {middayPrompts.map((prompt) => (
            <div key={prompt.key}>
              <label className="block font-sans font-bold text-forest mb-3 text-lg">
                {prompt.label}
              </label>
              <textarea
                value={entry[prompt.key] || ''}
                onChange={(e) => onUpdate(prompt.key, e.target.value)}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-sage focus:ring-4 focus:ring-sage/20 font-serif text-lg transition-all"
                rows={3}
                placeholder="Write here..."
              />
              {(prompt as any).wordBank && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-sm font-sans text-gray-600">Word bank:</span>
                  {((prompt as any).wordBank as string[]).map((word: string) => (
                    <button
                      key={word}
                      onClick={() => onUpdate(prompt.key, entry[prompt.key] ? entry[prompt.key] + ', ' + word : word)}
                      className="text-sm font-sans px-3 py-1.5 bg-sage/10 border border-sage/30 rounded-full hover:bg-sage/20 hover:border-sage transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Evening Reflection */}
      <section className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-forest/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-forest to-sage p-3 rounded-2xl text-3xl">🌙</div>
          <h3 className="text-3xl font-sans font-bold text-forest">Evening Reflection</h3>
        </div>
        <div className="space-y-6">
          {eveningPrompts.map((prompt) => (
            <div key={prompt.key}>
              <label className="block font-sans font-bold text-forest mb-3 text-lg">
                {prompt.label}
              </label>
              <textarea
                value={entry[prompt.key] || ''}
                onChange={(e) => onUpdate(prompt.key, e.target.value)}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-forest focus:ring-4 focus:ring-forest/20 font-serif text-lg transition-all"
                rows={3}
                placeholder="Write here..."
              />
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Notice */}
      <div className="glass-card rounded-3xl p-6 text-center border-2 border-sage/30">
        <p className="text-lg font-sans text-forest">
          <span className="text-2xl">🔒</span> Your journal entries are saved privately in your browser. No one else can see them.
        </p>
      </div>
    </div>
  )
}
