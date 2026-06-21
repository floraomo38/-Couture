import { motion } from 'motion/react';
import { Award, Hammer, Sparkles } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="py-20 md:py-28 px-4 lg:px-8 bg-[#130B30] text-ivory/90 border-b border-woven-gold/10 relative overflow-hidden" id="story">
      {/* Structural background details */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-crimson-coral/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-woven-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Pull quote & Stats counter */}
        <div className="lg:col-span-5 space-y-10 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-woven-gold uppercase font-bold block">
              Craftsmanship Philosophy
            </span>
            <div className="relative pl-6 border-l-4 border-crimson-coral py-2">
              <span className="absolute -left-2 -top-4 text-7xl font-serif text-crimson-coral/15 select-none font-black">“</span>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight uppercase tracking-tight">
                Every stitch is a sentence in a story passed down through generations.
              </p>
            </div>
            <p className="text-xs font-mono text-crimson-coral/80 pl-6">
              — Àṣà Couture Bead Guild, Edo State
            </p>
          </div>

          {/* Masterfully Generated Craft Image Detail */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/5 shadow-xl group">
            <img
              src="/src/assets/images/craftsmanship_texture_1781348686728.jpg"
              alt="High close up of crimson velvet and coral beaded fabric"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-dye/80 to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-4 text-[10px] font-mono text-woven-gold bg-black/40 px-2 py-0.5 rounded tracking-wide">
              Active Loom: Hand-Shuttle No. 14
            </span>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-woven-gold/10 py-6" id="craftsmanship-stats-row">
            <div className="text-center space-y-1">
              <span className="font-display text-3xl md:text-4xl font-extrabold text-woven-gold block tracking-tighter">
                500+
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.05em] text-ivory/50 block">
                Lineage Artisans
              </span>
            </div>
            
            <div className="text-center space-y-1 border-x border-woven-gold/10 px-2">
              <span className="font-display text-3xl md:text-4xl font-extrabold text-crimson-coral block tracking-tighter">
                30+
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.05em] text-ivory/50 block">
                Fabric Categories
              </span>
            </div>

            <div className="text-center space-y-1">
              <span className="font-display text-3xl md:text-4xl font-extrabold text-white block tracking-tighter">
                3
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.05em] text-ivory/50 block">
                Cultural Kingdoms
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Descriptions & Artisans Highlights */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-6 text-sm text-ivory/70 leading-relaxed font-light">
            <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-white uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="text-woven-gold" size={20} />
              The Intelligence of Looming
            </h3>

            <p>
              Traditional West African looms are not simply mechanical devices; they are calculating instruments. For example, the 
              Edo <strong>Ivie</strong> beaded cap method requires artisans to lock-stitch raw coral heads onto velvet fabrics up to 
              hundreds of times to complete a single standard wrap band. Every diamond motif holds a historical lineage, representing 
              marriage coordinates, noble community appointments, or seasonal harvests.
            </p>

            <p>
              At Àṣà Couture, we do not automate this mathematics. We partner directly with family weaving co-operatives in 
              <strong> Benin City</strong> (Edo Coral Weaving), <strong>Kano</strong> (Hausa fine embroidery guilds), and <strong>Aba</strong> (Igbo George wrapping houses). 
              By employing second and third-generation master artisans, we ensure these mathematical textile formulas remain economically 
              viable on the modern luxury market.
            </p>

            <p>
              We dye our threads using natural, slow-curing components. Our rich deep blue is extracted from indigenous 
              <strong> Indigofera</strong> mud blocks in traditional clay pits, our royal crimson is extracted from rich hibiscus juices and natural dyes, 
              and our forest greens are boiled from indigenous teak bark. The resulting fiber absorbs light with an unmatched organic depth, 
              ensuring your couture garment shimmers beautifully under any grand occasion lighting.
            </p>
          </div>

          {/* Core Handloom Practices blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="bg-[#19113E] p-5 rounded-lg border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-woven-gold/10 flex items-center justify-center text-woven-gold">
                <Award size={16} />
              </div>
              <h4 className="font-display text-base font-bold text-white uppercase tracking-wide">
                Indelible Mud Dyes
              </h4>
              <p className="text-xs text-ivory/60 leading-relaxed">
                We cure our warp threads in active indigo fermentation wells for up to 21 days, generating a deep-dye structure that never bleeds.
              </p>
            </div>

            <div className="bg-[#19113E] p-5 rounded-lg border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-crimson-coral/10 flex items-center justify-center text-crimson-coral">
                <Hammer size={16} />
              </div>
              <h4 className="font-display text-base font-bold text-white uppercase tracking-wide">
                Zero-Waste Looms
              </h4>
              <p className="text-xs text-ivory/60 leading-relaxed">
                By wrapping garments dynamically from woven width ribbons, we cut our fabrication fabric scrap waste down to exactly under 2.5%.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
