import Layout from '../components/Layout'
import Link from 'next/link'

const palette = [
  { name: 'Terracotta', value: '#B7664F', description: 'Primary actions, accents' },
  { name: 'Scholarly Slate', value: '#465B73', description: 'Navigation, headings' },
  { name: 'Dusty Teal', value: '#6D8B8A', description: 'Highlights, charts' },
  { name: 'Pressed Parchment', value: '#F4EEE2', description: 'Background surfaces' },
  { name: 'Ink Charcoal', value: '#2E2A29', description: 'Body copy, icon strokes' },
]

export default function Mockups() {
  return (
    <Layout>
      <div className="space-y-16 pb-16">
        <header className="flex flex-col gap-6 glass-card px-10 py-12">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
              Concept Board · November 2025
            </span>
            <h1 className="font-serif text-5xl leading-tight text-neutral">
              Feelings Unplugged · Scholar Studio Direction
            </h1>
            <p className="text-lg text-neutral/80">
              These mocks translate the study nook energy of the book stack illustration with the layered,
              torn-paper tactility from the Firefly collage. Use this page as the vision anchor before diving
              into production screens.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-neutral/70">
            <span className="rounded-full bg-base-200 px-3 py-1">Headlines · Cormorant Garamond</span>
            <span className="rounded-full bg-base-200 px-3 py-1">Body · Work Sans</span>
            <span className="rounded-full bg-base-200 px-3 py-1">Texture · Torn parchment overlays</span>
          </div>
        </header>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl text-neutral">Mood Board Notes</h2>
            <Link href="/" className="text-sm font-medium text-secondary underline decoration-dotted underline-offset-4">
              Return to dashboard
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <article className="glass-card lg:col-span-5 p-8 space-y-4">
              <h3 className="text-xl font-semibold text-neutral">Study Still Life</h3>
              <p className="text-neutral/70">
                Calm hero anchored by stacked books, soft shadows, and warm desk lighting. This drives the welcome
                experience and any hero or empty states.
              </p>
              <div className="relative h-56 overflow-hidden rounded-2xl border border-base-300 bg-gradient-to-br from-[#F8F3E8] to-[#E8DAC1]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center mix-blend-multiply opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#251F1E]/45 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1 text-base-content">
                  <p className="font-serif text-2xl text-base-content">Layered textbooks, pencil trays, journaling tools.</p>
                  <p className="text-sm text-base-content/70">Tone reference for hero & spotlight modules.</p>
                </div>
              </div>
            </article>
            <article className="glass-card lg:col-span-4 p-8 space-y-4">
              <h3 className="text-xl font-semibold text-neutral">Collage Texture</h3>
              <p className="text-neutral/70">
                Torn paper edges and translucent vellum overlays add motion and authenticity across cards, modals, and nav.
              </p>
              <div className="relative h-56 overflow-hidden rounded-2xl border border-base-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E7D2C0] via-[#D0BAB2] to-[#9AA9A8]" />
                <div className="absolute inset-0">
                  <div className="h-full w-full bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.35)_0px,rgba(255,255,255,0.35)_23px,rgba(233,214,195,0.6)_23px,rgba(233,214,195,0.6)_46px)] mix-blend-overlay opacity-80" />
                </div>
                <div className="absolute inset-x-6 top-6 rounded-full bg-neutral/10 px-4 py-2 text-sm font-medium text-neutral/80">
                  Firefly reference · torn journal textures
                </div>
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 bg-base-100/90 py-3 text-center text-xs text-neutral/70 shadow-glow">
                  Use at 5–12% opacity behind section dividers & hero overlays.
                </div>
              </div>
            </article>
            <article className="glass-card lg:col-span-3 p-8 space-y-4">
              <h3 className="text-xl font-semibold text-neutral">Palette Anchors</h3>
              <p className="text-neutral/70">
                Primary palette pulled from desk still life; secondary accent leans on dusty teal to cool the warmth.
              </p>
              <ul className="space-y-3">
                {palette.map((swatch) => (
                  <li key={swatch.value} className="flex items-center gap-3">
                    <span
                      className="h-10 w-10 rounded-full border border-neutral/10 shadow-sm"
                      style={{ backgroundColor: swatch.value }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-neutral">{swatch.name}</p>
                      <p className="text-xs text-neutral/70">{swatch.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="space-y-8">
          <header className="space-y-2">
            <h2 className="font-serif text-3xl text-neutral">Desktop Dashboard Mock</h2>
            <p className="text-neutral/70">
              Focused on spacious typography, layered cards, and a hero module that mirrors the study nook reference.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-7">
            <div className="lg:col-span-5 space-y-6 rounded-[28px] border border-base-300 bg-base-100/75 p-8 shadow-glow backdrop-blur">
              <div className="relative overflow-hidden rounded-[26px] border border-base-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5EDE0] via-[#E9DDCA] to-[#D8C4AE]" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(120deg,rgba(183,102,79,0.08)_0px,rgba(183,102,79,0.08)_22px,rgba(109,139,138,0.08)_22px,rgba(109,139,138,0.08)_46px)] mix-blend-multiply" />
                <div className="relative grid gap-6 p-10 md:grid-cols-2">
                  <div className="space-y-4">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">Now</span>
                    <h3 className="font-serif text-4xl text-neutral">
                      How does this chapter feel in your body?
                    </h3>
                    <p className="max-w-sm text-base text-neutral/80">
                      Anchor your check-in with sensory cues. Borrow from the book stack:
                      What&apos;s on your desk? What scent anchors you right now?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-content shadow-md shadow-primary/20">
                        Start a reflective note
                      </button>
                      <button className="rounded-full border border-neutral/20 px-5 py-3 text-sm font-semibold text-neutral/80">
                        Bank calm audio
                      </button>
                    </div>
                  </div>
                  <div className="relative rounded-[22px] border border-base-300 bg-base-100/70 p-4 shadow-inner">
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-neutral/50">Today&apos;s bookmark</p>
                        <p className="font-semibold text-neutral">Focus on breath-centering</p>
                      </div>
                      <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                        <p className="text-sm text-neutral/80">
                          Give your nervous system something gentle to hold. Light a candle, play your
                          &quot;library sound&quot; loop, or soften your gaze on something textured.
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        {['Somatic', 'Creative', 'Grounding'].map((tag) => (
                          <div key={tag} className="rounded-xl border border-secondary/30 bg-secondary/10 px-3 py-2 text-xs font-medium text-secondary">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[22px] border border-base-200 bg-base-100 p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Timeline</p>
                      <h4 className="font-serif text-2xl text-neutral">Emotional temperature</h4>
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Last 7 days</span>
                  </div>
                  <div className="mt-6 h-40 rounded-3xl border border-base-200 bg-gradient-to-b from-base-100 to-base-200 p-4">
                    <div className="h-full w-full rounded-[18px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(109,139,138,0.45)_0deg,rgba(183,102,79,0.6)_140deg,rgba(70,91,115,0.55)_320deg)] opacity-90" />
                  </div>
                  <p className="mt-4 text-sm text-neutral/70">
                    Tuesday and Thursday spikes coincide with back-to-back obligations. Note the calmer Saturdays.
                  </p>
                </div>

                <div className="space-y-4 rounded-[22px] border border-base-200 bg-base-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Soul Compass</p>
                      <h4 className="font-serif text-2xl text-neutral">Prompts queued</h4>
                    </div>
                    <button className="rounded-full border border-neutral/20 px-4 py-2 text-xs font-semibold text-neutral/70">
                      View all
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      '"Write the letter your nervous system needs."',
                      '"Name the smallest thing that felt sacred today."',
                      '"Draw the room that holds your calm."',
                    ].map((prompt, index) => (
                      <div
                        key={prompt}
                        className="rounded-2xl border border-base-200 bg-base-100/80 p-4 shadow-inner"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-sm text-neutral/80">{prompt}</p>
                          <span className="text-xs font-semibold text-neutral/40">#{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-xs font-medium text-secondary/90">
                    Tip: pair prompts with tactile cues (bookmarks, textures) stored in your &quot;calm kit&quot;.
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-2 flex flex-col gap-6">
              <div className="rounded-3xl border border-base-200 bg-base-100/90 p-6 shadow-glow-secondary">
                <h3 className="font-serif text-xl text-neutral">Component notes</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral/70">
                  <li>Card radii increase to 26–28px for softer silhouettes.</li>
                  <li>Texture overlays capped at 12% opacity to avoid grainy noise.</li>
                  <li>Primary buttons use terracotta fill with parchment text.</li>
                  <li>Secondary actions rely on outline style to keep surfaces light.</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-base-200 bg-base-100/90 p-6 shadow-sm">
                <h3 className="font-serif text-xl text-neutral">Adaptive guidance</h3>
                <p className="mt-3 text-sm text-neutral/70">
                  Collage strips wrap to the top edge on small screens. Keep hero copy under 180 characters for mobile
                  readability. Timeline compresses into gradient card with focus on weekly rhythm.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="space-y-8">
          <header className="space-y-2">
            <h2 className="font-serif text-3xl text-neutral">Mobile Flow Mock</h2>
            <p className="text-neutral/70">
              360px breakpoint references highlight legibility, tactile layering, and thumb-ready actions.
            </p>
          </header>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative mx-auto w-[320px] rounded-[40px] border-[6px] border-neutral/10 bg-base-100 p-4 shadow-[0_40px_80px_rgba(46,42,41,0.25)]">
              <div className="h-4 w-1/2 mx-auto rounded-full bg-neutral/10" />
              <div className="mt-4 space-y-4 rounded-[28px] border border-base-200 bg-base-100/90 p-5 shadow-inner">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Hero</p>
                <h3 className="font-serif text-2xl text-neutral leading-snug">
                  How does this chapter feel?
                </h3>
                <p className="text-sm text-neutral/70">
                  Borrow a cue from your desk: what object is grounding you right now?
                </p>
                <button className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-content">
                  Start a reflective note
                </button>
                <button className="w-full rounded-full border border-neutral/20 px-4 py-3 text-sm font-semibold text-neutral/80">
                  Stack sensory cues
                </button>
              </div>
              <div className="mt-4 space-y-3 rounded-[28px] border border-base-200 bg-base-100/95 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Timeline</p>
                <div className="rounded-2xl border border-base-200 bg-gradient-to-b from-base-100 to-base-200 p-3">
                  <div className="h-20 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(109,139,138,0.35)_0%,rgba(183,102,79,0.55)_65%,rgba(70,91,115,0.45)_100%)]" />
                </div>
                <p className="text-xs text-neutral/60">
                  Notice calmer mornings when the ritual starts with analog journaling.
                </p>
              </div>
              <div className="mt-4 rounded-[28px] border border-base-200 bg-base-100/95 p-5 space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Prompts</p>
                <div className="space-y-2">
                  {['Letter to your nervous system', 'Sacred small moment', 'Room that holds calm'].map((prompt) => (
                    <div key={prompt} className="rounded-2xl border border-base-200 bg-base-100/90 p-4">
                      <p className="text-sm text-neutral/80">{prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="thumb-zone mt-6 rounded-[28px] border border-neutral/10 bg-base-100/90 shadow-lg">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral/60">
                  <span>Journal</span>
                  <span className="text-primary">Check-in</span>
                  <span>Resources</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-3xl border border-base-200 bg-base-100/90 p-6 shadow-sm">
                <h3 className="font-serif text-xl text-neutral">Mobile guidelines</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral/70">
                  <li>Use 16px body copy with 26px line height for warmth and readability.</li>
                  <li>Primary CTA remains centered; secondary CTA shifts below for thumb reach.</li>
                  <li>Timeline and prompts collapse into stacked cards with 24px padding.</li>
                  <li>Bottom nav uses parchment gradient to stay grounded in mood board.</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-base-200 bg-base-100/90 p-6 shadow-sm">
                <h3 className="font-serif text-xl text-neutral">Next steps</h3>
                <ol className="mt-4 space-y-3 text-sm text-neutral/70">
                  <li>Translate hero and dashboard sections into actual components.</li>
                  <li>Map Firefly-inspired textures to tokenized CSS utilities.</li>
                  <li>Audit existing pages to align copy tone and spacing to this direction.</li>
                  <li>Create illustration briefs if new bespoke art is needed beyond stock references.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

