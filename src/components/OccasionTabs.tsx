import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, Check, MapPin, Feather } from 'lucide-react';
import { OCCASION_GUIDE } from '../data';

export default function OccasionTabs() {
  const [activeTab, setActiveTab] = useState<string>('weddings');

  const currentGuide = OCCASION_GUIDE.find((guide) => guide.id === activeTab) || OCCASION_GUIDE[0];

  return (
    <section className="py-16 md:py-24 px-4 lg:px-8 bg-indigo-dye text-ivory/90 border-b border-woven-gold/10" id="occasions">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header content explaining purpose */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-[0.3em] text-woven-gold uppercase font-extrabold block">
            Bespoke Occasions Guide
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            Occasions Navigator
          </h2>
          <p className="text-sm text-ivory/60 leading-relaxed font-light">
            Nigerian gatherings are grand visual stages where every fabric speaks. Browse our curated style formulas 
            governed by historic etiquette across major events.
          </p>
        </div>

        {/* Dynamic Nav Tabs Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-4" id="occasions-pill-selector">
          {OCCASION_GUIDE.map((guide) => {
            const isActive = guide.id === activeTab;
            return (
              <button
                key={guide.id}
                onClick={() => setActiveTab(guide.id)}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest border transition-all pointer-all rounded-full ${
                  isActive
                    ? 'border-woven-gold bg-woven-gold/15 text-woven-gold font-bold shadow-lg shadow-woven-gold/5'
                    : 'border-white/5 bg-white/2 hover:border-white/20 text-ivory/65'
                }`}
              >
                {guide.name}
              </button>
            );
          })}
        </div>

        {/* Tab content display with transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGuide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4"
          >
            {/* Guide descriptive block */}
            <div className="lg:col-span-4 bg-[#19113E] p-6 md:p-8 rounded-xl border border-white/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-terracotta font-extrabold flex items-center gap-1.5ClassName">
                  <Sparkles size={12} className="text-terracotta" /> Core Formula
                </span>
                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide">
                  {currentGuide.name} Protocol
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed font-light">
                  {currentGuide.description}
                </p>
              </div>

              {/* Etiquette custom box */}
              <div className="bg-[#120A2E] p-4 rounded border border-woven-gold/25 text-xs text-woven-gold space-y-1.5">
                <span className="font-mono text-[10px] uppercase font-black block tracking-wider flex items-center gap-1">
                  <HelpCircle size={13} /> Cultural Etiquette Note:
                </span>
                <p className="leading-relaxed font-sans italic opacity-95 pl-4 relative">
                  <span className="absolute left-0 top-0 text-xl font-serif line-height-none">“</span>
                  {currentGuide.culturalEtiquette}
                </p>
              </div>
            </div>

            {/* Custom culture style formulas */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Yoruba Culture column panel */}
              <div className="bg-[#19113E]/50 rounded-xl p-6 border-l-4 border-terracotta border-y border-r border-[#19113E] hover:bg-[#19113E] transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-lg text-white">Yoruba Style</span>
                  <span className="text-[9px] font-mono bg-terracotta/25 text-terracotta px-2 py-0.5 rounded uppercase">Terracotta Accent</span>
                </div>
                <div className="text-xs text-ivory/75 font-sans leading-relaxed space-y-3">
                  <p>{currentGuide.yorubaStyle}</p>
                  <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-ivory/50">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-woven-gold font-bold block">Key Garments</span>
                    <div className="flex items-center gap-1"><Check size={11} className="text-terracotta" /> Agbada / Alari fabrics</div>
                    <div className="flex items-center gap-1"><Check size={11} className="text-terracotta" /> Pre-shuffled Gele Ties</div>
                  </div>
                </div>
              </div>

              {/* Hausa Culture column panel */}
              <div className="bg-[#19113E]/50 rounded-xl p-6 border-l-4 border-woven-gold border-y border-r border-[#19113E] hover:bg-[#19113E] transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-lg text-white">Hausa Style</span>
                  <span className="text-[9px] font-mono bg-woven-gold/25 text-woven-gold px-2 py-0.5 rounded uppercase">Gold Weave</span>
                </div>
                <div className="text-xs text-ivory/75 font-sans leading-relaxed space-y-3">
                  <p>{currentGuide.hausaStyle}</p>
                  <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-ivory/50">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-woven-gold font-bold block">Key Garments</span>
                    <div className="flex items-center gap-1"><Check size={11} className="text-woven-gold" /> Babbar Riga Robe</div>
                    <div className="flex items-center gap-1"><Check size={11} className="text-woven-gold" /> Hula hand embroidery</div>
                  </div>
                </div>
              </div>

              {/* Igbo Culture column panel */}
              <div className="bg-[#19113E]/50 rounded-xl p-6 border-l-4 border-forest-green border-y border-r border-[#19113E] hover:bg-[#19113E] transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-lg text-white">Igbo Style</span>
                  <span className="text-[9px] font-mono bg-forest-green/25 text-forest-green px-2 py-0.5 rounded uppercase">Green George</span>
                </div>
                <div className="text-xs text-ivory/75 font-sans leading-relaxed space-y-3">
                  <p>{currentGuide.igboStyle}</p>
                  <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-ivory/50">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-woven-gold font-bold block">Key Garments</span>
                    <div className="flex items-center gap-1"><Check size={11} className="text-forest-green" /> Isiagu velvet jackets</div>
                    <div className="flex items-center gap-1"><Check size={11} className="text-forest-green" /> Coral string neck beads</div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
