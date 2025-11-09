'use client'

import { useState } from 'react'

export default function MeetTheAcademy() {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const archetypes = [
    {
      id: 'catalyst',
      name: 'The Catalyst',
      emoji: '⚡',
      tagline: 'Change-Maker',
      color: 'terracotta',
      description: 'You see things that need to change. You speak up when others stay quiet.',
      strengths: [
        "You're brave",
        "You tell the truth",
        "You stand up for what's right",
        "You make things happen"
      ],
      shadow: [
        "You get SO mad when things don't change fast enough",
        "You might burn out trying to fix everything",
        "You can feel alone when no one else speaks up"
      ],
      reminder: "You can't change everything. But you can change something. That matters."
    },
    {
      id: 'luminary',
      name: 'The Luminary',
      emoji: '☀️',
      tagline: 'Creative Light',
      color: 'amber',
      description: 'You love to create and share your ideas. You have big dreams and big feelings.',
      strengths: [
        "You're creative",
        "You inspire others",
        "You see beauty everywhere",
        "You express yourself freely"
      ],
      shadow: [
        "You worry you're 'too much'",
        "You pretend to be fine when you're not",
        "You feel like you have to perform happiness"
      ],
      reminder: "You don't have to shine all the time. You're allowed to rest in the dark."
    },
    {
      id: 'guardian',
      name: 'The Guardian',
      emoji: '🛡️',
      tagline: 'Protector',
      color: 'forest',
      description: 'You take care of people. You\'re the friend everyone comes to for help.',
      strengths: [
        "You're dependable",
        "You listen deeply",
        "You make people feel safe",
        "You remember what matters"
      ],
      shadow: [
        "You take care of everyone else but forget yourself",
        "You say 'I'm fine' when you're not",
        "You feel guilty when you need help"
      ],
      reminder: "You can't pour from an empty cup. Taking care of yourself isn't selfish."
    },
    {
      id: 'maverick',
      name: 'The Maverick',
      emoji: '→',
      tagline: 'Free Spirit',
      color: 'sage',
      description: 'You like to do things your own way. You don\'t follow the crowd.',
      strengths: [
        "You're independent",
        "You think differently",
        "You're not afraid to be alone",
        "You trust yourself"
      ],
      shadow: [
        "You push people away when you need them",
        "You think asking for help means you're weak",
        "You feel lonely but won't admit it"
      ],
      reminder: "Independence isn't the same as isolation. You can be strong AND connected."
    },
    {
      id: 'weaver',
      name: 'The Weaver',
      emoji: '○○',
      tagline: 'Connector',
      color: 'cream',
      description: 'You make friends easily. You help people get along. You hate when people fight.',
      strengths: [
        "You see all sides",
        "You bring people together",
        "You're empathetic",
        "You make peace"
      ],
      shadow: [
        "You lose yourself trying to make everyone happy",
        "You avoid conflict even when it's needed",
        "You don't know what YOU want"
      ],
      reminder: "You can't hold everyone together. Sometimes people need to fall apart to grow."
    }
  ]

  const quizQuestions = [
    {
      question: "When your friend is sad, you:",
      options: [
        { text: "Give them advice on how to fix it", archetype: 'catalyst' },
        { text: "Make them laugh or create something for them", archetype: 'luminary' },
        { text: "Just listen and hold space", archetype: 'guardian' },
        { text: "Give them space to figure it out", archetype: 'maverick' },
        { text: "Help them talk to whoever hurt them", archetype: 'weaver' }
      ]
    },
    {
      question: "When something feels unfair, you:",
      options: [
        { text: "Speak up immediately", archetype: 'catalyst' },
        { text: "Create something about it (art, music, writing)", archetype: 'luminary' },
        { text: "Help the person who was hurt", archetype: 'guardian' },
        { text: "Walk away from the situation", archetype: 'maverick' },
        { text: "Try to get everyone to understand each other", archetype: 'weaver' }
      ]
    },
    {
      question: "Your biggest fear is:",
      options: [
        { text: "Nothing changing", archetype: 'catalyst' },
        { text: "Being forgotten or not mattering", archetype: 'luminary' },
        { text: "Letting people down", archetype: 'guardian' },
        { text: "Being trapped or controlled", archetype: 'maverick' },
        { text: "People fighting or being alone", archetype: 'weaver' }
      ]
    }
  ]

  const calculateResults = () => {
    const scores: Record<string, number> = {}
    Object.values(quizAnswers).forEach(answer => {
      scores[answer] = (scores[answer] || 0) + 1
    })
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    return sorted.length > 0 ? sorted[0][0] : 'catalyst'
  }

  return (
    <div className="min-h-screen bg-off-white">
      <header className="bg-forest text-off-white py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <a href="/articles" className="text-sage hover:text-amber transition-colors mb-4 inline-block">
            ← Back to Articles
          </a>
          <h1 className="text-4xl md:text-5xl font-bold">Meet the Academy</h1>
          <p className="text-xl text-sage mt-2">Which One Are You?</p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        <section>
          <p className="text-xl leading-relaxed">
            Everyone has a way they show up in the world.
          </p>
          <p className="text-xl leading-relaxed">
            These are the 5 Academy Archetypes.
          </p>
          <p className="text-xl leading-relaxed">
            You might be one. You might be a mix. There's no right answer.
          </p>
          <p className="text-xl font-bold text-terracotta">
            This is just a way to understand yourself better.
          </p>
        </section>

        {/* Archetypes */}
        {archetypes.map((archetype) => (
          <ArchetypeCard key={archetype.id} {...archetype} />
        ))}

        {/* Quiz */}
        <section className="bg-amber/20 border-4 border-amber rounded-lg p-8">
          <h2 className="text-3xl font-bold text-forest mb-6">Which One Are You? Take the Quiz</h2>

          {!showResults ? (
            <div className="space-y-8">
              {quizQuestions.map((q, idx) => (
                <div key={idx}>
                  <p className="text-lg font-bold mb-4">{idx + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, optIdx) => (
                      <label key={optIdx} className="flex items-start gap-3 cursor-pointer hover:bg-white/50 p-3 rounded">
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          value={option.archetype}
                          checked={quizAnswers[idx] === option.archetype}
                          onChange={(e) => setQuizAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                          className="mt-1"
                        />
                        <span>{String.fromCharCode(97 + optIdx)}) {option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {Object.keys(quizAnswers).length === quizQuestions.length && (
                <button
                  onClick={() => setShowResults(true)}
                  className="w-full bg-terracotta text-white font-bold py-4 rounded-lg hover:bg-terracotta/90 transition-all text-lg"
                >
                  See My Results
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">You are mostly:</p>
              <p className="text-4xl mb-4">
                {archetypes.find(a => a.id === calculateResults())?.emoji}
              </p>
              <p className="text-3xl font-bold text-forest mb-4">
                {archetypes.find(a => a.id === calculateResults())?.name}
              </p>
              <p className="text-xl mb-6">
                {archetypes.find(a => a.id === calculateResults())?.description}
              </p>
              <button
                onClick={() => { setQuizAnswers({}); setShowResults(false); }}
                className="bg-sage text-white font-bold py-3 px-6 rounded-lg hover:bg-sage/90"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </section>

        <section className="bg-cream border-4 border-sage rounded-lg p-6">
          <p className="text-lg font-bold mb-2">Remember:</p>
          <p className="text-lg">
            You might be MORE than one! That's totally okay. This isn't a box to fit into.
            It's a mirror to see yourself more clearly.
          </p>
        </section>

        <nav className="flex justify-between items-center pt-8 border-t-2 border-sage">
          <a href="/articles/your-brain-is-changing" className="text-forest hover:text-terracotta font-bold">
            ← Previous: Your Brain
          </a>
          <a href="/articles/shadow-work" className="text-forest hover:text-terracotta font-bold">
            Next: Shadow Work →
          </a>
        </nav>
      </article>
    </div>
  )
}

function ArchetypeCard({ name, emoji, tagline, color, description, strengths, shadow, reminder }: any) {
  const getBgColor = () => {
    switch (color) {
      case 'terracotta': return 'bg-terracotta/10'
      case 'amber': return 'bg-amber/10'
      case 'forest': return 'bg-forest/10'
      case 'sage': return 'bg-sage/10'
      default: return 'bg-cream'
    }
  }

  const getBorderColor = () => {
    switch (color) {
      case 'terracotta': return 'border-terracotta'
      case 'amber': return 'border-amber'
      case 'forest': return 'border-forest'
      case 'sage': return 'border-sage'
      default: return 'border-forest'
    }
  }

  return (
    <section className={`${getBgColor()} border-4 ${getBorderColor()} rounded-lg p-6`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="text-6xl">{emoji}</div>
        <div>
          <h2 className="text-3xl font-bold text-forest">{name}</h2>
          <p className="text-xl italic text-gray-700">{tagline}</p>
        </div>
      </div>

      <p className="text-lg mb-4">{description}</p>

      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">Your Strengths:</h3>
        <ul className="space-y-1">
          {strengths.map((s: string, i: number) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">Your Shadow:</h3>
        <ul className="space-y-1">
          {shadow.map((s: string, i: number) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white/50 p-4 rounded-lg">
        <p className="font-bold text-forest">Your Reminder:</p>
        <p className="italic">{reminder}</p>
      </div>
    </section>
  )
}
