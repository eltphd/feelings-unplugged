'use client'

export default function GlossaryOfFeelings() {
  const emotions = {
    mad: {
      color: 'terracotta',
      words: [
        { word: 'Angry', definition: 'Hot, strong feeling when something is wrong or unfair' },
        { word: 'Frustrated', definition: 'Feeling stuck, like things aren\'t working' },
        { word: 'Annoyed', definition: 'Small irritation, like a tiny itch you can\'t scratch' },
        { word: 'Furious', definition: 'VERY angry, like a volcano about to explode' },
        { word: 'Irritated', definition: 'Everything bothers you, like wearing itchy clothes' }
      ]
    },
    sad: {
      color: 'sage',
      words: [
        { word: 'Lonely', definition: 'Feeling alone, even if people are around' },
        { word: 'Hurt', definition: 'Emotional pain, like someone stepped on your heart' },
        { word: 'Disappointed', definition: 'When things don\'t turn out how you hoped' },
        { word: 'Heartbroken', definition: 'Deep sadness, like something important is broken' },
        { word: 'Hopeless', definition: 'Feeling like nothing will get better' }
      ]
    },
    happy: {
      color: 'amber',
      words: [
        { word: 'Excited', definition: 'Buzzing energy, can\'t wait for something good' },
        { word: 'Proud', definition: 'Feeling good about something you did' },
        { word: 'Grateful', definition: 'Thankful, noticing what\'s good' },
        { word: 'Content', definition: 'Peaceful happiness, everything feels okay' },
        { word: 'Joyful', definition: 'Big, bright happiness that fills you up' }
      ]
    },
    scared: {
      color: 'forest',
      words: [
        { word: 'Anxious', definition: 'Your body feels shaky or jumpy, worrying about what might happen' },
        { word: 'Worried', definition: 'Thinking about bad things that could happen' },
        { word: 'Terrified', definition: 'VERY scared, fear takes over your whole body' },
        { word: 'Nervous', definition: 'Jittery feeling before something big' },
        { word: 'Overwhelmed', definition: 'Too many things at once, your brain feels full' }
      ]
    },
    confused: {
      color: 'cream',
      words: [
        { word: 'Lost', definition: 'Don\'t know what to do or where to go' },
        { word: 'Uncertain', definition: 'Not sure what\'s right or what will happen' },
        { word: 'Stuck', definition: 'Can\'t move forward, feel frozen' },
        { word: 'Numb', definition: 'Don\'t feel anything, like emotions are turned off' },
        { word: 'Conflicted', definition: 'Two opposite feelings at the same time' }
      ]
    }
  }

  const bodyMap = [
    { location: 'Head', feelings: ['Headaches when stressed', 'Brain fog when overwhelmed', 'Pressure when worried'] },
    { location: 'Throat', feelings: ['Lump when sad', 'Tightness when you can\'t speak', 'Hard to swallow when anxious'] },
    { location: 'Chest', feelings: ['Heavy when sad', 'Tight when anxious', 'Warm when happy', 'Racing heart when scared'] },
    { location: 'Stomach', feelings: ['Butterflies when nervous', 'Knots when worried', 'Empty when sad', 'Nausea when stressed'] },
    { location: 'Hands', feelings: ['Shaky when scared', 'Clenched when angry', 'Sweaty when nervous'] }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white via-cream/30 to-off-white">
      <header className="gradient-bg-sage text-off-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <a href="/articles" className="text-white/80 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 font-sans text-lg">
            <span>←</span> <span>Back to Articles</span>
          </a>
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="text-6xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl">💭</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-sans font-bold text-white mb-4">Glossary of Feelings</h1>
          <p className="text-2xl md:text-3xl text-white/90 font-serif italic">Name it to tame it</p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <section className="card hover-lift bg-gradient-to-br from-white to-cream/50 border-2 border-sage/30">
          <p className="text-2xl font-serif leading-relaxed mb-4">
            Sometimes we don't have words for what we feel.
          </p>
          <p className="text-2xl font-serif leading-relaxed mb-6">
            This is a guide to help you name it.
          </p>
          <div className="bg-terracotta/20 rounded-2xl p-4 border-2 border-terracotta/30">
            <p className="text-2xl font-sans font-bold text-terracotta text-center">
              Because naming a feeling gives you power over it.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-sans font-bold text-forest mb-4">The Emotion Wheel</h2>
          <p className="text-xl font-serif mb-8 leading-relaxed">All emotions start with these 5 core feelings:</p>

          <div className="grid gap-6">
            {Object.entries(emotions).map(([key, data]) => (
              <EmotionSection key={key} name={key.toUpperCase()} color={data.color} words={data.words} />
            ))}
          </div>
        </section>

        <section className="card hover-lift bg-gradient-to-br from-white to-amber/10 border-2 border-amber/30">
          <h2 className="text-3xl font-sans font-bold text-forest mb-6">More Feeling Words</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { word: 'Guilty', definition: 'You feel bad about something you did (or didn\'t do)' },
              { word: 'Ashamed', definition: 'You feel bad about who you are' },
              { word: 'Jealous', definition: 'Wanting what someone else has' },
              { word: 'Embarrassed', definition: 'Feeling exposed or humiliated in front of others' },
              { word: 'Hopeful', definition: 'Believing things can get better' },
              { word: 'Relieved', definition: 'Feeling lighter after something hard ends' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border-2 border-gray-100 hover-lift">
                <h3 className="font-sans font-bold text-xl text-forest mb-2">{item.word}</h3>
                <p className="text-gray-700 font-serif text-lg">{item.definition}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-sans font-bold text-forest mb-4">Where Do You Feel It?</h2>
          <p className="text-xl font-serif mb-8 leading-relaxed">
            Feelings live in your body. Notice where you feel them.
          </p>

          <div className="space-y-4">
            {bodyMap.map((part, idx) => (
              <div key={idx} className="bg-white border-2 border-forest/20 rounded-2xl p-6 hover-lift">
                <h3 className="text-2xl font-sans font-bold text-terracotta mb-4">{part.location}</h3>
                <ul className="space-y-2 font-serif text-lg">
                  {part.feelings.map((feeling, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-forest">→</span>
                      <span>{feeling}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 card hover-lift bg-gradient-to-br from-white to-sage/10 border-2 border-sage/30 text-center">
            <p className="text-2xl font-sans font-bold text-forest">
              When you notice where a feeling lives in your body,<br />
              you can help it move through you.
            </p>
          </div>
        </section>

        <section className="card hover-lift bg-gradient-to-br from-white to-terracotta/10 border-2 border-terracotta/30">
          <h2 className="text-3xl font-sans font-bold text-forest mb-6">How to Use This</h2>
          <ol className="space-y-4 text-xl font-serif">
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-terracotta flex-shrink-0">1.</span>
              <span><strong className="font-sans">Notice the feeling</strong> - "I feel something."</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-terracotta flex-shrink-0">2.</span>
              <span><strong className="font-sans">Name it</strong> - Look at this list. What word fits?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-terracotta flex-shrink-0">3.</span>
              <span><strong className="font-sans">Locate it</strong> - Where do you feel it in your body?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-sans font-bold text-terracotta flex-shrink-0">4.</span>
              <span><strong className="font-sans">Allow it</strong> - It's okay to feel this way.</span>
            </li>
          </ol>
          <div className="mt-6 bg-terracotta/20 rounded-2xl p-4 border-2 border-terracotta/30">
            <p className="text-xl font-sans font-bold text-forest text-center">
              You don't have to fix the feeling. Just name it. That's enough.
            </p>
          </div>
        </section>

        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t-2 border-sage/30">
          <a href="/articles" className="inline-flex items-center gap-2 text-forest hover:text-terracotta font-sans font-bold text-lg transition-colors">
            <span>←</span>
            <span>All Articles</span>
          </a>
          <a href="/journal" className="inline-flex items-center gap-2 text-forest hover:text-terracotta font-sans font-bold text-lg transition-colors">
            <span>Start Journaling</span>
            <span>→</span>
          </a>
        </nav>
      </article>
    </div>
  )
}

function EmotionSection({ name, color, words }: { name: string, color: string, words: any[] }) {
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
      <div className={`inline-block bg-gradient-to-r ${getGradient()} px-6 py-3 rounded-full mb-6`}>
        <h3 className="text-2xl font-sans font-bold text-white">{name} can mean:</h3>
      </div>
      <div className="space-y-4">
        {words.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="font-sans font-bold text-xl text-forest flex-shrink-0">{item.word}:</span>
            <span className="text-gray-800 font-serif text-lg">{item.definition}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
