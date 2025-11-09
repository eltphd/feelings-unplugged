'use client'

export default function PlaylistAsMedicine() {
  return (
    <div className="min-h-screen bg-off-white">
      <header className="bg-amber text-forest py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <a href="/articles" className="text-forest/70 hover:text-forest transition-colors mb-4 inline-block">
            ← Back to Articles
          </a>
          <h1 className="text-4xl md:text-5xl font-bold">🎵 Playlist as Medicine</h1>
          <p className="text-xl mt-2">How music changes your mood (and how to use it)</p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <section>
          <p className="text-xl leading-relaxed">
            Have you ever felt sad, then played a song that made you cry even more—and somehow, you felt better?
          </p>
          <p className="text-xl leading-relaxed">
            Or maybe you were nervous before a big game, so you put on your pump-up playlist and felt braver?
          </p>
          <p className="text-xl font-bold text-terracotta">
            That's not magic. That's your brain.
          </p>
          <p className="text-xl leading-relaxed">
            Music is medicine for your feelings. And the best part? You already know how to use it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">Your Brain on Music</h2>
          <p className="text-lg mb-4">
            When you listen to music, your brain releases chemicals that change how you feel.
          </p>

          <div className="space-y-4">
            <div className="bg-terracotta/10 border-l-4 border-terracotta p-4">
              <h3 className="font-bold mb-2">When you listen to a song you love:</h3>
              <ul className="space-y-1">
                <li>• Your brain releases dopamine (the "feel-good" chemical)</li>
                <li>• Your heart rate can slow down or speed up</li>
                <li>• Your body relaxes or gets energized</li>
              </ul>
            </div>

            <div className="bg-sage/10 border-l-4 border-sage p-4">
              <h3 className="font-bold mb-2">When you listen to sad music when you're sad:</h3>
              <ul className="space-y-1">
                <li>• It's called "matching your mood"</li>
                <li>• Your brain feels understood</li>
                <li>• Crying to music can help you feel better</li>
              </ul>
            </div>

            <div className="bg-amber/10 border-l-4 border-amber p-4">
              <h3 className="font-bold mb-2">When you listen to upbeat music:</h3>
              <ul className="space-y-1">
                <li>• Your brain gets energized</li>
                <li>• You might feel more confident</li>
                <li>• It helps you focus or move your body</li>
              </ul>
            </div>
          </div>

          <div className="bg-cream border-4 border-amber rounded-lg p-6 mt-6">
            <h3 className="font-bold text-lg mb-3">DID YOU KNOW?</h3>
            <p className="font-bold mb-2">Music can:</p>
            <ul className="space-y-1">
              <li>• Lower stress (slow songs help you calm down)</li>
              <li>• Give you energy (fast songs pump you up)</li>
              <li>• Help you remember things (that's why songs get stuck in your head)</li>
              <li>• Make you feel less alone (lyrics that say what you feel)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">Build Your Emotional Toolkit</h2>
          <p className="text-lg mb-4">
            Think of playlists like a first-aid kit—but for your feelings.
          </p>
          <p className="text-lg mb-6">
            Here are the 5 playlists everyone should have:
          </p>

          <div className="space-y-4">
            {[
              {
                emoji: '⚡',
                name: 'MAD PLAYLIST',
                subtitle: 'When you\'re angry and need to let it out',
                songs: 'Loud guitars, heavy drums, intense energy',
                why: 'Your brain needs to release the anger. Music gives it a safe place to go.',
                vibes: 'Rock, punk, rap with heavy beats'
              },
              {
                emoji: '💧',
                name: 'SAD PLAYLIST',
                subtitle: 'When you need to cry or feel your feelings',
                songs: 'Slow, soft songs with meaningful lyrics',
                why: 'Crying releases stress hormones. Sad music helps you let it out.',
                vibes: 'Ballads, slow R&B, acoustic songs'
              },
              {
                emoji: '☀️',
                name: 'HAPPY PLAYLIST',
                subtitle: 'When you want to celebrate or feel good',
                songs: 'Upbeat songs that make you want to dance',
                why: 'Upbeat music boosts dopamine (the happy chemical).',
                vibes: 'Pop, funk, dancehall, happy indie'
              },
              {
                emoji: '🌙',
                name: 'CALM PLAYLIST',
                subtitle: 'When you need to breathe and slow down',
                songs: 'Gentle, quiet songs with no/soft lyrics',
                why: 'Slow music lowers your heart rate and helps your body relax.',
                vibes: 'Lo-fi, classical, nature sounds, soft jazz'
              },
              {
                emoji: '🔥',
                name: 'HYPED PLAYLIST',
                subtitle: 'When you need energy or confidence',
                songs: 'Strong beats that make you feel powerful',
                why: 'Fast music gets your adrenaline going. It tricks your brain into feeling braver.',
                vibes: 'Hip-hop, EDM, hype rap, workout music'
              }
            ].map((playlist, idx) => (
              <div key={idx} className="bg-cream border-2 border-forest rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">{playlist.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-forest">{playlist.name}</h3>
                    <p className="text-gray-700 italic">{playlist.subtitle}</p>
                  </div>
                </div>
                <p className="mb-2"><span className="font-bold">Songs:</span> {playlist.songs}</p>
                <p className="mb-2"><span className="font-bold">Why it works:</span> {playlist.why}</p>
                <p className="text-sm text-gray-600"><span className="font-bold">Example vibes:</span> {playlist.vibes}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-terracotta/20 border-4 border-terracotta rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-forest mb-6">Ready to Build Your Playlists?</h2>
          <p className="text-lg mb-6">
            We have templates ready for you! Fill in your favorite songs for each emotion.
          </p>
          <a
            href="/playlists"
            className="inline-block bg-terracotta text-white font-bold py-4 px-8 rounded-lg hover:bg-terracotta/90 transition-all text-lg"
          >
            Go to Playlist Builders →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-forest mb-4">How to Use Your Playlists</h2>
          <div className="space-y-3 text-lg">
            <p><strong>Step 1: Name your emotion</strong><br />
            Ask yourself: "How do I feel right now?"</p>

            <p><strong>Step 2: Pick the matching playlist</strong><br />
            Don't try to "fix" your emotion. Match it first.</p>

            <p><strong>Step 3: Let the music do its work</strong><br />
            Listen. Cry. Dance. Scream into a pillow. Move your body. It's all okay.</p>

            <p><strong>Step 4: Notice how you feel after</strong><br />
            Did it help? Do you feel lighter? If yes, add more songs to that playlist.</p>
          </div>
        </section>

        <section className="bg-sage/20 border-4 border-sage rounded-lg p-6">
          <h2 className="text-xl font-bold text-forest mb-4">Remember:</h2>
          <ul className="space-y-2 text-lg">
            <li>• There's no "right" music. Whatever helps YOU is the right choice.</li>
            <li>• You can update these anytime. Songs that help today might change next month.</li>
            <li>• Music isn't a cure—it's a tool. If you're feeling really bad every day, talk to an adult you trust.</li>
          </ul>
          <p className="text-2xl font-bold text-center text-amber mt-6 italic">
            "Your feelings deserve a soundtrack."
          </p>
        </section>

        <nav className="flex justify-between items-center pt-8 border-t-2 border-sage">
          <a href="/articles/shadow-work" className="text-forest hover:text-terracotta font-bold">
            ← Previous: Shadow Work
          </a>
          <a href="/playlists" className="text-forest hover:text-terracotta font-bold">
            Build Playlists →
          </a>
        </nav>
      </article>
    </div>
  )
}
