'use client'

export default function WhenJournalingIsntEnough() {
  return (
    <div className="min-h-screen bg-off-white">
      <header className="bg-sage text-off-white py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <a href="/articles" className="text-cream hover:text-amber transition-colors mb-4 inline-block">
            ← Back to Articles
          </a>
          <h1 className="text-4xl md:text-5xl font-bold">🆘 When Journaling Isn't Enough</h1>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <section className="bg-cream border-4 border-terracotta rounded-lg p-6">
          <p className="text-xl leading-relaxed mb-4">
            This journal can help you understand your feelings.
          </p>
          <p className="text-xl leading-relaxed mb-4">
            But if you're feeling really, really bad, talk to an adult you trust.
          </p>
          <p className="text-2xl font-bold text-terracotta">
            Journaling is a tool, not a cure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">What Therapy Actually Is</h2>
          <p className="text-lg mb-4">
            Therapy is like having a feelings coach.
          </p>
          <p className="text-lg mb-4">They help you:</p>
          <ul className="space-y-2 text-lg mb-4">
            <li>• Understand your brain</li>
            <li>• Work through hard stuff</li>
            <li>• Learn tools that actually work</li>
            <li>• Feel less alone</li>
          </ul>
          <div className="bg-sage/20 border-4 border-sage rounded-lg p-6">
            <p className="text-xl font-bold text-forest">
              Therapy isn't for "crazy people."<br />
              It's for people who want help.
            </p>
            <p className="text-xl text-forest mt-2">
              That's strength, not weakness.
            </p>
          </div>
        </section>

        <section className="bg-red-50 border-4 border-red-400 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ Warning Signs (When to Ask for Help)</h2>
          <div className="space-y-3 text-lg">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-5 h-5" />
              <span>☑️ I think about hurting myself</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-5 h-5" />
              <span>☑️ I don't want to be alive anymore</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-5 h-5" />
              <span>☑️ I feel sad or scared every day</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-5 h-5" />
              <span>☑️ I can't eat or sleep</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-5 h-5" />
              <span>☑️ I can't focus on anything</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-5 h-5" />
              <span>☑️ I feel numb all the time</span>
            </label>
          </div>
          <p className="text-xl font-bold text-red-800 mt-6">
            If you checked ANY of these:<br />
            Please talk to someone you trust.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-6">Crisis Resources (24/7)</h2>
          <div className="space-y-4">
            <div className="bg-terracotta/20 border-4 border-terracotta rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl">🆘</span>
                <div>
                  <h3 className="text-2xl font-bold text-forest mb-2">988 Suicide & Crisis Lifeline</h3>
                  <p className="text-xl font-bold mb-2">Call or text: 988</p>
                  <p className="text-gray-700">Available 24/7 for anyone in crisis</p>
                </div>
              </div>
            </div>

            <div className="bg-sage/20 border-4 border-sage rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl">🏳️‍🌈</span>
                <div>
                  <h3 className="text-2xl font-bold text-forest mb-2">Trevor Project</h3>
                  <p className="text-xl font-bold mb-2">Call: 1-866-488-7386 | Text "START" to 678-678</p>
                  <p className="text-gray-700">For LGBTQ+ youth in crisis</p>
                </div>
              </div>
            </div>

            <div className="bg-amber/20 border-4 border-amber rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl">🖤</span>
                <div>
                  <h3 className="text-2xl font-bold text-forest mb-2">BlackLine</h3>
                  <p className="text-xl font-bold mb-2">Call or text: 1-800-604-5841</p>
                  <p className="text-gray-700">For Black & BIPOC youth experiencing crisis</p>
                </div>
              </div>
            </div>

            <div className="bg-forest/20 border-4 border-forest rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="text-5xl">💬</span>
                <div>
                  <h3 className="text-2xl font-bold text-forest mb-2">Crisis Text Line</h3>
                  <p className="text-xl font-bold mb-2">Text "HELLO" to 741741</p>
                  <p className="text-gray-700">Free 24/7 support via text message</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-cream border-4 border-sage rounded-lg p-8">
            <p className="text-2xl font-bold text-forest mb-2">You are not alone.</p>
            <p className="text-xl text-forest mb-2">You deserve help.</p>
            <p className="text-xl text-forest">You deserve to be here.</p>
            <div className="mt-6">
              <a
                href="/resources"
                className="inline-block bg-sage text-white font-bold py-4 px-8 rounded-lg hover:bg-sage/90 transition-all"
              >
                See All Resources →
              </a>
            </div>
          </div>
        </section>

        <nav className="flex justify-between items-center pt-8 border-t-2 border-sage">
          <a href="/articles" className="text-forest hover:text-terracotta font-bold">
            ← All Articles
          </a>
          <a href="/resources" className="text-forest hover:text-terracotta font-bold">
            Crisis Resources →
          </a>
        </nav>
      </article>
    </div>
  )
}
