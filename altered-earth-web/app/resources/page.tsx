'use client'

import BottomNav from '../components/BottomNav'
import FloatingActionButton from '../components/FloatingActionButton'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white pb-24">
      {/* Header */}
      <header className="gradient-bg-sage text-off-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white/80 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-sans text-lg">
            <span>←</span> <span>Back to Home</span>
          </a>
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="text-6xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl">🆘</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold mb-4 text-white">Crisis Resources</h1>
          <p className="text-2xl md:text-3xl text-white/90 font-serif">
            You deserve help. You deserve to be here.
          </p>
        </div>
      </header>

      {/* When Journaling Isn't Enough */}
      <section className="max-w-4xl mx-auto px-6 py-12 -mt-12 relative z-20">
        <div className="card hover-lift bg-gradient-to-br from-white to-terracotta/10 border-2 border-terracotta/30 mb-8">
          <h2 className="text-3xl md:text-4xl font-sans font-bold gradient-text mb-4">When Journaling Isn't Enough</h2>
          <p className="text-xl mb-4 font-serif leading-relaxed">
            This journal can help you understand your feelings.
          </p>
          <p className="text-xl mb-6 font-serif leading-relaxed">
            But if you're feeling really, really bad, talk to an adult you trust.
          </p>
          <div className="bg-terracotta/20 rounded-2xl p-4 border-2 border-terracotta/30">
            <p className="text-2xl font-sans font-bold text-terracotta text-center">
              Journaling is a tool, not a cure.
            </p>
          </div>
        </div>

        {/* Warning Signs */}
        <div className="bg-white border-4 border-red-400 rounded-3xl p-8 soft-shadow mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-red-400 to-red-500 p-3 rounded-2xl text-3xl">⚠️</div>
            <h2 className="text-3xl font-sans font-bold text-red-800">Warning Signs (When to Ask for Help)</h2>
          </div>
          <div className="space-y-4 text-lg font-serif">
            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-red-50 rounded-xl transition-colors">
              <input type="checkbox" className="mt-1 w-6 h-6 rounded border-2 border-red-400 focus:ring-2 focus:ring-red-400" />
              <span>I think about hurting myself</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-red-50 rounded-xl transition-colors">
              <input type="checkbox" className="mt-1 w-6 h-6 rounded border-2 border-red-400 focus:ring-2 focus:ring-red-400" />
              <span>I don't want to be alive anymore</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-red-50 rounded-xl transition-colors">
              <input type="checkbox" className="mt-1 w-6 h-6 rounded border-2 border-red-400 focus:ring-2 focus:ring-red-400" />
              <span>I feel sad or scared every day</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-red-50 rounded-xl transition-colors">
              <input type="checkbox" className="mt-1 w-6 h-6 rounded border-2 border-red-400 focus:ring-2 focus:ring-red-400" />
              <span>I can't eat or sleep</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-red-50 rounded-xl transition-colors">
              <input type="checkbox" className="mt-1 w-6 h-6 rounded border-2 border-red-400 focus:ring-2 focus:ring-red-400" />
              <span>I can't focus on anything</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-red-50 rounded-xl transition-colors">
              <input type="checkbox" className="mt-1 w-6 h-6 rounded border-2 border-red-400 focus:ring-2 focus:ring-red-400" />
              <span>I feel numb all the time</span>
            </label>
          </div>
          <div className="mt-6 bg-red-100 rounded-2xl p-4 border-2 border-red-400">
            <p className="text-xl font-sans font-bold text-red-800 text-center">
              If you checked ANY of these: Please talk to someone you trust.
            </p>
          </div>
        </div>

        {/* Crisis Hotlines */}
        <h2 className="text-4xl font-sans font-bold text-forest mb-8">24/7 Crisis Hotlines</h2>
        <div className="grid gap-6 mb-12">
          <CrisisCard
            icon="🆘"
            name="988 Suicide & Crisis Lifeline"
            contact="Call or text: 988"
            description="Available 24/7 for anyone in crisis"
            color="terracotta"
          />
          <CrisisCard
            icon="🏳️‍🌈"
            name="Trevor Project"
            contact="Call: 1-866-488-7386 | Text 'START' to 678-678"
            description="For LGBTQ+ youth in crisis"
            color="sage"
          />
          <CrisisCard
            icon="🖤"
            name="BlackLine"
            contact="Call or text: 1-800-604-5841"
            description="For Black & BIPOC youth experiencing crisis"
            color="amber"
          />
          <CrisisCard
            icon="💬"
            name="Crisis Text Line"
            contact="Text 'HELLO' to 741741"
            description="Free 24/7 support via text message"
            color="forest"
          />
        </div>

        {/* What Therapy Actually Is */}
        <div className="card hover-lift bg-gradient-to-br from-white to-sage/10 border-2 border-sage/30 mb-12">
          <h2 className="text-3xl font-sans font-bold text-forest mb-6">What Therapy Actually Is</h2>
          <p className="text-xl mb-4 font-serif leading-relaxed">
            Therapy is like having a feelings coach.
          </p>
          <p className="text-xl mb-6 font-serif leading-relaxed">They help you:</p>
          <ul className="space-y-3 text-xl font-serif mb-6">
            <li className="flex items-start gap-3">
              <span className="text-sage">→</span>
              <span>Understand your brain</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage">→</span>
              <span>Work through hard stuff</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage">→</span>
              <span>Learn tools that actually work</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage">→</span>
              <span>Feel less alone</span>
            </li>
          </ul>
          <div className="bg-sage/20 rounded-2xl p-4 border-2 border-sage/30">
            <p className="text-xl font-sans font-bold text-forest text-center">
              Therapy isn't for "crazy people." It's for people who want help. That's strength, not weakness.
            </p>
          </div>
        </div>

        {/* Mental Health Apps */}
        <h2 className="text-4xl font-sans font-bold text-forest mb-8">Mental Health Apps for Teens</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { name: 'Calm', description: 'Meditation & sleep', emoji: '🧘' },
            { name: 'Headspace', description: 'Mindfulness', emoji: '🎯' },
            { name: 'Finch', description: 'Self-care pet', emoji: '🐦' },
            { name: 'Sanvello', description: 'Mood tracking', emoji: '📊' },
            { name: 'Wysa', description: 'AI therapy chatbot', emoji: '🤖' },
            { name: 'Mindshift', description: 'Anxiety management', emoji: '🧠' }
          ].map((app) => (
            <div key={app.name} className="bg-white border-2 border-forest/20 rounded-2xl p-6 hover-lift">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-forest to-sage p-3 rounded-2xl text-4xl">
                  {app.emoji}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl text-forest">{app.name}</h3>
                  <p className="text-gray-600 font-serif">{app.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Websites & Organizations */}
        <h2 className="text-4xl font-sans font-bold text-forest mb-8">Websites & Organizations</h2>
        <div className="space-y-4 mb-12">
          {[
            { name: 'BEAM', description: 'Black Emotional and Mental Health Collective', url: 'beam.community' },
            { name: 'Trevor Project', description: 'LGBTQ+ youth mental health', url: 'thetrevorproject.org' },
            { name: 'Trans Lifeline', description: 'Trans peer support', url: 'translifeline.org' },
            { name: 'JED Foundation', description: 'Teen mental health resources', url: 'jedfoundation.org' },
            { name: 'Active Minds', description: 'Youth mental health advocacy', url: 'activeminds.org' }
          ].map((org) => (
            <div key={org.name} className="bg-white border-2 border-amber/30 rounded-2xl p-6 hover-lift">
              <h3 className="font-sans font-bold text-xl text-forest mb-2">{org.name}</h3>
              <p className="text-gray-600 font-serif mb-3">{org.description}</p>
              <a href={`https://${org.url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber hover:text-terracotta font-sans font-bold transition-colors">
                <span>{org.url}</span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Emergency Contacts Template */}
        <div className="card hover-lift bg-gradient-to-br from-white to-forest/10 border-2 border-forest/30">
          <h2 className="text-3xl font-sans font-bold text-forest mb-4">My Emergency Contacts</h2>
          <p className="text-xl font-serif mb-6 leading-relaxed">Write down people you can call when you need help:</p>
          <div className="space-y-4">
            {[
              'Trusted Adult',
              'Friend',
              'Family Member',
              'Therapist/Counselor'
            ].map((label) => (
              <div key={label}>
                <label className="block font-sans font-bold text-forest mb-2 text-lg">{label}:</label>
                <input
                  type="text"
                  placeholder="Name & phone number"
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-forest focus:ring-4 focus:ring-forest/20 font-serif transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div className="mt-12 text-center card bg-gradient-to-br from-terracotta/20 to-amber/20 border-4 border-terracotta/40 hover-lift">
          <div className="text-6xl mb-6">💚</div>
          <p className="text-4xl font-sans font-bold text-forest mb-4">You matter.</p>
          <p className="text-2xl font-serif text-forest mb-2">You deserve to be here.</p>
          <p className="text-2xl font-serif text-forest">Asking for help is brave.</p>
        </div>
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

function CrisisCard({
  icon,
  name,
  contact,
  description,
  color
}: {
  icon: string
  name: string
  contact: string
  description: string
  color: string
}) {
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
      <div className="flex items-start gap-6">
        <div className={`bg-gradient-to-br ${getGradient()} p-4 rounded-2xl text-5xl flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-sans font-bold text-forest mb-3">{name}</h3>
          <p className="text-2xl font-sans font-bold text-gray-800 mb-3">{contact}</p>
          <p className="text-xl text-gray-600 font-serif leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
