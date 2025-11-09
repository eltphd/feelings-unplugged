'use client'

export default function YourBrainIsChanging() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-forest text-off-white py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <a href="/articles" className="text-sage hover:text-amber transition-colors mb-4 inline-block">
            ← Back to Articles
          </a>
          <h1 className="text-4xl md:text-5xl font-bold">🧠 Your Brain Is Changing</h1>
          <p className="text-xl text-sage mt-2">(And That's Cool)</p>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* Intro */}
        <Section>
          <p className="text-xl leading-relaxed">
            Your brain is like a house being remodeled.
          </p>
          <p className="text-xl leading-relaxed">
            Right now, your brain is growing super fast. Especially the part that feels emotions.
          </p>
          <p className="text-xl leading-relaxed">
            The teenage brain is EXTRA sensitive to emotions. That's normal!
          </p>
          <p className="text-xl leading-relaxed">
            That's why you might feel like crying one minute and laughing the next.
          </p>
          <p className="text-xl font-bold text-terracotta">
            It's not your fault. It's your brain.
          </p>
        </Section>

        {/* What's Happening */}
        <Section title="WHAT'S HAPPENING IN YOUR BRAIN">
          <p className="text-lg leading-relaxed">
            Your brain has different parts:
          </p>

          <FactBox title="EMOTION CENTER (Amygdala)" color="terracotta">
            <ul className="space-y-2">
              <li>• Feels everything FIRST</li>
              <li>• Reacts to danger, fear, excitement</li>
              <li>• Is BIGGER and more active in teens</li>
            </ul>
          </FactBox>

          <FactBox title="LOGIC CENTER (Prefrontal Cortex)" color="sage">
            <ul className="space-y-2">
              <li>• Thinks things through</li>
              <li>• Makes plans</li>
              <li>• Says 'wait, let's think about this'</li>
              <li>• Still under construction until age 25</li>
            </ul>
          </FactBox>

          <p className="text-lg leading-relaxed">
            That's why feelings can feel HUGE.
          </p>
          <p className="text-lg leading-relaxed">
            The emotion center is fully online.<br />
            The logic center is still being built.
          </p>
          <PullQuote>
            You're not broken. You're growing.
          </PullQuote>
        </Section>

        {/* Why Feelings Feel So Big */}
        <Section title="WHY FEELINGS FEEL SO BIG">
          <ol className="space-y-3 text-lg">
            <li>1. Your emotion center is working overtime</li>
            <li>2. Your logic center is still developing</li>
            <li>3. Your hormones are changing</li>
            <li>4. Your body is growing</li>
            <li>5. Your social world is expanding</li>
          </ol>
          <p className="text-lg font-bold text-forest">
            All of this happening at once = BIG FEELINGS.
          </p>

          <DidYouKnowBox>
            <ul className="space-y-2">
              <li>• Teen brains are wired to take risks (that's how you learn)</li>
              <li>• You feel peer rejection more intensely (that's evolution)</li>
              <li>• You need more sleep (9-10 hours!) because of brain growth</li>
              <li>• Music hits different (your brain is super responsive to it)</li>
            </ul>
            <p className="font-bold mt-3">This is all NORMAL.</p>
          </DidYouKnowBox>
        </Section>

        {/* What This Means */}
        <Section title="WHAT THIS MEANS FOR YOU">
          <div className="space-y-4 text-lg">
            <p>
              <span className="font-bold">When you feel like your emotions are too much:</span><br />
              Remember: Your brain is doing exactly what it's supposed to do.
            </p>
            <p>
              <span className="font-bold">When you can't focus:</span><br />
              Remember: Your prefrontal cortex is under construction.
            </p>
            <p>
              <span className="font-bold">When you feel things deeply:</span><br />
              Remember: That's your superpower. Don't shut it off.
            </p>
          </div>

          <div className="bg-cream border-l-4 border-amber p-6 rounded my-6">
            <p className="text-lg">
              Your brain is changing. That's not a bug. That's a feature.
            </p>
            <p className="text-lg mt-2">
              You're learning how to be human.<br />
              It's messy. It's hard. It's supposed to be.
            </p>
            <p className="text-xl font-bold text-amber mt-4">
              You're doing great.
            </p>
          </div>
        </Section>

        {/* The Bottom Line */}
        <Section title="THE BOTTOM LINE">
          <p className="text-xl leading-relaxed mb-6">
            Your brain is remodeling itself.<br />
            It's loud. It's chaotic. It's beautiful.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-4 border-red-300 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3">You're not:</h4>
              <ul className="space-y-2">
                <li>✗ Too emotional</li>
                <li>✗ Too sensitive</li>
                <li>✗ Broken</li>
                <li>✗ Wrong</li>
              </ul>
            </div>

            <div className="bg-green-50 border-4 border-green-300 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3">You are:</h4>
              <ul className="space-y-2">
                <li>✓ Growing</li>
                <li>✓ Learning</li>
                <li>✓ Feeling</li>
                <li>✓ Becoming</li>
              </ul>
            </div>
          </div>

          <p className="text-lg mt-6">
            This journizine will help you understand what's happening.
            And give you tools to work with your brain, not against it.
          </p>

          <PullQuote>
            Ready? Let's go.
          </PullQuote>
        </Section>

        {/* Navigation */}
        <nav className="flex justify-between items-center pt-8 border-t-2 border-sage">
          <a href="/articles" className="text-forest hover:text-terracotta font-bold">
            ← All Articles
          </a>
          <a href="/articles/meet-the-academy" className="text-forest hover:text-terracotta font-bold">
            Next: Meet the Academy →
          </a>
        </nav>
      </article>
    </div>
  )
}

function Section({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <section>
      {title && <h2 className="text-2xl font-bold text-forest mb-4">{title}</h2>}
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function FactBox({ title, color, children }: { title: string, color: string, children: React.ReactNode }) {
  const bgColor = color === 'terracotta' ? 'bg-terracotta/10' : 'bg-sage/10'
  const borderColor = color === 'terracotta' ? 'border-terracotta' : 'border-sage'

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-lg p-6`}>
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      {children}
    </div>
  )
}

function DidYouKnowBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber/20 border-4 border-amber rounded-lg p-6">
      <h3 className="font-bold text-xl mb-4">DID YOU KNOW?</h3>
      {children}
    </div>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="text-3xl font-bold text-center text-amber italic py-8">
      "{children}"
    </blockquote>
  )
}
