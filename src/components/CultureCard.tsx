import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { CultureShowcase } from '../data';

interface CultureCardProps {
  culture: CultureShowcase;
  onFilterSelect: (cultureName: 'Edo' | 'Hausa' | 'Igbo') => void;
}

export default function CultureCard({ culture, onFilterSelect }: CultureCardProps) {
  const [showMottoDetails, setShowMottoDetails] = useState(false);

  const handleExploreCouture = () => {
    onFilterSelect(culture.name);
  };

  return (
    <div
      className="relative flex flex-col justify-between bg-[#19113E] rounded-xl overflow-hidden border border-white/5 hover:border-woven-gold/30 transition-all duration-500 shadow-xl group h-full"
      id={`culture-card-${culture.name.toLowerCase()}`}
    >
      {/* Decorative colored rim highlighting cultural accent */}
      <div 
        className="h-1.5 w-full transition-transform duration-500 group-hover:scale-x-105" 
        style={{ backgroundColor: culture.accentColor }}
      />

      {/* Main Image Banner representing cultural clothing detail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-indigo-dye/30">
        <img
          src={culture.image}
          alt={`Luxury ${culture.name} traditional fashion detail`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#19113E] via-transparent to-transparent opacity-95" />
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay transition-opacity group-hover:opacity-20 pointer-events-none"
          style={{ backgroundColor: culture.accentColor }}
        />

        {/* Culture Name overlay tag */}
        <div className="absolute bottom-4 left-6" id={`culture-badge-${culture.name.toLowerCase()}`}>
          <span 
            className="text-[10px] font-mono tracking-[0.3em] uppercase px-2.5 py-0.5 border font-extrabold"
            style={{ 
              borderColor: `${culture.accentColor}40`, 
              color: culture.accentColor,
              backgroundColor: `${culture.accentColor}10`
            }}
          >
            {culture.name} Heritage
          </span>
          <h3 className="font-display font-bold text-2xl text-white mt-1 uppercase tracking-wide">
            {culture.name}
          </h3>
        </div>
      </div>

      {/* Culture Details Column */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        
        <div className="space-y-4">
          <p className="text-sm text-ivory/80 leading-relaxed font-light">
            {culture.philosophy}
          </p>

          {/* Quick Stats Block */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-white/2 rounded border border-white/5 text-xs font-mono">
            <div>
              <span className="text-white/40 block text-[9px] uppercase tracking-wider">Garments</span>
              <span className="text-ivory font-medium line-clamp-1">{culture.apparelInfo.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[9px] uppercase tracking-wider">Headwear</span>
              <span className="text-woven-gold font-medium line-clamp-1">{culture.headwear.split('(')[0]}</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-woven-gold uppercase flex items-center gap-1.5 mb-2">
              <BookOpen size={12} style={{ color: culture.accentColor }} />
              Customary Wisdom & Rules
            </span>
            <ul className="space-y-1.5 text-xs text-ivory/60 font-sans list-none pl-0">
              {culture.customs.map((custom, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: culture.accentColor }} />
                  <span>{custom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-ivory/40 uppercase tracking-widest">Fabric Seal</span>
            <span className="text-xs font-semibold text-ivory/90">{culture.fabric}</span>
          </div>

          <button
            onClick={handleExploreCouture}
            className="group/btn relative px-4 py-2 border overflow-hidden rounded transition-all duration-300 font-mono text-xs uppercase font-extrabold tracking-widest flex items-center gap-1.5"
            style={{ 
              borderColor: `${culture.accentColor}50`,
              color: culture.name === 'Hausa' ? '#D4A843' : culture.accentColor,
            }}
          >
            {/* Sliding backdrop */}
            <div 
              className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 pointer-events-none -z-10 opacity-15"
              style={{ backgroundColor: culture.accentColor }}
            />
            View Gallery
            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
