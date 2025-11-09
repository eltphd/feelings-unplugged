'use client'

import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import FloatingActionButton from '../components/FloatingActionButton'

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Record<string, string[]>>({
    mad: Array(10).fill(''),
    sad: Array(10).fill(''),
    happy: Array(10).fill(''),
    calm: Array(10).fill(''),
    hyped: Array(10).fill('')
  })

  // Load playlists from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('alteredEarthPlaylists')
    if (saved) {
      setPlaylists(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever playlists change
  useEffect(() => {
    localStorage.setItem('alteredEarthPlaylists', JSON.stringify(playlists))
  }, [playlists])

  const updateSong = (playlistKey: string, index: number, value: string) => {
    setPlaylists(prev => ({
      ...prev,
      [playlistKey]: prev[playlistKey].map((song, i) => i === index ? value : song)
    }))
  }

  const handlePrint = () => {
    window.print()
  }

  const playlistConfigs = [
    {
      key: 'mad',
      title: 'Mad Playlist',
      emoji: '⚡',
      subtitle: 'When you\'re angry and need to let it out',
      color: 'terracotta',
      description: 'Songs with loud guitars, heavy drums, or intense energy. Match your anger, don\'t fight it.',
      examples: 'Rock, punk, rap with heavy beats'
    },
    {
      key: 'sad',
      title: 'Sad Playlist',
      emoji: '💧',
      subtitle: 'When you need to cry or feel your feelings',
      color: 'sage',
      description: 'Slow, soft songs with lyrics that say what you feel. It\'s okay to cry.',
      examples: 'Ballads, slow R&B, acoustic songs'
    },
    {
      key: 'happy',
      title: 'Happy Playlist',
      emoji: '☀️',
      subtitle: 'When you want to celebrate or feel good',
      color: 'amber',
      description: 'Upbeat songs that make you want to dance and smile.',
      examples: 'Pop, funk, dancehall, happy indie'
    },
    {
      key: 'calm',
      title: 'Calm Playlist',
      emoji: '🌙',
      subtitle: 'When you need to breathe and slow down',
      color: 'forest',
      description: 'Gentle, quiet songs that feel like a warm blanket.',
      examples: 'Lo-fi, classical, nature sounds, soft jazz'
    },
    {
      key: 'hyped',
      title: 'Hyped Playlist',
      emoji: '🔥',
      subtitle: 'When you need energy or confidence',
      color: 'terracotta',
      description: 'Strong beats that make you feel like a superhero.',
      examples: 'Hip-hop, EDM, hype rap, workout music'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white pb-24">
      {/* Header */}
      <header className="gradient-bg-terracotta text-off-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white/80 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-sans text-lg">
            <span>←</span> <span>Back to Home</span>
          </a>
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="text-6xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl">🎵</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold mb-4 text-white">Playlist as Medicine</h1>
          <p className="text-2xl md:text-3xl text-white/90 font-serif">
            Build emotional playlists
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

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-6 py-12 -mt-12 relative z-20">
        <div className="card hover-lift bg-gradient-to-br from-white to-amber/10 border-2 border-amber/30">
          <h2 className="text-3xl md:text-4xl font-sans font-bold gradient-text mb-4">How Music Changes Your Mood</h2>
          <p className="text-xl mb-4 leading-relaxed font-serif">
            Music isn't magic. It's your brain. When you listen to music, your brain releases chemicals that change how you feel.
          </p>
          <p className="text-2xl font-bold text-terracotta font-sans">
            Think of playlists like a first-aid kit—but for your feelings.
          </p>
        </div>
      </section>

      {/* Playlists */}
      <section className="max-w-4xl mx-auto px-6 pb-12 space-y-8">
        {playlistConfigs.map((config) => (
          <PlaylistBuilder
            key={config.key}
            {...config}
            songs={playlists[config.key]}
            onUpdateSong={(index, value) => updateSong(config.key, index, value)}
          />
        ))}
      </section>

      {/* How to Use */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="card hover-lift bg-gradient-to-br from-white to-sage/10 border-2 border-sage/30">
          <h2 className="text-3xl font-sans font-bold text-forest mb-6">How to Use Your Playlists</h2>
          <ol className="space-y-4 text-xl font-serif">
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-sage">1.</span>
              <span><strong className="font-sans">Name your emotion</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-sage">2.</span>
              <span><strong className="font-sans">Pick the matching playlist</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-sage">3.</span>
              <span><strong className="font-sans">Let the music do its work</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-sage">4.</span>
              <span><strong className="font-sans">Notice how you feel after</strong></span>
            </li>
          </ol>
          <div className="mt-8 p-4 bg-sage/20 rounded-2xl border-2 border-sage/30">
            <p className="text-xl font-sans font-bold text-forest text-center">
              Remember: Music isn't a cure—it's a tool.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

function PlaylistBuilder({
  title,
  emoji,
  subtitle,
  color,
  description,
  examples,
  songs,
  onUpdateSong
}: {
  title: string
  emoji: string
  subtitle: string
  color: string
  description: string
  examples: string
  songs: string[]
  onUpdateSong: (index: number, value: string) => void
}) {
  const getBgColor = () => {
    switch (color) {
      case 'terracotta': return 'bg-terracotta/10'
      case 'sage': return 'bg-sage/10'
      case 'amber': return 'bg-amber/10'
      case 'forest': return 'bg-forest/10'
      default: return 'bg-cream'
    }
  }

  const getBorderColor = () => {
    switch (color) {
      case 'terracotta': return 'border-terracotta'
      case 'sage': return 'border-sage'
      case 'amber': return 'border-amber'
      case 'forest': return 'border-forest'
      default: return 'border-forest'
    }
  }

  const getGradient = () => {
    switch (color) {
      case 'terracotta': return 'from-terracotta to-amber'
      case 'sage': return 'from-sage to-forest'
      case 'amber': return 'from-amber to-terracotta'
      case 'forest': return 'from-forest to-sage'
      default: return 'from-forest to-sage'
    }
  }

  return (
    <div className="bg-white rounded-3xl p-8 soft-shadow hover-lift border-2 border-gray-100">
      <div className="flex items-start gap-4 mb-6">
        <div className={`bg-gradient-to-br ${getGradient()} p-4 rounded-2xl text-5xl`}>{emoji}</div>
        <div className="flex-1">
          <h3 className="text-3xl font-sans font-bold text-forest mb-2">{title}</h3>
          <p className="text-xl text-gray-700 font-serif italic mb-3">{subtitle}</p>
          <p className="text-gray-600 mb-2 font-serif">{description}</p>
          <p className="text-sm text-gray-500 font-sans">
            <span className="font-bold">Example vibes:</span> {examples}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {songs.map((song, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-lg font-sans font-bold text-forest w-8">{index + 1}.</span>
            <input
              type="text"
              value={song}
              onChange={(e) => onUpdateSong(index, e.target.value)}
              placeholder={`Song ${index + 1}: Artist - Song Name`}
              className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-forest focus:ring-4 focus:ring-forest/20 font-serif transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
