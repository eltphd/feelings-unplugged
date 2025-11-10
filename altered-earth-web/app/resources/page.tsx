'use client'

import { CSSProperties } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const hotlines = [
  {
    icon: '🆘',
    name: '988 Suicide & Crisis Lifeline',
    contact: 'Call or text: 988',
    description: 'Available 24/7 for anyone in crisis',
  },
  {
    icon: '🏳️‍🌈',
    name: 'The Trevor Project',
    contact: "Call: 1-866-488-7386 · Text 'START' to 678-678",
    description: 'Specialized support for LGBTQ+ youth',
  },
  {
    icon: '🖤',
    name: 'BlackLine',
    contact: 'Call or text: 1-800-604-5841',
    description: 'Peer support for Black & BIPOC youth in crisis',
  },
  {
    icon: '💬',
    name: 'Crisis Text Line',
    contact: "Text 'HELLO' to 741741",
    description: 'Free 24/7 text support with a trained responder',
  },
]

const apps = [
  { name: 'Calm', description: 'Meditation & sleep audios', emoji: '🧘' },
  { name: 'Headspace', description: 'Mindfulness practice', emoji: '🎯' },
  { name: 'Finch', description: 'Self-care companion', emoji: '🐦' },
  { name: 'Sanvello', description: 'Mood tracking tools', emoji: '📊' },
  { name: 'Wysa', description: 'AI therapy chatbot', emoji: '🤖' },
  { name: 'MindShift', description: 'Anxiety management', emoji: '🧠' },
]

type TexturePanelStyle = CSSProperties & {
  '--texture-panel-gradient'?: string
  '--texture-panel-pattern'?: string
  '--texture-panel-opacity'?: string
}

const heroPanelStyle: TexturePanelStyle = {
  '--texture-panel-gradient': 'linear-gradient(135deg, #F3ECE1 0%, #E3D4C0 52%, #CBB499 100%)',
  '--texture-panel-pattern':
    'repeating-linear-gradient(118deg, rgba(109,139,138,0.1) 0px, rgba(109,139,138,0.1) 18px, rgba(183,102,79,0.08) 18px, rgba(183,102,79,0.08) 36px)',
}

const closingPanelStyle: TexturePanelStyle = {
  '--texture-panel-gradient': 'linear-gradient(135deg, #EAD8C4 0%, #D7C0A7 52%, #BFA082 100%)',
  '--texture-panel-pattern':
    'repeating-linear-gradient(120deg, rgba(183,102,79,0.08) 0px, rgba(183,102,79,0.08) 20px, rgba(109,139,138,0.08) 20px, rgba(109,139,138,0.08) 40px)',
}

const organizations = [
  { name: 'BEAM', description: 'Black Emotional and Mental Health Collective', url: 'https://beam.community' },
  { name: 'Trevor Project', description: 'LGBTQ+ youth mental health support', url: 'https://thetrevorproject.org' },
  { name: 'Trans Lifeline', description: 'Peer hotline run by trans people', url: 'https://translifeline.org' },
  { name: 'JED Foundation', description: 'Programs for teen mental health safety', url: 'https://jedfoundation.org' },
  { name: 'Active Minds', description: 'Mental health advocacy community', url: 'https://activeminds.org' },
]

export default function ResourcesPage() {
  return (
    <Layout>
      <div className="space-y-12">
        <section className="texture-panel p-8 md:p-10" style={heroPanelStyle}>
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-secondary/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Crisis resources
            </span>
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl text-neutral leading-tight">
                  You deserve help. Your story matters.
                </h1>
                <p className="max-w-2xl text-base md:text-lg text-neutral/75">
                  This studio is for reflection, but if things feel heavy, reach out. These lines are staffed 24/7 with
                  people who listen, believe, and can get you to safety. Asking for help is an act of strength.
                </p>
              </div>
              <div className="rounded-[28px] border border-base-200 bg-base-100/90 p-6 text-sm text-neutral/70 shadow-inner">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">If in immediate danger</p>
                <p className="mt-2 font-semibold text-neutral">
                  Call local emergency services right away. Then connect with a trusted adult.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-neutral/50">
              <span>Confidential</span>
              <span>Free</span>
              <span>24/7 support</span>
              <span>Diverse responders</span>
            </div>
          </div>
        </section>

        <section className="glass-card p-8 md:p-10 space-y-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Safety checklist</p>
            <h2 className="font-serif text-3xl text-neutral">When journaling isn’t enough</h2>
            <p className="text-neutral/70">
              If any of these resonate, reach out to an adult you trust or use the crisis lines below. Your nervous system
              does not have to carry this alone.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              'I think about hurting myself.',
              "I don’t feel like I want to be alive.",
              'I feel sad, scared, or numb every day.',
              'Eating, sleeping, or focusing feels impossible.',
              'I notice my emotions feel out of control.',
              'I hide how bad things feel from everyone.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-error/20 bg-error/5 px-5 py-4 text-sm font-semibold text-neutral/80">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-error">⚠️</span>
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[22px] border border-error/25 bg-error/10 px-5 py-4 text-center text-sm font-semibold text-error/90">
            If you checked even one, talk to someone today. You aren’t a burden; you’re brave.
          </div>
        </section>

        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Immediate support</p>
            <h2 className="font-serif text-3xl text-neutral">24/7 crisis hotlines</h2>
            <p className="text-neutral/70">
              These services are confidential, free, and staffed by trained listeners.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {hotlines.map((line) => (
              <article key={line.name} className="glass-card p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 text-3xl">
                    {line.icon}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-neutral">{line.name}</h3>
                    <p className="text-sm font-semibold text-neutral/80">{line.contact}</p>
                    <p className="text-sm text-neutral/70">{line.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card p-8 md:p-10 space-y-6">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Understanding help</p>
            <h2 className="font-serif text-3xl text-neutral">What therapy actually is</h2>
            <p className="text-neutral/70">
              Therapists are feelings coaches—not judges. They help you build a toolkit and feel less alone.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Understand how your brain processes stress.',
              'Talk through the hard things with someone trained to hold them.',
              'Collect tools that fit your actual life, not a generic list.',
              'Build a consistent circle of support.',
            ].map((point) => (
              <div key={point} className="rounded-2xl border border-accent/25 bg-accent/10 px-5 py-4 text-sm text-neutral/80">
                <div className="flex items-start gap-3">
                  <span className="text-accent">→</span>
                  <p>{point}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[22px] border border-accent/30 bg-accent/15 px-5 py-4 text-center text-sm font-semibold text-accent/90">
            Therapy is for people who want support. That’s strength, not weakness.
          </div>
        </section>

        <section className="space-y-6">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Digital companions</p>
            <h2 className="font-serif text-3xl text-neutral">Supportive apps for teens</h2>
            <p className="text-neutral/70">Use these alongside real human connections—not instead of them.</p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {apps.map((app) => (
              <div key={app.name} className="glass-card p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-2xl">
                    {app.emoji}
                  </span>
                  <div>
                    <p className="font-serif text-lg text-neutral">{app.name}</p>
                    <p className="text-sm text-neutral/70">{app.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-8 md:p-10 space-y-6">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Community anchors</p>
            <h2 className="font-serif text-3xl text-neutral">Websites & organizations</h2>
            <p className="text-neutral/70">Explore these trusted spaces for education, advocacy, and peer support.</p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {organizations.map((org) => (
              <article key={org.name} className="rounded-[24px] border border-base-200 bg-base-100/90 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow">
                <h3 className="font-serif text-xl text-neutral">{org.name}</h3>
                <p className="mt-2 text-sm text-neutral/70">{org.description}</p>
                <Link
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary hover:text-secondary/80"
                >
                  Visit site <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card p-8 md:p-10 space-y-6">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Emergency plan</p>
            <h2 className="font-serif text-3xl text-neutral">Save your calm circle</h2>
            <p className="text-neutral/70">Write down the humans who can sit with you when things feel rough.</p>
          </header>
          <div className="space-y-4">
            {['Trusted adult', 'Friend', 'Family member', 'Therapist or counselor'].map((label) => (
              <label key={label} className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.18em] text-neutral/50">{label}</span>
                <input
                  type="text"
                  placeholder="Name · phone · best way to reach"
                  className="w-full rounded-2xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-neutral/80 placeholder:text-neutral/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="texture-panel p-10 text-center" style={closingPanelStyle}>
          <div className="space-y-4">
            <span className="text-4xl">💚</span>
            <h2 className="font-serif text-3xl text-neutral">You matter. You deserve to feel safe.</h2>
            <p className="text-sm text-neutral/75">
              Keep these numbers close, keep your calm kit ready, and keep telling your story. Asking for help is brave.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

