import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, BookOpen, X, CheckCircle } from 'lucide-react';

const CULTURAL_TRIVIA = [
  {
    culture: 'Yoruba',
    fact: 'The "Gele" headtie is not just a decorative item; its height and slant can convey a woman s marital status. A Gele turned to the right side indicates she is happily married, while a Gele tilted to the left shows she is still searching for a soulmate.'
  },
  {
    culture: 'Hausa',
    fact: 'The grand "Babbar Riga" robe features a custom embroidered front quadrant. Historically, the dense, geometric stitching around the neck was designed to ward off bad luck, with each knot represents a verbal blessing woven in.'
  },
  {
    culture: 'Igbo',
    fact: 'The lion heads printed on traditional "Isiagu" velvet symbolize "Agu" (the lion), standing for outstanding courage and community service. These tunics were traditionally only bestowed upon men when they received a significant title.'
  }
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentTrivia, setCurrentTrivia] = useState(CULTURAL_TRIVIA[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Pick random trivia
    const random = CULTURAL_TRIVIA[Math.floor(Math.random() * CULTURAL_TRIVIA.length)];
    setCurrentTrivia(random);
    setIsSubscribed(true);
  };

  const handleCloseSuccess = () => {
    setIsSubscribed(false);
    setEmail('');
  };

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#150F39] text-ivory/90 relative overflow-hidden text-center border-b border-woven-gold/10" id="newsletter">
      
      {/* Decorative Loom background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-woven-gold/5 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-terracotta/5 pointer-events-none animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        
        <div className="flex items-center justify-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-woven-gold uppercase font-bold text-wide">
            Àṣà Guild community
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
        </div>

        <h2 className="font-display text-3.5xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
          Join the Fabric of <br className="hidden sm:inline" /> Our Community
        </h2>

        <p className="text-sm text-ivory/60 max-w-lg mx-auto leading-relaxed font-light">
          We invite you into our inner circle. Receive monthly lookbooks, traditional style protocols, 
          and exclusive priority access to raw-loomed Sanyan collections.
        </p>

        {/* Input Form wrap */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch max-w-lg mx-auto gap-3 pt-4" id="newsletter-form">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-woven-gold/60" size={16} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your bespoke email address"
              className="w-full pl-10 pr-4 py-3.5 bg-indigo-dye/80 border border-woven-gold/20 focus:border-woven-gold rounded text-sm text-ivory focus:outline-none placeholder-ivory/40 font-sans"
              required
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-terracotta to-woven-gold text-white hover:text-indigo-dye font-mono text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-lg shrink-0 rounded active:scale-95"
          >
            Subscribe
          </button>
        </form>

        <p className="text-[10px] font-mono text-ivory/35">
          * A promise: Monthly lookbooks, cultural style guides, and exclusive releases.
        </p>

      </div>

      {/* DYNAMIC SUCCESS POPUP WITH NOVEL CULTURE TRIVIA */}
      <AnimatePresence>
        {isSubscribed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSuccess}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Content Drawer Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#1A1040] border-2 border-woven-gold max-w-md w-full p-6 text-left rounded-lg shadow-2xl z-10 space-y-4"
              id="newsletter-success-popup"
            >
              <button
                onClick={handleCloseSuccess}
                className="absolute top-4 right-4 text-ivory/60 hover:text-woven-gold transition-colors"
                aria-label="Close trivia panel"
              >
                <X size={18} />
              </button>

              <div className="flex items-center space-x-2 text-forest-green">
                <CheckCircle size={22} />
                <h4 className="font-display font-medium text-lg text-white">Lineage Subscribed!</h4>
              </div>

              <p className="text-xs text-ivory/70 font-sans leading-relaxed">
                Thank you. You have been added to our private artisan newsletter feed. Below is your 
                <strong> Cultural Trivia Fact of the Day</strong> as our welcome coordinate.
              </p>

              {/* Trivia Content Panel */}
              <div className="bg-[#120A2E] p-4 rounded-md border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-widest text-[#D4A843] uppercase font-bold flex items-center gap-1">
                    <BookOpen size={11} /> Trivia Highlight:
                  </span>
                  <span className="text-[9px] font-mono text-terracotta uppercase tracking-wider font-semibold">
                    {currentTrivia.culture}
                  </span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed font-sans italic">
                  "{currentTrivia.fact}"
                </p>
              </div>

              <button
                onClick={handleCloseSuccess}
                className="w-full py-2.5 bg-woven-gold text-indigo-dye text-xs font-mono uppercase tracking-widest font-black rounded hover:bg-ivory transition-colors pointer-all"
              >
                Curate Collections
              </button>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
