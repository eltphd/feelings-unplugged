'use client'

export default function ShadowWork() {
  return (
    <div className="min-h-screen bg-off-white">
      <header className="bg-amber text-forest py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <a href="/articles" className="text-forest/70 hover:text-forest transition-colors mb-4 inline-block">
            ← Back to Articles
          </a>
          <h1 className="text-4xl md:text-5xl font-bold">🌑 Shadow Work for Beginners</h1>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">What is a shadow?</h2>
          <p className="text-xl leading-relaxed">
            Your shadow is the part of you that you hide.
          </p>
          <p className="text-xl leading-relaxed">
            Maybe you hide your anger.<br />
            Maybe you hide your sadness.<br />
            Maybe you hide that you're scared.
          </p>
          <p className="text-xl font-bold text-amber">
            Your shadow isn't bad. It's trying to keep you safe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">Why Do We Have Shadows?</h2>
          <p className="text-lg leading-relaxed mb-4">
            You learned early: some feelings aren't "okay."
          </p>
          <div className="space-y-3 text-lg">
            <p>Maybe you got in trouble for being angry.<br />
            <span className="italic text-gray-600">So you learned to hide your anger.</span></p>

            <p>Maybe you got told "boys don't cry."<br />
            <span className="italic text-gray-600">So you learned to hide your sadness.</span></p>

            <p>Maybe people said you were "too much."<br />
            <span className="italic text-gray-600">So you learned to hide your bigness.</span></p>
          </div>
          <div className="bg-terracotta/20 border-4 border-terracotta rounded-lg p-6 mt-6">
            <p className="text-xl font-bold">Your shadow helped you survive.</p>
            <p className="text-xl">But now? It might be holding you back.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">Shadow Work Isn't Scary</h2>
          <p className="text-lg leading-relaxed">
            It's like cleaning out a closet.
          </p>
          <p className="text-lg leading-relaxed">
            You're just looking at what you stuffed in there.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            You're not broken. You're not bad. You just have parts of yourself you've been hiding.
          </p>
          <div className="bg-cream border-l-4 border-sage p-6 rounded">
            <p className="text-lg font-bold mb-2">Shadow work means:</p>
            <ul className="space-y-2 text-lg">
              <li>• Looking at those hidden parts</li>
              <li>• Saying "It's okay. I see you."</li>
              <li>• Deciding if you still need to hide them</li>
            </ul>
            <p className="text-lg font-bold mt-4">That's it.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">Shadow Examples (Age-Appropriate)</h2>
          <div className="space-y-4">
            {[
              {
                archetype: "The Catalyst's shadow",
                examples: ["Getting SO mad when things don't change fast enough", "Feeling like everyone else is too slow"]
              },
              {
                archetype: "The Luminary's shadow",
                examples: ["Acting like everything is fine when you're really sad", "Performing happiness even when you're hurting"]
              },
              {
                archetype: "The Guardian's shadow",
                examples: ["Taking care of everyone else but forgetting about yourself", "Saying 'I'm fine' when you're not"]
              },
              {
                archetype: "The Maverick's shadow",
                examples: ["Pushing people away when you actually need help", "Being alone even when you're lonely"]
              },
              {
                archetype: "The Weaver's shadow",
                examples: ["Losing yourself trying to make everyone happy", "Not knowing what YOU want"]
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-forest/10 border-2 border-forest rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{item.archetype}:</h3>
                <ul className="space-y-1">
                  {item.examples.map((ex, i) => (
                    <li key={i}>→ {ex}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">How to Work With Your Shadow</h2>
          <div className="space-y-4">
            <div className="bg-terracotta/10 border-l-4 border-terracotta p-4">
              <p className="font-bold">Step 1: Notice it</p>
              <p className="italic">"I'm hiding my anger right now."</p>
            </div>
            <div className="bg-sage/10 border-l-4 border-sage p-4">
              <p className="font-bold">Step 2: Don't judge it</p>
              <p className="italic">"It's okay that I'm angry."</p>
            </div>
            <div className="bg-amber/10 border-l-4 border-amber p-4">
              <p className="font-bold">Step 3: Ask why</p>
              <p className="italic">"What is this anger protecting me from?"</p>
            </div>
            <div className="bg-forest/10 border-l-4 border-forest p-4">
              <p className="font-bold">Step 4: Decide</p>
              <p className="italic">"Do I need to keep hiding this? Or can I let it out safely?"</p>
            </div>
          </div>
          <p className="text-lg mt-6">
            Your shadow isn't your enemy. It's a part of you that needs attention.
          </p>
        </section>

        <section className="bg-cream border-4 border-amber rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-forest mb-4">Remember</h2>
          <div className="space-y-2 text-lg">
            <p>✓ Your shadow helped you survive</p>
            <p>✓ Your shadow is trying to protect you</p>
            <p>✓ Your shadow deserves compassion</p>
            <p>✓ Your shadow can be integrated, not eliminated</p>
          </div>
          <p className="text-xl font-bold text-amber mt-6">
            You don't have to fix your shadow.<br />
            You just have to see it.
          </p>
          <p className="text-2xl font-bold text-forest mt-4">
            That's the work.
          </p>
        </section>

        <nav className="flex justify-between items-center pt-8 border-t-2 border-sage">
          <a href="/articles/meet-the-academy" className="text-forest hover:text-terracotta font-bold">
            ← Previous: Meet the Academy
          </a>
          <a href="/articles" className="text-forest hover:text-terracotta font-bold">
            All Articles →
          </a>
        </nav>
      </article>
    </div>
  )
}
