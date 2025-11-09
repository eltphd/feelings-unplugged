'use client'

import BottomNav from '../components/BottomNav'
import FloatingActionButton from '../components/FloatingActionButton'

export default function ArticlesPage() {
  const articles = [
    {
      id: 'your-brain-is-changing',
      title: 'Your Brain Is Changing (And That\'s Cool)',
      emoji: '🧠',
      description: 'Learn why feelings feel so BIG right now',
      pages: 6,
      color: 'forest'
    },
    {
      id: 'meet-the-academy',
      title: 'Meet the Academy: Which One Are You?',
      emoji: '⚡',
      description: 'Discover the 5 archetypes + take the quiz',
      pages: 8,
      color: 'terracotta'
    },
    {
      id: 'shadow-work',
      title: 'Shadow Work for Beginners',
      emoji: '🌑',
      description: 'Your shadow isn\'t your enemy',
      pages: 6,
      color: 'amber'
    },
    {
      id: 'playlist-as-medicine',
      title: 'Playlist as Medicine',
      emoji: '🎵',
      description: 'How music changes your mood',
      pages: 6,
      color: 'sage'
    },
    {
      id: 'when-journaling-isnt-enough',
      title: 'When Journaling Isn\'t Enough',
      emoji: '🆘',
      description: 'When to ask for help',
      pages: 4,
      color: 'terracotta'
    },
    {
      id: 'glossary-of-feelings',
      title: 'Glossary of Feelings',
      emoji: '💭',
      description: 'Name it to tame it',
      pages: 4,
      color: 'amber'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white pb-24">
      {/* Header */}
      <header className="gradient-bg-sage text-off-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white/80 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-sans text-lg">
            <span>←</span> <span>Back to Home</span>
          </a>
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="text-6xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl">📚</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold mb-4 text-white">Magazine Articles</h1>
          <p className="text-2xl md:text-3xl text-white/90 font-serif">
            Evidence-based content written for you
          </p>
          <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
            <p className="text-white/90 font-sans text-sm">
              ✨ 4th grade reading level • Easy to understand
            </p>
          </div>
        </div>
      </header>

      {/* Articles Grid */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="card hover-lift bg-gradient-to-br from-white to-sage/10 border-2 border-sage/30">
          <p className="text-2xl font-sans font-bold text-forest mb-4">
            Remember:
          </p>
          <p className="text-xl text-gray-800 font-serif leading-relaxed">
            These articles are here to help you understand what's happening in your brain and your emotions.
            You don't have to read them in order. Start with what calls to you.
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

function ArticleCard({
  id,
  title,
  emoji,
  description,
  pages,
  color
}: {
  id: string
  title: string
  emoji: string
  description: string
  pages: number
  color: string
}) {
  const getGradient = () => {
    switch (color) {
      case 'forest': return 'from-forest to-sage'
      case 'terracotta': return 'from-terracotta to-amber'
      case 'amber': return 'from-amber to-terracotta'
      case 'sage': return 'from-sage to-forest'
      default: return 'from-forest to-sage'
    }
  }

  return (
    <a
      href={`/articles/${id}`}
      className="group block bg-white rounded-3xl p-8 soft-shadow hover-lift transition-all duration-300 border-2 border-gray-100"
    >
      <div className="flex items-start gap-6">
        <div className={`bg-gradient-to-br ${getGradient()} p-4 rounded-2xl text-5xl transform group-hover:scale-110 transition-transform duration-300`}>
          {emoji}
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-sans font-bold mb-3 text-forest group-hover:gradient-text transition-all">{title}</h3>
          <p className="text-xl text-gray-700 mb-4 font-serif leading-relaxed">{description}</p>
          <div className="flex items-center gap-4 text-sm font-sans text-gray-600">
            <span className="px-3 py-1 bg-cream rounded-full">{pages} pages</span>
            <span>•</span>
            <span>~{pages * 2} min read</span>
          </div>
          <div className={`mt-6 inline-flex items-center gap-2 font-sans font-bold bg-gradient-to-r ${getGradient()} text-white px-6 py-3 rounded-full group-hover:shadow-lg transition-all`}>
            <span>Read Article</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </a>
  )
}
