import { motion } from 'motion/react';
import { ChevronDown, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreCollections: () => void;
  onExploreHeritage: () => void;
}

export default function Hero({ onExploreCollections, onExploreHeritage }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#120A2E] py-12 px-4 lg:px-8 border-b border-woven-gold/10" id="hero">
      
      {/* Background Animated Geometrics */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-overlay">
        {/* Subtle SVG tiled background of aso-oke diamond loom vectors */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="30" cy="30" r="1.5" fill="#C4581F" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>

      {/* Floating Ambient Glow circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl z-0 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-forest-green/10 blur-3xl z-0 pointer-events-none animate-pulse" />

      {/* Hero Structure Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 bg-woven-gold/10 border border-woven-gold/20 px-3.5 py-1.5 rounded-full"
            id="badge-heritage"
          >
            <Sparkles size={14} className="text-woven-gold animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase text-woven-gold text-glow">
              Federal Haute Couture Collection
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              Wear Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-woven-gold via-terracotta to-woven-gold">Roots</span>. <br />
              Own Your <span className="text-white border-b-2 border-terracotta">Story</span>.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-ivory/80 max-w-xl leading-relaxed font-light"
          >
            Àṣà Couture translates the mathematical grandeur of Nigerian textile history to the global luxury stage. 
            We weave the royal lineages of Yoruba <span className="text-terracotta font-semibold">Aṣọ-Oke</span>, Hausa <span className="text-woven-gold font-semibold">Brocade</span>, and Igbo <span className="text-forest-green font-semibold">Isiagu</span> velvet into modern museum-grade garments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4"
            id="hero-ctas"
          >
            <button
              onClick={onExploreCollections}
              className="px-8 py-4 bg-gradient-to-r from-terracotta to-[#a3410e] text-ivory text-xs font-mono tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all duration-300 font-bold flex items-center justify-center gap-2 group shadow-xl"
              id="cta-explore"
            >
              Explore Collections
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onExploreHeritage}
              className="px-8 py-4 border-2 border-woven-gold/40 text-woven-gold text-xs font-mono tracking-widest uppercase hover:bg-woven-gold/10 active:scale-95 transition-all duration-300 font-bold flex items-center justify-center gap-2"
              id="cta-heritage"
            >
              Our Cultural Lineages
            </button>
          </motion.div>

          {/* Social Proof Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 pt-6 text-[11px] font-mono text-ivory/40"
            id="hero-social-proof"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-woven-gold" /> Traditional Loom-Weaving
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-terracotta" /> Sourced from Nigerian Artisans
            </span>
          </motion.div>

        </div>

        {/* Feature Visual Editorial Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden border border-woven-gold/25 shadow-2xl group flex items-center justify-center"
          id="hero-media-frame"
        >
          {/* Decorative Corner borders evoking Yoruba woven geometric boxes */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-woven-gold/60 z-20 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-woven-gold/60 z-20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-woven-gold/60 z-20 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-woven-gold/60 z-20 pointer-events-none" />
          
          {/* Subtle color split background block */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-dye via-transparent to-transparent z-10 pointer-events-none opacity-80" />
          
          <img
            src="/src/assets/images/hero_fashion_1781348619298.jpg"
            alt="Àṣà Couture modern African styling display"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Fallback to stylized editorial backup from unsplash if needed
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80";
            }}
          />

          {/* Slogan over image badge */}
          <div className="absolute bottom-6 left-6 right-6 z-20 bg-indigo-dye/80 backdrop-blur-md p-4 rounded border border-woven-gold/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-woven-gold tracking-wider uppercase font-semibold">Exhibition Piece</p>
              <h5 className="font-display text-sm font-bold text-white tracking-wide">Grand Union Oba Agbada Hybrid</h5>
            </div>
            <span className="text-xs bg-terracotta text-ivory px-2.5 py-1 font-mono rounded">₦1,250,000</span>
          </div>
        </motion.div>

      </div>

      {/* Down indicators */}
      <div 
        onClick={onExploreHeritage}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity z-10"
        id="scroll-helper"
      >
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-woven-gold">Explore Heritage</span>
        <ChevronDown size={14} className="text-woven-gold animate-bounce mt-1" />
      </div>

    </section>
  );
}
