import { Star, MessageSquareCode } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-4 lg:px-8 bg-ivory text-indigo-dye border-b border-woven-gold/20" id="testimonials">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header content styling */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-[0.25em] text-terracotta uppercase font-bold block">
            The Living Fabric
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-indigo-dye uppercase tracking-tight">
            Loved By Lineages
          </h2>
          <p className="text-sm text-indigo-dye/70 leading-relaxed font-light font-sans max-w-xl mx-auto">
            Our garments are worn during structural family milestones. Read how descendants celebrate physical royalty in our couture.
          </p>
        </div>

        {/* 3 Grid Column Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-quote-grid">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative p-6 md:p-8 bg-[#EFE8DA] rounded-xl border border-woven-gold/15 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all shadow-md group"
            >
              {/* Giant gold absolute quote mark */}
              <div className="absolute top-4 right-6 text-6xl font-serif text-woven-gold/25 select-none font-black leading-none pointer-events-none">
                ”
              </div>

              <div className="space-y-4">
                {/* 5 Star rating visualization */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={15} className="fill-woven-gold text-woven-gold" />
                  ))}
                </div>

                <p className="text-sm text-indigo-dye/85 font-sans leading-relaxed italic z-10 relative">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 pt-4 border-t border-woven-gold/15">
                {/* Visual Avatar Placeholder with seed letters */}
                <div className="w-10 h-10 rounded-full bg-indigo-dye text-woven-gold flex items-center justify-center font-mono font-bold text-sm shadow-inner uppercase">
                  {t.avatarSeed.slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-indigo-dye uppercase tracking-wide">
                    {t.author}
                  </h4>
                  <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider font-semibold block">
                    {t.city}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Traditional proverb sign off */}
        <div className="pt-8 text-center flex flex-col items-center justify-center space-y-2 opacity-65 text-indigo-dye/80">
          <MessageSquareCode size={20} className="text-terracotta" />
          <p className="font-serif italic text-sm">
            "Aṣọ l’ayé n’ jẹ́ — Clothing is the mirror of life's nobility."
          </p>
        </div>

      </div>
    </section>
  );
}
